'use client';

import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useEffect, useState } from 'react';

interface ScrollIndicatorProps {
  className?: string;
  isFixed?: boolean;
  isDark?: boolean;
  color?: string;
}

export default function ScrollIndicator({ 
  className = '', 
  isFixed = false, 
  isDark = false, 
  color = '' 
}: ScrollIndicatorProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      // 페이지 하단에 가까워지면 인디케이터 숨기기
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // 페이지 상단(10% 이내)이거나 페이지의 90% 이상 스크롤했으면 인디케이터 숨기기
      if (scrollPosition < windowHeight * 0.1 || scrollPosition + windowHeight > documentHeight * 0.9) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    // 초기 스크롤 위치 확인
    handleScroll();
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  const textColorClass = color || (isDark ? 'text-white' : 'text-gray-600');

  return (
    <motion.div 
      className={`${isFixed ? 'fixed' : 'absolute'} bottom-20 left-1/2 transform -translate-x-1/2 flex flex-col items-center z-40 ${className}`}
      initial={{ opacity: 0, y: -10 }}
      animate={{ 
        opacity: 1, 
        y: 0,
        transition: { 
          duration: 0.5,
          repeat: Infinity,
          repeatType: "reverse"
        }
      }}
    >
      <p className={`text-sm ${textColorClass} mb-1 font-medium`}>아래로 스크롤</p>
      <ChevronDown className={textColorClass} size={24} />
    </motion.div>
  );
} 