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
  width?: number;
  height?: number;
  url: string;
  keywords: string[];
  highlights: string[];
  sections: Array<{ title: string; body: string }>;
};

export type ServicePageTranslation = Omit<ServicePage, "slug" | "keywords">;
export type PortfolioPageTranslation = Omit<
  PortfolioPage,
  "slug" | "image" | "url" | "keywords"
>;

export const siteUrl = "https://solivate.com";

export const servicePages: ServicePage[] = [
  {
    slug: "website-development",
    eyebrow: "Jasa Pembuatan Website",
    title: "Jasa Pembuatan Website Custom & Landing Page Professional",
    description:
      "Solivate Studio menyediakan jasa pembuatan website Solivate Studio, landing page custom, company profile, website UMKM, website komunitas, event, dan sistem digital yang mudah digunakan.",
    keywords: [
      "jasa pembuatan website",
      "jasa website",
      "jasa web development",
      "digital solution provider",
      "jasa website custom",
      "jasa pembuatan website Solivate Studio",
      "digital solution agency Indonesia",
      "jasa digitalisasi UMKM",
      "software house Indonesia",
    ],
    heroPoints: [
      "Website responsif dan mobile friendly",
      "Struktur SEO dasar sejak awal",
      "Desain custom sesuai kebutuhan",
    ],
    audience:
      "Cocok untuk pemilik UMKM, pengurus komunitas, penyelenggara event, brand personal, dan perusahaan yang ingin tampil lebih kredibel secara digital.",
    outcomes: [
      "Kehadiran digital lebih profesional",
      "Informasi layanan lebih mudah ditemukan",
      "Alur kontak, katalog, atau registrasi lebih rapi",
    ],
    features: [
      "Landing page",
      "Company profile",
      "Integrasi WhatsApp",
      "Form kontak",
      "Optimasi performa",
      "Setup domain dan hosting",
    ],
    faqs: [
      {
        question: "Berapa harga jasa pembuatan website?",
        answer:
          "Harga dimulai dari Rp 49.000 untuk website sederhana dan tersedia paket bisnis mulai Rp 249.000.",
      },
      {
        question: "Apakah bisa custom sesuai kebutuhan?",
        answer:
          "Bisa. Scope halaman, fitur, visual, dan integrasi disesuaikan dengan kebutuhan proyek.",
      },
    ],
  },
  {
    slug: "sme-website",
    eyebrow: "Website UMKM",
    title: "Jasa Pembuatan Website UMKM Murah & Digitalisasi Usaha Kecil",
    description:
      "Website UMKM untuk profil bisnis, katalog produk online, landing page promosi, dan digitalisasi usaha kecil agar lebih mudah dipercaya pelanggan.",
    keywords: [
      "jasa pembuatan website UMKM",
      "jasa website UMKM",
      "website profil bisnis murah",
      "jasa katalog produk online",
      "digitalisasi usaha kecil",
      "digitalisasi UMKM",
      "website untuk UMKM",
      "berapa biaya bikin website",
    ],
    heroPoints: [
      "Profil bisnis dan katalog produk",
      "Tombol WhatsApp siap closing",
      "Copywriting dasar untuk promosi",
    ],
    audience:
      "Untuk UMKM yang masih mengandalkan chat manual, media sosial, atau marketplace dan ingin punya rumah digital sendiri.",
    outcomes: [
      "Bisnis terlihat lebih terpercaya",
      "Produk dan layanan tersusun rapi",
      "Calon pelanggan lebih cepat menghubungi",
    ],
    features: [
      "Halaman home",
      "Tentang bisnis",
      "Katalog produk",
      "Galeri",
      "Kontak WhatsApp",
      "SEO dasar",
    ],
    faqs: [
      {
        question: "Apakah website UMKM bisa murah tapi tetap bagus?",
        answer:
          "Bisa. Kami menjaga scope tetap praktis agar biaya masuk akal tanpa mengorbankan tampilan utama dan mobile experience.",
      },
      {
        question: "Apakah cocok untuk usaha baru?",
        answer:
          "Cocok, terutama untuk usaha yang ingin mulai terlihat profesional di Google dan saat membagikan link ke pelanggan.",
      },
    ],
  },
  {
    slug: "company-profile-website",
    eyebrow: "Website Company Profile",
    title: "Website Company Profile Perusahaan & Landing Page Produk",
    description:
      "Pembuatan website company profile untuk perusahaan, sekolah, brand parfum, organisasi, dan bisnis jasa yang butuh profil online rapi dan SEO friendly.",
    keywords: [
      "website company profile",
      "jasa website company profile",
      "pembuatan website perusahaan murah",
      "pembuatan website company profile parfum",
      "jasa pembuatan landing page produk parfum",
      "cara membuat company profile online",
    ],
    heroPoints: [
      "Struktur profil perusahaan",
      "Section layanan dan portofolio",
      "Optimasi trust dan kredibilitas",
    ],
    audience:
      "Untuk bisnis dan organisasi yang butuh halaman resmi agar mudah dikirim ke calon klien, partner, investor, atau pelanggan.",
    outcomes: [
      "Brand lebih kredibel",
      "Informasi perusahaan mudah dipahami",
      "Kontak bisnis lebih jelas",
    ],
    features: [
      "Profil perusahaan",
      "Layanan",
      "Portofolio",
      "Tim",
      "Kontak",
      "SEO title dan meta description",
    ],
    faqs: [
      {
        question: "Apa bedanya landing page dan company profile?",
        answer:
          "Landing page biasanya fokus satu penawaran, sedangkan company profile menjelaskan brand, layanan, legalitas, portofolio, dan kontak secara lebih lengkap.",
      },
      {
        question: "Apakah bisa dibuat multi-page?",
        answer:
          "Bisa, terutama jika layanan, galeri, atau portofolio perlu halaman terpisah.",
      },
    ],
  },
  {
    slug: "mosque-community-website",
    eyebrow: "Website Masjid & Komunitas",
    title: "Jasa Pembuatan Website Masjid & Platform Transparansi Kas",
    description:
      "Website masjid, komunitas sosial, dan platform transparansi kas masjid untuk jadwal kajian, kegiatan, infak, donasi, dan informasi jamaah.",
    keywords: [
      "jasa pembuatan website masjid",
      "jasa website masjid",
      "website kas masjid",
      "platform transparansi kas masjid",
      "digitalisasi komunitas sosial",
      "jasa website masjid transparansi infak",
      "website masjid modern",
    ],
    heroPoints: [
      "Jadwal kajian dan kegiatan",
      "Transparansi kas dan infak",
      "Informasi donasi dan jamaah",
    ],
    audience:
      "Untuk masjid, komunitas dakwah, komunitas sosial, dan pengurus yang ingin informasi lebih mudah diakses jamaah.",
    outcomes: [
      "Informasi kegiatan lebih terpusat",
      "Transparansi donasi lebih dipercaya",
      "Jamaah lebih mudah mengikuti update",
    ],
    features: [
      "Jadwal kegiatan",
      "Kas dan infak",
      "Donasi QRIS",
      "Galeri kegiatan",
      "Kontak pengurus",
      "Pengumuman",
    ],
    faqs: [
      {
        question: "Apakah bisa menampilkan transparansi infak?",
        answer:
          "Bisa. Struktur halaman dapat menampilkan ringkasan kas, laporan, dan informasi donasi sesuai kebutuhan pengurus.",
      },
      {
        question: "Apakah bisa untuk komunitas selain masjid?",
        answer:
          "Bisa. Template struktur ini juga cocok untuk komunitas sosial, yayasan, dan organisasi masyarakat.",
      },
    ],
  },
  {
    slug: "foundation-orphanage-website",
    eyebrow: "Website Yayasan & Panti Asuhan",
    title: "Jasa Pembuatan Website Panti Asuhan & Yayasan Donasi Online",
    description:
      "Jasa pembuatan website panti asuhan dan yayasan untuk publikasi kegiatan, profil lembaga, platform donasi online, dan transparansi program sosial.",
    keywords: [
      "website panti asuhan",
      "jasa pembuatan website panti asuhan",
      "digitalisasi yayasan",
      "platform donasi online panti asuhan",
      "website donasi online",
      "jasa website panti asuhan",
      "jasa website yayasan",
    ],
    heroPoints: [
      "Profil lembaga and program",
      "Publikasi kegiatan",
      "Informasi donasi online",
    ],
    audience:
      "Untuk yayasan, panti asuhan, lembaga sosial, dan komunitas yang ingin membangun kepercayaan publik secara digital.",
    outcomes: [
      "Donatur lebih mudah memahami program",
      "Kegiatan terdokumentasi rapi",
      "Informasi donasi lebih jelas",
    ],
    features: [
      "Profil yayasan",
      "Program sosial",
      "Donasi",
      "Galeri",
      "Berita kegiatan",
      "Kontak",
    ],
    faqs: [
      {
        question: "Apakah bisa menampilkan laporan kegiatan?",
        answer:
          "Bisa. Website dapat disusun agar dokumentasi kegiatan dan update program mudah dibaca calon donatur.",
      },
      {
        question: "Apakah bisa pakai tombol WhatsApp donasi?",
        answer:
          "Bisa, tombol WhatsApp dapat diarahkan ke admin dengan template pesan otomatis.",
      },
    ],
  },
  {
    slug: "event-concert-website",
    eyebrow: "Website Event & Konser",
    title: "Website Registrasi Event Online & Platform Manajemen Konser",
    description:
      "Platform registrasi online event, website konser, landing page acara, dan pusat informasi event agar peserta mudah daftar dan memahami detail acara.",
    keywords: [
      "website registrasi event online",
      "platform manajemen event",
      "jasa pembuatan website konser",
      "jasa website event",
      "website event",
      "jasa pembuatan website konser",
      "platform registrasi online event",
    ],
    heroPoints: [
      "Landing page acara",
      "Registrasi online",
      "Informasi jadwal dan venue",
    ],
    audience:
      "Untuk event organizer, komunitas, sekolah, kampus, brand, dan penyelenggara konser atau seminar.",
    outcomes: [
      "Informasi event lebih rapi",
      "Registrasi peserta lebih mudah",
      "Promosi acara lebih kredibel",
    ],
    features: [
      "Hero event",
      "Jadwal",
      "Venue",
      "Form registrasi",
      "Lineup",
      "FAQ",
      "CTA tiket",
    ],
    faqs: [
      {
        question: "Apakah bisa untuk konser?",
        answer:
          "Bisa. Website dapat memuat lineup, jadwal, venue, sponsor, dan CTA pembelian tiket.",
      },
      {
        question: "Apakah bisa integrasi Google Form?",
        answer:
          "Bisa, Google Form atau form custom dapat dipasang sesuai kebutuhan event.",
      },
    ],
  },
  {
    slug: "digital-invitation",
    eyebrow: "Undangan Digital",
    title: "Jasa Undangan Pernikahan Online & Wedding Invitation Digital",
    description:
      "Jasa pembuatan undangan digital pernikahan, birthday website, ucapan ulang tahun website personal, RSVP online, dan invitation website custom.",
    keywords: [
      "jasa undangan pernikahan online",
      "website wedding invitation digital",
      "jasa pembuatan undangan digital pernikahan",
      "undangan ulang tahun online interaktif",
      "website birthday",
      "jasa buat website undangan nikah custom murah",
      "contoh website ucapan ulang tahun kreatif",
      "ucapan ulang tahun website personal",
      "undangan ulang tahun online",
    ],
    heroPoints: [
      "Wedding invitation",
      "Birthday website",
      "RSVP dan custom name",
    ],
    audience:
      "Untuk pasangan, keluarga, teman, dan penyelenggara acara personal yang ingin undangan terasa modern dan berkesan.",
    outcomes: [
      "Undangan lebih mudah dibagikan",
      "Momen terasa lebih personal",
      "Tamu mendapat informasi lengkap",
    ],
    features: [
      "Custom name",
      "Galeri foto",
      "Video",
      "Countdown",
      "Maps",
      "RSVP",
      "Ucapan",
    ],
    faqs: [
      {
        question: "Apakah bisa pakai nama tamu custom?",
        answer:
          "Bisa. Undangan dapat dibuat dengan parameter nama tamu agar lebih personal.",
      },
      {
        question: "Apakah bisa untuk ulang tahun?",
        answer:
          "Bisa. Birthday website dapat berisi ucapan, foto, video, dan visual interaktif.",
      },
    ],
  },
  {
    slug: "barbershop-website",
    eyebrow: "Website Barbershop",
    title: "Jasa Pembuatan Website Barbershop & Booking Online",
    description:
      "Jasa pembuatan website barbershop, sistem booking online barbershop, katalog layanan, jadwal barber, dan halaman promosi untuk bisnis pangkas rambut.",
    keywords: [
      "jasa pembuatan website barbershop",
      "sistem booking online barbershop",
      "website barbershop",
      "jasa booking online",
      "booking online untuk barbershop",
    ],
    heroPoints: [
      "Booking online",
      "Katalog layanan",
      "Jadwal barber dan antrean",
    ],
    audience:
      "Untuk barbershop yang ingin mengurangi antrean manual dan membuat pelanggan lebih mudah memilih layanan.",
    outcomes: [
      "Booking lebih tertata",
      "Layanan terlihat profesional",
      "Pelanggan bisa kontak lebih cepat",
    ],
    features: [
      "Daftar layanan",
      "Harga",
      "Booking",
      "Galeri haircut",
      "Profil barber",
      "WhatsApp template",
    ],
    faqs: [
      {
        question: "Apakah bisa pakai sistem antrean?",
        answer:
          "Bisa, sistem antrean atau booking dapat dibuat sesuai alur operasional barbershop.",
      },
      {
        question: "Apakah bisa mulai dari landing page dulu?",
        answer:
          "Bisa. Untuk tahap awal bisa mulai dari landing page promosi dan tombol booking WhatsApp.",
      },
    ],
  },
  {
    slug: "car-rental-website",
    eyebrow: "Website Rental Mobil",
    title: "Jasa Pembuatan Website Rental Mobil & Reservasi Online",
    description:
      "Jasa pembuatan website rental mobil, aplikasi reservasi rental mobil, katalog armada, detail harga, dan sistem pemesanan kendaraan.",
    keywords: [
      "jasa pembuatan website rental mobil",
      "aplikasi reservasi rental mobil",
      "website rental mobil",
      "sistem reservasi online",
      "aplikasi sewa mobil",
    ],
    heroPoints: [
      "Katalog armada",
      "Reservasi kendaraan",
      "Detail harga dan fasilitas",
    ],
    audience:
      "Untuk bisnis rental mobil yang ingin armada terlihat rapi dan pelanggan bisa cek informasi sebelum menghubungi admin.",
    outcomes: [
      "Armada lebih mudah dibandingkan",
      "Reservasi lebih terarah",
      "Bisnis terlihat lebih profesional",
    ],
    features: [
      "Daftar armada",
      "Detail mobil",
      "Harga rental",
      "Form reservasi",
      "Syarat sewa",
      "WhatsApp admin",
    ],
    faqs: [
      {
        question: "Apakah bisa menampilkan katalog mobil?",
        answer:
          "Bisa. Setiap armada dapat punya foto, spesifikasi, harga, dan CTA reservasi.",
      },
      {
        question: "Apakah bisa integrasi pembayaran?",
        answer:
          "Bisa untuk scope custom, termasuk integrasi payment gateway sesuai kebutuhan.",
      },
    ],
  },
];

