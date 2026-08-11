import { PRICING_RESOURCE_DEFAULTS } from "../../src/data/pricing-data.js";

export const CMS_RESOURCE_TYPES = new Set(["pricing", "projects", "faq"]);

const PRICING_DEFAULTS = PRICING_RESOURCE_DEFAULTS;

const INITIAL_PROJECT_DEFAULTS = [
    {
      id: "masjid-raya-puri-telukjambe",
      sort_order: 10,
      data: {
        title: "Masjid Raya Puri Telukjambe",
        type_id: "Completed Project",
        type_en: "Completed Project",
        url: "/portfolio/masjid-raya-puri-telukjambe",
        image_url: "/images/masjidrayapuritelukjambe.webp",
        homepage: true,
      },
    },
    {
      id: "cutbae-barbershop",
      sort_order: 20,
      data: {
        title: "Cutbae Barbershop",
        type_id: "Completed Project",
        type_en: "Completed Project",
        url: "/portfolio/cutbae-barbershop",
        image_url: "/images/cutbae-barbershop.webp",
        homepage: true,
      },
    },
    {
      id: "makdian-bakery",
      sort_order: 30,
      data: {
        title: "Makdian Bakery",
        type_id: "Completed Project",
        type_en: "Completed Project",
        url: "/portfolio/makdian-bakery",
        image_url: "/images/makdian-bakery.webp",
        homepage: true,
      },
    },
];

const PORTFOLIO_PROJECT_DEFAULTS = [
    {
      id: "hammaddanfulanah",
      sort_order: 40,
      data: {
        title: "Hammad & Fulanah",
        type_id: "Wedding Invitation",
        type_en: "Wedding Invitation",
        url: "/portfolio/hammaddanfulanah",
        image_url: "/images/hammaddanfulanah.png",
        homepage: true,
      },
    },
    {
      id: "weddingpro",
      sort_order: 50,
      data: {
        title: "WeddingPro",
        type_id: "Wedding Invitation + Dashboard",
        type_en: "Wedding Invitation + Dashboard",
        url: "/portfolio/weddingpro",
        image_url: "/images/weddingpro.png",
        homepage: true,
      },
    },
    {
      id: "hbd-matt",
      sort_order: 60,
      data: {
        title: "HBD Matt",
        type_id: "Birthday Website",
        type_en: "Birthday Website",
        url: "/portfolio/hbd-matt",
        image_url: "/images/hbd-matt.png",
        homepage: false,
      },
    },
    {
      id: "smk01-school-profile",
      sort_order: 70,
      data: {
        title: "SMK01 School Profile",
        type_id: "School Profile Website",
        type_en: "School Profile Website",
        url: "/portfolio/smk01-school-profile",
        image_url: "/images/smk01.png",
        homepage: true,
      },
    },
    {
      id: "smk01-spmb-custom",
      sort_order: 80,
      data: {
        title: "SMK01 SPMB Custom",
        type_id: "SPMB Landing Page",
        type_en: "Custom Admissions Landing Page",
        url: "/portfolio/smk01-spmb-custom",
        image_url: "/images/smk01.png",
        homepage: false,
      },
    },
    {
      id: "pedulisesama",
      sort_order: 90,
      data: {
        title: "Peduli Sesama",
        type_id: "Community + Dashboard",
        type_en: "Community + Dashboard",
        url: "/portfolio/pedulisesama",
        image_url: "/images/pedulisesama.png",
        homepage: true,
      },
    },
    {
      id: "cpxindo",
      sort_order: 100,
      data: {
        title: "CPX Indo",
        type_id: "Company Profile + Ecommerce",
        type_en: "Company Profile + Ecommerce",
        url: "/portfolio/cpxindo",
        image_url: "/images/cpxindo.png",
        homepage: true,
      },
    },
    {
      id: "shofifrozen",
      sort_order: 110,
      data: {
        title: "Shofi Frozen",
        type_id: "Ecommerce + Payment Gateway",
        type_en: "Ecommerce + Payment Gateway",
        url: "/portfolio/shofifrozen",
        image_url: "/images/shofifrozen.png",
        homepage: false,
      },
    },
    {
      id: "spectrasec",
      sort_order: 120,
      data: {
        title: "SpectraSec",
        type_id: "Community Profile",
        type_en: "Community Profile",
        url: "/portfolio/spectrasec",
        image_url: "/images/spectrasec.png",
        homepage: false,
      },
    },
];

const FAQ_DEFAULTS = [
    {
      id: "redesign-existing-site",
      sort_order: 10,
      data: {
        question_id: "Bisa redesign website yang sudah ada?",
        question_en: "Can Solivate Studio redesign my current website?",
        answer_id:
          "Bisa. Kami bisa mempertahankan konten yang masih berguna lalu membangun ulang layout, visual system, UX, dan performanya.",
        answer_en:
          "Yes. We can keep useful content and rebuild the layout, visual system, UX, and performance from the ground up.",
      },
    },
    {
      id: "business-only",
      sort_order: 20,
      data: {
        question_id: "Apakah Solivate hanya membuat website bisnis?",
        question_en: "Does Solivate only build business websites?",
        answer_id:
          "Tidak. Kami juga membuat website komunitas sosial, event, wedding invitation, birthday website, katalog, booking, dan sistem custom.",
        answer_en:
          "No. We also build social community websites, events, wedding invitations, birthday websites, catalogs, bookings, and custom systems.",
      },
    },
    {
      id: "how-to-start",
      sort_order: 30,
      data: {
        question_id: "Mulainya dari mana?",
        question_en: "How do we start?",
        answer_id:
          "Kirim brief singkat berisi tujuan, referensi, timeline, dan range budget. Kami akan susun scope yang praktis.",
        answer_en:
          "Send a short brief with your goal, references, timeline, and budget range. We will propose a practical scope.",
      },
    },
];

