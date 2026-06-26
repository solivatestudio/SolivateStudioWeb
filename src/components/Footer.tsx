import type React from 'react';
import { ArrowUp, Send, Instagram, Youtube } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for subscribing to Solivate Insights! Our tech newsletters are dispatched bi-weekly.');
  };

  return (
    <footer className="relative bg-navy-deep text-paper/70 font-body overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-lime/60 to-transparent" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-10 md:gap-12 items-start mb-14">

          {/* Brand */}
          <div className="col-span-2 md:col-span-4 space-y-5 text-left">
            <button onClick={scrollToTop} className="flex items-center gap-2.5 cursor-pointer text-left">
              <span className="flex items-center justify-center w-10 h-10 rounded-full bg-lime text-ink font-display font-semibold">
                S
              </span>
              <span className="leading-none">
                <span className="block font-display text-lg font-semibold tracking-tight text-paper">
                  Solivate
                </span>
                <span className="block text-[10px] font-body uppercase tracking-[0.3em] text-paper/50 mt-1">Studio</span>
              </span>
            </button>
            <p className="text-xs text-paper/60 leading-relaxed max-w-sm">
              {t('footer.desc')}
            </p>
            <div className="flex gap-3 pt-1">
              <a href="https://www.youtube.com/@SolivateStudio" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-xl bg-white/10 text-paper/70 hover:bg-lime hover:text-ink transition-all flex items-center justify-center">
                <Youtube className="w-4 h-4" />
              </a>
              <a href="https://www.instagram.com/solivatestudio/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-xl bg-white/10 text-paper/70 hover:bg-lime hover:text-ink transition-all flex items-center justify-center">
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Deliverables */}
          <div className="col-span-1 md:col-span-2 space-y-4 text-left">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.18em] text-lime">Deliverables</h4>
            <ul className="space-y-2.5 text-xs">
              <li><a href="#services" className="text-paper/60 hover:text-paper transition-colors">{t('footer.links.saas')}</a></li>
              <li><a href="#services" className="text-paper/60 hover:text-paper transition-colors">{t('footer.links.cloud')}</a></li>
              <li><a href="#services" className="text-paper/60 hover:text-paper transition-colors">{t('footer.links.devops')}</a></li>
              <li><a href="#services" className="text-paper/60 hover:text-paper transition-colors">{t('footer.links.design')}</a></li>
            </ul>
          </div>

          {/* Corporate */}
          <div className="col-span-1 md:col-span-2 space-y-4 text-left">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.18em] text-lime">Corporate</h4>
            <ul className="space-y-2.5 text-xs">
              <li><a href="#about" className="text-paper/60 hover:text-paper transition-colors">{t('footer.links.why')}</a></li>
              <li><a href="#portfolio" className="text-paper/60 hover:text-paper transition-colors">{t('footer.links.portfolio')}</a></li>
              <li><a href="#contact-us" className="text-paper/60 hover:text-paper transition-colors">{t('footer.links.contact')}</a></li>
              <li>
                <a href="#careers" className="text-paper/60 hover:text-paper transition-colors inline-flex items-center gap-1.5">
                  Careers
                  <span className="bg-lime text-ink px-1.5 py-0.5 rounded-full font-bold text-[9px] uppercase tracking-wide">{t('footer.hiring')}</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-span-2 md:col-span-4 space-y-4 text-left">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.18em] text-lime">{t('footer.newsletter.title')}</h4>
            <p className="text-xs text-paper/60 leading-normal max-w-sm">{t('footer.newsletter.desc')}</p>
            <form onSubmit={handleNewsletterSubmit} className="flex gap-2 max-w-sm">
              <input
                type="email"
                required
                placeholder={t('footer.newsletter.placeholder')}
                className="w-full px-4 py-2.5 bg-white/10 border border-white/15 focus:border-lime focus:outline-none focus:ring-2 focus:ring-lime/20 rounded-xl text-xs text-paper placeholder-paper/40"
              />
              <button
                type="submit"
                className="group bg-lime hover:bg-lime-deep text-ink px-4 py-2.5 rounded-xl text-xs font-semibold cursor-pointer shrink-0 flex items-center justify-center gap-1.5 transition-all"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{t('footer.newsletter.submit')}</span>
              </button>
            </form>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/10 text-xs flex flex-col sm:flex-row items-center justify-between gap-4 text-paper/60">
          <div>&copy; {currentYear} {t('footer.copyright')}</div>
          <div className="flex gap-6 font-medium">
            <a href="#privacy" className="hover:text-paper transition-colors">{t('footer.privacy')}</a>
            <a href="#terms" className="hover:text-paper transition-colors">{t('footer.terms')}</a>
            <a href="#nda" className="hover:text-paper transition-colors">{t('footer.nda')}</a>
          </div>
          <button
            onClick={scrollToTop}
            className="w-9 h-9 rounded-xl bg-white/10 text-lime hover:bg-lime hover:text-ink flex items-center justify-center transition-all group cursor-pointer"
            title="Back to Top"
          >
            <ArrowUp className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
          </button>
        </div>

      </div>
    </footer>
  );
}
