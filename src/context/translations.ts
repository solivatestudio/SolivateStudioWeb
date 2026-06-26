export type Language = 'en' | 'id';

export const translations = {
  en: {
    nav: {
      about: 'About',
      services: 'Services',
      process: 'Process',
      portfolio: 'Portfolio',
      faq: 'FAQ',
      contact: 'Contact Us',
      quote: 'Get a Quote',
    },
    hero: {
      badge: 'Affordable Web Solutions',
      title1: 'Simple Websites for',
      title2: '',
      subtitle: 'We create affordable landing pages, wedding invitations, event websites, and simple company websites—perfect for small and medium businesses.',
      cta1: 'Get Started',
      cta2: 'View Packages',
      stat1_val: '99.4%',
      stat1_label: 'Project Success',
      stat2_val: '150+',
      stat2_label: 'Systems Deployed',
      stat3_val: '2x',
      stat3_label: 'Development Speed',
      badge1_title: 'Deploy on Day One',
      badge1_desc: 'Fast and automated setup process.',
      badge2_label: 'Expertise',
      badge2_val: 'Quality Results',
      badge3_label: 'Clients',
      badge3_val: '100% Satisfied',
    },
    why: {
      badge: 'Our Strengths',
      title: 'Delivering High-Impact Digital Advantage',
      subtitle: 'We merge extreme software scalability with premium digital design. We do not compromise on security, architecture, or speed.',
      items: {
        'scalable-solutions': {
          title: 'Scalable Solutions',
          desc: 'We build websites and apps that can easily handle lots of visitors without slowing down.',
        },
        'expert-developers': {
          title: 'Expert Developers',
          desc: 'Our team consists of experienced professionals who know how to build reliable, safe, and easy-to-use software.',
        },
        'transparent-process': {
          title: 'Transparent Process',
          desc: 'Follow our progress easily online. We keep you updated every step of the way with clear and regular communication.',
        },
        'on-time-delivery': {
          title: 'On-Time Delivery',
          desc: 'We deliver what we promise, exactly when we promised it. No delays, just great results.',
        }
      },
      guarantee: 'Guaranteed Standards',
      cta_badge: 'Ready for Business',
      cta_title: 'Ready to build robust software systems tailored to your workflows?',
      cta_desc: 'We create secure, fast, and reliable digital systems for businesses of all sizes. Let\'s talk about your needs.',
      cta_btn: 'Get Started Now',
      cards: {
        card1_title: 'Client Success & Retention Rate',
        card1_metric_label: 'Success Metric',
        card1_desc: 'Solivate Studio builds deep trust and technical excellence that we maintain in every sprint.',
        card2_title: 'Maximizing Your Business Potential',
        card2_desc: 'We help businesses overcome digital obstacles through robust, modern software solutions.',
        card3_title: 'Tailoring Your Business Character',
        card3_desc: 'Eye-catching visuals to take your business to the next level.',
        card3_cta: 'Try a Consultation',
      },
    },
    services: {
      badge: 'Our Services',
      title: 'Simple & Affordable Websites',
      subtitle: 'Choose from landing pages, invitation sites, or basic CRUD apps—tailored for your business needs.',
      items: {
        'custom-software': {
          title: 'Landing Pages & Simple Websites',
          desc: 'Affordable landing pages, wedding invitations, event pages, and simple company websites built quickly and reliably.',
          tags: ['Custom Websites', 'Easy Updates', 'Fast Loading', 'Secure'],
          props: [
            'Built with modern, reliable technology.',
            'Thoroughly tested to ensure everything works perfectly.',
            'Extremely fast loading times for your visitors.'
          ],
          tech: 'Modern Web Technologies'
        },
        'cloud-architecture': {
          title: 'Hosting & Reliability',
          desc: 'We make sure your website stays online all the time, runs fast, and keeps your data safe.',
          tags: ['Always Online', 'Data Protection', 'High Security', 'Backup Systems'],
          props: [
            'Automatically adjusts to handle busy periods.',
            'Your data is backed up and safe in multiple locations.',
            'Top-tier security to protect your sensitive information.'
          ],
          tech: 'Reliable Cloud Servers'
        },
        'devops-automation': {
          title: 'Smooth Updates & Maintenance',
          desc: 'We make updating your website easy and safe, without causing any downtime for your users.',
          tags: ['Automatic Updates', 'No Downtime', 'Constant Monitoring', 'Quick Fixes'],
          props: [
            'Updates are applied quickly and smoothly.',
            'Your site stays live even when we add new features.',
            'We can easily set up and restore your systems if needed.'
          ],
          tech: 'Automated Systems'
        },
        'ui-ux-strategy': {
          title: 'Beautiful & User-Friendly Design',
          desc: 'We design websites that not only look amazing but are also very easy for your customers to use.',
          tags: ['User Research', 'Modern Look', 'Easy to Use', 'Mobile Friendly'],
          props: [
            'Designed based on what users actually want and need.',
            'Accessible and comfortable to use on any device.',
            'Smooth transition from design to the final product.'
          ],
          tech: 'Professional Design Tools'
        }
      },
      radar_badge: 'WHAT WE DELIVER',
      tech_caps: 'OUR EXPERTISE:',
      included: 'What’s Included:',
      custom_needs_title: 'Have an existing system that needs an upgrade?',
      custom_needs_desc: 'We can help modernize your old systems, make them faster, and connect them with new technologies easily.',
      cta_btn: 'Scope Out Your Solution',
      select_prompt: 'Select a service on the left to inspect its parameters.',
    },
    process: {
      badge: 'Our Execution System',
      title: 'How We Partner: The Solivate Pipeline',
      subtitle: 'We believe in working fast and keeping you in the loop. Our simple 4-step process ensures top quality without the wait.',
      items: [
        {
          title: 'Discovery & Strategy',
          desc: 'We start by understanding your goals, discussing your ideas, and clearly defining what we will build together. No guesswork.',
          duration: 'Week 1',
        },
        {
          title: 'Design & Architecture',
          desc: 'Our designers create beautiful layouts for your app or website, while our technical team plans the best way to build it securely.',
          duration: 'Weeks 2-3',
        },
        {
          title: 'Agile Software Development',
          desc: 'We build your project step-by-step and show you our progress regularly. You can test features as they are completed.',
          duration: 'Weeks 4-8',
        },
        {
          title: 'Pristine QA & Deployment',
          desc: 'We test everything thoroughly to ensure there are no bugs. Once everything is perfect, we launch your project smoothly.',
          duration: 'Weeks 9+',
        }
      ],
      warning_bold: 'Need express delivery?',
      warning_desc: 'We offer expedited sprint pipelines for critical funding/launch timelines. Reach out directly to discuss our priority staging SLA slots.',
    },
    portfolio: {
      badge: 'Our Work',
      title: 'Pioneering Pristine Products',
      subtitle: 'We take pride in building fast, beautiful, and reliable digital products. Check out some of our recent work.',
      categories: {
        all: 'All',
        saas: 'Custom Software',
        cloud: 'Hosting Solutions',
        mobile: 'Mobile Apps'
      },
      items: {
        'banking-saas': {
          title: 'Acme Wealth Global Dashboard',
          desc: 'A secure financial platform that handles multiple currencies and provides real-time updates.',
        },
        'nexus-cloud': {
          title: 'Nexus DataMesh Cloud Infra',
          desc: 'A large-scale hosting solution designed to keep data secure and ensure the system runs smoothly at all times.',
        },
        'workspace-mobile': {
          title: 'Solivate Shift Enterprise Mobile Hub',
          desc: 'A business app that helps teams communicate safely, manage tasks, and work even without an internet connection.',
        }
      },
      preview_summary: 'Preview case summary',
      locked: 'LOCKED DEPLOYMENT',
      success: '100% SUCCESS RATE',
      case_study: 'Case Study',
    },
    faq: {
      badge: 'Clear Answers',
      title: 'Frequently Asked Questions',
      subtitle: 'Everything you need to know about our workflow, legal provisions, technical capabilities, and pricing protocols.',
      items: {
        'pricing': {
          question: 'How does Solivate Studio price its agency projects?',
          answer: 'We offer clear, fixed pricing based on the features you need. There are no hidden fees or surprise costs. As long as the project requirements do not change, the price stays exactly the same.',
        },
        'timeline': {
          question: 'What is the average timeline to launch an MVP or system?',
          answer: 'A typical project takes about 4 to 8 weeks from start to finish. We keep you involved throughout the process, allowing you to see and test the progress regularly before the final launch.',
        },
        'tech-stack': {
          question: 'What is your preferred technology stack?',
          answer: 'We use modern, reliable tools to ensure your website or app is fast and secure. Whether it is what the users see or what runs behind the scenes, we choose the best technology for your specific needs.',
        },
        'support': {
          question: 'Do you offer post-launch support and security patches?',
          answer: 'Yes! We offer ongoing support to keep your software running smoothly. This includes fixing any issues, updating security, and making sure your system stays fast and reliable.',
        },
        'nda': {
          question: 'Are my business roadmap, ideas, and intellectual property secure?',
          answer: 'Yes. Your ideas and business secrets are safe with us. We sign agreements to keep everything confidential. Once the project is finished and paid for, you own everything we created for you.',
        }
      },
      support_prompt: 'Do you have specific questions about your unique business needs or how we can help upgrade your current systems?',
      support_btn: 'Talk to our Team',
    },
    contact: {
      badge: 'Get a Proposal',
      title: 'Let’s Design Your System Architecture',
      subtitle: 'Ready to start? Fill out our short form below. Our team will review your needs and get back to you with a clear plan and pricing within 24 hours.',
      status: 'ONLINE CORE STATUS',
      hq_title: 'Solivate Studio HQ',
      hq_desc: 'Our core engineers operate in Bekasi, Indonesia, assisting global clients across Asian, European, and Pacific tech zones.',
      office_label: 'HEAD OFFICE',
      email_label: 'PROJECT OFFERS',
      phone_label: 'CALL / WHATSAPP CHANNEL',
      nda_title: 'NDA & Cloud Sovereignty Guaranteed',
      nda_desc: 'All the information you share with us is kept strictly confidential and secure. Your privacy is our top priority.',
      form: {
        name_label: 'Full Name',
        name_placeholder: 'E.g., Michael Chen',
        email_label: 'Business Email',
        email_placeholder: 'E.g., michael@acme.com',
        company_label: 'Company Name',
        company_placeholder: 'E.g., Acme Wealth Corp',
        budget_label: 'Estimated Project Budget',
        message_label: 'Project Details & Technical Goals',
        message_placeholder: 'Tell us about your project, what features you need, and when you hope to have it finished...',
        submit_btn: 'Get Your Custom Proposal',
        loading: 'Sending securely...',
        nda_notice: 'By submitting this form, you agree to keep our communication confidential. We will keep your details private too.',
      },
      success: {
        title: 'Brief Transmitted Securely!',
        desc: 'Thank you for reaching out to Solivate Studio! We have received your request and will get back to you via email within 24 hours.',
        next_steps: '**What happens next?** We are reviewing your details and preparing a plan with estimated costs. Please keep an eye on your inbox.',
        reset_btn: 'Send Another Request',
      }
    },
    footer: {
      desc: 'We create beautiful websites and reliable software solutions to help businesses grow and succeed in the digital world.',
      links: {
        deliverables: 'Deliverables',
        saas: 'Custom SaaS Apps',
        cloud: 'Website Simple',
        devops: 'Website Invite Party/Wedding',
        design: 'Custom Websites',
        corporate: 'Corporate',
        why: 'Why Choose Us',
        portfolio: 'Our Portfolio',
        contact: 'Get Custom Quote',
        careers: 'Careers',
      },
      hiring: 'WE ARE HIRING',
      newsletter: {
        title: 'Solivate Insights newsletter',
        desc: 'Subscribe to stay updated with cloud security checklists, speed architecture breakdowns, and tech strategy reports.',
        placeholder: 'Business email...',
        submit: 'Subscribe',
      },
      copyright: 'Solivate Studio (PT Solivate Teknologi Solusi). All rights reserved.',
      privacy: 'Privacy Policy',
      terms: 'Terms of Service',
      nda: 'IP Agreement Guidelines',
    }
  },
  id: {
    nav: {
      about: 'Tentang',
      services: 'Layanan',
      process: 'Proses',
      portfolio: 'Portofolio',
      faq: 'FAQ',
      contact: 'Hubungi Kami',
      quote: 'Dapatkan Penawaran',
    },
    hero: {
      badge: 'Solusi Digital Terbaik untuk Anda',
      title1: 'Kembangkan bisnis anda menjadi lebih profesional bersama',
      title2: '',
      subtitle: 'Kami membuat website dan aplikasi berkualitas tinggi yang mudah digunakan. Solivate Studio siap membantu mewujudkan ide digital Anda dengan cepat dan tanpa ribet.',
      cta1: 'Mulai Proyek Anda',
      cta2: 'Jelajahi Layanan',
      stat1_val: '99.4%',
      stat1_label: 'Keberhasilan Proyek',
      stat2_val: '150+',
      stat2_label: 'Sistem Dideploy',
      stat3_val: '2x',
      stat3_label: 'Kecepatan Development',
      badge1_title: 'Deploy di Hari Pertama',
      badge1_desc: 'Proses pengerjaan cepat dan otomatis.',
      badge2_label: 'Keahlian',
      badge2_val: 'Kualitas Terjamin',
      badge3_label: 'Klien',
      badge3_val: '100% Puas',
    },
    why: {
      badge: 'Kekuatan Kami',
      title: 'Memberikan Keuntungan Digital Berdampak Tinggi',
      subtitle: 'Kami menggabungkan skalabilitas perangkat lunak modern dengan desain digital premium. Kami tidak mengabaikan aspek keamanan, arsitektur, maupun kecepatan.',
      items: {
        'scalable-solutions': {
          title: 'Aplikasi Cepat & Tangguh',
          desc: 'Kami membangun website dan aplikasi yang tetap cepat dan lancar meski dikunjungi banyak orang sekaligus.',
        },
        'expert-developers': {
          title: 'Tim Berpengalaman',
          desc: 'Tim kami terdiri dari para ahli yang tahu cara membuat aplikasi yang aman, andal, dan mudah digunakan.',
        },
        'transparent-process': {
          title: 'Proses Transparan',
          desc: 'Pantau perkembangan proyek Anda dengan mudah. Kami selalu memberikan kabar terbaru secara rutin dan transparan.',
        },
        'on-time-delivery': {
          title: 'Pengiriman Tepat Waktu',
          desc: 'Kami memberikan hasil yang tepat waktu sesuai dengan janji kami. Tanpa penundaan, hanya hasil terbaik.',
        }
      },
      guarantee: 'Standar Terjamin',
      cta_badge: 'Siap untuk Bisnis Anda',
      cta_title: 'Siap memiliki sistem dan website canggih untuk bisnis Anda?',
      cta_desc: 'Kami menciptakan solusi digital yang aman, cepat, dan bisa diandalkan untuk semua jenis bisnis. Mari bicarakan kebutuhan Anda.',
      cta_btn: 'Mulai Sekarang',
      cards: {
        card1_title: 'Tingkat Kesuksesan & Retensi Klien',
        card1_metric_label: 'Metrik Keberhasilan',
        card1_desc: 'Solivate Studio membangun kepercayaan tinggi dan keunggulan teknis yang selalu kami jaga di setiap sprint.',
        card2_title: 'Memaksimalkan Potensi Bisnis Anda',
        card2_desc: 'Kami membantu bisnis mengatasi kendala digital melalui solusi perangkat lunak yang tangguh dan modern.',
        card3_title: 'Menyesuaikan Karakter Bisnis Anda',
        card3_desc: 'Tampilan visual yang eye-catching untuk menaikkan level bisnis Anda ke tingkat selanjutnya.',
        card3_cta: 'Coba Konsultasi',
      },
    },
    services: {
      badge: 'Apa Yang Kami Lakukan',
      title: 'Layanan Digital Sederhana & Terjangkau',
      subtitle: 'Kami menyediakan berbagai layanan dari pembuatan website hingga aplikasi. Pilih layanan yang sesuai dengan kebutuhan Anda.',
      items: {
        'custom-software': {
          title: 'Pembuatan Website & Aplikasi',
          desc: 'Layanan pembuatan website, halaman landing, dan aplikasi sederhana dengan harga terjangkau dan proses yang cepat.',
          tags: ['Website Kustom', 'Mudah Diupdate', 'Loading Cepat', 'Aman'],
          props: [
            'Dibuat dengan teknologi modern dan andal.',
            'Diuji secara menyeluruh agar semuanya berjalan sempurna.',
            'Website Anda akan memuat dengan sangat cepat.'
          ],
          tech: 'Teknologi Web Modern'
        },
        'cloud-architecture': {
          title: 'Hosting & Keandalan',
          desc: 'Kami memastikan website Anda selalu bisa diakses, berjalan cepat, dan data Anda tetap aman.',
          tags: ['Selalu Online', 'Perlindungan Data', 'Keamanan Tinggi', 'Sistem Backup'],
          props: [
            'Sistem otomatis menyesuaikan jika pengunjung sedang ramai.',
            'Data Anda dicadangkan dengan aman di beberapa tempat.',
            'Keamanan tingkat tinggi untuk melindungi informasi penting Anda.'
          ],
          tech: 'Server Cloud Handal'
        },
        'devops-automation': {
          title: 'Pembaruan & Perawatan Lancar',
          desc: 'Kami membuat proses update website Anda jadi mudah dan aman, tanpa mengganggu kenyamanan pengguna Anda.',
          tags: ['Update Otomatis', 'Tanpa Downtime', 'Pantauan Terus Menerus', 'Perbaikan Cepat'],
          props: [
            'Pembaruan dapat diterapkan dengan cepat dan lancar.',
            'Website tetap bisa diakses saat kami menambahkan fitur baru.',
            'Kami bisa memulihkan sistem Anda dengan cepat jika terjadi masalah.'
          ],
          tech: 'Sistem Otomatis'
        },
        'ui-ux-strategy': {
          title: 'Desain Cantik & Mudah Digunakan',
          desc: 'Kami merancang website yang tidak hanya terlihat menarik, tapi juga sangat mudah digunakan oleh pelanggan Anda.',
          tags: ['Riset Pengguna', 'Tampilan Modern', 'Mudah Digunakan', 'Nyaman di HP'],
          props: [
            'Didesain berdasarkan apa yang benar-benar dibutuhkan pengguna.',
            'Mudah diakses dan nyaman digunakan di perangkat apa saja.',
            'Proses dari desain hingga produk jadi berjalan dengan sangat mulus.'
          ],
          tech: 'Alat Desain Profesional'
        }
      },
      radar_badge: 'APA YANG KAMI BERIKAN',
      tech_caps: 'KEAHLIAN KAMI:',
      included: 'Apa yang Termasuk:',
      custom_needs_title: 'Punya sistem lama yang perlu diperbarui?',
      custom_needs_desc: 'Kami bisa membantu memperbarui sistem lama Anda, membuatnya lebih cepat, dan menghubungkannya dengan teknologi baru.',
      cta_btn: 'Lihat Opsi Anda',
      select_prompt: 'Pilih layanan di sebelah kiri untuk memeriksa parameternya.',
    },
    process: {
      badge: 'Sistem Eksekusi Kami',
      title: 'Bagaimana Kami Bermitra: Solivate Pipeline',
      subtitle: 'Kami percaya pada kerja cepat dengan komunikasi yang baik. Proses 4 langkah kami memastikan kualitas terbaik tanpa perlu menunggu lama.',
      items: [
        {
          title: 'Penemuan & Strategi',
          desc: 'Kami mulai dengan memahami tujuan Anda, mendiskusikan ide Anda, dan memastikan apa saja yang akan kita bangun bersama. Semuanya jelas dari awal.',
          duration: 'Minggu 1',
        },
        {
          title: 'Desain & Arsitektur',
          desc: 'Desainer kami membuat tampilan yang cantik untuk website atau aplikasi Anda, sementara tim teknis kami merencanakan cara terbaik untuk membangunnya dengan aman.',
          duration: 'Minggu 2-3',
        },
        {
          title: 'Pengembangan Perangkat Lunak Agile',
          desc: 'Kami mengerjakan proyek Anda tahap demi tahap dan menunjukkan hasilnya secara berkala. Anda bisa langsung mencoba fitur yang sudah selesai.',
          duration: 'Minggu 4-8',
        },
        {
          title: 'QA Murni & Penerapan',
          desc: 'Kami mengecek semuanya secara menyeluruh untuk memastikan tidak ada error. Setelah semuanya sempurna, proyek Anda siap diluncurkan.',
          duration: 'Minggu 9+',
        }
      ],
      warning_bold: 'Butuh pengiriman kilat?',
      warning_desc: 'Kami bisa mempercepat proses pengerjaan untuk jadwal peluncuran yang mendesak. Hubungi kami untuk info lebih lanjut.',
    },
    portfolio: {
      badge: 'Pekerjaan Kami',
      title: 'Mempelopori Produk Berkualitas',
      subtitle: 'Kami bangga membuat produk digital yang cepat, indah, dan bisa diandalkan. Lihat beberapa hasil karya terbaik kami.',
      categories: {
        all: 'Semua',
        saas: 'Software Kustom',
        cloud: 'Solusi Hosting',
        mobile: 'Aplikasi Seluler'
      },
      items: {
        'banking-saas': {
          title: 'Dasbor Global Acme Wealth',
          desc: 'Platform keuangan aman yang bisa menangani berbagai mata uang dan memberikan update data secara instan.',
        },
        'nexus-cloud': {
          title: 'Infra Cloud Nexus DataMesh',
          desc: 'Solusi hosting skala besar yang menjaga data tetap aman dan memastikan sistem berjalan lancar setiap saat.',
        },
        'workspace-mobile': {
          title: 'Solivate Shift Enterprise Mobile Hub',
          desc: 'Aplikasi bisnis yang membantu tim berkomunikasi dengan aman, mengatur tugas, dan bisa digunakan tanpa internet.',
        }
      },
      preview_summary: 'Pratinjau ringkasan kasus',
      locked: 'DILUNCURKAN DENGAN AMAN',
      success: 'TINGKAT KEBERHASILAN 100%',
      case_study: 'Studi Kasus',
    },
    faq: {
      badge: 'Jawaban Jelas',
      title: 'Pertanyaan yang Sering Diajukan',
      subtitle: 'Semua yang perlu Anda ketahui tentang alur kerja, ketentuan hukum, kapabilitas teknis, dan protokol harga kami.',
      items: {
        'pricing': {
          question: 'Bagaimana Solivate Studio memberi harga pada proyek agensinya?',
          answer: 'Kami menawarkan harga yang jelas dan tetap sesuai dengan fitur yang Anda butuhkan. Tidak ada biaya tersembunyi. Selama kebutuhan proyek tidak berubah, harganya tetap sama.',
        },
        'timeline': {
          question: 'Berapa rata-rata waktu untuk meluncurkan MVP atau sistem?',
          answer: 'Umumnya sebuah proyek memakan waktu 4 hingga 8 minggu dari awal hingga selesai. Kami akan terus melibatkan Anda, sehingga Anda bisa melihat dan mencoba perkembangannya secara rutin sebelum diluncurkan.',
        },
        'tech-stack': {
          question: 'Apa tumpukan teknologi pilihan Anda?',
          answer: 'Kami menggunakan alat-alat modern dan terpercaya agar website atau aplikasi Anda cepat dan aman. Kami akan memilihkan teknologi terbaik yang paling cocok dengan kebutuhan Anda.',
        },
        'support': {
          question: 'Apakah Anda menawarkan dukungan pasca peluncuran dan patch keamanan?',
          answer: 'Tentu saja! Kami memberikan layanan dukungan setelah rilis untuk memastikan aplikasi Anda tetap berjalan lancar. Ini termasuk perbaikan jika ada masalah, pembaruan keamanan, dan penjagaan kualitas sistem.',
        },
        'nda': {
          question: 'Apakah peta jalan bisnis, ide, dan kekayaan intelektual saya aman?',
          answer: 'Ya. Ide dan rahasia bisnis Anda aman bersama kami. Kami menandatangani perjanjian untuk menjaga kerahasiaan. Setelah proyek selesai dan dibayar, Anda memiliki hak penuh atas semua yang telah kami buat untuk Anda.',
        }
      },
      support_prompt: 'Punya pertanyaan spesifik tentang kebutuhan bisnis Anda atau bagaimana kami bisa membantu memperbarui sistem Anda?',
      support_btn: 'Bicara dengan Tim Kami',
    },
    contact: {
      badge: 'Dapatkan Proposal',
      title: 'Mari Rancang Arsitektur Sistem Anda',
      subtitle: 'Siap untuk memulai? Isi formulir singkat di bawah ini. Tim kami akan meninjau kebutuhan Anda dan memberikan rencana serta perkiraan harga dalam waktu 24 jam.',
      status: 'KAMI SEDANG ONLINE',
      hq_title: 'Pusat Solivate Studio',
      hq_desc: 'Tim kami berbasis di Bekasi, Indonesia, dan siap membantu klien dari berbagai penjuru dunia.',
      office_label: 'KANTOR PUSAT',
      email_label: 'PENAWARAN PROYEK',
      phone_label: 'SALURAN PANGGILAN / WHATSAPP',
      nda_title: 'Kerahasiaan & Keamanan Dijamin',
      nda_desc: 'Semua informasi yang Anda bagikan kepada kami dijaga kerahasiaannya dengan sistem keamanan yang ketat. Privasi Anda adalah prioritas utama kami.',
      form: {
        name_label: 'Nama Lengkap',
        name_placeholder: 'Misal, Michael Chen',
        email_label: 'Email Bisnis',
        email_placeholder: 'Misal, michael@acme.com',
        company_label: 'Nama Perusahaan',
        company_placeholder: 'Misal, Acme Wealth Corp',
        budget_label: 'Perkiraan Dana Proyek',
        message_label: 'Detail Proyek & Tujuan',
        message_placeholder: 'Ceritakan tentang proyek Anda, fitur apa saja yang dibutuhkan, dan kapan Anda berharap proyek ini selesai...',
        submit_btn: 'Dapatkan Penawaran Kustom Anda',
        loading: 'Sedang mengirim dengan aman...',
        nda_notice: 'Dengan menekan tombol kirim, Anda setuju untuk menjaga kerahasiaan komunikasi kita. Kami juga akan merahasiakan data Anda.',
      },
      success: {
        title: 'Pesan Berhasil Terkirim!',
        desc: 'Terima kasih telah menghubungi Solivate Studio! Kami telah menerima pesan Anda dan akan membalas melalui email dalam waktu 24 jam.',
        next_steps: '**Apa selanjutnya?** Kami sedang membaca detail dari Anda dan menyiapkan rencana beserta perkiraan biaya. Silakan cek kotak masuk email Anda nanti.',
        reset_btn: 'Kirim Permintaan Lain',
      }
    },
    footer: {
      desc: 'Kami membuat website yang cantik dan perangkat lunak yang andal untuk membantu bisnis Anda tumbuh dan sukses di dunia digital.',
      links: {
        deliverables: 'Layanan',
        saas: 'Aplikasi SaaS Khusus',
        cloud: 'Website Simple',
        devops: 'Website Invite Party/Wedding',
        design: 'Custom Websites',
        corporate: 'Perusahaan',
        why: 'Mengapa Memilih Kami',
        portfolio: 'Portofolio Kami',
        contact: 'Dapatkan Penawaran Khusus',
        careers: 'Karir',
      },
      hiring: 'KAMI MEREKRUT',
      newsletter: {
        title: 'Berita & Info Terbaru',
        desc: 'Berlangganan untuk mendapatkan informasi terbaru tentang teknologi, tips bisnis digital, dan berita seputar layanan kami.',
        placeholder: 'Email bisnis...',
        submit: 'Berlangganan',
      },
      copyright: 'Solivate Studio (PT Solivate Teknologi Solusi). Hak cipta dilindungi.',
      privacy: 'Kebijakan Privasi',
      terms: 'Syarat Layanan',
      nda: 'Panduan Perjanjian IP',
    }
  }
} as const;

// Helper to extract nested keys for type safety
type PathsToStringProps<T> = T extends string ? [] : {
  [K in Extract<keyof T, string>]: [K, ...PathsToStringProps<T[K]>]
}[Extract<keyof T, string>];

type Join<T extends string[], D extends string> =
  T extends [] ? never :
  T extends [infer F] ? F :
  T extends [infer F, ...infer R] ?
  F extends string ?
  `${F}${D}${Join<Extract<R, string[]>, D>}` : never : string;

export type TranslationKey = Join<PathsToStringProps<typeof translations['en']>, '.'>;
