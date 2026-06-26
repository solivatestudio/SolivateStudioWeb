import { motion } from 'motion/react';
import { ArrowUpRight, Code2, Users, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface HeroProps {
  onCtaClick: () => void;
  onExploreClick: () => void;
}

const AVATARS = [
  { initials: 'AD', cls: 'bg-navy' },
  { initials: 'MC', cls: 'bg-indigo' },
  { initials: 'KP', cls: 'bg-slate' },
  { initials: 'JS', cls: 'bg-navy-deep' }
];

const STATS = [
  { valKey: 'hero.stat1_val', labelKey: 'hero.stat1_label' },
  { valKey: 'hero.stat2_val', labelKey: 'hero.stat2_label' },
  { valKey: 'hero.stat3_val', labelKey: 'hero.stat3_label' }
];

const MARQUEE = ['CUSTOM SOFTWARE', 'CLOUD ARCHITECTURE', 'DEVOPS', 'UI / UX DESIGN', 'SAAS', 'MOBILE APPS'];

export default function Hero({ onCtaClick, onExploreClick }: HeroProps) {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-screen pt-36 pb-20 flex flex-col justify-center overflow-hidden bg-paper">
      {/* Soft dotted grid + faint navy wash */}
      <div className="absolute inset-0 z-0 bg-dot-grid opacity-70 pointer-events-none" />
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(ellipse 720px 480px at 82% 4%, rgba(212, 255, 61, 0.18), transparent 60%),
            radial-gradient(ellipse 640px 460px at 4% 30%, rgba(2, 62, 138, 0.07), transparent 70%)
          `
        }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid lg:grid-cols-12 gap-14 lg:gap-10 items-center">

          {/* Copy */}
          <div className="lg:col-span-7 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-line bg-paper/70 backdrop-blur-sm"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-navy animate-pulse" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate">{t('hero.badge')}</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mt-7 font-display tracking-display text-[2.6rem] sm:text-6xl lg:text-[4.6rem] font-semibold text-ink leading-[1.04]"
            >
              {t('hero.title1')}{' '}
              <span className="serif-accent text-navy">Solivate</span>{' '}
              {t('hero.title2')}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-6 text-mute text-lg sm:text-xl max-w-xl mx-auto lg:mx-0 leading-relaxed"
            >
              {t('hero.subtitle')}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-9 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            >
              <button
                onClick={onCtaClick}
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 pl-8 pr-3 py-3.5 rounded-full text-base font-semibold text-paper bg-navy hover:bg-navy-deep transition-all cursor-pointer"
              >
                {t('hero.cta1')}
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-lime text-ink transition-transform duration-300 group-hover:rotate-45">
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </button>

              <button
                onClick={onExploreClick}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-base font-semibold text-ink bg-paper border border-line hover:border-navy/40 hover:bg-zinc transition-all cursor-pointer"
              >
                {t('hero.cta2')}
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.45 }}
              className="mt-12 flex flex-col sm:flex-row items-center gap-8 justify-center lg:justify-start"
            >
              <div className="flex items-center gap-3.5">
                <div className="flex -space-x-3">
                  {AVATARS.map((a) => (
                    <div
                      key={a.initials}
                      className={`w-10 h-10 rounded-full border-2 border-paper ${a.cls} flex items-center justify-center text-[10px] font-bold text-paper`}
                    >
                      {a.initials}
                    </div>
                  ))}
                </div>
                <div className="text-left">
                  <div className="text-navy text-sm font-bold leading-none tracking-wider">★★★★★</div>
                  <span className="text-[11px] text-mute font-medium">
                    {t('hero.badge3_val')} · {t('hero.badge3_label')}
                  </span>
                </div>
              </div>

              <div className="hidden sm:block w-px h-10 bg-line" />

              <div className="flex items-center gap-7">
                {STATS.map((s) => (
                  <div key={s.valKey} className="text-center lg:text-left">
                    <span className="block font-display text-2xl font-semibold text-ink">{t(s.valKey)}</span>
                    <span className="text-[11px] text-mute uppercase tracking-wider font-medium">{t(s.labelKey)}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Visual */}
          <div className="lg:col-span-5 relative flex justify-center items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-md"
            >
              <div className="relative rounded-[2rem] overflow-hidden border border-line bg-zinc shadow-[0_40px_80px_-40px_rgba(15,23,42,0.35)]">
                <img
                  src="/images/hero.svg"
                  alt="Solivate Studio abstract artwork"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center select-none pointer-events-none"
                />

                <div className="absolute bottom-5 left-5 right-5 bg-paper/90 backdrop-blur-md p-4 rounded-2xl border border-line flex items-center gap-4">
                  <div className="w-11 h-11 rounded-xl bg-navy text-paper flex items-center justify-center shrink-0">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <h4 className="font-display font-semibold text-ink text-sm">{t('hero.badge1_title')}</h4>
                    <p className="text-xs text-mute">{t('hero.badge1_desc')}</p>
                  </div>
                </div>
              </div>

              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
                className="absolute -top-5 -right-4 bg-paper p-3 rounded-2xl shadow-[0_20px_40px_-20px_rgba(15,23,42,0.4)] border border-line items-center gap-3 hidden sm:flex"
              >
                <div className="w-8 h-8 rounded-lg bg-navy text-paper flex items-center justify-center">
                  <Code2 className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <span className="block text-[10px] uppercase font-bold text-mute tracking-wider">{t('hero.badge2_label')}</span>
                  <span className="text-xs font-semibold text-ink">{t('hero.badge2_val')}</span>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut', delay: 1 }}
                className="absolute -bottom-5 -left-4 bg-paper p-3 rounded-2xl shadow-[0_20px_40px_-20px_rgba(15,23,42,0.4)] border border-line items-center gap-3 hidden sm:flex"
              >
                <div className="w-8 h-8 rounded-lg bg-lime text-ink flex items-center justify-center">
                  <Users className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <span className="block text-[10px] uppercase font-bold text-mute tracking-wider">{t('hero.badge3_label')}</span>
                  <span className="text-xs font-semibold text-ink">{t('hero.badge3_val')}</span>
                </div>
              </motion.div>
            </motion.div>
          </div>

        </div>
      </div>

      {/* Marquee strip */}
      <div className="relative z-10 mt-16 border-y border-line py-4 overflow-hidden bg-zinc/50">
        <div className="flex w-max animate-marquee">
          {[...MARQUEE, ...MARQUEE].map((item, i) => (
            <span key={i} className="flex items-center gap-4 px-6 text-sm font-display font-medium uppercase tracking-[0.2em] text-mute whitespace-nowrap">
              {item}
              <span className="w-1.5 h-1.5 rounded-full bg-navy" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
