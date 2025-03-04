"use client"

import { useState } from 'react';
import { motion } from 'framer-motion';
import MapView from '@/components/map/MapView';
import PromiseCardList from '@/components/map/PromiseCardList';
import BottomNav from '@/components/BottomNav';
import RegionToggle from '@/components/map/RegionToggle';
import FilterPanel from '@/components/map/FilterPanel';
import BottomSheet from '@/components/map/BottomSheet';

export default function MapPage() {
  const [activeRegion, setActiveRegion] = useState<'양주동' | '동면'>('양주동');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [bottomSheetHeight, setBottomSheetHeight] = useState<'mini' | 'standard' | 'full'>('mini');
  const [selectedPromiseId, setSelectedPromiseId] = useState<string | null>(null);

  return (
    <main className="flex flex-col h-screen relative bg-gray-50 pb-14">
      <header className="p-4 flex items-center justify-between bg-white shadow-sm z-10">
        <h1 className="text-xl font-giants text-[#623D91]">양동작전 공약 지도</h1>
        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="p-2 rounded-full bg-gray-100 text-gray-700"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z" />
          </svg>
        </button>
      </header>

      {/* 필터 패널 - 위에서 스와이프 */}
      {isFilterOpen && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          className="absolute top-16 left-0 right-0 z-20 bg-white shadow-md"
        >
          <FilterPanel 
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            onClose={() => setIsFilterOpen(false)}
          />
        </motion.div>
      )}

      {/* 지역 선택 토글 */}
      <div className="px-4 py-2">
        <RegionToggle
          activeRegion={activeRegion}
          onChange={setActiveRegion}
        />
      </div>

      {/* 지도 컴포넌트 */}
      <div className="flex-1 overflow-hidden">
        <MapView 
          region={activeRegion} 
          category={selectedCategory}
          onSelectPromise={setSelectedPromiseId}
          selectedPromiseId={selectedPromiseId}
        />
      </div>

      {/* 하단 시트 - 공약 카드 목록 */}
      <BottomSheet 
        height={bottomSheetHeight}
        onHeightChange={setBottomSheetHeight}
      >
        <PromiseCardList
          region={activeRegion}
          category={selectedCategory}
          selectedPromiseId={selectedPromiseId}
          onSelectPromise={setSelectedPromiseId}
        />
      </BottomSheet>

      {/* 하단 네비게이션 */}
      <BottomNav />
    </main>
  );
} 