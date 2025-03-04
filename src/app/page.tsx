'use client';

import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import HeroSection from "@/components/sections/HeroSection";
import KhwSection from "@/components/sections/KhwSection";
import YDSection from "@/components/sections/YDSection";
import ContactSection from "@/components/sections/ContactSection";
import BottomNav from "@/components/BottomNav";

export default function Home() {
  const [activeSection, setActiveSection] = useState<number>(0);
  const [expandedSection, setExpandedSection] = useState<number | null>(null);
  const [khwActiveSubSection, setKhwActiveSubSection] = useState<string>('declaration-section');
  
  // 네비게이션 텍스트 표시 관련 상태
  const [showLabels, setShowLabels] = useState<boolean>(true);
  const [navInteraction, setNavInteraction] = useState<boolean>(false);
  const labelTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  const sectionRefs = useRef<(HTMLElement | null)[]>([null, null, null, null]);
  
  const sections = [
    { id: 'hero', name: '메인', color: '#FFED00', isDarkBackground: false },
    { id: 'khw', name: '권현우', color: '#00A367', isDarkBackground: true },
    { id: 'yd', name: '양주동·동면', color: '#623D91', isDarkBackground: false },
    { id: 'contact', name: '제안하기', color: '#333333', isDarkBackground: true },
  ];

  // KHW 섹션 내 서브섹션
  const khwSubSections = [
    { id: 'declaration-section', name: '출마선언문', isDarkBackground: true },
    { id: 'press-section', name: '보도자료', isDarkBackground: true },
    { id: 'candidate-section', name: '후보자', isDarkBackground: false },
    { id: 'act-section', name: '의정활동', isDarkBackground: false }
  ];

  const getActiveSectionBackground = () => {
    const currentSection = sections[activeSection];
    return currentSection?.color || '#FFED00';
  };

  const getActiveSectionIsDark = () => {
    if (activeSection === 1) { // KhwSection
      const activeSubSection = khwSubSections.find(section => section.id === khwActiveSubSection);
      return activeSubSection?.isDarkBackground ?? false;
    } else {
      return sections[activeSection]?.isDarkBackground || false;
    }
  };

  const currentBgColor = getActiveSectionBackground();
  const currentBgIsDark = getActiveSectionIsDark();

  // 네비게이션 인터랙션 핸들러
  const handleNavInteraction = () => {
    setNavInteraction(true);
    setShowLabels(true);
    
    // 기존 타이머 취소
    if (labelTimeoutRef.current) {
      clearTimeout(labelTimeoutRef.current);
    }
    
    // 5초 후 레이블 숨김
    labelTimeoutRef.current = setTimeout(() => {
      setShowLabels(false);
      setNavInteraction(false);
    }, 5000);
  };

  useEffect(() => {
    // 초기 로드 시 네비게이션 레이블 자동 숨김
    const initialTimeout = setTimeout(() => {
      setShowLabels(false);
    }, 5000);
    
    // IntersectionObserver 설정
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            const index = sectionRefs.current.findIndex(ref => ref === entry.target);
            if (index !== -1) {
              setActiveSection(index);
            }
          }
        });
      },
      {
        threshold: 0.5  // 50% 이상 보일 때 활성화
      }
    );
    
    // KhwSection 서브섹션 감지
    const khwSubsectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.3) {
            const prevSubSection = khwActiveSubSection;
            setKhwActiveSubSection(entry.target.id);
            
            // 새로운 서브섹션으로 이동 시 레이블 표시
            if (prevSubSection !== entry.target.id && activeSection === 1) {
              handleNavInteraction();
            }
          }
        });
      },
      {
        root: document.getElementById('khw-section'),
        rootMargin: '0px',
        threshold: 0.3  // 30% 이상 보일 때 활성화
      }
    );

    // 서브섹션 요소 등록
    khwSubSections.forEach((subSection) => {
      const element = document.getElementById(subSection.id);
      if (element) {
        khwSubsectionObserver.observe(element);
      }
    });

    // 클린업 함수
    return () => {
      sectionObserver.disconnect();
      khwSubsectionObserver.disconnect();
      
      if (labelTimeoutRef.current) {
        clearTimeout(labelTimeoutRef.current);
      }
      
      clearTimeout(initialTimeout);
    };
  }, [activeSection, khwActiveSubSection]);

  // 스크롤 이벤트를 사용한 백업 감지 메커니즘
  useEffect(() => {
    const handleScroll = () => {
      sectionRefs.current = [
        document.getElementById('hero-section'),
        document.getElementById('khw-section'),
        document.getElementById('yd-section'),
        document.getElementById('contact-section')
      ];
      
      // 각 섹션과 뷰포트의 교차 정도를 계산
      const viewportHeight = window.innerHeight;
      const scrollTop = window.scrollY;
      
      let maxVisibleRatio = 0;
      let maxVisibleIndex = activeSection;
      
      sectionRefs.current.forEach((section, index) => {
        if (section) {
          const rect = section.getBoundingClientRect();
          const sectionInViewport = Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0);
          const visibleRatio = sectionInViewport / viewportHeight;
          
          if (visibleRatio > maxVisibleRatio) {
            maxVisibleRatio = visibleRatio;
            maxVisibleIndex = index;
          }
        }
      });
      
      if (maxVisibleIndex !== activeSection) {
        setActiveSection(maxVisibleIndex);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection]);

  // 섹션 이동 함수
  const scrollToSection = (index: number) => {
    const sectionElement = document.getElementById(`${sections[index].id}-section`);
    if (sectionElement) {
      sectionElement.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(index);
      handleNavInteraction();
    }
  };

  // 서브섹션 이동 함수
  const scrollToSubSection = (mainIndex: number, subIndex: number) => {
    let sectionId = '';
    
    if (mainIndex === 1) { // KHW 섹션
      sectionId = khwSubSections[subIndex].id;
      // 클릭 시 즉시 서브섹션도 활성화
      setKhwActiveSubSection(sectionId);
    }
    
    const sectionElement = document.getElementById(sectionId);
    if (sectionElement) {
      const headerOffset = 50; // 상단 헤더/네비게이션 높이
      const elementPosition = sectionElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      // 메인 섹션도 활성화
      setActiveSection(mainIndex);
      handleNavInteraction();
    }
  };
  
  // 서브섹션 텍스트 색상 (활성화된 메인 섹션 기준)
  const subSectionActiveTextClass = currentBgIsDark
    ? 'text-white font-medium'
    : 'text-gray-800 font-medium';
  
  const subSectionInactiveTextClass = currentBgIsDark
    ? 'text-white/70 group-hover:text-white'
    : 'text-gray-800/70 group-hover:text-gray-800';

  return (
    <main className="w-full h-screen overflow-y-auto scroll-smooth snap-y snap-mandatory">
      {/* 메인 콘텐츠 */}
      <section id="hero-section" className="h-screen w-full snap-start">
        <HeroSection hideScrollIndicator={true} />
      </section>

      <section id="khw-section" className="h-screen w-full snap-start">
        <KhwSection hideScrollIndicator={true} />
      </section>

      <section id="yd-section" className="h-screen w-full snap-start">
        <YDSection isStandalone={true} hideScrollIndicator={true} />
      </section>

      <section id="contact-section" className="h-screen w-full snap-start">
        <ContactSection hideScrollIndicator={true} />
      </section>

      <BottomNav />
    </main>
  );
}
