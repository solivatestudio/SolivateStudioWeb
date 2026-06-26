import { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface NavbarProps {
  onCtaClick: () => void;
}

const NAV_LINKS = [
  { id: 'about', key: 'nav.about' },
  { id: 'services', key: 'nav.services' },
  { id: 'portfolio', key: 'nav.portfolio' },
  { id: 'contact-us', key: 'nav.contact' }
];

export default function Navbar({ onCtaClick }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 96;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: elementPosition - offset, behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-5 left-0 right-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`flex items-center justify-between pl-5 pr-3 py-2.5 rounded-full border transition-all duration-500 ${
            isScrolled
              ? 'bg-paper/85 backdrop-blur-xl border-line shadow-[0_18px_50px_-30px_rgba(15,23,42,0.45)]'
              : 'bg-paper/55 backdrop-blur-md border-line/70'
          }`}
        >
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2.5 cursor-pointer group text-left"
          >
            <span className="flex items-center justify-center w-9 h-9 rounded-full bg-navy text-paper font-display font-semibold text-sm transition-transform duration-500 group-hover:rotate-[-8deg]">
              S
            </span>
            <span className="leading-none">
              <span className="block font-display text-base font-semibold tracking-tight text-ink">
                Solivate
              </span>
              <span className="block text-[10px] font-body uppercase tracking-[0.3em] text-mute mt-1">
                Studio
              </span>
            </span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="relative px-4 py-2 text-sm font-medium text-mute hover:text-ink transition-colors cursor-pointer group"
              >
                {t(link.key)}
                <span className="absolute left-4 right-4 -bottom-0.5 h-px bg-navy scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
              </button>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-2.5">
            <button
              onClick={() => setLanguage(language === 'en' ? 'id' : 'en')}
              className="flex items-center gap-1.5 px-3 py-2 rounded-full text-sm font-medium text-mute hover:text-ink hover:bg-zinc transition-colors cursor-pointer"
            >
              <Globe className="w-4 h-4 text-navy" />
              {language === 'en' ? 'EN' : 'ID'}
            </button>

            <button
              onClick={onCtaClick}
              className="group inline-flex items-center gap-2 pl-5 pr-2 py-2 rounded-full text-sm font-semibold text-paper bg-navy hover:bg-navy-deep transition-all cursor-pointer"
            >
              {t('nav.quote')}
              <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-lime text-ink transition-transform group-hover:rotate-45 duration-300">
                <ArrowUpRight className="w-4 h-4" />
              </span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2.5 rounded-full text-ink hover:bg-zinc transition-colors"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`md:hidden fixed inset-x-4 top-24 bg-paper border border-line rounded-3xl transition-all duration-300 ease-out origin-top shadow-[0_30px_60px_-30px_rgba(15,23,42,0.4)] ${
          isOpen ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-95 pointer-events-none'
        }`}
      >
        <div className="px-5 py-6 space-y-1.5 flex flex-col">
          <div className="flex justify-between items-center pb-4 mb-2 border-b border-line">
            <span className="text-sm font-medium text-mute">Language</span>
            <button
              onClick={() => setLanguage(language === 'en' ? 'id' : 'en')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc text-navy text-sm font-medium"
            >
              <Globe className="w-4 h-4" />
              {language === 'en' ? 'English (EN)' : 'Indonesia (ID)'}
            </button>
          </div>
          {NAV_LINKS.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className="text-left py-3 px-4 rounded-xl text-ink hover:bg-zinc font-medium transition-all"
            >
              {t(link.key)}
            </button>
          ))}
          <div className="pt-4 mt-2 border-t border-line">
            <button
              onClick={() => {
                setIsOpen(false);
                onCtaClick();
              }}
              className="w-full flex items-center justify-center gap-2 px-5 py-3.5 rounded-full text-sm font-semibold text-paper bg-navy"
            >
              {t('nav.quote')}
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
