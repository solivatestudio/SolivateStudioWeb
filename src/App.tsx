import { useState } from 'react';
import {
  ArrowUpRight,
  CheckCircle2,
  ChevronDown,
  Code2,
  Menu,
  MonitorCog,
  Palette,
  Send,
  ServerCog,
  Star,
  X,
} from 'lucide-react';

const navItems = ['About', 'Services', 'Work', 'Process', 'Contact'];

const services = [
  {
    icon: Palette,
    title: 'UI/UX & Website Design',
    desc: 'Clean marketing sites, landing pages, company profiles, invitations, and product interfaces with a strong visual system.',
  },
  {
    icon: Code2,
    title: 'Web App Development',
    desc: 'React dashboards, admin panels, CRUD systems, API integrations, and custom workflows built for real users.',
  },
  {
    icon: ServerCog,
    title: 'SaaS MVP & Systems',
    desc: 'Scoped MVP builds with authentication, database design, deployment, and room for future product growth.',
  },
  {
    icon: MonitorCog,
    title: 'Care & Optimization',
    desc: 'Performance tuning, technical maintenance, monitoring, backups, and release support after launch.',
  },
];

const works = [
  {
    title: 'Navas Retail OS',
    type: 'Commerce dashboard',
    img: '/images/portfolio_saas_1781799718522.jpg',
  },
  {
    title: 'Aster CloudOps',
    type: 'Cloud monitoring',
    img: '/images/portfolio_cloud_1781799732798.jpg',
  },
  {
    title: 'Luma Mobile Hub',
    type: 'Mobile workspace',
    img: '/images/portfolio_mobile_1781799748021.jpg',
  },
];

const process = [
  ['01', 'Discover', 'We align goals, audience, content, budget, and launch constraints before touching the interface.'],
  ['02', 'Design', 'We create clean layouts, user flows, interaction states, and a consistent design direction.'],
  ['03', 'Develop', 'We build responsive UI, connect data, test key flows, and keep progress visible.'],
  ['04', 'Launch', 'We deploy, monitor, document, and support the product after it goes live.'],
];

const faqs = [
  ['Can Solivate Studio redesign my current website?', 'Yes. We can keep useful content and rebuild the layout, visual system, UX, and performance from the ground up.'],
  ['Do you build apps, not only websites?', 'Yes. We build websites, dashboards, admin systems, MVPs, and custom web applications.'],
  ['How do we start?', 'Send a short brief with your goal, references, timeline, and budget range. We will propose a practical scope.'],
];

