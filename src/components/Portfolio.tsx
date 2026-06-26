import { useState } from 'react';
import type React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, ShieldCheck, Heart } from 'lucide-react';
import { PortfolioItem } from '../types';
import { useLanguage } from '../context/LanguageContext';

const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: 'banking-saas',
    title: 'Acme Wealth Global Dashboard',
    category: 'SaaS Systems',
    description: 'A multi-currency banking system with instantaneous transaction streams and custom compliance reports.',
    image: '/images/portfolio_saas_1781799718522.jpg',
    stars: 5,
    link: '#banking-saas'
  },
  {
    id: 'nexus-cloud',
    title: 'Nexus DataMesh Cloud Infra',
    category: 'Cloud & DevOps',
    description: 'An enterprise cloud deployment orchestrating isolated customer VPC networks and scalable compute clusters.',
    image: '/images/portfolio_cloud_1781799732798.jpg',
    stars: 5,
    link: '#nexus-cloud'
  },
  {
    id: 'workspace-mobile',
    title: 'Solivate Shift Enterprise Mobile Hub',
    category: 'Mobile Apps',
    description: 'A premium native mobile workspace facilitating secure corporate chats, task syncing, and offline databases.',
    image: '/images/portfolio_mobile_1781799748021.jpg',
    stars: 5,
    link: '#workspace-mobile'
  }
];

const CATEGORY_LABEL_KEYS: { [key: string]: string } = {
  'SaaS Systems': 'portfolio.categories.saas',
  'Cloud & DevOps': 'portfolio.categories.cloud',
  'Mobile Apps': 'portfolio.categories.mobile'
};

export default function Portfolio() {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [likedProjects, setLikedProjects] = useState<string[]>([]);

  const CATEGORIES = [
    { id: 'all', label: t('portfolio.categories.all') },
    { id: 'saas', label: t('portfolio.categories.saas') },
    { id: 'cloud', label: t('portfolio.categories.cloud') },
    { id: 'mobile', label: t('portfolio.categories.mobile') }
  ];

  const toggleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedProjects((prev) =>
      prev.includes(id) ? prev.filter((pId) => pId !== id) : [...prev, id]
    );
  };

  const filteredItems = selectedCategory === 'all'
    ? PORTFOLIO_ITEMS
    : PORTFOLIO_ITEMS.filter((item) => {
        if (selectedCategory === 'saas') return item.category === 'SaaS Systems';
        if (selectedCategory === 'cloud') return item.category === 'Cloud & DevOps';
        if (selectedCategory === 'mobile') return item.category === 'Mobile Apps';
        return false;
      });

  return (
    <section id="portfolio" className="py-28 bg-paper relative scroll-mt-20 font-body overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-14 gap-8">
          <div className="space-y-5 max-w-2xl text-left">
            <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-navy">
              <span className="w-8 h-px bg-navy" />
              {t('portfolio.badge')}
            </span>
            <h2 className="font-display tracking-display text-4xl sm:text-5xl font-semibold text-ink leading-[1.06]">
              {t('portfolio.title')}
            </h2>
            <p className="text-mute text-lg">
              {t('portfolio.subtitle')}
            </p>
          </div>

          {/* Filter tabs */}
          <div className="flex flex-wrap items-center gap-1.5 bg-zinc p-1.5 rounded-full border border-line">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all uppercase cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-navy text-paper shadow-sm'
                    : 'text-mute hover:text-ink hover:bg-paper'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.4 }}
                className="group surface-card rounded-[1.5rem] overflow-hidden flex flex-col"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-zinc border-b border-line">
                  <img
                    src={item.image}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 pointer-events-none select-none"
                  />

                  <div className="absolute top-4 left-4 bg-paper/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-line text-xs font-semibold text-navy shadow-sm">
                    {t(CATEGORY_LABEL_KEYS[item.category])}
                  </div>

                  <button
                    onClick={(e) => toggleLike(item.id, e)}
                    className="absolute top-4 right-4 w-9 h-9 bg-paper/90 backdrop-blur-md hover:bg-paper rounded-full border border-line text-mute hover:text-rose-500 flex items-center justify-center transition-all shadow-sm cursor-pointer"
                  >
                    <Heart className={`w-4 h-4 ${likedProjects.includes(item.id) ? 'fill-rose-500 stroke-rose-500' : ''}`} />
                  </button>

                  <div className="absolute inset-0 bg-gradient-to-t from-navy/85 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6 pointer-events-none">
                    <div className="text-paper flex items-center gap-1.5 font-medium text-xs">
                      <span>{t('portfolio.preview_summary')}</span>
                      <ArrowUpRight className="w-4 h-4 text-lime" />
                    </div>
                  </div>
                </div>

                {/* Info */}
                <div className="p-6 text-left space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex gap-1.5 items-center">
                      <ShieldCheck className="w-4 h-4 text-navy" />
                      <span className="text-[10px] text-mute uppercase font-bold tracking-[0.16em]">{t('portfolio.locked')}</span>
                    </div>
                    <h3 className="font-display text-xl font-semibold text-ink group-hover:text-navy transition-colors leading-snug">
                      {t(`portfolio.items.${item.id}.title`)}
                    </h3>
                    <p className="text-mute text-sm leading-relaxed">
                      {t(`portfolio.items.${item.id}.desc`)}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-line flex items-center justify-between text-xs font-semibold text-ink">
                    <span className="text-mute font-mono">{t('portfolio.success')}</span>
                    <span className="inline-flex items-center gap-1.5 group-hover:gap-2.5 transition-all cursor-pointer text-navy">
                      {t('portfolio.case_study')}
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}
