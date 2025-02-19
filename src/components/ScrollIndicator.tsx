'use client';

import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export default function ScrollIndicator({ isDark = false, color = "", className = "" }) {
  const scrollToNextSection = () => {
    // 현재 보이는 섹션의 다음 섹션으로 부드럽게 스크롤
    const currentSection = document.querySelector('section:is(:hover, :focus-within)');
    const nextSection = currentSection?.nextElementSibling as HTMLElement;
    
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.div
      className={`absolute inset-x-0 mx-auto w-fit z-20 cursor-pointer ${className}`}
      initial={{ opacity: 0 }}
      animate={{ 
        opacity: [0.4, 1, 0.4],
        y: [0, 8, 0]
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      onClick={scrollToNextSection}
    >
      <ChevronDown className={`w-8 h-8 ${color || (isDark ? 'text-white' : 'text-gray-800')}`} />
    </motion.div>
  );
} 