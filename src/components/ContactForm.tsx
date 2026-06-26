import { useState } from 'react';
import type React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Phone, MapPin, ShieldCheck, Send, CheckCircle2, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const BUDGETS = [
  '< Rp.500.000 (Short MVP)',
  'Rp.500.000 - Rp.1.000.000 (Standard Product)',
  'Rp.1.000.000 - Rp.3.000.000 (Enterprise Suite)',
  '> Rp.3.000.000 (Dedicated Team / Multi-Cloud)'
];

export default function ContactForm() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    budget: BUDGETS[0],
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formError, setFormError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setFormError('Please fill in all required fields (Name, Email, and Project Details).');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setFormError('Please enter a valid business email address.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', company: '', budget: BUDGETS[0], message: '' });
    }, 1200);
  };

  const inputClass = 'w-full px-4 py-3 rounded-xl border border-line bg-zinc focus:border-navy focus:ring-2 focus:ring-navy/15 focus:outline-none text-ink transition-all placeholder-mute/60 text-sm';

  return (
    <section id="contact-us" className="py-28 bg-cloud relative scroll-mt-20 font-body overflow-hidden">
      <div className="absolute inset-0 bg-dot-grid opacity-50 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-5">
          <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-navy">
            <span className="w-8 h-px bg-navy" />
            {t('contact.badge')}
            <span className="w-8 h-px bg-navy" />
          </span>
          <h2 className="font-display tracking-display text-4xl sm:text-5xl font-semibold text-ink leading-[1.06]">
            {t('contact.title')}
          </h2>
          <p className="text-mute text-lg">
            {t('contact.subtitle')}
          </p>
        </div>

        {/* Dual panel */}
        <div className="grid lg:grid-cols-12 gap-10 items-stretch">

          {/* Coordinates */}
          <div className="lg:col-span-5 space-y-8 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="space-y-3 text-left">
                <span className="text-xs font-bold text-navy uppercase tracking-[0.18em] flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-navy animate-pulse" />
                  {t('contact.status')}
                </span>
                <h3 className="font-display text-2xl sm:text-3xl font-semibold text-ink">
                  {t('contact.hq_title')}
                </h3>
                <p className="text-mute text-sm">
                  {t('contact.hq_desc')}
                </p>
              </div>

              <div className="space-y-3">
                {[
                  { Icon: MapPin, label: t('contact.office_label'), value: 'Harvest City, Jl. Orchid Raya A, Ragemanunggal, Setu, Bekasi Regency, West Java 17320', href: null },
                  { Icon: Mail, label: t('contact.email_label'), value: 'imammka23@gmail.com', href: 'mailto:imammka23@gmail.com' },
                  { Icon: Phone, label: t('contact.phone_label'), value: '+62 812-1911-8993', href: 'https://wa.me/6281219118993' }
                ].map(({ Icon, label, value, href }) => (
                  <div key={label} className="flex gap-4 p-4 rounded-2xl surface-card text-left items-center">
                    <div className="w-10 h-10 rounded-xl bg-navy/8 text-navy flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <span className="block text-[10px] uppercase font-bold text-mute tracking-wider">{label}</span>
                      {href ? (
                        <a
                          href={href}
                          target={href.startsWith('http') ? '_blank' : undefined}
                          rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                          className="text-sm font-semibold text-ink hover:text-navy transition-colors break-words"
                        >
                          {value}
                        </a>
                      ) : (
                        <span className="text-sm font-medium text-ink/90">{value}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Compliance box */}
            <div className="navy-card p-6 space-y-4 text-left relative overflow-hidden">
              <h4 className="relative text-xs font-bold uppercase text-lime tracking-[0.18em] flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" />
                <span>{t('contact.nda_title')}</span>
              </h4>
              <p className="relative text-xs text-paper/90 leading-relaxed">
                {t('contact.nda_desc')}
              </p>
              <div className="relative pt-3 border-t border-white/10 flex flex-wrap gap-4 text-[10px] font-semibold text-paper/70">
                <span>ISO 27001 SECURE</span>
                <span>SOC2 TYPE II COMPLIANT</span>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7">
            <div className="surface-card rounded-[1.75rem] p-8 sm:p-10 relative overflow-hidden">
              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.form
                    key="contact-form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-6 text-left"
                  >
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="block text-xs font-semibold text-ink uppercase tracking-wider">
                          {t('contact.form.name_label')} <span className="text-navy">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder={t('contact.form.name_placeholder')}
                          className={inputClass}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-xs font-semibold text-ink uppercase tracking-wider">
                          {t('contact.form.email_label')} <span className="text-navy">*</span>
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder={t('contact.form.email_placeholder')}
                          className={inputClass}
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="block text-xs font-semibold text-ink uppercase tracking-wider">
                          {t('contact.form.company_label')}
                        </label>
                        <input
                          type="text"
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          placeholder={t('contact.form.company_placeholder')}
                          className={inputClass}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-xs font-semibold text-ink uppercase tracking-wider">
                          {t('contact.form.budget_label')}
                        </label>
                        <select
                          value={formData.budget}
                          onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                          className={inputClass}
                        >
                          {BUDGETS.map((bg) => (
                            <option key={bg} value={bg} className="bg-paper text-ink">{bg}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-xs font-semibold text-ink uppercase tracking-wider">
                        {t('contact.form.message_label')} <span className="text-navy">*</span>
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder={t('contact.form.message_placeholder')}
                        className={`${inputClass} resize-none leading-relaxed`}
                      />
                    </div>

                    {formError && (
                      <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-xs font-medium text-rose-600 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-rose-500 rounded-full shrink-0" />
                        <span>{formError}</span>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="group w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-navy hover:bg-navy-deep text-paper font-semibold text-base rounded-full transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin h-5 w-5 text-paper" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                          <span>{t('contact.form.loading')}</span>
                        </>
                      ) : (
                        <>
                          <span>{t('contact.form.submit_btn')}</span>
                          <Send className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </>
                      )}
                    </button>

                    <div className="text-center text-mute text-[11px] leading-normal pt-1">
                      {t('contact.form.nda_notice')}
                    </div>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success-box"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="py-12 px-6 flex flex-col items-center justify-center text-center space-y-6"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-navy text-paper flex items-center justify-center">
                      <CheckCircle2 className="w-9 h-9" />
                    </div>
                    <div className="space-y-3">
                      <h4 className="font-display text-3xl font-semibold text-navy">
                        {t('contact.success.title')}
                      </h4>
                      <p className="text-mute max-w-md text-sm sm:text-base leading-relaxed">
                        {t('contact.success.desc')}
                      </p>
                    </div>
                    <div className="bg-zinc border border-line p-4 rounded-xl text-left max-w-md flex gap-3 text-xs text-mute">
                      <ArrowUpRight className="w-5 h-5 text-navy shrink-0" />
                      <p>
                        <strong className="text-ink">{t('contact.success.next_steps').split('**')[1]}</strong> {t('contact.success.next_steps').split('**')[2]}
                      </p>
                    </div>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="text-xs font-semibold uppercase text-mute hover:text-navy transition-colors cursor-pointer pt-2"
                    >
                      {t('contact.success.reset_btn')}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
