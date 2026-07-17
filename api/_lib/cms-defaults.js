export const CMS_RESOURCE_TYPES = new Set(["pricing", "projects", "faq"]);

export const CMS_DEFAULTS = {
  pricing: [
    {
      id: "personal-birthday-basic",
      sort_order: 10,
      data: {
        group: "personal",
        name_id: "Birthday Website (Basic)",
        name_en: "Birthday Website (Basic)",
        badge_id: "Personal",
        badge_en: "Personal",
        price_id: "Rp 49.000",
        price_en: "Rp 49,000",
        description_id:
          "Untuk hadiah ulang tahun simpel yang tetap terasa personal.",
        description_en: "For simple birthday gifts that still feel personal.",
        features_id: ["Landing page", "Kartu ucapan", "Maksimal 3 foto"],
        features_en: ["Landing page", "Greeting card", "Up to 3 photos"],
        featured: false,
        homepage: true,
      },
    },
    {
      id: "personal-birthday-premium",
      sort_order: 20,
      data: {
        group: "personal",
        name_id: "Birthday Website (Premium)",
        name_en: "Birthday Website (Premium)",
        badge_id: "Personal",
        badge_en: "Personal",
        price_id: "Rp 84.900",
        price_en: "Rp 84,900",
        description_id:
          "Untuk ucapan ulang tahun yang lebih hidup dengan visual dan video.",
        description_en: "For richer birthday greetings with visuals and video.",
        features_id: [
          "Landing page",
          "Digital bucket flower",
          "Kartu ucapan",
          "1 video",
        ],
        features_en: [
          "Landing page",
          "Digital bucket flower",
          "Greeting card",
          "1 video",
        ],
        featured: false,
        homepage: false,
      },
    },
    {
      id: "personal-invitation",
      sort_order: 30,
      data: {
        group: "personal",
        name_id: "Party / Wedding Invitation Website",
        name_en: "Party / Wedding Invitation Website",
        badge_id: "Personal",
        badge_en: "Personal",
        price_id: "Rp 99.000",
        price_en: "Rp 99,000",
        description_id:
          "Untuk undangan digital party atau wedding yang bisa dipersonalisasi.",
        description_en:
          "For personalized party or wedding digital invitations.",
        features_id: [
          "Landing page",
          "Custom name nama tamu",
          "Maksimal 3 foto & 1 video",
        ],
        features_en: [
          "Landing page",
          "Custom guest name",
          "Up to 3 photos & 1 video",
        ],
        featured: false,
        homepage: false,
      },
    },
    {
      id: "business-basic",
      sort_order: 40,
      data: {
        group: "business",
        name_id: "Paket 1 - Basic",
        name_en: "Package 1 - Basic",
        badge_id: "Mulai Online",
        badge_en: "Start Online",
        price_id: "Rp 249.000",
        price_en: "Rp 249,000",
        description_id:
          "Cocok untuk bisnis yang butuh landing page rapi dan cepat live.",
        description_en:
          "For businesses that need a clean landing page and fast launch.",
        features_id: [
          "1 landing page utama",
          "Integrasi media sosial dasar & 1 tombol WhatsApp",
          "Desain responsive mobile friendly",
          "Optimasi SEO dasar meta tag standar",
          "Revisi maksimal 2x",
          "Garansi 1 bulan setelah go-live",
        ],
        features_en: [
          "1 main landing page",
          "Basic social media integration & 1 WhatsApp button",
          "Mobile-friendly responsive design",
          "Basic SEO optimization with standard meta tags",
          "Up to 2 revisions",
          "1-month warranty after go-live",
        ],
        featured: false,
        homepage: false,
      },
    },
    {
      id: "business-standard",
      sort_order: 50,
      data: {
        group: "business",
        name_id: "Paket 2 - Standard",
        name_en: "Package 2 - Standard",
        badge_id: "Paling Populer",
        badge_en: "Most Popular",
        price_id: "Rp 299.000",
        price_en: "Rp 299,000",
        description_id:
          "Best value: beda Rp 50.000 dari Basic, sudah dapat multi-page dan speed optimal.",
        description_en:
          "Best value: only Rp 50,000 more than Basic, with multi-page structure and optimized speed.",
        features_id: [
          "Multi-page maksimal 5 halaman",
          "Advanced WhatsApp integration dengan template chat otomatis",
          "High performance & speed optimization",
          "SEO menyeluruh termasuk Google Search Console & Maps",
          "Desain responsive mobile friendly",
          "Revisi maksimal 5x",
          "Garansi 5 bulan bebas eror & bug",
        ],
        features_en: [
          "Multi-page site up to 5 pages",
          "Advanced WhatsApp integration with automatic chat template",
          "High performance & speed optimization",
          "Comprehensive SEO including Google Search Console & Maps",
          "Mobile-friendly responsive design",
          "Up to 5 revisions",
          "5-month error and bug warranty",
        ],
        featured: true,
        homepage: true,
      },
    },
    {
      id: "business-premium",
      sort_order: 60,
      data: {
        group: "business",
        name_id: "Paket 3 - Premium",
        name_en: "Package 3 - Premium",
        badge_id: "All-in-One",
        badge_en: "All-in-One",
        price_id: "Rp 499.000",
        price_en: "Rp 499,000",
        description_id:
          "Terima beres: domain, hosting, fitur premium, SEO, analytics, dan garansi paling panjang.",
        description_en:
          "Done-for-you: domain, hosting, premium features, SEO, analytics, and the longest warranty.",
        features_id: [
          "Multi-page eksklusif maksimal 10 halaman",
          "FREE custom domain .com/.id selama 1 tahun",
          "FREE high-speed hosting selama 1 tahun",
          "Google Form, animasi interaktif, & copywriting dasar",
          "Google Analytics untuk pantau pengunjung",
          "Ultra high performance Google PageSpeed",
          "Revisi maksimal 7x",
          "Garansi 1 tahun penuh",
        ],
        features_en: [
          "Exclusive multi-page site up to 10 pages",
          "FREE .com/.id custom domain for 1 year",
          "FREE high-speed hosting for 1 year",
          "Google Form, interactive animation, & basic copywriting",
          "Google Analytics to monitor visitors",
          "Ultra high Google PageSpeed performance",
          "Up to 7 revisions",
          "1 full year warranty",
        ],
        featured: false,
        homepage: true,
      },
    },
    {
      id: "custom-exclusive",
      sort_order: 70,
      data: {
        group: "custom",
        name_id: "Website Custom Eksklusif",
        name_en: "Exclusive Custom Website",
        badge_id: "Advanced",
        badge_en: "Advanced",
        price_id: "Mulai Rp 2.999.000",
        price_en: "From Rp 2,999,000",
        description_id:
          "Untuk marketplace, payment gateway, toko online kompleks, ERP, CRM, dan dashboard.",
        description_en:
          "For marketplaces, payment gateways, complex online stores, ERP, CRM, and dashboards.",
        features_id: [
          "UI/UX premium & eksklusif",
          "Integrasi pembayaran dan cek ongkir",
          "Dashboard manajemen lengkap",
          "Maintenance prioritas",
        ],
        features_en: [
          "Premium and exclusive UI/UX",
          "Payment and shipping integrations",
          "Complete management dashboard",
          "Priority maintenance",
        ],
        featured: false,
        homepage: true,
      },
    },
  ],
  projects: [
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
  ],
  faq: [
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
  ],
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
      group: ["personal", "business", "custom"].includes(data.group)
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
  const defaults = CMS_DEFAULTS[type] || [];
  await Promise.all(
    defaults.map(
      (item) => sql`
    INSERT INTO cms_resources (id, resource_type, sort_order, data, is_published)
    VALUES (${item.id}, ${type}, ${item.sort_order}, ${JSON.stringify(item.data)}, TRUE)
    ON CONFLICT (id) DO NOTHING
  `,
    ),
  );
}
