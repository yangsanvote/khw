'use client';

import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export default function ScrollIndicator({ isDark = false, color = "" }) {
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
      className="absolute bottom-24 md:bottom-8 left-1/2 -translate-x-1/2 z-20 cursor-pointer"
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