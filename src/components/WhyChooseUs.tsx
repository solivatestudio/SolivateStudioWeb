import { motion } from 'motion/react';
import { Layers, ArrowUpRight, ShieldCheck, Database } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function WhyChooseUs() {
  const { t } = useLanguage();

  const scrollToContact = () => {
    const element = document.getElementById('contact-us');
    if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section id="about" className="py-28 bg-cloud relative scroll-mt-20 font-body overflow-hidden">
      <div className="absolute inset-0 bg-line-grid opacity-60 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <div className="max-w-3xl mb-16 space-y-5">
          <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-navy">
            <span className="w-8 h-px bg-navy" />
            {t('why.badge')}
          </span>
          <h2 className="font-display tracking-display text-4xl sm:text-5xl font-semibold text-ink leading-[1.06]">
            {t('why.title')}
          </h2>
          <p className="text-mute text-lg max-w-2xl">
            {t('why.subtitle')}
          </p>
        </div>

        {/* Bento 3-col */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Card 1: navy accent card, lime number */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="navy-card relative w-full p-8 overflow-hidden h-[380px] lg:h-[420px] flex flex-col justify-between shadow-[0_30px_60px_-30px_rgba(2,42,94,0.55)] text-left"
          >
            <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:18px_18px] pointer-events-none" />
            <div className="relative space-y-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-lime/20 text-lime text-[10px] font-bold uppercase tracking-[0.18em]">
                {t('why.guarantee')}
              </span>
              <h3 className="font-display text-3xl font-semibold leading-tight max-w-xs">
                {t('why.cards.card1_title')}
              </h3>
            </div>

            <div className="relative rounded-2xl bg-navy-deep/50 border border-white/10 p-5 backdrop-blur-sm">
              <div className="flex items-end justify-between">
                <div>
                  <span className="block text-5xl font-display font-semibold text-lime">99.4%</span>
                  <span className="text-[10px] text-paper/70 uppercase font-bold tracking-[0.18em] mt-1 block">{t('why.cards.card1_metric_label')}</span>
                </div>
                <div className="w-11 h-11 rounded-xl bg-white/10 text-lime flex items-center justify-center">
                  <Layers className="w-5 h-5" />
                </div>
              </div>
              <p className="mt-3 text-xs text-paper/80 leading-relaxed">
                {t('why.cards.card1_desc')}
              </p>
            </div>
          </motion.div>

          {/* Card 2: light surface + system mockup */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="surface-card relative w-full p-8 overflow-hidden h-[380px] lg:h-[420px] flex flex-col justify-between text-left"
          >
            <div className="space-y-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-navy/8 text-navy text-[10px] font-bold uppercase tracking-[0.18em]">
                {t('why.badge')}
              </span>
              <h3 className="font-display text-2xl font-semibold text-ink leading-snug">
                {t('why.cards.card2_title')}
              </h3>
              <p className="text-mute text-sm leading-relaxed">
                {t('why.cards.card2_desc')}
              </p>
            </div>

            <div className="relative rounded-2xl bg-zinc border border-line p-4 w-full space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-line">
                <div className="flex items-center gap-2">
                  <Database className="w-3.5 h-3.5 text-navy" />
                  <span className="text-[9px] font-mono text-mute">system_schema.ts</span>
                </div>
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-lime" />
                  <div className="w-2.5 h-2.5 rounded-full bg-indigo" />
                  <div className="w-2.5 h-2.5 rounded-full bg-navy" />
                </div>
              </div>
              <div className="space-y-2.5">
                <div className="flex items-center justify-between text-[10px] text-mute font-mono">
                  <span>fast_loading_index</span>
                  <span className="text-navy font-semibold">99%</span>
                </div>
                <div className="h-1.5 w-full bg-line rounded-full overflow-hidden">
                  <div className="h-full bg-navy w-[92%]" />
                </div>
                <div className="flex items-center justify-between text-[10px] text-mute font-mono">
                  <span>database_replica_sync</span>
                  <span className="text-indigo font-semibold">87%</span>
                </div>
                <div className="h-1.5 w-full bg-line rounded-full overflow-hidden">
                  <div className="h-full bg-indigo w-[87%]" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 3: consultation + tags */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="surface-card relative w-full p-8 overflow-hidden h-[380px] lg:h-[420px] flex flex-col justify-between text-left"
          >
            <div className="space-y-4">
              <div className="w-11 h-11 rounded-xl bg-navy/8 text-navy flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-display text-2xl font-semibold text-ink leading-snug">
                {t('why.cards.card3_title')}
              </h3>
              <p className="text-mute text-sm leading-relaxed">
                {t('why.cards.card3_desc')}
              </p>

              <button
                onClick={scrollToContact}
                className="group inline-flex gap-2 pl-5 pr-2 py-2 items-center justify-center bg-navy hover:bg-navy-deep text-paper text-xs font-semibold rounded-full transition-all cursor-pointer"
              >
                {t('why.cards.card3_cta')}
                <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-lime text-ink transition-transform duration-300 group-hover:rotate-45">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </button>
            </div>

            <div className="flex flex-wrap gap-2 mt-auto">
              {['#Web Development', '#UI/UX Design', '#Cloud & DevOps', '#Custom SaaS'].map((tag) => (
                <span key={tag} className="text-[10px] text-mute px-3 py-1.5 rounded-full border border-line bg-zinc font-medium">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
