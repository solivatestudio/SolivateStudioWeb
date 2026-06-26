import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, HelpCircle, ShieldAlert } from 'lucide-react';
import { FAQItem } from '../types';
import { useLanguage } from '../context/LanguageContext';

const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'pricing',
    question: 'How does Solivate Studio price its agency projects?',
    answer: 'We provide itemized, milestone-based pricing. We strictly avoid surprise extensions or vague retainer schemes. Every quote features flat fees linked to transparent functional outputs (e.g., Figma deliverables, database clusters, ready-to-test MVPs). If the product scope remains stable, your price stays exactly identical.'
  },
  {
    id: 'timeline',
    question: 'What is the average timeline to launch an MVP or system?',
    answer: 'A standard custom dashboard, native product app, or cloud migration takes between 4 and 8 weeks from kick-off to secure DNS mapping. We work in disciplined 2-week active sprints and give you access to a live, continuous-deployment staging environment so you can monitor features as we compile them.'
  },
  {
    id: 'tech-stack',
    question: 'What is your preferred technology stack?',
    answer: 'We write modular and typed systems for long-term scalability. On the client side, we specialize in React, Next.js, and Tailwind CSS. On the backend, we run high-velocity services built in Go, Node.js, and Python, backed by PostgreSQL, Redis, and secure instances hosted on GCP or AWS.'
  },
  {
    id: 'support',
    question: 'Do you offer post-launch support and security patches?',
    answer: 'Absolutely. We offer customized Service Level Agreements (SLAs) ranging from standard bug preservation to 24/7 high-availability infrastructure maintenance. This includes weekly dependency security patching, database optimization sweeps, and server performance profiling.'
  },
  {
    id: 'nda',
    question: 'Are my business roadmap, ideas, and intellectual property secure?',
    answer: 'Yes. Before discussing any project details or database architectures, we sign formal mutual Non-Disclosure Agreements (NDAs). Upon final project payment, full intellectual property rights, repository ownership, deployment credentials, and Figma assets are fully transferred to your company.'
  }
];

export default function FAQ() {
  const { t } = useLanguage();
  const [openId, setOpenId] = useState<string | null>('pricing');

  const toggleAccordion = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="py-24 bg-[#E5FAFF]/30 relative scroll-mt-20">
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-[#E5FAFF]/50 rounded-full blur-3xl pointer-events-none -translate-x-1/2" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-sm font-semibold uppercase tracking-wider text-[#023E8A]">{t('faq.badge')}</span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900">
            {t('faq.title')}
          </h2>
          <div className="w-16 h-1 bg-[#023E8A] mx-auto rounded-full" />
          <p className="text-[#023E8A]/80 font-light text-base sm:text-lg">
            {t('faq.subtitle')}
          </p>
        </div>

        {/* Toggles */}
        <div className="space-y-4">
          {FAQ_ITEMS.map((item) => {
            const isOpen = openId === item.id;
            
            return (
              <div
                key={item.id}
                className={`sleek-card rounded-2xl transition-all duration-300 ${
                  isOpen
                    ? 'border-[#023E8A]/30 ring-1 ring-[#023E8A]/10'
                    : 'opacity-90'
                }`}
              >
                <button
                  onClick={() => toggleAccordion(item.id)}
                  className="w-full flex items-center justify-between p-6 text-left cursor-pointer group"
                >
                  <div className="flex gap-4 items-center pr-4">
                    <HelpCircle className={`w-5 h-5 shrink-0 transition-colors ${
                      isOpen ? 'text-[#023E8A]' : 'text-slate-400 group-hover:text-slate-600'
                    }`} />
                    <span className="font-serif text-base sm:text-lg font-bold text-slate-800">
                      {t(`faq.items.${item.id}.question`)}
                    </span>
                  </div>
                  
                  <div className={`w-8 h-8 rounded-full border border-slate-100 flex items-center justify-center transition-all shrink-0 ${
                    isOpen ? 'bg-[#023E8A] text-white' : 'bg-slate-50 text-slate-500 group-hover:bg-[#E5FAFF]'
                  }`}>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-350 ${
                      isOpen ? 'transform rotate-180' : ''
                    }`} />
                  </div>
                </button>

                {/* Animated Accordion body content */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-1 border-t border-slate-100/50 text-left">
                        <p className="text-slate-600 text-sm sm:text-base font-light leading-relaxed">
                          {t(`faq.items.${item.id}.answer`)}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Support CTA Callout */}
        <div className="mt-12 text-center p-6 bg-slate-50 border border-slate-100 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-left">
            <ShieldAlert className="w-5 h-5 text-[#023E8A] shrink-0" />
            <p className="text-xs text-slate-500">
              {t('faq.support_prompt')}
            </p>
          </div>
          <button
            onClick={() => {
              const target = document.getElementById('contact-us');
              if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="text-xs font-semibold uppercase bg-white border hover:bg-slate-50 text-[#023E8A] border-[#DCEFF5] hover:border-slate-300 px-4 py-2.5 rounded-lg shrink-0 transition-colors cursor-pointer"
          >
            {t('faq.support_btn')}
          </button>
        </div>

      </div>
    </section>
  );
}
