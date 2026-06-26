import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, ShieldAlert, ArrowUpRight } from 'lucide-react';
import { FAQItem } from '../types';
import { useLanguage } from '../context/LanguageContext';

const FAQ_ITEMS: FAQItem[] = [
  { id: 'pricing', question: 'How does Solivate Studio price its agency projects?', answer: '' },
  { id: 'timeline', question: 'What is the average timeline to launch an MVP or system?', answer: '' },
  { id: 'tech-stack', question: 'What is your preferred technology stack?', answer: '' },
  { id: 'support', question: 'Do you offer post-launch support and security patches?', answer: '' },
  { id: 'nda', question: 'Are my business roadmap, ideas, and intellectual property secure?', answer: '' }
];

export default function FAQ() {
  const { t } = useLanguage();
  const [openId, setOpenId] = useState<string | null>('pricing');

  const toggleAccordion = (id: string) => setOpenId(openId === id ? null : id);

  const scrollToContact = () => {
    const target = document.getElementById('contact-us');
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-28 bg-paper relative scroll-mt-20 font-body overflow-hidden">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-5">
          <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-navy">
            <span className="w-8 h-px bg-navy" />
            {t('faq.badge')}
            <span className="w-8 h-px bg-navy" />
          </span>
          <h2 className="font-display tracking-display text-4xl sm:text-5xl font-semibold text-ink leading-[1.06]">
            {t('faq.title')}
          </h2>
          <p className="text-mute text-lg">
            {t('faq.subtitle')}
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {FAQ_ITEMS.map((item) => {
            const isOpen = openId === item.id;

            return (
              <div
                key={item.id}
                className={`rounded-2xl transition-all duration-300 border ${
                  isOpen
                    ? 'bg-paper border-navy/30 shadow-[0_18px_40px_-24px_rgba(15,23,42,0.25)]'
                    : 'bg-cloud border-line hover:border-navy/20'
                }`}
              >
                <button
                  onClick={() => toggleAccordion(item.id)}
                  className="w-full flex items-center justify-between p-6 text-left cursor-pointer group gap-4"
                >
                  <span className={`font-display text-base sm:text-lg font-semibold transition-colors ${
                    isOpen ? 'text-navy' : 'text-ink group-hover:text-navy'
                  }`}>
                    {t(`faq.items.${item.id}.question`)}
                  </span>

                  <div className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 shrink-0 ${
                    isOpen ? 'bg-navy text-paper rotate-45' : 'bg-zinc text-mute group-hover:bg-zinc'
                  }`}>
                    <Plus className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-0 text-left">
                        <div className="pl-4 border-l-2 border-lime">
                          <p className="text-mute text-sm sm:text-base leading-relaxed">
                            {t(`faq.items.${item.id}.answer`)}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Support callout */}
        <div className="mt-10 p-6 navy-card flex flex-col sm:flex-row items-center justify-between gap-4 text-left relative overflow-hidden">
          <div className="relative flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-lime/20 text-lime flex items-center justify-center shrink-0">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <p className="text-sm text-paper/90">
              {t('faq.support_prompt')}
            </p>
          </div>
          <button
            onClick={scrollToContact}
            className="group relative inline-flex items-center gap-2 pl-5 pr-2 py-2 rounded-full text-xs font-semibold uppercase tracking-wide bg-lime text-ink shrink-0 transition-all cursor-pointer"
          >
            {t('faq.support_btn')}
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-ink text-lime transition-transform duration-300 group-hover:rotate-45">
              <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </button>
        </div>

      </div>
    </section>
  );
}