export const CMS_DEFAULTS = {
  pricing: PRICING_DEFAULTS,
  projects: [...INITIAL_PROJECT_DEFAULTS, ...PORTFOLIO_PROJECT_DEFAULTS],
  faq: FAQ_DEFAULTS,
};

const CMS_DEFAULT_UPDATES = {
  pricing: [
    { version: 1, items: PRICING_DEFAULTS.slice(0, 7) },
    { version: 2, items: PRICING_DEFAULTS, mode: "upsert" },
  ],
  projects: [
    { version: 1, items: INITIAL_PROJECT_DEFAULTS },
    { version: 2, items: PORTFOLIO_PROJECT_DEFAULTS },
  ],
  faq: [{ version: 1, items: FAQ_DEFAULTS }],
};

const text = (value, max = 600) =>
  String(value ?? "")
    .trim()
    .slice(0, max);
const list = (value) =>
  (Array.isArray(value) ? value : String(value ?? "").split("\n"))
    .map((item) => text(item, 180))
    .filter(Boolean)
    .slice(0, 12);

export function normalizeCmsResource(type, data = {}) {
  if (type === "pricing") {
    return {
      group: ["personal", "business", "enterprise", "custom"].includes(data.group)
        ? data.group
        : "business",
      name_id: text(data.name_id, 120),
      name_en: text(data.name_en, 120),
      badge_id: text(data.badge_id, 80),
      badge_en: text(data.badge_en, 80),
      price_id: text(data.price_id, 80),
      price_en: text(data.price_en, 80),
      description_id: text(data.description_id, 500),
      description_en: text(data.description_en, 500),
      features_id: list(data.features_id),
      features_en: list(data.features_en),
      featured: Boolean(data.featured),
      homepage: Boolean(data.homepage),
    };
  }
  if (type === "projects") {
    return {
      title: text(data.title, 140),
      type_id: text(data.type_id, 80),
      type_en: text(data.type_en, 80),
      url: text(data.url, 500),
      image_url: text(data.image_url, 800),
      homepage: Boolean(data.homepage),
    };
  }
  if (type === "faq") {
    return {
      question_id: text(data.question_id, 240),
      question_en: text(data.question_en, 240),
      answer_id: text(data.answer_id, 1000),
      answer_en: text(data.answer_en, 1000),
    };
  }
  return {};
}

export async function seedCmsResourceDefaults(sql, type) {
  const updates = CMS_DEFAULT_UPDATES[type] || [];
  if (!updates.length) return;

  const versionKey = `cms_defaults_version:${type}`;
  const [versionRow] =
    await sql`SELECT value FROM cms_entries WHERE key = ${versionKey} LIMIT 1`;

  let currentVersion = Number(versionRow?.value?.version || 0);

  // Older installs already have baseline records but no version marker yet.
  // Infer them as version 1 so we only backfill newer bundles once.
  if (!versionRow) {
    const [countRow] =
      await sql`SELECT COUNT(*)::int AS count FROM cms_resources WHERE resource_type = ${type}`;
    if (Number(countRow?.count || 0) > 0) {
      currentVersion = 1;
    }
  }

  const pendingUpdates = updates.filter((update) => update.version > currentVersion);
  if (!pendingUpdates.length) {
    if (!versionRow) {
      const latestVersion = updates[updates.length - 1]?.version || currentVersion;
      await sql`INSERT INTO cms_entries (key, value, status, updated_at)
        VALUES (${versionKey}, ${JSON.stringify({ version: latestVersion })}, 'published', NOW())
        ON CONFLICT (key) DO UPDATE SET
          value = EXCLUDED.value,
          status = 'published',
          updated_at = NOW()`;
    }
    return;
  }

  for (const update of pendingUpdates) {
    if (update.mode === "upsert") {
      await Promise.all(
        update.items.map(
          (item) => sql`
      INSERT INTO cms_resources (id, resource_type, sort_order, data, is_published)
      VALUES (${item.id}, ${type}, ${item.sort_order}, ${JSON.stringify(item.data)}, TRUE)
      ON CONFLICT (id) DO UPDATE SET
        sort_order = EXCLUDED.sort_order,
        data = EXCLUDED.data,
        is_published = EXCLUDED.is_published,
        updated_at = NOW()
      WHERE cms_resources.resource_type = ${type}
    `,
        ),
      );
      continue;
    }

    await Promise.all(
      update.items.map(
        (item) => sql`
      INSERT INTO cms_resources (id, resource_type, sort_order, data, is_published)
      VALUES (${item.id}, ${type}, ${item.sort_order}, ${JSON.stringify(item.data)}, TRUE)
      ON CONFLICT (id) DO NOTHING
    `,
      ),
    );
  }

  const latestVersion =
    pendingUpdates[pendingUpdates.length - 1]?.version || currentVersion;
  await sql`INSERT INTO cms_entries (key, value, status, updated_at)
    VALUES (${versionKey}, ${JSON.stringify({ version: latestVersion })}, 'published', NOW())
    ON CONFLICT (key) DO UPDATE SET
      value = EXCLUDED.value,
      status = 'published',
      updated_at = NOW()`;
}
