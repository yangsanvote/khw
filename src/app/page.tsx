'use client';

import { motion } from 'framer-motion';
import HeroSection from "@/components/sections/HeroSection";
import KhwSection from "@/components/sections/KhwSection";
import YDSection from "@/components/sections/YDSection";
import ContactSection from "@/components/sections/ContactSection";
import BottomNav from "@/components/BottomNav";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

export default function Home() {
  const mainRef = useRef<HTMLElement>(null);
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState<string>('hero');

  // 페이지 로드 시 상단으로 스크롤
  useEffect(() => {
    if (pathname === '/') {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  // 스크롤 이벤트를 통해 현재 활성 섹션 감지
  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById('hero-section');
      const khwSection = document.getElementById('khw-section');
      const ydSection = document.getElementById('yd-section');
      const contactSection = document.getElementById('contact-section');
      
      if (!heroSection || !khwSection || !ydSection || !contactSection) return;
      
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      
      const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
      const khwBottom = khwSection.offsetTop + khwSection.offsetHeight;
      const ydBottom = ydSection.offsetTop + ydSection.offsetHeight;
      
      if (scrollPosition < heroBottom) {
        setActiveSection('hero');
      } else if (scrollPosition < khwBottom) {
        setActiveSection('khw');
      } else if (scrollPosition < ydBottom) {
        setActiveSection('yd');
      } else {
        setActiveSection('contact');
      }
    };
    
    // 스크롤 이벤트를 디바운스하여 성능 개선
    let timeoutId: NodeJS.Timeout;
    const debouncedHandleScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleScroll, 100);
    };
    
    window.addEventListener('scroll', debouncedHandleScroll);
    // 초기 로드 시 한 번 실행
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', debouncedHandleScroll);
      clearTimeout(timeoutId);
    };
  }, []);

  // 특정 섹션으로 스크롤하는 함수
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main ref={mainRef} className="w-full min-h-screen">
      {/* 메인 콘텐츠 */}
      <section id="hero-section" className="min-h-screen w-full">
        <HeroSection />
      </section>
      
      <section id="khw-section" className="min-h-screen w-full">
        <KhwSection />
      </section>
      
      <section id="yd-section" className="min-h-screen w-full">
        <YDSection isActive={activeSection === 'yd'} />
      </section>
      
      <section id="contact-section" className="min-h-screen w-full pb-16">
        <ContactSection showHeader={false} />
      </section>

      {/* 하단 네비게이션 */}
      <BottomNav />
    </main>
  );
}
