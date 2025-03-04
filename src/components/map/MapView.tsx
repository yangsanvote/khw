"use client"

import { useEffect, useRef, useState } from 'react';
import { promises } from '@/lib/promises';
import { motion } from 'framer-motion';

interface MapViewProps {
  region: '양주동' | '동면';
  category: string | null;
  selectedPromiseId: string | null;
  onSelectPromise: (id: string) => void;
}

// 지역별 중심 좌표 (실제 값으로 대체 필요)
const regionCoordinates = {
  '양주동': { lat: 35.3387, lng: 129.0276 },
  '동면': { lat: 35.3705, lng: 129.0518 }
};

// 모의 지도 구현 (Leaflet 또는 다른 지도 라이브러리로 대체 필요)
const MapView = ({ region, category, selectedPromiseId, onSelectPromise }: MapViewProps) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [filteredPromises, setFilteredPromises] = useState(promises);
  
  useEffect(() => {
    // 지역 및 카테고리에 따라 공약 필터링
    let filtered = promises.filter(promise => 
      promise.location === region || promise.location === '공통'
    );
    
    if (category) {
      filtered = filtered.filter(promise => promise.category === category);
    }
    
    setFilteredPromises(filtered);
    
    // 여기서 실제 지도 라이브러리 초기화 및 마커 배치 코드 추가
    // 예: Leaflet, Google Maps, 또는 Kakao Maps 등
    
  }, [region, category]);

  // 색상 매핑
  const getCategoryColor = (category: string) => {
    const colorMap: Record<string, string> = {
      'apt': '#623D91',
      'care': '#E8326E',
      'worker': '#00A367',
      'residence': '#FFED00'
    };
    return colorMap[category] || '#333333';
  };

  // 모의 지도 구현 (실제 지도 구현으로 대체 필요)
  return (
    <div className="relative w-full h-full">
      {/* 모의 지도 배경 */}
      <div 
        ref={mapContainerRef}
        className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100"
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-gray-400 text-sm">
            지도 라이브러리 연결 필요 (Leaflet/Kakao Maps)
          </p>
        </div>
        
        {/* 모의 마커들 */}
        <div className="absolute inset-0 p-4">
          <div className="relative w-full h-full">
            {filteredPromises.map((promise, index) => {
              // 모의 포지션 계산 (실제 구현에서는 실제 좌표 사용)
              const left = 10 + (index % 5) * 18 + '%';
              const top = 20 + Math.floor(index / 5) * 15 + '%';
              
              return (
                <motion.div
                  key={promise.id}
                  className={`absolute w-8 h-8 rounded-full flex items-center justify-center cursor-pointer ${
                    selectedPromiseId === promise.id ? 'z-10 ring-2 ring-white' : ''
                  }`}
                  style={{ 
                    backgroundColor: getCategoryColor(promise.category),
                    left,
                    top,
                  }}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => onSelectPromise(promise.id)}
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ 
                    scale: selectedPromiseId === promise.id ? 1.2 : 1, 
                    opacity: 1
                  }}
                  transition={{ delay: index * 0.05 }}
                >
                  <span className="text-white text-xs font-bold">{index + 1}</span>
                  
                  {/* 선택된 마커 애니메이션 */}
                  {selectedPromiseId === promise.id && (
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      initial={{ scale: 0.8, opacity: 0.8 }}
                      animate={{ scale: 1.4, opacity: 0 }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                      style={{ backgroundColor: getCategoryColor(promise.category) }}
                    />
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
      
      {/* 지도 로딩 인디케이터 */}
      <div className="absolute bottom-4 right-4 bg-white rounded-lg shadow-md px-3 py-2">
        <p className="text-xs text-gray-600">
          현재: <span className="font-semibold text-[#623D91]">{region}</span>
        </p>
        <p className="text-xs text-gray-500 mt-1">
          공약 {filteredPromises.length}개
        </p>
      </div>
    </div>
  );
};

export default MapView; 