function sectionId(label: string) {
  return label.toLowerCase();
}

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function Brand() {
  return (
    <div className="brand">
      <span className="brand-mark">S</span>
      <span>
        <strong>Solivate</strong>
        <small>Studio</small>
      </span>
    </div>
  );
}

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="nav">
      <button className="nav-brand" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        <Brand />
      </button>

      <nav className="nav-links" aria-label="Primary navigation">
        {navItems.map((item) => (
          <button key={item} onClick={() => scrollTo(sectionId(item))}>
            {item}
          </button>
        ))}
      </nav>

      <button className="nav-cta" onClick={() => scrollTo('contact')}>
        Start Project
        <ArrowUpRight size={16} />
      </button>

      <button className="menu-button" onClick={() => setOpen((value) => !value)} aria-label="Toggle menu">
        {open ? <X size={21} /> : <Menu size={21} />}
      </button>

      {open && (
        <div className="mobile-nav">
          {navItems.map((item) => (
            <button
              key={item}
              onClick={() => {
                setOpen(false);
                scrollTo(sectionId(item));
              }}
            >
              {item}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}

function ProductPreview() {
  return (
    <div className="preview">
      <div className="preview-top">
        <span />
        <span />
        <span />
        <p>solivate.studio/dashboard</p>
      </div>
      <div className="preview-body">
        <div className="preview-sidebar">
          <span className="active" />
          <span />
          <span />
          <span />
        </div>
        <div className="preview-content">
          <div className="metric-card primary">
            <small>Project velocity</small>
            <strong>2.4x</strong>
            <div className="bar"><i /></div>
          </div>
          <div className="metric-card">
            <small>Launch readiness</small>
            <strong>86%</strong>
            <div className="mini-bars">
              <span />
              <span />
              <span />
            </div>
          </div>
          <div className="timeline-card">
            <small>Experience map</small>
            <div>
              <i />
              <i />
              <i />
              <i />
            </div>
          </div>
          <div className="image-card">
            <img src="/images/portfolio_cloud_1781799732798.jpg" alt="" />
            <span>Fast deploy stack</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section className="hero">
      <div className="hero-bg" />
      <div className="container hero-grid">
        <div className="hero-copy">
          <div className="trust-row">
            <span className="avatar-stack">
              <i>SS</i>
              <i>UX</i>
              <i>FE</i>
            </span>
            <span className="stars">
              {[...Array(5)].map((_, index) => <Star key={index} size={13} fill="currentColor" />)}
            </span>
            <p>Trusted digital partner for SMEs and founders</p>
          </div>
          <h1>Build scalable digital products, not just websites.</h1>
          <p className="hero-text">
            Solivate Studio helps brands design and develop websites, dashboards, and MVPs with clean UI, reliable code,
            and a launch-ready workflow.
          </p>
          <div className="hero-actions">
            <button className="btn-primary" onClick={() => scrollTo('contact')}>
              Mulai Proyek
              <ArrowUpRight size={18} />
            </button>
            <button className="btn-secondary" onClick={() => scrollTo('work')}>
              Lihat Portfolio
            </button>
          </div>
        </div>
        <ProductPreview />
      </div>
      <div className="logo-strip">
        {['UI/UX Design', 'Web Development', 'SaaS MVP', 'Brand System', 'Cloud Care', 'Automation'].map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="section light">
      <div className="container about-grid">
        <div>
          <p className="eyebrow">About Solivate Studio</p>
          <h2>Digital product studio for brands that want cleaner execution.</h2>
        </div>
        <p className="lead">
          We combine product thinking, visual design, and web engineering so your digital presence feels premium,
          functions clearly, and can grow after launch.
        </p>
      </div>
      <div className="container feature-grid">
        {[
          ['01', 'Strategy before visuals', 'We clarify positioning, audience, pages, user flows, and technical scope.'],
          ['02', 'Clean modern interface', 'Every section follows a visual system: typography, spacing, color, and responsive behavior.'],
          ['03', 'Build and maintain', 'We do not stop at mockups. We ship the site or app, then support it post-launch.'],
        ].map(([num, title, desc]) => (
          <article className="feature-card" key={num}>
            <span>{num}</span>
            <h3>{title}</h3>
            <p>{desc}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="services" className="section services">
      <div className="container section-head">
        <p className="eyebrow">Services</p>
        <h2>End-to-end digital solutions, measured and practical.</h2>
      </div>
      <div className="container service-grid">
        {services.map(({ icon: Icon, title, desc }) => (
          <article className="service-card" key={title}>
            <div className="icon-box">
              <Icon size={24} />
            </div>
            <h3>{title}</h3>
            <p>{desc}</p>
            <a href="#contact">
              Discuss service
              <ArrowUpRight size={16} />
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}

function Work() {
  return (
    <section id="work" className="section dark">
      <div className="container section-head split">
        <div>
          <p className="eyebrow">Selected Work</p>
          <h2>Interfaces built for clarity, trust, and conversion.</h2>
        </div>
        <p className="lead">
          A sample direction for the kind of dashboards, cloud products, mobile hubs, and business systems Solivate can
          design and ship.
        </p>
      </div>
      <div className="container work-grid">
        {works.map((item) => (
          <article className="work-card" key={item.title}>
            <img src={item.img} alt={item.title} />
            <div>
              <span>{item.type}</span>
              <h3>{item.title}</h3>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Process() {
  return (
    <section id="process" className="section light">
      <div className="container section-head split">
        <div>
          <p className="eyebrow">Process</p>
          <h2>Structured from the first call to launch day.</h2>
        </div>
        <p className="lead">Simple milestones, visible progress, and enough structure to keep the project calm.</p>
      </div>
      <div className="container process-grid">
        {process.map(([num, title, desc]) => (
          <article key={num}>
            <span>{num}</span>
            <h3>{title}</h3>
            <p>{desc}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  const [openFaq, setOpenFaq] = useState(0);
  const [sent, setSent] = useState(false);

  return (
    <section id="contact" className="section contact">
      <div className="container contact-grid">
        <div>
          <p className="eyebrow">Start a Project</p>
          <h2>Have a website or product idea to build?</h2>
          <p className="lead">
            Send a short brief. We will reply with a realistic direction, scope, and next step for your project.
          </p>
          <div className="faq-list">
            {faqs.map(([q, a], index) => (
              <article className="faq-item" key={q}>
                <button onClick={() => setOpenFaq(openFaq === index ? -1 : index)}>
                  {q}
                  <ChevronDown className={openFaq === index ? 'open' : ''} size={18} />
                </button>
                {openFaq === index && <p>{a}</p>}
              </article>
            ))}
          </div>
        </div>
        <div className="contact-card">
          {!sent ? (
            <form
              onSubmit={(event) => {
                event.preventDefault();
                setSent(true);
              }}
            >
              <label>
                Name
                <input required placeholder="Your name" />
              </label>
              <label>
                Email / WhatsApp
                <input required placeholder="you@company.com / +62..." />
              </label>
              <label>
                Project type
                <select defaultValue="Website redesign">
                  <option>Website redesign</option>
                  <option>New website</option>
                  <option>Custom web app</option>
                  <option>SaaS MVP</option>
                </select>
              </label>
              <label>
                Project brief
                <textarea required placeholder="Tell us about the goal, timeline, budget range, and references." />
              </label>
              <button className="btn-primary" type="submit">
                Send Brief
                <Send size={18} />
              </button>
            </form>
          ) : (
            <div className="success-state">
              <CheckCircle2 size={46} />
              <h3>Brief received.</h3>
              <p>Thanks. Solivate Studio will review your notes and reply with a practical next step.</p>
              <button className="btn-secondary" onClick={() => setSent(false)}>Send another</button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <Brand />
        <p>Solivate Studio is a modern digital product and web design studio based in Bekasi, Indonesia.</p>
        <div>
          <a href="https://www.instagram.com/solivatestudio/" target="_blank" rel="noreferrer">Instagram</a>
          <a href="https://www.youtube.com/@SolivateStudio" target="_blank" rel="noreferrer">YouTube</a>
          <a href="mailto:imammka23@gmail.com">Email</a>
          <a href="https://wa.me/6281219118993" target="_blank" rel="noreferrer">WhatsApp</a>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <div>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Work />
        <Process />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
