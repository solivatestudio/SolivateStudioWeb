export const CAMPAIGN_KEY = "campaign_hut_ri_81";

export const CAMPAIGN_DEFAULTS = {
  enabled: true,
  start_date: "2026-08-12",
  end_date: "2026-08-31",
  discount_amount: 81000,
  desktop_image: "/images/campaign/merdeka-81-desktop.webp",
  mobile_image: "/images/campaign/merdeka-81-mobile.webp",
  image_alt_id: "Kampanye Promo Merdeka Solivate Studio",
  image_alt_en: "Solivate Studio Independence Day promotion",
  eyebrow_id: "Promo Merdeka HUT RI ke-81",
  eyebrow_en: "Indonesia's 81st Independence Day",
  headline_id: "Merdeka bikin website. Hemat hingga Rp81.000.",
  headline_en: "Build your website and save up to Rp81,000.",
  description_id: "Rayakan kemerdekaan dengan langkah digital baru untuk bisnis, komunitas, atau momen spesialmu.",
  description_en: "Celebrate Independence Day with a new digital step for your business, community, or meaningful moment.",
  cta_id: "Klaim Promo via WhatsApp",
  cta_en: "Claim Promo via WhatsApp",
  whatsapp_message_id: "Halo Solivate Studio, saya tertarik dengan Promo Merdeka HUT RI ke-81 dan ingin konsultasi project.",
  whatsapp_message_en: "Hello Solivate Studio, I am interested in the 81st Independence Day promotion and would like to discuss a project.",
};

const text = (value, fallback, max = 500) => {
  const normalized = String(value ?? "").trim().slice(0, max);
  return normalized || fallback;
};

const date = (value, fallback) => {
  const normalized = String(value ?? "").trim();
  return /^\d{4}-\d{2}-\d{2}$/.test(normalized) ? normalized : fallback;
};

export function normalizeCampaign(value = {}) {
  const discount = Number(value.discount_amount);
  const startDate = date(value.start_date, CAMPAIGN_DEFAULTS.start_date);
  const endDate = date(value.end_date, CAMPAIGN_DEFAULTS.end_date);

  return {
    enabled: value.enabled !== false,
    start_date: startDate,
    end_date: endDate < startDate ? startDate : endDate,
    discount_amount: Number.isFinite(discount)
      ? Math.min(100000000, Math.max(0, Math.round(discount)))
      : CAMPAIGN_DEFAULTS.discount_amount,
    desktop_image: text(value.desktop_image, CAMPAIGN_DEFAULTS.desktop_image, 800),
    mobile_image: text(value.mobile_image, CAMPAIGN_DEFAULTS.mobile_image, 800),
    image_alt_id: text(value.image_alt_id, CAMPAIGN_DEFAULTS.image_alt_id, 180),
    image_alt_en: text(value.image_alt_en, CAMPAIGN_DEFAULTS.image_alt_en, 180),
    eyebrow_id: text(value.eyebrow_id, CAMPAIGN_DEFAULTS.eyebrow_id, 120),
    eyebrow_en: text(value.eyebrow_en, CAMPAIGN_DEFAULTS.eyebrow_en, 120),
    headline_id: text(value.headline_id, CAMPAIGN_DEFAULTS.headline_id, 180),
    headline_en: text(value.headline_en, CAMPAIGN_DEFAULTS.headline_en, 180),
    description_id: text(value.description_id, CAMPAIGN_DEFAULTS.description_id, 500),
    description_en: text(value.description_en, CAMPAIGN_DEFAULTS.description_en, 500),
    cta_id: text(value.cta_id, CAMPAIGN_DEFAULTS.cta_id, 100),
    cta_en: text(value.cta_en, CAMPAIGN_DEFAULTS.cta_en, 100),
    whatsapp_message_id: text(value.whatsapp_message_id, CAMPAIGN_DEFAULTS.whatsapp_message_id, 500),
    whatsapp_message_en: text(value.whatsapp_message_en, CAMPAIGN_DEFAULTS.whatsapp_message_en, 500),
  };
}
