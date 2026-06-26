# Solivate Studio

Solivate Studio is a premium landing page built for a Full-Stack UI/UX Design & High-Performance IT Agency. It features a modern, high-converting, interactive user interface crafted with React and Tailwind CSS.

## 🚀 Tech Stack / Teknologi yang Dipakai

Proyek ini dibangun menggunakan teknologi modern untuk memastikan performa yang cepat dan pengalaman pengguna yang mulus:

- **Frontend Framework**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/) - Untuk rendering UI yang cepat dan *build tool* yang modern.
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) - Digunakan untuk styling *utility-first* yang efisien dan responsif.
- **Icons**: [Lucide React](https://lucide.dev/) - Kumpulan ikon SVG yang konsisten dan ringan.
- **Animations**: [Motion (Framer Motion)](https://motion.dev/) - Untuk menghadirkan animasi dan interaksi micro-animation yang mulus.
- **Language**: [TypeScript](https://www.typescriptlang.org/) - Menambahkan *static typing* untuk kode yang lebih kuat dan minim *bug*.

## 📂 Struktur Project

Berikut adalah gambaran struktur direktori dari kode sumber (`src`) proyek ini:

```text
KinetcStudio/
├── package.json          # Konfigurasi dependensi dan skrip proyek
├── vite.config.ts        # Konfigurasi bundler Vite
├── index.html            # File HTML utama (entry point)
├── public/               # Aset publik statis (tidak diproses oleh bundler)
│   └── images/
│       ├── hero.svg
│       ├── logosvg.svg
│       ├── portfolio_cloud_1781799732798.jpg
│       ├── portfolio_mobile_1781799748021.jpg
│       └── portfolio_saas_1781799718522.jpg
└── src/
    ├── main.tsx          # Entry point utama aplikasi React
    ├── App.tsx           # Komponen utama yang menyusun layout landing page
    ├── index.css         # File CSS global (mengimpor base Tailwind)
    ├── types.ts          # Definisi tipe (TypeScript interfaces/types) global
    └── components/       # Komponen UI terpisah (Modular)
        ├── Navbar.tsx          # Navigasi sticky di bagian atas
        ├── Hero.tsx            # Bagian atas (Hero Section) landing page
        ├── WhyChooseUs.tsx     # Alasan memilih layanan agency
        ├── Services.tsx        # Layanan yang ditawarkan (IT & Design)
        ├── ProcessTimeline.tsx # Timeline proses pengerjaan
        ├── Portfolio.tsx       # Etalase karya/portofolio agency
        ├── FAQ.tsx             # Pertanyaan yang sering diajukan
        ├── ContactForm.tsx     # Formulir untuk menghubungi agency
        └── Footer.tsx          # Bagian bawah (Footer) halaman
```

## 🛠️ Getting Started (Cara Menjalankan)

### Prerequisites

Pastikan Anda telah menginstal [Node.js](https://nodejs.org/) di perangkat Anda.

### Installation

1. Clone repositori ini dan masuk ke folder proyek:
   ```bash
   cd KinetcStudio
   ```

2. Instal semua dependensi:
   ```bash
   npm install
   ```

3. Jalankan development server:
   ```bash
   npm run dev
   ```

4. Buka browser Anda dan akses URL lokal yang diberikan oleh Vite (contoh: `http://localhost:3000`).

## 📜 Scripts (Daftar Perintah)

- `npm run dev`: Menjalankan server *development*.
- `npm run build`: Melakukan proses *build* aplikasi untuk *production*.
- `npm run preview`: Membuka *preview* lokal dari hasil *build* *production*.
- `npm run lint`: Menjalankan TypeScript untuk mengecek tipe data.
- `npm run clean`: Menghapus folder `dist`.

## 📄 License

This project is private and proprietary.
