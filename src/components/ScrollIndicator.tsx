'use client';

import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useEffect, useState } from 'react';

interface ScrollIndicatorProps {
  className?: string;
}

export default function ScrollIndicator({ className = '' }: ScrollIndicatorProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      // 페이지 하단에 가까워지면 인디케이터 숨기기
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // 페이지의 90% 이상 스크롤했으면 인디케이터 숨기기
      if (scrollPosition + windowHeight > documentHeight * 0.9) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <motion.div 
      className={`fixed bottom-20 left-1/2 transform -translate-x-1/2 flex flex-col items-center z-40 ${className}`}
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
      <p className="text-sm text-gray-600 mb-1 font-medium">아래로 스크롤</p>
      <ChevronDown className="text-gray-600" size={24} />
    </motion.div>
  );
} 