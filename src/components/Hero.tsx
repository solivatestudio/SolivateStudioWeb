import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Play, Sparkles, Code2, Users, Rocket } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface HeroProps {
  onCtaClick: () => void;
  onExploreClick: () => void;
}

export default function Hero({ onCtaClick, onExploreClick }: HeroProps) {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-screen pt-32 pb-20 flex items-center overflow-hidden bg-gradient-to-b from-[#E5FAFF]/60 via-white to-white">
      {/* Abstract Background Accents */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#E5FAFF]/80 rounded-full blur-3xl -z-10 translate-x-1/4 -translate-y-1/4" />
      <div className="absolute bottom-10 left-10 w-[300px] h-[300px] bg-sky-100/40 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* Typography Content */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#023E8A]/10 text-[#023E8A] text-xs font-semibold tracking-wide uppercase shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              <span>{t('hero.badge')}</span>
            </motion.div>

            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 leading-[1.1]"
              >
                {t('hero.title1')}{' '}
                <span className="text-[#023E8A] italic relative">
                  Solivate
                  <span className="absolute bottom-1 left-0 w-full h-[6px] bg-[#E5FAFF] -z-10" />
                </span>{' '}
                {t('hero.title2')}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="text-slate-600 text-lg sm:text-xl max-w-2xl mx-auto lg:mx-0 font-light leading-relaxed"
              >
                {t('hero.subtitle')}
              </motion.p>
            </div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            >
              <button
                onClick={onCtaClick}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl text-base font-semibold text-white bg-[#023E8A] hover:bg-[#023E8A]/95 transition-all shadow-lg shadow-[#023E8A]/25 cursor-pointer hover:-translate-y-0.5"
              >
                {t('hero.cta1')}
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                onClick={onExploreClick}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-semibold text-slate-800 bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all cursor-pointer"
              >
                {t('hero.cta2')}
              </button>
            </motion.div>

            {/* Social Proof / Mini Stats Row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="pt-6 border-t border-slate-100 flex flex-wrap justify-center lg:justify-start gap-8 mt-4"
            >
              <div>
                <span className="block font-serif text-3xl font-bold text-[#023E8A]">{t('hero.stat1_val')}</span>
                <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">{t('hero.stat1_label')}</span>
              </div>
              <div className="border-r border-slate-200 hidden sm:block" />
              <div>
                <span className="block font-serif text-3xl font-bold text-[#023E8A]">{t('hero.stat2_val')}</span>
                <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">{t('hero.stat2_label')}</span>
              </div>
              <div className="border-r border-slate-200 hidden sm:block" />
              <div>
                <span className="block font-serif text-3xl font-bold text-[#023E8A]">{t('hero.stat3_val')}</span>
                <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">{t('hero.stat3_label')}</span>
              </div>
            </motion.div>
          </div>

          {/* Graphic Side */}
          <div className="lg:col-span-5 relative flex justify-center items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, type: 'spring' }}
              className=""
            >
              <img
                src="/images/hero.svg"
                alt="Solivate Studio Abstract 3D Artwork"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center select-none pointer-events-none"
              />

              {/* Overlay shadow */}
              <div className="absolute inset-0 pointer-events-none" />

              {/* Dynamic Floating Glass Badge 1 */}
              <div className="absolute bottom-6 left-6 right-6 sm:bottom-8 sm:left-8 sm:right-8 bg-white/80 backdrop-blur-md p-4 rounded-2xl border border-white/40 shadow-xl flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-[#E5FAFF] text-[#023E8A] flex items-center justify-center shrink-0">
                  <Rocket className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 text-sm">{t('hero.badge1_title')}</h4>
                  <p className="text-xs text-slate-600">{t('hero.badge1_desc')}</p>
                </div>
              </div>
            </motion.div>

            {/* floating elements */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
              className="absolute -top-6 -right-6 bg-white/95 p-3 rounded-2xl shadow-lg border border-[#E5FAFF] flex items-center gap-3 hidden sm:flex"
            >
              <div className="w-8 h-8 rounded-lg bg-[#023E8A] text-white flex items-center justify-center">
                <Code2 className="w-4 h-4" />
              </div>
              <div className="text-left">
                <span className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider">{t('hero.badge2_label')}</span>
                <span className="text-xs font-semibold text-slate-800">{t('hero.badge2_val')}</span>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut', delay: 1 }}
              className="absolute -bottom-6 -left-6 bg-white/95 p-3 rounded-2xl shadow-lg border border-[#E5FAFF] flex items-center gap-3 hidden sm:flex"
            >
              <div className="w-8 h-8 rounded-lg bg-emerald-500 text-white flex items-center justify-center">
                <Users className="w-4 h-4" />
              </div>
              <div className="text-left">
                <span className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider">{t('hero.badge3_label')}</span>
                <span className="text-xs font-semibold text-slate-800">{t('hero.badge3_val')}</span>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
