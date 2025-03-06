'use client';

import { Home, User, ScrollText, Heart } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

// TypeScript에서 window 객체에 새 속성 추가를 위한 인터페이스 확장
declare global {
  interface Window {
    scrollToKhwDeclaration?: () => void;
  }
}

const navItems = [
  {
    label: '홈',
    href: '/',
    sectionId: 'hero-section',
    icon: Home
  },
  {
    label: '후보',
    href: '/',
    sectionId: 'khw-section',
    icon: User
  },
  {
    label: '공약',
    href: '/',
    sectionId: 'yd-section',
    icon: ScrollText
  },
  {
    label: '참여',
    href: '/',
    sectionId: 'contact-section',
    icon: Heart
  }
];

export default function BottomNav() {
  const pathname = usePathname() || '';
  const router = useRouter();
  const [activeSection, setActiveSection] = useState('hero-section');
  
  useEffect(() => {
    // 스크롤 이벤트를 통해 현재 활성 섹션 감지
    const handleScroll = () => {
      const heroSection = document.getElementById('hero-section');
      const khwSection = document.getElementById('khw-section');
      const ydSection = document.getElementById('yd-section');
      const contactSection = document.getElementById('contact-section');
      
      if (!heroSection || !khwSection || !ydSection || !contactSection) return;
      
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      
      const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
      const khwBottom = khwSection.offsetTop + khwSection.offsetHeight;
      const ydBottom = ydSection.offsetTop + ydSection.offsetHeight;
      
      if (scrollPosition < heroBottom) {
        setActiveSection('hero-section');
      } else if (scrollPosition < khwBottom) {
        setActiveSection('khw-section');
      } else if (scrollPosition < ydBottom) {
        setActiveSection('yd-section');
      } else {
        setActiveSection('contact-section');
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
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);
  
  const handleNavClick = (href: string, sectionId: string) => {
    // 항상 메인 페이지에서 스크롤로 이동
    if (sectionId === 'khw-section') {
      // '후보' 버튼 클릭 시 KhwSection의 '출마선언' 섹션으로 직접 이동
      
      // KhwSection에서 등록한 전역 함수 호출
      if (typeof window.scrollToKhwDeclaration === 'function') {
        window.scrollToKhwDeclaration();
        
        // 활성 섹션 업데이트
        setActiveSection(sectionId);
        return;
      }
      
      // 전역 함수가 없는 경우 기존 방식으로 이동 (fallback)
      const khwSection = document.getElementById('khw-section');
      if (khwSection) {
        // 커스텀 이벤트를 통해 KhwSection에 알림
        const event = new CustomEvent('navigateToDeclaration');
        khwSection.dispatchEvent(event);
        
        // 활성 섹션 업데이트
        setActiveSection(sectionId);
        return;
      }
    }
    
    // 기존 로직 (다른 버튼 클릭 시)
    const section = document.getElementById(sectionId);
    if (section) {
      // 모바일과 데스크탑에서 다른 헤더 높이 적용
      const isMobile = window.innerWidth < 768; // 768px 미만을 모바일로 간주
      const headerHeight = isMobile ? 160 : 80; // 모바일에서 훨씬 더 큰 오프셋 적용
      
      const elementPosition = section.offsetTop;
      const offsetPosition = elementPosition - headerHeight;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      // 클릭 시 활성 섹션 즉시 업데이트
      setActiveSection(sectionId);
    }
  };
  
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around items-center h-16 z-50">
      {navItems.map((item) => {
        // 활성 섹션 기준으로만 활성 상태 결정
        const isActive = activeSection === item.sectionId;
                        
        return (
          <button
            key={item.sectionId}
            onClick={() => handleNavClick(item.href, item.sectionId)}
            className={`flex flex-col items-center justify-center w-full h-full ${
              isActive ? 'text-amber-500' : 'text-gray-500'
            }`}
          >
            <item.icon size={20} className={isActive ? 'text-amber-500' : 'text-gray-500'} />
            <span className="text-xs mt-1">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
} 