export const portfolioPages: PortfolioPage[] = [
  {
    slug: "masjid-raya-puri-telukjambe",
    title: "Website Masjid Raya Puri Telukjambe",
    description:
      "Studi kasus website Masjid Raya Puri Telukjambe: digitalisasi informasi masjid, jadwal kajian, transparansi kas, donasi QRIS, dan booking aula.",
    image: "/images/masjidrayapuritelukjambe.webp",
    width: 1440,
    height: 825,
    url: "https://www.masjidrayapuritelukjambe.com/",
    keywords: [
      "website Masjid Raya Puri Telukjambe",
      "jasa website masjid",
      "website kas masjid",
      "transparansi infak masjid",
      "digitalisasi masjid",
    ],
    highlights: [
      "Jadwal kajian dan kegiatan",
      "Transparansi kas dan infak",
      "Donasi QRIS",
      "Informasi booking aula",
    ],
    sections: [
      {
        title: "Tantangan",
        body: "Masjid membutuhkan pusat informasi digital yang dapat menampung jadwal kegiatan, informasi donasi, dokumentasi jamaah, dan fasilitas aula tanpa membuat pengunjung bingung.",
      },
      {
        title: "Solusi",
        body: "Solivate Studio merancang website dengan struktur informasi yang jelas: hero informatif, jadwal kajian, jadwal imam dan khatib, aula serbaguna, donasi QRIS, dan galeri kegiatan.",
      },
      {
        title: "Dampak",
        body: "Website membantu jamaah mengakses informasi masjid secara lebih cepat, meningkatkan transparansi, dan memberi kanal digital yang lebih rapi untuk pengurus masjid.",
      },
    ],
  },
  {
    slug: "cutbae-barbershop",
    title: "Website Cutbae Barbershop",
    description:
      "Showcase website Cutbae Barbershop: landing page modern untuk layanan grooming, paket haircut, lokasi, dan jalur booking pelanggan.",
    image: "/images/cutbae-barbershop.webp",
    width: 1440,
    height: 1000,
    url: "https://cutbaebarbershop.vercel.app/",
    keywords: [
      "website Cutbae Barbershop",
      "jasa pembuatan website barbershop",
      "sistem booking online barbershop",
      "website barbershop",
      "jasa booking online",
    ],
    highlights: [
      "Landing page barbershop",
      "Layanan dan paket grooming",
      "CTA booking WhatsApp",
      "Tampilan mobile-first",
    ],
    sections: [
      {
        title: "Tantangan",
        body: "Bisnis barbershop membutuhkan halaman yang langsung menjelaskan layanan, membangun rasa percaya, dan memudahkan calon pelanggan masuk ke alur booking tanpa banyak langkah.",
      },
      {
        title: "Solusi",
        body: "Solivate Studio menyusun landing page yang fokus pada visual layanan, benefit, paket grooming, lokasi, dan tombol booking yang mudah ditemukan dari desktop maupun mobile.",
      },
      {
        title: "Dampak",
        body: "Website membuat brand barbershop terlihat lebih profesional, informasi layanan lebih rapi, dan pelanggan memiliki jalur kontak yang jelas untuk reservasi.",
      },
    ],
  },
  {
    slug: "makdian-bakery",
    title: "Website Makdian Bakery",
    description:
      "Showcase website Makdian Bakery: profil brand bakery, katalog produk, informasi pemesanan, dan tampilan visual yang ramah untuk pelanggan UMKM.",
    image: "/images/makdian-bakery.webp",
    width: 1440,
    height: 1000,
    url: "https://makdianbakery.vercel.app/",
    keywords: [
      "website Makdian Bakery",
      "jasa website UMKM",
      "jasa pembuatan website katalog produk",
      "website bakery",
      "website profil bisnis murah",
    ],
    highlights: [
      "Brand showcase bakery",
      "Katalog produk",
      "CTA pemesanan",
      "Visual responsif untuk pelanggan",
    ],
    sections: [
      {
        title: "Tantangan",
        body: "Brand bakery membutuhkan rumah digital yang dapat menampilkan produk secara menarik, menjaga kesan hangat, dan membuat calon pelanggan cepat memahami cara pemesanan.",
      },
      {
        title: "Solusi",
        body: "Solivate Studio membangun website dengan struktur brand story, katalog produk, visual produk yang dominan, serta CTA pemesanan yang mudah dijangkau.",
      },
      {
        title: "Dampak",
        body: "Website membantu Makdian Bakery tampil lebih kredibel, produk lebih mudah dipresentasikan, dan calon pelanggan bisa masuk ke proses pemesanan dengan lebih praktis.",
      },
    ],
  },
  {
    slug: "hammaddanfulanah",
    title: "Website Undangan Pernikahan Hammad & Fulanah",
    description:
      "Showcase website undangan pernikahan sederhana dengan nama tamu custom, nuansa personal, dan alur akses yang ringan untuk dibagikan ke keluarga dan teman.",
    image: "/images/hammaddanfulanah.png",
    width: 1440,
    height: 880,
    url: "https://hammaddanfulanah.solivate.com/",
    keywords: [
      "website undangan pernikahan simple",
      "undangan nikah nama custom",
      "jasa undangan digital pernikahan",
      "website wedding invitation",
      "undangan digital sederhana",
    ],
    highlights: [
      "Undangan pernikahan simple",
      "Nama tamu custom",
      "Tampilan mobile friendly",
      "Mudah dibagikan via link",
    ],
    sections: [
      {
        title: "Tantangan",
        body: "Undangan digital perlu tetap terasa personal tanpa membuat pengalaman buka link menjadi berat atau rumit untuk tamu dari berbagai perangkat.",
      },
      {
        title: "Solusi",
        body: "Solivate Studio membuat website undangan yang ringan, fokus pada momen utama pasangan, mendukung nama tamu custom, dan tetap enak diakses dari mobile.",
      },
      {
        title: "Dampak",
        body: "Hasilnya adalah undangan digital yang simpel, elegan, mudah dibagikan, dan lebih nyaman dipakai untuk kebutuhan pernikahan skala personal.",
      },
    ],
  },
  {
    slug: "weddingpro",
    title: "Website WeddingPro Invitation & Dashboard",
    description:
      "Showcase website undangan pernikahan dengan barcode dan dashboard, dirancang untuk alur tamu, validasi kehadiran, dan pengelolaan acara yang lebih terstruktur.",
    image: "/images/weddingpro.png",
    width: 1440,
    height: 880,
    url: "https://weddingpro.solivate.com/",
    keywords: [
      "website undangan pernikahan barcode",
      "dashboard undangan digital",
      "wedding invitation dashboard",
      "website RSVP pernikahan",
      "jasa undangan digital premium",
    ],
    highlights: [
      "Undangan digital dengan barcode",
      "Dashboard pengelolaan tamu",
      "Alur RSVP lebih rapi",
      "Event experience lebih modern",
    ],
    sections: [
      {
        title: "Tantangan",
        body: "Kebutuhan undangan digital yang lebih advanced memerlukan pengalaman tamu yang tetap elegan, sekaligus dashboard yang memudahkan pengelolaan data kehadiran.",
      },
      {
        title: "Solusi",
        body: "Solivate Studio menggabungkan landing invitation yang berkesan dengan barcode access dan dashboard internal untuk membantu pemantauan RSVP dan validasi tamu.",
      },
      {
        title: "Dampak",
        body: "Website memberi pengalaman pernikahan yang lebih premium, membantu pengelolaan tamu lebih tertata, dan menambah nilai digital pada keseluruhan acara.",
      },
    ],
  },
  {
    slug: "hbd-matt",
    title: "Website Ucapan Ulang Tahun Matt",
    description:
      "Showcase website ucapan ulang tahun simple dengan hero personal, visual ringan, dan pengalaman yang dibuat untuk memberi kesan spesial secara digital.",
    image: "/images/hbd-matt.png",
    width: 1440,
    height: 880,
    url: "https://hbd-matt.solivate.com/",
    keywords: [
      "website ucapan ulang tahun",
      "birthday website simple",
      "ucapan ulang tahun digital",
      "website birthday personal",
      "jasa website birthday",
    ],
    highlights: [
      "Ucapan ulang tahun personal",
      "Landing page ringan",
      "Hero emosional dan fokus",
      "Cocok untuk hadiah digital",
    ],
    sections: [
      {
        title: "Tantangan",
        body: "Website ucapan ulang tahun harus singkat, personal, dan tetap punya kesan emosional tanpa terlalu banyak elemen yang mengganggu fokus.",
      },
      {
        title: "Solusi",
        body: "Solivate Studio membangun landing birthday yang fokus pada sapaan utama, visual manis, dan alur sederhana agar pesan utamanya langsung terasa.",
      },
      {
        title: "Dampak",
        body: "Website menjadi media ucapan digital yang lebih berkesan, mudah dibagikan, dan cocok dipakai untuk momen personal dengan waktu pengerjaan cepat.",
      },
    ],
  },
  {
    slug: "smk01-school-profile",
    title: "Website Profile Sekolah SMK Solivate 01",
    description:
      "Showcase website profile sekolah dengan landing page dan multi-page, dirancang untuk menampilkan identitas sekolah, program unggulan, dan informasi penting secara lebih modern.",
    image: "/images/smk01.png",
    width: 1440,
    height: 880,
    url: "https://smk01.solivate.com/",
    keywords: [
      "website profile sekolah",
      "website sekolah multi page",
      "jasa pembuatan website sekolah",
      "landing page sekolah",
      "school profile website",
    ],
    highlights: [
      "Landing page sekolah modern",
      "Struktur multi-page",
      "Informasi program dan profil",
      "Tampilan lebih profesional",
    ],
    sections: [
      {
        title: "Tantangan",
        body: "Website sekolah perlu menjelaskan identitas, program, dan informasi institusi dengan struktur yang mudah dipahami calon siswa, orang tua, dan publik.",
      },
      {
        title: "Solusi",
        body: "Solivate Studio menyusun website profile sekolah dengan hero kuat, halaman pendukung, dan alur navigasi yang membantu pengunjung menemukan informasi lebih cepat.",
      },
      {
        title: "Dampak",
        body: "Sekolah tampil lebih kredibel secara digital, informasi inti lebih terstruktur, dan pengalaman kunjungan terasa lebih modern dari sisi visual maupun konten.",
      },
    ],
  },
  {
    slug: "smk01-spmb-custom",
    title: "Website SPMB Custom SMK Solivate 01",
    description:
      "Showcase landing page sekolah dengan SPMB custom, difokuskan untuk kebutuhan promosi pendaftaran siswa baru dan jalur konversi yang lebih jelas.",
    image: "/images/smk01.png",
    width: 1440,
    height: 880,
    url: "https://smk01.solivate.com/",
    keywords: [
      "website SPMB custom",
      "landing page pendaftaran sekolah",
      "website PPDB sekolah",
      "jasa website sekolah custom",
      "website admissions sekolah",
    ],
    highlights: [
      "Landing SPMB custom",
      "Fokus akuisisi calon siswa",
      "Alur CTA pendaftaran lebih jelas",
      "Cocok untuk kampanye penerimaan",
    ],
    sections: [
      {
        title: "Tantangan",
        body: "Halaman penerimaan siswa baru harus mampu menjelaskan value sekolah sekaligus mendorong pengunjung masuk ke alur pendaftaran tanpa kebingungan.",
      },
      {
        title: "Solusi",
        body: "Solivate Studio menyiapkan landing SPMB yang lebih fokus pada headline, program unggulan, CTA, dan struktur informasi yang mendukung funnel pendaftaran.",
      },
      {
        title: "Dampak",
        body: "Website membantu sekolah mengemas promosi penerimaan siswa baru dengan lebih rapi, terarah, dan siap dipakai untuk kampanye digital.",
      },
    ],
  },
  {
    slug: "pedulisesama",
    title: "Website Peduli Sesama",
    description:
      "Showcase website profile komunitas sosial dengan data keuangan real time, artikel, galeri, dan dashboard untuk pengelolaan konten serta transparansi informasi.",
    image: "/images/pedulisesama.png",
    width: 1440,
    height: 880,
    url: "https://pedulisesama.solivate.com/",
    keywords: [
      "website komunitas sosial",
      "website data keuangan real time",
      "jasa website yayasan",
      "website artikel dan galeri",
      "dashboard komunitas sosial",
    ],
    highlights: [
      "Profile komunitas sosial",
      "Data keuangan real time",
      "Artikel dan galeri kegiatan",
      "Dashboard pengelolaan",
    ],
    sections: [
      {
        title: "Tantangan",
        body: "Komunitas sosial butuh website yang bisa menjelaskan gerakan mereka sekaligus menjaga transparansi dan publikasi aktivitas secara konsisten.",
      },
      {
        title: "Solusi",
        body: "Solivate Studio membangun website komsos dengan struktur profile, artikel, galeri, data keuangan real time, dan dashboard untuk pengelolaan informasi.",
      },
      {
        title: "Dampak",
        body: "Website memperkuat kepercayaan publik, memudahkan penyampaian aktivitas komunitas, dan memberi kanal transparansi yang lebih terbuka serta profesional.",
      },
    ],
  },
  {
    slug: "cpxindo",
    title: "Website CPX Indo",
    description:
      "Showcase website company profile dengan ecommerce dan dashboard CMS untuk brand apparel, dirancang agar promosi brand dan katalog penjualan berjalan dalam satu ekosistem.",
    image: "/images/cpxindo.png",
    width: 1440,
    height: 880,
    url: "https://cpxindo.id",
    keywords: [
      "website company profile ecommerce",
      "dashboard cms ecommerce",
      "website brand apparel",
      "jasa website company profile custom",
      "website katalog dan penjualan",
    ],
    highlights: [
      "Company profile dan ecommerce",
      "Dashboard CMS",
      "Brand presentation lebih kuat",
      "Katalog penjualan terintegrasi",
    ],
    sections: [
      {
        title: "Tantangan",
        body: "Brand apparel membutuhkan website yang bukan hanya menjelaskan identitas bisnis, tetapi juga mampu mendukung alur katalog dan penjualan secara lebih rapi.",
      },
      {
        title: "Solusi",
        body: "Solivate Studio menggabungkan company profile, ecommerce, dan dashboard CMS agar brand dapat mengelola tampilan, produk, dan konten dari satu sistem.",
      },
      {
        title: "Dampak",
        body: "Website membantu brand tampil lebih serius, memudahkan pengelolaan konten dan katalog, serta memberi fondasi digital yang lebih siap dikembangkan.",
      },
    ],
  },
  {
    slug: "shofifrozen",
    title: "Website Shofi Frozen",
    description:
      "Showcase website ecommerce frozen food dengan payment gateway, dibuat untuk mempermudah eksplorasi produk, pemesanan, dan alur transaksi pelanggan.",
    image: "/images/shofifrozen.png",
    width: 1440,
    height: 880,
    url: "https://shofifrozen.com",
    keywords: [
      "website ecommerce frozen food",
      "website payment gateway",
      "jasa website toko online",
      "website katalog frozen food",
      "ecommerce UMKM",
    ],
    highlights: [
      "Ecommerce frozen food",
      "Integrasi payment gateway",
      "Kategori dan katalog produk",
      "Alur checkout lebih praktis",
    ],
    sections: [
      {
        title: "Tantangan",
        body: "Toko frozen food membutuhkan website yang memudahkan pelanggan melihat kategori produk dan masuk ke proses transaksi tanpa hambatan.",
      },
      {
        title: "Solusi",
        body: "Solivate Studio menyiapkan ecommerce yang fokus pada katalog, kategori, checkout, dan dukungan payment gateway agar pengalaman belanja lebih lancar.",
      },
      {
        title: "Dampak",
        body: "Website membantu bisnis menjual produk dengan tampilan yang lebih terstruktur, meningkatkan kenyamanan pembeli, dan memperkuat kanal penjualan digital.",
      },
    ],
  },
  {
    slug: "spectrasec",
    title: "Website SpectraSec",
    description:
      "Showcase website profile komunitas keamanan siber, dirancang untuk memperjelas positioning, identitas komunitas, dan penyampaian inisiatif secara lebih modern.",
    image: "/images/spectrasec.png",
    width: 1440,
    height: 880,
    url: "https://spectrasec.xyz",
    keywords: [
      "website komunitas cyber security",
      "website profile komunitas",
      "website ethical hacking indonesia",
      "jasa website komunitas teknologi",
      "community profile website",
    ],
    highlights: [
      "Profile komunitas cyber security",
      "Positioning brand lebih jelas",
      "Visual modern dan fokus",
      "Cocok untuk komunitas teknologi",
    ],
    sections: [
      {
        title: "Tantangan",
        body: "Komunitas teknologi memerlukan website yang mampu menjelaskan identitas dan arah gerakan mereka secara singkat, jelas, dan tetap relevan secara visual.",
      },
      {
        title: "Solusi",
        body: "Solivate Studio merancang website profile yang menonjolkan positioning komunitas, visual hero yang kuat, dan struktur konten yang ringkas namun informatif.",
      },
      {
        title: "Dampak",
        body: "Website membantu komunitas tampil lebih solid, lebih mudah dikenali, dan memiliki rumah digital yang lebih tepat untuk membangun kredibilitas.",
      },
    ],
  },];

