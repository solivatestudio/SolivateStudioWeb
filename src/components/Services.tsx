import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, ArrowUpRight, HelpCircle, Plus } from 'lucide-react';
import { Service } from '../types';
import { useLanguage } from '../context/LanguageContext';

const SERVICES: Service[] = [
  {
    id: 'custom-software',
    title: 'Custom Software Development',
    description: 'Bespoke corporate SaaS, high-throughput web architecture, and secure internal software.',
    icon: 'Code2',
    tags: ['SaaS Engineering', 'API Integration', 'React / NextJS', 'Go Backends']
  },
  {
    id: 'cloud-architecture',
    title: 'Cloud Architecture & Scalability',
    description: 'Infrastructure designed for 99.99% availability with secure cloud meshes and replicas.',
    icon: 'Cloud',
    tags: ['Google Cloud / AWS', 'Managed DBs', 'Cybersecurity', 'Disaster Recovery']
  },
  {
    id: 'devops-automation',
    title: 'DevOps Automation & Pipelines',
    description: 'Say goodbye to manual deployments. Secure Docker containers, Kubernetes, and Terraform.',
    icon: 'Terminal',
    tags: ['CI/CD Pipelines', 'Docker & K8s', 'Terraform IaC', 'Monitoring & Alerts']
  },
  {
    id: 'ui-ux-strategy',
    title: 'Product & UI/UX Design System',
    description: 'High-converting interfaces mapped down to fine interactions and flawless Figma assets.',
    icon: 'Compass',
    tags: ['UX Strategy', 'Figma Libraries', 'Interactive Mockups', 'Visual Design']
  }
];

export default function Services() {
  const [activeService, setActiveService] = useState<string>(SERVICES[0].id);
  const { t } = useLanguage();

  const scrollToContact = () => {
    const target = document.getElementById('contact-us');
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="services" className="py-28 bg-paper relative scroll-mt-20 font-body overflow-hidden">
      <div className="absolute inset-0 bg-dot-grid opacity-50 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 gap-6">
          <div className="space-y-5 max-w-2xl text-left">
            <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-navy">
              <span className="w-8 h-px bg-navy" />
              {t('services.badge')}
            </span>
            <h2 className="font-display tracking-display text-4xl sm:text-5xl font-semibold text-ink leading-[1.06]">
              {t('services.title')}
            </h2>
          </div>
          <p className="text-mute max-w-sm text-left text-base">
            {t('services.subtitle')}
          </p>
        </div>

        {/* Split-screen */}
        <div className="grid lg:grid-cols-12 gap-10 items-start">

          {/* Numbered list */}
          <div className="lg:col-span-7 border-t border-line">
            {SERVICES.map((service, index) => {
              const isActive = activeService === service.id;
              const numStr = `0${index + 1}`;

              return (
                <button
                  key={service.id}
                  onClick={() => setActiveService(service.id)}
                  className={`group w-full flex items-center justify-between py-7 px-5 transition-all duration-300 cursor-pointer text-left select-none border-b border-line ${
                    isActive
                      ? 'bg-zinc border-l-2 border-l-navy pl-6'
                      : 'hover:bg-zinc/60 border-l-2 border-l-transparent'
                  }`}
                >
                  <div className="flex items-center gap-7 min-w-0">
                    <span className={`font-display text-sm font-bold tracking-wider transition-colors ${
                      isActive ? 'text-navy' : 'text-mute/60'
                    }`}>
                      ({numStr})
                    </span>
                    <div className="space-y-1 min-w-0">
                      <h3 className={`font-display text-xl sm:text-2xl font-semibold transition-colors ${
                        isActive ? 'text-ink' : 'text-ink/70 group-hover:text-navy'
                      }`}>
                        {t(`services.items.${service.id}.title`)}
                      </h3>
                      <p className="text-mute text-xs line-clamp-1 max-w-md">
                        {t(`services.items.${service.id}.desc`)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 shrink-0 pl-4">
                    <div className="hidden sm:flex gap-1.5">
                      {(t(`services.items.${service.id}.tags`) as string[]).slice(0, 2).map((tag: string) => (
                        <span key={tag} className="text-[10px] px-2.5 py-1 bg-zinc border border-line text-mute rounded-full font-medium">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-300 ${
                      isActive
                        ? 'bg-navy text-paper border-navy rotate-45'
                        : 'border-line text-mute group-hover:bg-navy group-hover:text-paper group-hover:border-navy'
                    }`}>
                      <Plus className="w-4 h-4" />
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Detail panel */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <div className="navy-card p-8 space-y-6 text-left relative overflow-hidden text-paper">
              <div className="absolute top-0 right-0 w-32 h-32 bg-lime/15 rounded-full blur-3xl pointer-events-none" />

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeService}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3 }}
                  className="relative space-y-6"
                >
                  <div>
                    <span className="inline-block text-[10px] bg-lime/20 text-lime px-2.5 py-1 rounded-full uppercase tracking-[0.16em] font-bold">
                      {t('services.radar_badge')}
                    </span>
                    <h4 className="font-display text-2xl font-semibold mt-3 text-paper">
                      {t(`services.items.${activeService}.title`)}
                    </h4>
                    <p className="text-paper/60 text-xs font-mono mt-1.5">
                      {t('services.tech_caps')} {t(`services.items.${activeService}.tech`)}
                    </p>
                  </div>

                  <div className="border-t border-white/10 pt-6 space-y-4">
                    <h5 className="text-xs font-semibold uppercase text-paper/60 tracking-[0.16em]">
                      {t('services.included')}
                    </h5>
                    <ul className="space-y-3.5">
                      {(t(`services.items.${activeService}.props`) as string[]).map((prop: string, i: number) => (
                        <li key={i} className="flex gap-3 items-start">
                          <CheckCircle2 className="w-5 h-5 text-lime shrink-0 mt-0.5" />
                          <span className="text-sm text-paper/90">{prop}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-navy-deep/50 p-4 rounded-xl border border-white/10 space-y-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-lime">
                      <HelpCircle className="w-4 h-4" />
                      <span>{t('services.custom_needs_title')}</span>
                    </div>
                    <p className="text-xs text-paper/70 leading-relaxed">
                      {t('services.custom_needs_desc')}
                    </p>
                  </div>

                  <button
                    onClick={scrollToContact}
                    className="group w-full inline-flex items-center justify-center gap-2 pl-6 pr-2 py-2.5 bg-lime hover:bg-lime-deep text-ink rounded-full font-semibold text-sm transition-all cursor-pointer"
                  >
                    {t('services.cta_btn')}
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-ink text-lime transition-transform duration-300 group-hover:rotate-45">
                      <ArrowUpRight className="w-4 h-4" />
                    </span>
                  </button>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
