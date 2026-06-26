import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, ShieldCheck, Heart, Sparkles } from 'lucide-react';
import { PortfolioItem } from '../types';
import { useLanguage } from '../context/LanguageContext';

const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: 'banking-saas',
    title: 'Acme Wealth Global Dashboard',
    category: 'SaaS Systems',
    description: 'A multi-currency banking system with instantaneous transaction streams, real-time balance calculations, and custom compliance reports.',
    image: '/images/portfolio_saas_1781799718522.jpg',
    stars: 5,
    link: '#banking-saas'
  },
  {
    id: 'nexus-cloud',
    title: 'Nexus DataMesh Cloud Infra',
    category: 'Cloud & DevOps',
    description: 'An enterprise cloud deployment orchestrating isolated customer VPC networks, smart caching servers, and scalable cloud compute clusters.',
    image: '/images/portfolio_cloud_1781799732798.jpg',
    stars: 5,
    link: '#nexus-cloud'
  },
  {
    id: 'workspace-mobile',
    title: 'Solivate Shift Enterprise Mobile Hub',
    category: 'Mobile Apps',
    description: 'A premium native mobile workspace facilitating secure corporate chats, tasks syncing, offline databases, and swift notifications.',
    image: '/images/portfolio_mobile_1781799748021.jpg',
    stars: 5,
    link: '#workspace-mobile'
  }
];

const CATEGORIES = ['All', 'SaaS Systems', 'Cloud & DevOps', 'Mobile Apps'];

export default function Portfolio() {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [likedProjects, setLikedProjects] = useState<string[]>([]);

  // Update CATEGORIES inside the component so it translates correctly
  const CATEGORIES = [
    t('portfolio.categories.all'),
    t('portfolio.categories.saas'),
    t('portfolio.categories.cloud'),
    t('portfolio.categories.mobile')
  ];

  // Helper map to match old string to translated
  const catMap: { [key: string]: string } = {
    [t('portfolio.categories.all')]: 'All',
    [t('portfolio.categories.saas')]: 'SaaS Systems',
    [t('portfolio.categories.cloud')]: 'Cloud & DevOps',
    [t('portfolio.categories.mobile')]: 'Mobile Apps'
  };

  const toggleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (likedProjects.includes(id)) {
      setLikedProjects(likedProjects.filter(pId => pId !== id));
    } else {
      setLikedProjects([...likedProjects, id]);
    }
  };

  const filteredItems = selectedCategory === t('portfolio.categories.all')
    ? PORTFOLIO_ITEMS
    : PORTFOLIO_ITEMS.filter(item => item.category === catMap[selectedCategory]);

  return (
    <section id="portfolio" className="py-24 bg-[#E5FAFF]/20 relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-8">
          <div className="space-y-4 max-w-2xl text-center md:text-left">
            <span className="text-sm font-semibold uppercase tracking-wider text-[#023E8A]">{t('portfolio.badge')}</span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight">
              {t('portfolio.title')}
            </h2>
            <div className="w-16 h-1 bg-[#023E8A] rounded-full mx-auto md:mx-0" />
            <p className="text-slate-600 font-light text-base">
              {t('portfolio.subtitle')}
            </p>
          </div>

          {/* Action Filter Nav Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 bg-white/80 p-1.5 rounded-xl border border-slate-200/60 max-w-full">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2.5 rounded-lg text-xs font-semibold tracking-wide transition-all uppercase cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#023E8A] text-white shadow-sm'
                    : 'text-slate-600 hover:text-[#023E8A] hover:bg-slate-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Portfolio Dynamic Grid */}
        <motion.div
          layout
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="group sleek-card rounded-3xl overflow-hidden shadow-sm flex flex-col justify-between"
              >
                {/* Image Section */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-50 border-b border-[#E5FAFF]">
                  <img
                    src={item.image}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 pointer-events-none select-none"
                  />
                  
                  {/* Category Pill Tag */}
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-200/40 text-xs font-semibold text-[#023E8A] shadow-sm flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-amber-500 fill-current" />
                    <span>
                      {item.category === 'SaaS Systems' ? t('portfolio.categories.saas') : 
                       item.category === 'Cloud & DevOps' ? t('portfolio.categories.cloud') : 
                       t('portfolio.categories.mobile')}
                    </span>
                  </div>

                  {/* Favorite button */}
                  <button
                    onClick={(e) => toggleLike(item.id, e)}
                    className="absolute top-4 right-4 w-9 h-9 bg-white/90 backdrop-blur-md hover:bg-white rounded-lg border border-slate-200/40 text-slate-400 hover:text-red-500 flex items-center justify-center transition-all shadow-sm cursor-pointer"
                  >
                    <Heart className={`w-4 h-4 ${likedProjects.includes(item.id) ? 'fill-red-500 stroke-red-500 text-red-500' : ''}`} />
                  </button>

                  {/* Hover visual scan glassmorphism layer */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6 pointer-events-none">
                    <div className="text-white flex items-center gap-1.5 font-medium text-xs">
                      <span>{t('portfolio.preview_summary')}</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                {/* Info Text Box */}
                <div className="p-6 text-left space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex gap-1 items-center">
                      <ShieldCheck className="w-4 h-4 text-emerald-500" />
                      <span className="text-[10px] text-emerald-600 uppercase font-bold tracking-wider">{t('portfolio.locked')}</span>
                    </div>
                    
                    <h3 className="font-serif text-xl font-bold text-slate-800 group-hover:text-[#023E8A] transition-colors leading-snug">
                      {t(`portfolio.items.${item.id}.title`)}
                    </h3>
                    
                    <p className="text-slate-600 text-sm font-light leading-relaxed">
                      {t(`portfolio.items.${item.id}.desc`)}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-50 flex items-center justify-between text-xs font-semibold text-[#023E8A]">
                    <span className="text-slate-400 font-light font-mono">{t('portfolio.success')}</span>
                    <span className="inline-flex items-center gap-1.5 group-hover:underline cursor-pointer">
                      {t('portfolio.case_study')}
                      <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
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
