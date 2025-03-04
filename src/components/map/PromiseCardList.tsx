"use client"

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { promises } from '@/lib/promises';
import PromiseCard from './PromiseCard';

interface PromiseCardListProps {
  region: '양주동' | '동면';
  category: string | null;
  selectedPromiseId: string | null;
  onSelectPromise: (id: string | null) => void;
}

const PromiseCardList = ({
  region,
  category,
  selectedPromiseId,
  onSelectPromise
}: PromiseCardListProps) => {
  const [filteredPromises, setFilteredPromises] = useState(promises);

  useEffect(() => {
    let filtered = promises;
    
    // 지역 필터링
    if (region) {
      filtered = filtered.filter(promise => 
        promise.location === region || promise.location === '공통'
      );
    }
    
    // 카테고리 필터링
    if (category) {
      filtered = filtered.filter(promise => promise.category === category);
    }
    
    setFilteredPromises(filtered);
  }, [region, category]);

  return (
    <div className="py-2">
      <h3 className="text-lg font-bold mb-4 text-[#623D91]">
        {region} 공약 {filteredPromises.length}개
      </h3>
      
      <AnimatePresence mode="wait">
        <motion.div
          key={`${region}-${category}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="space-y-4"
        >
          {filteredPromises.length > 0 ? (
            filteredPromises.map(promise => (
              <PromiseCard
                key={promise.id}
                promise={promise}
                isSelected={selectedPromiseId === promise.id}
                onSelect={() => onSelectPromise(promise.id)}
              />
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              선택한 필터에 맞는 공약이 없습니다.
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default PromiseCardList; 