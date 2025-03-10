'use client';

import { motion } from 'framer-motion';
import HeroSection from "@/components/sections/HeroSection";
import KhwSection from "@/components/sections/KhwSection";
import YDSection from "@/components/sections/YDSection";
import ContactSection from "@/components/sections/ContactSection";
import SupportSection from "@/components/sections/SupportSection";
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

  // 해시 기반 라우팅 처리
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash) {
        const section = document.getElementById(hash);
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    // 초기 로드 시 해시 확인
    handleHashChange();

    // 해시 변경 이벤트 리스너 등록
    window.addEventListener('hashchange', handleHashChange);
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  // 스크롤 이벤트를 통해 현재 활성 섹션 감지
  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById('hero-section');
      const khwSection = document.getElementById('khw-section');
      const ydSection = document.getElementById('yd-section');
      const supportSection = document.getElementById('support-section');
      const contactSection = document.getElementById('contact-section');
      
      if (!heroSection || !khwSection || !ydSection || !supportSection || !contactSection) return;
      
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      
      const heroTop = heroSection.offsetTop;
      const khwTop = khwSection.offsetTop;
      const ydTop = ydSection.offsetTop;
      const supportTop = supportSection.offsetTop;
      const contactTop = contactSection.offsetTop;
      
      const heroBottom = heroTop + heroSection.offsetHeight;
      const khwBottom = khwTop + khwSection.offsetHeight;
      const ydBottom = ydTop + ydSection.offsetHeight;
      const supportBottom = supportTop + supportSection.offsetHeight;
      
      // 현재 활성 섹션 감지
      const viewportMiddle = scrollPosition + windowHeight / 2;
      if (viewportMiddle < heroBottom) {
        setActiveSection('hero');
      } else if (viewportMiddle < khwBottom) {
        setActiveSection('khw');
      } else if (viewportMiddle < ydBottom) {
        setActiveSection('yd');
      } else if (viewportMiddle < supportBottom) {
        setActiveSection('support');
      } else {
        setActiveSection('contact');
      }
    };
    
    // 스크롤 이벤트 리스너 등록
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // 초기 로드 시 한 번 실행
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
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
      
      <section id="support-section" className="min-h-screen w-full">
        <SupportSection />
      </section>
      
      <section id="contact-section" className="min-h-screen w-full pb-16">
        <ContactSection showHeader={false} />
      </section>

      {/* 하단 네비게이션 */}
      <BottomNav />
    </main>
  );
}
