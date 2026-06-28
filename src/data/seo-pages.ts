export type ServicePage = {
  slug: string;
  eyebrow: string;
  title: string;
  description: string;
  keywords: string[];
  heroPoints: string[];
  audience: string;
  outcomes: string[];
  features: string[];
  faqs: Array<{ question: string; answer: string }>;
};

export type PortfolioPage = {
  slug: string;
  title: string;
  description: string;
  image: string;
  url: string;
  keywords: string[];
  highlights: string[];
  sections: Array<{ title: string; body: string }>;
};

export const siteUrl = "https://solivatestudio.com";

export const servicePages: ServicePage[] = [
  {
    slug: "jasa-pembuatan-website",
    eyebrow: "Jasa Pembuatan Website",
    title: "Jasa pembuatan website modern untuk bisnis, komunitas, dan event.",
    description:
      "Solivate Studio menyediakan jasa pembuatan website custom, landing page, company profile, website UMKM, website komunitas, event, dan sistem digital yang mudah digunakan.",
    keywords: ["jasa pembuatan website", "jasa website", "jasa web development", "digital solution provider", "jasa website custom"],
    heroPoints: ["Website responsif dan mobile friendly", "Struktur SEO dasar sejak awal", "Desain custom sesuai kebutuhan"],
    audience: "Cocok untuk pemilik UMKM, pengurus komunitas, penyelenggara event, brand personal, dan perusahaan yang ingin tampil lebih kredibel secara digital.",
    outcomes: ["Kehadiran digital lebih profesional", "Informasi layanan lebih mudah ditemukan", "Alur kontak, katalog, atau registrasi lebih rapi"],
    features: ["Landing page", "Company profile", "Integrasi WhatsApp", "Form kontak", "Optimasi performa", "Setup domain dan hosting"],
    faqs: [
      { question: "Berapa harga jasa pembuatan website?", answer: "Harga dimulai dari Rp 49.000 untuk website sederhana dan tersedia paket bisnis mulai Rp 249.000." },
      { question: "Apakah bisa custom sesuai kebutuhan?", answer: "Bisa. Scope halaman, fitur, visual, dan integrasi disesuaikan dengan kebutuhan proyek." }
    ]
  },
  {
    slug: "website-umkm",
    eyebrow: "Website UMKM",
    title: "Jasa pembuatan website UMKM untuk usaha kecil yang ingin naik kelas.",
    description:
      "Website UMKM untuk profil bisnis, katalog produk online, landing page promosi, dan digitalisasi usaha kecil agar lebih mudah dipercaya pelanggan.",
    keywords: ["jasa pembuatan website UMKM", "jasa website UMKM", "website profil bisnis murah", "jasa katalog produk online", "digitalisasi usaha kecil"],
    heroPoints: ["Profil bisnis dan katalog produk", "Tombol WhatsApp siap closing", "Copywriting dasar untuk promosi"],
    audience: "Untuk UMKM yang masih mengandalkan chat manual, media sosial, atau marketplace dan ingin punya rumah digital sendiri.",
    outcomes: ["Bisnis terlihat lebih terpercaya", "Produk dan layanan tersusun rapi", "Calon pelanggan lebih cepat menghubungi"],
    features: ["Halaman home", "Tentang bisnis", "Katalog produk", "Galeri", "Kontak WhatsApp", "SEO dasar"],
    faqs: [
      { question: "Apakah website UMKM bisa murah tapi tetap bagus?", answer: "Bisa. Kami menjaga scope tetap praktis agar biaya masuk akal tanpa mengorbankan tampilan utama dan mobile experience." },
      { question: "Apakah cocok untuk usaha baru?", answer: "Cocok, terutama untuk usaha yang ingin mulai terlihat profesional di Google dan saat membagikan link ke pelanggan." }
    ]
  },
  {
    slug: "website-company-profile",
    eyebrow: "Website Company Profile",
    title: "Website company profile untuk brand yang ingin tampil profesional.",
    description:
      "Pembuatan website company profile untuk perusahaan, sekolah, brand parfum, organisasi, dan bisnis jasa yang butuh profil online rapi dan SEO friendly.",
    keywords: ["website company profile", "jasa website company profile", "pembuatan website perusahaan murah", "pembuatan website company profile parfum"],
    heroPoints: ["Struktur profil perusahaan", "Section layanan dan portofolio", "Optimasi trust dan kredibilitas"],
    audience: "Untuk bisnis dan organisasi yang butuh halaman resmi agar mudah dikirim ke calon klien, partner, investor, atau pelanggan.",
    outcomes: ["Brand lebih kredibel", "Informasi perusahaan mudah dipahami", "Kontak bisnis lebih jelas"],
    features: ["Profil perusahaan", "Layanan", "Portofolio", "Tim", "Kontak", "SEO title dan meta description"],
    faqs: [
      { question: "Apa bedanya landing page dan company profile?", answer: "Landing page biasanya fokus satu penawaran, sedangkan company profile menjelaskan brand, layanan, legalitas, portofolio, dan kontak secara lebih lengkap." },
      { question: "Apakah bisa dibuat multi-page?", answer: "Bisa, terutama jika layanan, galeri, atau portofolio perlu halaman terpisah." }
    ]
  },
  {
    slug: "website-masjid-komunitas",
    eyebrow: "Website Masjid & Komunitas",
    title: "Jasa pembuatan website masjid dan komunitas sosial yang transparan.",
    description:
      "Website masjid, komunitas sosial, dan platform transparansi kas masjid untuk jadwal kajian, kegiatan, infak, donasi, dan informasi jamaah.",
    keywords: ["jasa pembuatan website masjid", "jasa website masjid", "website kas masjid", "platform transparansi kas masjid", "digitalisasi komunitas sosial"],
    heroPoints: ["Jadwal kajian dan kegiatan", "Transparansi kas dan infak", "Informasi donasi dan jamaah"],
    audience: "Untuk masjid, komunitas dakwah, komunitas sosial, dan pengurus yang ingin informasi lebih mudah diakses jamaah.",
    outcomes: ["Informasi kegiatan lebih terpusat", "Transparansi donasi lebih dipercaya", "Jamaah lebih mudah mengikuti update"],
    features: ["Jadwal kegiatan", "Kas dan infak", "Donasi QRIS", "Galeri kegiatan", "Kontak pengurus", "Pengumuman"],
    faqs: [
      { question: "Apakah bisa menampilkan transparansi infak?", answer: "Bisa. Struktur halaman dapat menampilkan ringkasan kas, laporan, dan informasi donasi sesuai kebutuhan pengurus." },
      { question: "Apakah bisa untuk komunitas selain masjid?", answer: "Bisa. Template struktur ini juga cocok untuk komunitas sosial, yayasan, dan organisasi masyarakat." }
    ]
  },
  {
    slug: "website-yayasan-panti-asuhan",
    eyebrow: "Website Yayasan & Panti Asuhan",
    title: "Website yayasan dan panti asuhan untuk donasi, kegiatan, dan transparansi.",
    description:
      "Jasa pembuatan website panti asuhan dan yayasan untuk publikasi kegiatan, profil lembaga, platform donasi online, dan transparansi program sosial.",
    keywords: ["website panti asuhan", "jasa pembuatan website panti asuhan", "digitalisasi yayasan", "platform donasi online panti asuhan", "website donasi online"],
    heroPoints: ["Profil lembaga dan program", "Publikasi kegiatan", "Informasi donasi online"],
    audience: "Untuk yayasan, panti asuhan, lembaga sosial, dan komunitas yang ingin membangun kepercayaan publik secara digital.",
    outcomes: ["Donatur lebih mudah memahami program", "Kegiatan terdokumentasi rapi", "Informasi donasi lebih jelas"],
    features: ["Profil yayasan", "Program sosial", "Donasi", "Galeri", "Berita kegiatan", "Kontak"],
    faqs: [
      { question: "Apakah bisa menampilkan laporan kegiatan?", answer: "Bisa. Website dapat disusun agar dokumentasi kegiatan dan update program mudah dibaca calon donatur." },
      { question: "Apakah bisa pakai tombol WhatsApp donasi?", answer: "Bisa, tombol WhatsApp dapat diarahkan ke admin dengan template pesan otomatis." }
    ]
  },
  {
    slug: "website-event-konser",
    eyebrow: "Website Event & Konser",
    title: "Website event dan konser untuk informasi, registrasi, dan promosi acara.",
    description:
      "Platform registrasi online event, website konser, landing page acara, dan pusat informasi event agar peserta mudah daftar dan memahami detail acara.",
    keywords: ["website registrasi event online", "platform manajemen event", "jasa pembuatan website konser", "jasa website event", "website event"],
    heroPoints: ["Landing page acara", "Registrasi online", "Informasi jadwal dan venue"],
    audience: "Untuk event organizer, komunitas, sekolah, kampus, brand, dan penyelenggara konser atau seminar.",
    outcomes: ["Informasi event lebih rapi", "Registrasi peserta lebih mudah", "Promosi acara lebih kredibel"],
    features: ["Hero event", "Jadwal", "Venue", "Form registrasi", "Lineup", "FAQ", "CTA tiket"],
    faqs: [
      { question: "Apakah bisa untuk konser?", answer: "Bisa. Website dapat memuat lineup, jadwal, venue, sponsor, dan CTA pembelian tiket." },
      { question: "Apakah bisa integrasi Google Form?", answer: "Bisa, Google Form atau form custom dapat dipasang sesuai kebutuhan event." }
    ]
  },
  {
    slug: "undangan-digital",
    eyebrow: "Undangan Digital",
    title: "Website wedding invitation dan undangan digital custom yang personal.",
    description:
      "Jasa pembuatan undangan digital pernikahan, birthday website, ucapan ulang tahun interaktif, RSVP online, dan invitation website custom.",
    keywords: ["jasa undangan pernikahan online", "website wedding invitation digital", "jasa pembuatan undangan digital pernikahan", "undangan ulang tahun online interaktif", "website birthday"],
    heroPoints: ["Wedding invitation", "Birthday website", "RSVP dan custom name"],
    audience: "Untuk pasangan, keluarga, teman, dan penyelenggara acara personal yang ingin undangan terasa modern dan berkesan.",
    outcomes: ["Undangan lebih mudah dibagikan", "Momen terasa lebih personal", "Tamu mendapat informasi lengkap"],
    features: ["Custom name", "Galeri foto", "Video", "Countdown", "Maps", "RSVP", "Ucapan"],
    faqs: [
      { question: "Apakah bisa pakai nama tamu custom?", answer: "Bisa. Undangan dapat dibuat dengan parameter nama tamu agar lebih personal." },
      { question: "Apakah bisa untuk ulang tahun?", answer: "Bisa. Birthday website dapat berisi ucapan, foto, video, dan visual interaktif." }
    ]
  },
  {
    slug: "website-barbershop",
    eyebrow: "Website Barbershop",
    title: "Website barbershop dengan sistem booking online yang praktis.",
    description:
      "Jasa pembuatan website barbershop, sistem booking online barbershop, katalog layanan, jadwal barber, dan halaman promosi untuk bisnis pangkas rambut.",
    keywords: ["jasa pembuatan website barbershop", "sistem booking online barbershop", "website barbershop", "jasa booking online"],
    heroPoints: ["Booking online", "Katalog layanan", "Jadwal barber dan antrean"],
    audience: "Untuk barbershop yang ingin mengurangi antrean manual dan membuat pelanggan lebih mudah memilih layanan.",
    outcomes: ["Booking lebih tertata", "Layanan terlihat profesional", "Pelanggan bisa kontak lebih cepat"],
    features: ["Daftar layanan", "Harga", "Booking", "Galeri haircut", "Profil barber", "WhatsApp template"],
    faqs: [
      { question: "Apakah bisa pakai sistem antrean?", answer: "Bisa, sistem antrean atau booking dapat dibuat sesuai alur operasional barbershop." },
      { question: "Apakah bisa mulai dari landing page dulu?", answer: "Bisa. Untuk tahap awal bisa mulai dari landing page promosi dan tombol booking WhatsApp." }
    ]
  },
  {
    slug: "website-rental-mobil",
    eyebrow: "Website Rental Mobil",
    title: "Website rental mobil untuk katalog armada dan reservasi kendaraan.",
    description:
      "Jasa pembuatan website rental mobil, aplikasi reservasi rental mobil, katalog armada, detail harga, dan sistem pemesanan kendaraan.",
    keywords: ["jasa pembuatan website rental mobil", "aplikasi reservasi rental mobil", "website rental mobil", "sistem reservasi online"],
    heroPoints: ["Katalog armada", "Reservasi kendaraan", "Detail harga dan fasilitas"],
    audience: "Untuk bisnis rental mobil yang ingin armada terlihat rapi dan pelanggan bisa cek informasi sebelum menghubungi admin.",
    outcomes: ["Armada lebih mudah dibandingkan", "Reservasi lebih terarah", "Bisnis terlihat lebih profesional"],
    features: ["Daftar armada", "Detail mobil", "Harga rental", "Form reservasi", "Syarat sewa", "WhatsApp admin"],
    faqs: [
      { question: "Apakah bisa menampilkan katalog mobil?", answer: "Bisa. Setiap armada dapat punya foto, spesifikasi, harga, dan CTA reservasi." },
      { question: "Apakah bisa integrasi pembayaran?", answer: "Bisa untuk scope custom, termasuk integrasi payment gateway sesuai kebutuhan." }
    ]
  }
];

