/**
 * Solivate Studio Landing Page
 * Full-Stack Premium UI/UX Design & High-Performance IT Agency Code
 */

import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import WhyChooseUs from './components/WhyChooseUs';
import Services from './components/Services';
import ProcessTimeline from './components/ProcessTimeline';
import Portfolio from './components/Portfolio';
import FAQ from './components/FAQ';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';

export default function App() {
  
  // Custom scroll anchoring handler for high-converting interactive points
  const scrollToContactSec = () => {
    const element = document.getElementById('contact-us');
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const scrollToServicesSec = () => {
    const element = document.getElementById('services');
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#E5FAFF]/95 text-slate-800 selection:bg-[#023E8A] selection:text-white">
      {/* Shared Sticky Navigation */}
      <Navbar onCtaClick={scrollToContactSec} />

      {/* Main Core Layout Sections */}
      <main>
        {/* HERO SECTION */}
        <Hero 
          onCtaClick={scrollToContactSec} 
          onExploreClick={scrollToServicesSec} 
        />

        {/* WHY CHOOSE US (Keunggulan) */}
        <WhyChooseUs />

        {/* SERVICES GRID */}
        <Services />

        {/* OUR PROCESS (Timeline Pengerjaan) */}
        <ProcessTimeline />

        {/* PORTFOLIO GRID */}
        <Portfolio />

        {/* FAQ SECTION (Accordion) */}
        <FAQ />

        {/* CONTACT US FORM PANEL */}
        <ContactForm />
      </main>

      {/* FOOTER METRIC ROWS */}
      <Footer />
    </div>
  );
}
