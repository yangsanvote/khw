'use client';

import HeroSection from '@/components/sections/HeroSection';
import CandidateSection from '@/components/sections/CandidateSection';
import ContactSection from '@/components/sections/ContactSection';
import DeclarationSection from "@/components/sections/DeclarationSection";
import SupportSection from "@/components/sections/SupportSection";
import PressSection from "@/components/sections/PressSection";
import AptSection from '@/components/sections/AptSection';
import CareSection from '@/components/sections/CareSection';
import WorkerSection from '@/components/sections/WorkerSection';
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

  useEffect(() => {
    // URL 해시가 있으면 해당 섹션으로 스크롤
    if (window.location.hash) {
      const element = document.querySelector(window.location.hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []);

  return (
    <main className="h-screen w-full snap-y snap-mandatory overflow-y-scroll relative">
      <HeroSection />
      <DeclarationSection />
      <PressSection />
      <AptSection />
      <CareSection />
      <WorkerSection />
      <SupportSection />
      <CandidateSection />
      <ContactSection />
    </main>
  );
}