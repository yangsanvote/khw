"use client"

import { useState, useRef, useEffect } from 'react';
import { motion, PanInfo, useAnimationControls } from 'framer-motion';

interface BottomSheetProps {
  children: React.ReactNode;
  height: 'mini' | 'standard' | 'full';
  onHeightChange: (height: 'mini' | 'standard' | 'full') => void;
}

const heights = {
  mini: '25%',
  standard: '50%',
  full: '90%',
};

const BottomSheet = ({ children, height, onHeightChange }: BottomSheetProps) => {
  const controls = useAnimationControls();
  const sheetRef = useRef<HTMLDivElement>(null);
  const [startDragY, setStartDragY] = useState(0);

  useEffect(() => {
    controls.start({
      height: heights[height],
      transition: { type: 'spring', damping: 20, stiffness: 300 }
    });
  }, [height, controls]);

  const handleDragStart = () => {
    if (sheetRef.current) {
      setStartDragY(sheetRef.current.getBoundingClientRect().height);
    }
  };

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const dragDistance = info.offset.y;
    const windowHeight = window.innerHeight;
    
    // 드래그 방향에 따라 다음 상태 결정
    if (dragDistance < -50) {
      // 위로 드래그하면 더 큰 높이로
      if (height === 'mini') onHeightChange('standard');
      else if (height === 'standard') onHeightChange('full');
    } else if (dragDistance > 50) {
      // 아래로 드래그하면 더 작은 높이로
      if (height === 'full') onHeightChange('standard');
      else if (height === 'standard') onHeightChange('mini');
    }
  };

  return (
    <motion.div
      ref={sheetRef}
      drag="y"
      dragConstraints={{ top: 0, bottom: 0 }}
      dragElastic={0.2}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-lg z-10"
      style={{ height: heights[height] }}
      animate={controls}
    >
      {/* 핸들바 */}
      <div className="flex justify-center p-2">
        <div className="w-10 h-1 bg-gray-300 rounded-full"></div>
      </div>
      
      {/* 컨텐츠 */}
      <div className="px-4 overflow-y-auto h-[calc(100%-20px)]">
        {children}
      </div>
    </motion.div>
  );
};

export default BottomSheet; 