export const portfolioPages: PortfolioPage[] = [
  {
    slug: "masjid-raya-puri-telukjambe",
    title: "Website Masjid Raya Puri Telukjambe",
    description:
      "Studi kasus website Masjid Raya Puri Telukjambe: digitalisasi informasi masjid, jadwal kajian, transparansi kas, donasi QRIS, dan booking aula.",
    image: "/images/masjidrayapuritelukjambe.webp",
    url: "https://www.masjidrayapuritelukjambe.com/",
    keywords: ["website Masjid Raya Puri Telukjambe", "jasa website masjid", "website kas masjid", "transparansi infak masjid", "digitalisasi masjid"],
    highlights: ["Jadwal kajian dan kegiatan", "Transparansi kas dan infak", "Donasi QRIS", "Informasi booking aula"],
    sections: [
      {
        title: "Tantangan",
        body: "Masjid membutuhkan pusat informasi digital yang dapat menampung jadwal kegiatan, informasi donasi, dokumentasi jamaah, dan fasilitas aula tanpa membuat pengunjung bingung."
      },
      {
        title: "Solusi",
        body: "Solivate Studio merancang website dengan struktur informasi yang jelas: hero informatif, jadwal kajian, jadwal imam dan khatib, aula serbaguna, donasi QRIS, dan galeri kegiatan."
      },
      {
        title: "Dampak",
        body: "Website membantu jamaah mengakses informasi masjid secara lebih cepat, meningkatkan transparansi, dan memberi kanal digital yang lebih rapi untuk pengurus masjid."
      }
    ]
  }
];

export const allSeoUrls = [
  "",
  "pricing",
  ...servicePages.map((page) => `layanan/${page.slug}`),
  ...portfolioPages.map((page) => `portfolio/${page.slug}`)
];
