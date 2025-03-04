'use client';

import { useState, useEffect } from 'react';
import { Promise, promises, filterPromises } from '@/lib/promises';
import PromiseCard from './PromiseCard';
import PromiseFilters from './PromiseFilters';
import PromiseModal from './PromiseModal';

export default function PromiseList() {
  const [activeCategory, setActiveCategory] = useState<string>("전체");
  const [activeSubCategory, setActiveSubCategory] = useState<string>("전체");
  const [activeRegion, setActiveRegion] = useState<string>("전체");
  const [filteredPromises, setFilteredPromises] = useState<Promise[]>(promises);
  const [selectedPromise, setSelectedPromise] = useState<Promise | null>(null);
  const [showSubCategories, setShowSubCategories] = useState<boolean>(false);
  
  // 필터 변경 시 공약 필터링
  useEffect(() => {
    const filtered = filterPromises(
      promises,
      activeCategory === "전체" ? undefined : activeCategory,
      activeSubCategory === "전체" ? undefined : activeSubCategory, 
      activeRegion === "전체" ? undefined : activeRegion
    );
    setFilteredPromises(filtered);
  }, [activeCategory, activeSubCategory, activeRegion]);
  
  // 정주여건 카테고리 선택 시 서브카테고리 표시
  useEffect(() => {
    setShowSubCategories(activeCategory === "정주여건");
    if (activeCategory !== "정주여건") {
      setActiveSubCategory("전체");
    }
  }, [activeCategory]);
  
  return (
    <div className="px-4">
      <h2 className="text-2xl font-bold mb-4">공약 목록</h2>
      
      <PromiseFilters
        activeCategory={activeCategory}
        activeRegion={activeRegion}
        activeSubCategory={activeSubCategory}
        showSubCategories={showSubCategories}
        onCategoryChange={setActiveCategory}
        onRegionChange={setActiveRegion}
        onSubCategoryChange={setActiveSubCategory}
      />
      
      <div className="space-y-2">
        {filteredPromises.length > 0 ? (
          filteredPromises.map(promise => (
            <PromiseCard
              key={promise.id}
              promise={promise}
              onClick={() => setSelectedPromise(promise)}
            />
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            해당 조건에 맞는 공약이 없습니다.
          </div>
        )}
      </div>
      
      {/* 공약 상세 모달 */}
      {selectedPromise && (
        <PromiseModal
          promise={selectedPromise}
          onClose={() => setSelectedPromise(null)}
        />
      )}
    </div>
  );
} 