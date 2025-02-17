'use client';

import HeroSection from '@/components/sections/HeroSection';
import CandidateSection from '@/components/sections/CandidateSection';
import ContactSection from '@/components/sections/ContactSection';
import DeclarationSection from "@/components/sections/DeclarationSection";
import SupportSection from "@/components/sections/SupportSection";
import { useEffect } from 'react';
import { event } from '@/lib/gtag';

export default function Home() {
  useEffect(() => {
    let lastScrollDepth = 0;
    const handleScroll = () => {
      const scrollDepth = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      );
      if (scrollDepth % 25 === 0 && scrollDepth !== lastScrollDepth) {
        lastScrollDepth = scrollDepth;
        event({
          action: 'scroll_depth',
          category: 'engagement',
          label: `Scrolled ${scrollDepth}%`,
          value: scrollDepth
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const startTime = Date.now();
    
    return () => {
      const timeSpent = Math.round((Date.now() - startTime) / 1000);
      event({
        action: 'time_spent',
        category: 'engagement',
        label: 'Time on site',
        value: timeSpent
      });
    };
  }, []);

  return (
    <main className="relative snap-y snap-mandatory h-screen overflow-y-scroll overflow-x-hidden">
      <HeroSection />
      <DeclarationSection />
      <SupportSection />
      <CandidateSection />
      <ContactSection />
      {/* 
      아래 섹션들은 주석 처리
      <ProblemSection />
      <SolutionSection />
      <PromiseSection />
      <TimelineSection />
      */}
    </main>
  );
}