export const servicePageEnglish: Record<string, ServicePageTranslation> = {
  "website-development": {
    eyebrow: "Website Development Service",
    title:
      "Modern website development for businesses, communities, and events.",
    description:
      "Solivate Studio builds custom websites, landing pages, company profiles, SME websites, community platforms, event pages, and easy-to-use digital systems.",
    heroPoints: [
      "Responsive and mobile-friendly websites",
      "SEO structure planned from the start",
      "Custom design based on project needs",
    ],
    audience:
      "Built for SME owners, community teams, event organizers, personal brands, and companies that want stronger digital credibility.",
    outcomes: [
      "A more professional digital presence",
      "Services are easier to find and understand",
      "Contact, catalog, or registration flows become cleaner",
    ],
    features: [
      "Landing page",
      "Company profile",
      "WhatsApp integration",
      "Contact form",
      "Performance optimization",
      "Domain and hosting setup",
    ],
    faqs: [
      {
        question: "How much does a website cost?",
        answer:
          "Pricing starts from Rp 49,000 for simple websites, with business packages from Rp 249,000.",
      },
      {
        question: "Can it be customized to our needs?",
        answer:
          "Yes. Pages, features, visuals, and integrations are adjusted to the project scope.",
      },
    ],
  },
  "sme-website": {
    eyebrow: "SME Website",
    title: "SME website development for small businesses ready to level up.",
    description:
      "SME websites for business profiles, online product catalogs, promotional landing pages, and small business digitalization that builds customer trust.",
    heroPoints: [
      "Business profile and product catalog",
      "WhatsApp button ready for conversion",
      "Basic promotional copywriting",
    ],
    audience:
      "For SMEs still relying on manual chats, social media, or marketplaces and ready to own their digital home.",
    outcomes: [
      "Your business looks more trustworthy",
      "Products and services are organized clearly",
      "Potential customers can contact you faster",
    ],
    features: [
      "Home page",
      "About business",
      "Product catalog",
      "Gallery",
      "WhatsApp contact",
      "Basic SEO",
    ],
    faqs: [
      {
        question: "Can an SME website be affordable but still look good?",
        answer:
          "Yes. We keep the scope practical so the price stays reasonable without sacrificing the main look and mobile experience.",
      },
      {
        question: "Is it suitable for a new business?",
        answer:
          "Yes, especially for businesses that want to look professional on Google and when sharing links with customers.",
      },
    ],
  },
  "company-profile-website": {
    eyebrow: "Company Profile Website",
    title:
      "Company profile websites for brands that want to look professional.",
    description:
      "Company profile websites for companies, schools, perfume brands, organizations, and service businesses that need a clean and SEO-friendly online profile.",
    heroPoints: [
      "Company profile structure",
      "Service and portfolio sections",
      "Trust and credibility optimization",
    ],
    audience:
      "For businesses and organizations that need an official page to send to clients, partners, investors, or customers.",
    outcomes: [
      "The brand feels more credible",
      "Company information is easier to understand",
      "Business contact points are clearer",
    ],
    features: [
      "Company profile",
      "Services",
      "Portfolio",
      "Team",
      "Contact",
      "SEO title and meta description",
    ],
    faqs: [
      {
        question:
          "What is the difference between a landing page and a company profile?",
        answer:
          "A landing page usually focuses on one offer, while a company profile explains the brand, services, legal details, portfolio, and contact more completely.",
      },
      {
        question: "Can it be multi-page?",
        answer:
          "Yes, especially when services, galleries, or portfolios need separate pages.",
      },
    ],
  },
  "mosque-community-website": {
    eyebrow: "Mosque & Community Website",
    title: "Mosque and social community websites built for transparency.",
    description:
      "Mosque websites, social community sites, and mosque cash transparency platforms for study schedules, activities, donations, and congregation information.",
    heroPoints: [
      "Study and activity schedules",
      "Cash and donation transparency",
      "Donation and congregation information",
    ],
    audience:
      "For mosques, religious communities, social communities, and teams that want information to be easier for members to access.",
    outcomes: [
      "Activities are more centralized",
      "Donation transparency builds trust",
      "Members can follow updates more easily",
    ],
    features: [
      "Activity schedule",
      "Cash and donations",
      "QRIS donation",
      "Activity gallery",
      "Admin contact",
      "Announcements",
    ],
    faqs: [
      {
        question: "Can it show donation transparency?",
        answer:
          "Yes. Pages can show cash summaries, reports, and donation information based on the management team's needs.",
      },
      {
        question: "Can it be used for non-mosque communities?",
        answer:
          "Yes. This structure also fits social communities, foundations, and public organizations.",
      },
    ],
  },
  "foundation-orphanage-website": {
    eyebrow: "Foundation & Orphanage Website",
    title:
      "Foundation and orphanage websites for donations, activities, and transparency.",
    description:
      "Foundation and orphanage websites for activity publication, organization profiles, online donation platforms, and social program transparency.",
    heroPoints: [
      "Institution profile and programs",
      "Activity publication",
      "Online donation information",
    ],
    audience:
      "For foundations, orphanages, social institutions, and communities that want to build public trust digitally.",
    outcomes: [
      "Donors understand programs faster",
      "Activities are documented neatly",
      "Donation information is clearer",
    ],
    features: [
      "Foundation profile",
      "Social programs",
      "Donation",
      "Gallery",
      "Activity news",
      "Contact",
    ],
    faqs: [
      {
        question: "Can it show activity reports?",
        answer:
          "Yes. The website can be structured so activity documentation and program updates are easy for donors to read.",
      },
      {
        question: "Can it use a WhatsApp donation button?",
        answer:
          "Yes, WhatsApp buttons can be directed to admins with automatic message templates.",
      },
    ],
  },
  "event-concert-website": {
    eyebrow: "Event & Concert Website",
    title:
      "Event and concert websites for information, registration, and promotion.",
    description:
      "Online event registration platforms, concert websites, event landing pages, and information hubs that help participants register and understand event details.",
    heroPoints: [
      "Event landing page",
      "Online registration",
      "Schedule and venue information",
    ],
    audience:
      "For event organizers, communities, schools, campuses, brands, and concert or seminar organizers.",
    outcomes: [
      "Event information is cleaner",
      "Participant registration is easier",
      "Event promotion feels more credible",
    ],
    features: [
      "Event hero",
      "Schedule",
      "Venue",
      "Registration form",
      "Lineup",
      "FAQ",
      "Ticket CTA",
    ],
    faqs: [
      {
        question: "Can it be used for concerts?",
        answer:
          "Yes. The website can include lineup, schedule, venue, sponsors, and ticket purchase CTAs.",
      },
      {
        question: "Can it integrate Google Forms?",
        answer:
          "Yes, Google Forms or custom forms can be embedded based on event needs.",
      },
    ],
  },
  "digital-invitation": {
    eyebrow: "Digital Invitation",
    title:
      "Custom wedding invitation and digital invitation websites with a personal touch.",
    description:
      "Wedding invitation websites, birthday websites, interactive birthday greetings, RSVP online, and custom invitation websites.",
    heroPoints: [
      "Wedding invitation",
      "Birthday website",
      "RSVP and custom guest name",
    ],
    audience:
      "For couples, families, friends, and personal event organizers who want invitations to feel modern and memorable.",
    outcomes: [
      "Invitations are easier to share",
      "Moments feel more personal",
      "Guests receive complete information",
    ],
    features: [
      "Custom name",
      "Photo gallery",
      "Video",
      "Countdown",
      "Maps",
      "RSVP",
      "Messages",
    ],
    faqs: [
      {
        question: "Can it use custom guest names?",
        answer:
          "Yes. Invitations can use guest-name parameters for a more personal experience.",
      },
      {
        question: "Can it be used for birthdays?",
        answer:
          "Yes. Birthday websites can include greetings, photos, videos, and interactive visuals.",
      },
    ],
  },
  "barbershop-website": {
    eyebrow: "Barbershop Website",
    title: "Barbershop website with a practical online booking system.",
    description:
      "Barbershop website development, online booking systems, service catalogs, barber schedules, and promotional pages for haircut businesses.",
    heroPoints: [
      "Online booking",
      "Service catalog",
      "Barber schedule and queue",
    ],
    audience:
      "For barbershops that want to reduce manual queues and help customers choose services more easily.",
    outcomes: [
      "Booking becomes more organized",
      "Services look more professional",
      "Customers can contact faster",
    ],
    features: [
      "Service list",
      "Pricing",
      "Booking",
      "Haircut gallery",
      "Barber profile",
      "WhatsApp template",
    ],
    faqs: [
      {
        question: "Can it use a queue system?",
        answer:
          "Yes, queue or booking systems can be built around the barbershop's operational flow.",
      },
      {
        question: "Can we start with a landing page first?",
        answer:
          "Yes. Early versions can start with a promotional landing page and WhatsApp booking button.",
      },
    ],
  },
  "car-rental-website": {
    eyebrow: "Car Rental Website",
    title: "Car rental website for fleet catalogs and vehicle reservations.",
    description:
      "Car rental website development, reservation systems, fleet catalogs, pricing details, and vehicle booking flows.",
    heroPoints: [
      "Fleet catalog",
      "Vehicle reservation",
      "Pricing and facility details",
    ],
    audience:
      "For car rental businesses that want fleets to look organized and customers to check information before contacting admins.",
    outcomes: [
      "Vehicles are easier to compare",
      "Reservations become more directed",
      "The business looks more professional",
    ],
    features: [
      "Fleet list",
      "Car details",
      "Rental pricing",
      "Reservation form",
      "Rental terms",
      "WhatsApp admin",
    ],
    faqs: [
      {
        question: "Can it show a car catalog?",
        answer:
          "Yes. Each fleet item can have photos, specifications, pricing, and reservation CTAs.",
      },
      {
        question: "Can it integrate payments?",
        answer:
          "Yes for custom scopes, including payment gateway integration when needed.",
      },
    ],
  },
};

