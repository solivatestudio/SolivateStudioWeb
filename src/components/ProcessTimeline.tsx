import type React from 'react';
import { motion } from 'motion/react';
import { Search, PenTool, Braces, Sparkles, AlertCircle } from 'lucide-react';
import { ProcessStep } from '../types';
import { useLanguage } from '../context/LanguageContext';

const PROCESS_STEPS: (ProcessStep & { icon: string })[] = [
  {
    stepNumber: 1,
    title: 'Discovery & Strategy',
    description: 'Interactive alignment sessions, technical flowcharts, custom user stories, and precise scope bounds.',
    duration: 'Week 1',
    icon: 'Search'
  },
  {
    stepNumber: 2,
    title: 'Design & Architecture',
    description: 'High-fidelity Figma prototypes alongside system schematics and entity relationship diagrams.',
    duration: 'Weeks 2-3',
    icon: 'PenTool'
  },
  {
    stepNumber: 3,
    title: 'Agile Software Development',
    description: 'Bi-weekly sprints shipping modular features to a secure private staging server with demo links.',
    duration: 'Weeks 4-8',
    icon: 'Braces'
  },
  {
    stepNumber: 4,
    title: 'Pristine QA & Deployment',
    description: 'Automated testing, penetration sweeps, responsive audits, monitoring dashboards, and a seamless launch.',
    duration: 'Weeks 9+',
    icon: 'Sparkles'
  }
];

const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
  Search,
  PenTool,
  Braces,
  Sparkles
};

export default function ProcessTimeline() {
  const { t } = useLanguage();

  return (
    <section className="py-28 bg-cloud relative overflow-hidden font-body">
      <div className="absolute inset-0 bg-line-grid opacity-50 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-20 space-y-5">
          <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-navy">
            <span className="w-8 h-px bg-navy" />
            {t('process.badge')}
            <span className="w-8 h-px bg-navy" />
          </span>
          <h2 className="font-display tracking-display text-4xl sm:text-5xl font-semibold text-ink leading-[1.06]">
            {t('process.title')}
          </h2>
          <p className="text-mute text-lg">
            {t('process.subtitle')}
          </p>
        </div>

        {/* Timeline */}
        <div className="relative max-w-3xl mx-auto">
          <div className="absolute left-[27px] top-4 bottom-4 w-px bg-gradient-to-b from-navy/40 via-navy to-navy/40" />

          <div className="space-y-10">
            {PROCESS_STEPS.map((step, index) => {
              const IconComponent = iconMap[step.icon] || Search;

              return (
                <motion.div
                  key={step.stepNumber}
                  initial={{ opacity: 0, x: 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.6, delay: index * 0.05 }}
                  className="relative flex items-start gap-6"
                >
                  <div className="relative z-10 shrink-0">
                    <div className="w-14 h-14 rounded-2xl bg-navy border border-navy-deep shadow-[0_12px_24px_-12px_rgba(2,42,94,0.6)] flex items-center justify-center text-lime">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <span className="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full bg-lime text-ink text-[11px] font-display font-bold flex items-center justify-center border-2 border-cloud">
                      {step.stepNumber}
                    </span>
                  </div>

                  <div className="flex-1 surface-card rounded-2xl p-6 text-left">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-navy/8 text-navy text-[10px] font-bold uppercase tracking-[0.16em] mb-3">
                      {t(`process.items.${index}.duration`)}
                    </span>
                    <h3 className="font-display text-xl font-semibold text-ink mb-1.5">
                      {t(`process.items.${index}.title`)}
                    </h3>
                    <p className="text-mute text-sm leading-relaxed">
                      {t(`process.items.${index}.desc`)}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Warning */}
        <div className="mt-16 max-w-2xl mx-auto surface-card rounded-2xl p-5 flex items-center gap-4 text-left">
          <div className="w-9 h-9 rounded-xl bg-navy/8 text-navy flex items-center justify-center shrink-0">
            <AlertCircle className="w-4 h-4" />
          </div>
          <p className="text-xs text-mute">
            <strong className="text-ink font-semibold">{t('process.warning_bold')}</strong> {t('process.warning_desc')}
          </p>
        </div>

      </div>
    </section>
  );
}
