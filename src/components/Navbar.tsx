import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface NavbarProps {
  onCtaClick: () => void;
}

export default function Navbar({ onCtaClick }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
        ? 'bg-white/90 backdrop-blur-md shadow-sm border-b border-[#E5FAFF] py-3'
        : 'bg-transparent py-5'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <img src="/images/logosvg.svg" alt="" className="w-10" />
            <span className="font-serif text-xl tracking-tight text-[#023E8A] font-bold">
              Solivate <span className="text-slate-800 font-sans font-light text-lg">Studio</span>
              <p className="text-slate-800 font-sans italic font-light text-xs">Let's Upgrade Your Brand</p>
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection('about')}
              className="text-slate-600 hover:text-[#023E8A] font-medium transition-colors cursor-pointer text-sm"
            >
              {t('nav.about')}
            </button>
            <button
              onClick={() => scrollToSection('services')}
              className="text-slate-600 hover:text-[#023E8A] font-medium transition-colors cursor-pointer text-sm"
            >
              {t('nav.services')}
            </button>
            <button
              onClick={() => scrollToSection('portfolio')}
              className="text-slate-600 hover:text-[#023E8A] font-medium transition-colors cursor-pointer text-sm"
            >
              {t('nav.portfolio')}
            </button>
            <button
              onClick={() => scrollToSection('contact-us')}
              className="text-slate-600 hover:text-[#023E8A] font-medium transition-colors cursor-pointer text-sm"
            >
              {t('nav.contact')}
            </button>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => setLanguage(language === 'en' ? 'id' : 'en')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600 transition-colors text-sm font-medium cursor-pointer"
            >
              <Globe className="w-4 h-4" />
              {language === 'en' ? 'EN' : 'ID'}
            </button>

            <button
              onClick={onCtaClick}
              className="relative inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-[#023E8A] hover:bg-[#023E8A]/90 transition-all shadow-sm hover:shadow-md cursor-pointer group hover:-translate-y-0.5"
            >
              {t('nav.quote')}
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-[#023E8A] hover:bg-[#E5FAFF] transition-colors"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`md:hidden fixed inset-x-0 top-[72px] bg-white border-b border-[#E5FAFF] transition-all duration-300 ease-in-out origin-top shadow-lg ${isOpen ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0 pointer-events-none'
          }`}
      >
        <div className="px-5 py-6 space-y-4 flex flex-col">
          <div className="flex justify-between items-center pb-2 border-b border-slate-100">
            <span className="text-sm font-medium text-slate-500">Language</span>
            <button
              onClick={() => setLanguage(language === 'en' ? 'id' : 'en')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 text-sm font-medium"
            >
              <Globe className="w-4 h-4" />
              {language === 'en' ? 'English (EN)' : 'Indonesia (ID)'}
            </button>
          </div>
          <button
            onClick={() => scrollToSection('about')}
            className="text-left py-2 px-3 rounded-lg text-slate-700 hover:text-[#023E8A] hover:bg-[#E5FAFF] font-medium transition-all"
          >
            {t('nav.about')}
          </button>
          <button
            onClick={() => scrollToSection('services')}
            className="text-left py-2 px-3 rounded-lg text-slate-700 hover:text-[#023E8A] hover:bg-[#E5FAFF] font-medium transition-all"
          >
            {t('nav.services')}
          </button>
          <button
            onClick={() => scrollToSection('portfolio')}
            className="text-left py-2 px-3 rounded-lg text-slate-700 hover:text-[#023E8A] hover:bg-[#E5FAFF] font-medium transition-all"
          >
            {t('nav.portfolio')}
          </button>
          <button
            onClick={() => scrollToSection('contact-us')}
            className="text-left py-2 px-3 rounded-lg text-slate-700 hover:text-[#023E8A] hover:bg-[#E5FAFF] font-medium transition-all"
          >
            {t('nav.contact')}
          </button>
          <div className="pt-4 border-t border-slate-100">
            <button
              onClick={() => {
                setIsOpen(false);
                onCtaClick();
              }}
              className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-white bg-[#023E8A]"
            >
              {t('nav.quote')}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