export const portfolioPageEnglish: Record<string, PortfolioPageTranslation> = {
  "masjid-raya-puri-telukjambe": {
    title: "Masjid Raya Puri Telukjambe Website",
    description:
      "Case study for Masjid Raya Puri Telukjambe: mosque information digitalization, study schedules, cash transparency, QRIS donations, and hall booking.",
    highlights: [
      "Study and activity schedules",
      "Cash and donation transparency",
      "QRIS donation",
      "Hall booking information",
    ],
    sections: [
      {
        title: "Challenge",
        body: "The mosque needed a digital information center for activity schedules, donation information, community documentation, and hall facilities without confusing visitors.",
      },
      {
        title: "Solution",
        body: "Solivate Studio designed a clear information structure: informative hero, study schedule, imam and khatib schedule, multipurpose hall, QRIS donation, and activity gallery.",
      },
      {
        title: "Impact",
        body: "The website helps the congregation access mosque information faster, improves transparency, and gives the mosque management team a cleaner digital channel.",
      },
    ],
  },
  "cutbae-barbershop": {
    title: "Cutbae Barbershop Website",
    description:
      "Showcase for Cutbae Barbershop: a modern landing page for grooming services, haircut packages, location details, and customer booking flow.",
    highlights: [
      "Barbershop landing page",
      "Grooming services and packages",
      "WhatsApp booking CTA",
      "Mobile-first experience",
    ],
    sections: [
      {
        title: "Challenge",
        body: "The barbershop needed a page that quickly explains services, builds trust, and helps potential customers enter the booking flow without too many steps.",
      },
      {
        title: "Solution",
        body: "Solivate Studio structured a landing page around service visuals, benefits, grooming packages, location, and booking buttons that are easy to find on desktop and mobile.",
      },
      {
        title: "Impact",
        body: "The website makes the barbershop brand look more professional, organizes service information, and gives customers a clear contact path for reservations.",
      },
    ],
  },
  "makdian-bakery": {
    title: "Makdian Bakery Website",
    description:
      "Showcase for Makdian Bakery: a bakery brand profile, product catalog, ordering information, and customer-friendly visual presentation for an SME brand.",
    highlights: [
      "Bakery brand showcase",
      "Product catalog",
      "Ordering CTA",
      "Responsive customer experience",
    ],
    sections: [
      {
        title: "Challenge",
        body: "The bakery brand needed a digital home that could present products attractively, keep a warm brand tone, and help customers understand how to order.",
      },
      {
        title: "Solution",
        body: "Solivate Studio built the website with a brand story structure, product catalog, strong product visuals, and easy-to-reach ordering CTAs.",
      },
      {
        title: "Impact",
        body: "The website helps Makdian Bakery look more credible, makes products easier to present, and gives customers a more practical path to ordering.",
      },
    ],
  },
  "hammaddanfulanah": {
    title: "Hammad & Fulanah Wedding Invitation Website",
    description:
      "Showcase of a simple wedding invitation website with custom guest names, a personal tone, and a lightweight access flow that is easy to share with family and friends.",
    highlights: [
      "Simple wedding invitation",
      "Custom guest name",
      "Mobile-friendly experience",
      "Easy-to-share link",
    ],
    sections: [
      {
        title: "Challenge",
        body: "A digital invitation needs to feel personal without making the link heavy or difficult to open across different devices.",
      },
      {
        title: "Solution",
        body: "Solivate Studio created a lightweight invitation website focused on the couple's main moment, custom guest names, and a comfortable mobile experience.",
      },
      {
        title: "Impact",
        body: "The result is a simple, elegant digital invitation that is easy to share and more practical for personal wedding needs.",
      },
    ],
  },
  "weddingpro": {
    title: "WeddingPro Invitation & Dashboard Website",
    description:
      "Showcase of a wedding invitation website with barcode access and dashboard support, designed for guest flow, attendance validation, and more structured event management.",
    highlights: [
      "Digital invitation with barcode",
      "Guest management dashboard",
      "Cleaner RSVP flow",
      "More modern event experience",
    ],
    sections: [
      {
        title: "Challenge",
        body: "A more advanced digital invitation requires an elegant guest experience and a dashboard that simplifies attendance management.",
      },
      {
        title: "Solution",
        body: "Solivate Studio combined a memorable invitation landing page with barcode access and an internal dashboard to support RSVP monitoring and guest validation.",
      },
      {
        title: "Impact",
        body: "The website delivers a more premium wedding experience, better guest management, and stronger digital value for the event.",
      },
    ],
  },
  "hbd-matt": {
    title: "Matt Birthday Greeting Website",
    description:
      "Showcase of a simple birthday greeting website with a personal hero, light visuals, and an experience designed to make a digital celebration feel special.",
    highlights: [
      "Personal birthday greeting",
      "Lightweight landing page",
      "Focused emotional hero",
      "Great for a digital gift",
    ],
    sections: [
      {
        title: "Challenge",
        body: "A birthday greeting website needs to stay short and personal while still carrying emotional impact without too many distracting elements.",
      },
      {
        title: "Solution",
        body: "Solivate Studio built a birthday landing page centered on the main greeting, soft visuals, and a simple flow so the message lands immediately.",
      },
      {
        title: "Impact",
        body: "The website becomes a more memorable digital greeting, easy to share, and suitable for personal moments with fast turnaround.",
      },
    ],
  },
  "smk01-school-profile": {
    title: "SMK Solivate 01 School Profile Website",
    description:
      "Showcase of a school profile website with a landing page and multi-page structure, designed to present the school's identity, key programs, and important information in a more modern way.",
    highlights: [
      "Modern school landing page",
      "Multi-page structure",
      "Program and profile information",
      "More professional presentation",
    ],
    sections: [
      {
        title: "Challenge",
        body: "A school website needs to explain identity, programs, and institutional information clearly for prospective students, parents, and the public.",
      },
      {
        title: "Solution",
        body: "Solivate Studio structured the school profile website with a strong hero, supporting pages, and navigation that helps visitors find information faster.",
      },
      {
        title: "Impact",
        body: "The school gains a more credible digital presence, better-structured core information, and a more modern visitor experience across content and visuals.",
      },
    ],
  },
  "smk01-spmb-custom": {
    title: "SMK Solivate 01 Custom Admissions Website",
    description:
      "Showcase of a school landing page with custom admissions flow, focused on promoting new student enrollment and guiding visitors through a clearer conversion path.",
    highlights: [
      "Custom admissions landing page",
      "Focused on student acquisition",
      "Clearer registration CTA flow",
      "Built for enrollment campaigns",
    ],
    sections: [
      {
        title: "Challenge",
        body: "A new student admission page must communicate the school's value while guiding visitors into the registration flow without confusion.",
      },
      {
        title: "Solution",
        body: "Solivate Studio prepared a more focused admissions landing page with stronger headlines, featured programs, calls to action, and supporting funnel structure.",
      },
      {
        title: "Impact",
        body: "The website helps the school package admissions promotion in a cleaner, more directed format that is ready for digital campaigns.",
      },
    ],
  },
  "pedulisesama": {
    title: "Peduli Sesama Website",
    description:
      "Showcase of a social community profile website with real-time financial data, articles, gallery, and a dashboard for content management and transparent communication.",
    highlights: [
      "Social community profile",
      "Real-time financial data",
      "Articles and activity gallery",
      "Management dashboard",
    ],
    sections: [
      {
        title: "Challenge",
        body: "A social community needs a website that explains its mission while maintaining transparency and consistently publishing activities.",
      },
      {
        title: "Solution",
        body: "Solivate Studio built a community website with profile pages, articles, gallery, real-time financial data, and a dashboard for managing information.",
      },
      {
        title: "Impact",
        body: "The website strengthens public trust, makes community activities easier to communicate, and provides a more open and professional transparency channel.",
      },
    ],
  },
  "cpxindo": {
    title: "CPX Indo Website",
    description:
      "Showcase of a company profile website with ecommerce and CMS dashboard for an apparel brand, designed so brand promotion and sales catalog operations live in one ecosystem.",
    highlights: [
      "Company profile and ecommerce",
      "CMS dashboard",
      "Stronger brand presentation",
      "Integrated sales catalog",
    ],
    sections: [
      {
        title: "Challenge",
        body: "An apparel brand needs a website that not only explains the business identity but also supports a cleaner catalog and sales flow.",
      },
      {
        title: "Solution",
        body: "Solivate Studio combined company profile, ecommerce, and a CMS dashboard so the brand can manage appearance, products, and content from one system.",
      },
      {
        title: "Impact",
        body: "The website helps the brand look more serious, simplifies content and catalog management, and provides a stronger digital foundation for future growth.",
      },
    ],
  },
  "shofifrozen": {
    title: "Shofi Frozen Website",
    description:
      "Showcase of a frozen food ecommerce website with payment gateway support, built to simplify product exploration, ordering, and customer transaction flow.",
    highlights: [
      "Frozen food ecommerce",
      "Payment gateway integration",
      "Product categories and catalog",
      "More practical checkout flow",
    ],
    sections: [
      {
        title: "Challenge",
        body: "A frozen food store needs a website that helps customers browse product categories and move into checkout without friction.",
      },
      {
        title: "Solution",
        body: "Solivate Studio prepared an ecommerce experience focused on catalog, categories, checkout, and payment gateway support for smoother shopping.",
      },
      {
        title: "Impact",
        body: "The website helps the business sell products in a more structured way, improves buyer comfort, and strengthens its digital sales channel.",
      },
    ],
  },
  "spectrasec": {
    title: "SpectraSec Website",
    description:
      "Showcase of a cybersecurity community profile website, designed to clarify positioning, community identity, and initiative communication in a more modern format.",
    highlights: [
      "Cybersecurity community profile",
      "Clearer brand positioning",
      "Modern and focused visuals",
      "Suitable for tech communities",
    ],
    sections: [
      {
        title: "Challenge",
        body: "A technology community needs a website that can explain its identity and direction clearly, briefly, and with relevant visual treatment.",
      },
      {
        title: "Solution",
        body: "Solivate Studio designed a profile website that emphasizes community positioning, a strong hero visual, and concise but informative content structure.",
      },
      {
        title: "Impact",
        body: "The website helps the community appear more solid, easier to recognize, and better equipped with a digital home that supports credibility.",
      },
    ],
  },};

export type CityPage = {
  slug: string;
  name: string;
  type: string;
};

export const targetCities: CityPage[] = [
  { slug: "bekasi", name: "Bekasi", type: "Kota" },
  { slug: "jakarta", name: "Jakarta", type: "Daerah Khusus Ibukota" },
  { slug: "tangerang", name: "Tangerang", type: "Kota" },
  { slug: "depok", name: "Depok", type: "Kota" },
  { slug: "bogor", name: "Bogor", type: "Kota" },
  { slug: "bandung", name: "Bandung", type: "Kota" },
  { slug: "surabaya", name: "Surabaya", type: "Kota" },
  { slug: "semarang", name: "Semarang", type: "Kota" },
  { slug: "medan", name: "Medan", type: "Kota" },
  { slug: "makassar", name: "Makassar", type: "Kota" },
];

export const allSeoUrls = [
  "",
  "pricing",
  "project",
  "hiring",
  "privacy-policy",
  "terms",
  "revision-policy",
  ...servicePages.map((page) => `layanan/${page.slug}`),
  ...portfolioPages.map((page) => `portfolio/${page.slug}`),
  ...targetCities.map((city) => `jasa-pembuatan-website-${city.slug}`),
];
