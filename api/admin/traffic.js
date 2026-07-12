import { requireAdmin } from "../_lib/auth.js";
import { db, ensureSchema } from "../_lib/db.js";
import { fail, methodNotAllowed } from "../_lib/http.js";

export default async function handler(request, response) {
  if (request.method !== "GET") return methodNotAllowed(response, ["GET"]);
  if (!requireAdmin(request, response)) return;
  try {
    await ensureSchema();
    const sql = db();
    const [summary, topPages, referrers, trend, latest, pagePerformance] = await Promise.all([
      sql`SELECT
        COUNT(DISTINCT session_hash) FILTER (WHERE created_at >= NOW() - INTERVAL '5 minutes')::int AS active_visitors,
        COUNT(*) FILTER (WHERE event_type = 'pageview' AND created_at >= CURRENT_DATE)::int AS visits_today,
        COUNT(DISTINCT session_hash) FILTER (WHERE event_type = 'pageview' AND created_at >= CURRENT_DATE)::int AS unique_today
        FROM traffic_events`,
      sql`SELECT path, COUNT(*)::int AS visits FROM traffic_events
        WHERE event_type = 'pageview' AND created_at >= CURRENT_DATE - INTERVAL '7 days'
        GROUP BY path ORDER BY visits DESC LIMIT 8`,
      sql`SELECT COALESCE(NULLIF(referrer, ''), 'Direct') AS source, COUNT(*)::int AS visits
        FROM traffic_events WHERE event_type = 'pageview' AND created_at >= CURRENT_DATE - INTERVAL '7 days'
        GROUP BY source ORDER BY visits DESC LIMIT 6`,
      sql`SELECT day::date, COALESCE(COUNT(event.id), 0)::int AS visits
        FROM generate_series(CURRENT_DATE - INTERVAL '6 days', CURRENT_DATE, INTERVAL '1 day') day
        LEFT JOIN traffic_events event ON event.event_type = 'pageview'
          AND event.created_at >= day AND event.created_at < day + INTERVAL '1 day'
        GROUP BY day ORDER BY day`,
      sql`SELECT path, referrer, created_at FROM traffic_events
        WHERE event_type = 'pageview' ORDER BY created_at DESC LIMIT 12`,
      sql`SELECT path,
        COUNT(*)::int AS visits,
        COUNT(DISTINCT session_hash)::int AS sessions,
        MAX(created_at) AS last_visit
        FROM traffic_events
        WHERE event_type = 'pageview'
          AND created_at >= CURRENT_DATE - INTERVAL '30 days'
          AND (
            path = '/'
            OR path = '/pricing'
            OR path = '/project'
            OR path LIKE '/portfolio/%'
            OR path LIKE '/layanan/%'
            OR path LIKE '/jasa-pembuatan-website-%'
          )
        GROUP BY path
        ORDER BY visits DESC
        LIMIT 12`
    ]);
    response.setHeader("Cache-Control", "no-store");
    return response.status(200).json({ summary: summary[0], topPages, referrers, trend, latest, pagePerformance });
  } catch (error) {
    return fail(response, error);
  }
}
