'use client';

import { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Promise, promises, regions } from '@/lib/promises';
import PromiseCard from '../promise/PromiseCard';

// 카테고리별 마커 아이콘
const getCategoryIcon = (category: string) => {
  const iconSize = [25, 41];
  const iconAnchor = [12, 41];
  const popupAnchor = [1, -34];
  
  switch(category) {
    case '공동주택':
      return new L.Icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-violet.png',
        iconSize,
        iconAnchor,
        popupAnchor
      });
    case '돌봄':
      return new L.Icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-pink.png',
        iconSize,
        iconAnchor,
        popupAnchor
      });
    case '자영업':
      return new L.Icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png',
        iconSize,
        iconAnchor,
        popupAnchor
      });
    case '정주여건':
      return new L.Icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-gold.png',
        iconSize,
        iconAnchor,
        popupAnchor
      });
    default:
      return new L.Icon.Default();
  }
};

// 지도 위치를 변경하는 컴포넌트
function ChangeView({ center, zoom }: { center: [number, number]; zoom: number }) {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}

interface PromiseMapProps {
  selectedRegion?: string;
  selectedPromise?: string;
  selectedCategory?: string;
}

export default function PromiseMap({ 
  selectedRegion = 'yangju', 
  selectedPromise,
  selectedCategory
}: PromiseMapProps) {
  // 선택된 지역 정보
  const [region, setRegion] = useState(regions.find(r => r.id === selectedRegion) || regions[1]);
  const [selectedMarker, setSelectedMarker] = useState<Promise | null>(null);
  const [filteredPromises, setFilteredPromises] = useState<Promise[]>([]);
  
  // Leaflet 기본 아이콘 이슈 해결 - 컴포넌트 내부로 이동
  useEffect(() => {
    // 런타임에서만 실행
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
      iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    });
  }, []);
  
  // 지도 초기 설정
  const mapCenter = region.center as [number, number];
  const mapZoom = region.zoomLevel;
  
  // 지역별 공약 필터링
  useEffect(() => {
    // 지역 선택 시 해당 지역 정보로 업데이트
    const currentRegion = regions.find(r => r.id === selectedRegion) || regions[1];
    setRegion(currentRegion);
    
    // 공약 필터링
    let filtered = promises.filter(promise => {
      // 공통 공약은 제외
      if (promise.type === "공통") return false;
      
      // 카테고리 필터
      if (selectedCategory && selectedCategory !== "전체" && promise.category !== selectedCategory) {
        return false;
      }
      
      // 지역 필터
      if (selectedRegion !== "전체" && 
          promise.location?.name !== (currentRegion.id === "yangju" ? "양주동" : 
                                      currentRegion.id === "seokgeum" ? "석금산" : 
                                      currentRegion.id === "sasong" ? "사송" : "")) {
        return false;
      }
      
      return true;
    });
    
    setFilteredPromises(filtered);
    
    // 선택된 공약이 있으면 해당 공약 마커 선택
    if (selectedPromise) {
      const promise = promises.find(p => p.id === selectedPromise);
      if (promise) {
        setSelectedMarker(promise);
      }
    } else {
      setSelectedMarker(null);
    }
    
  }, [selectedRegion, selectedPromise, selectedCategory]);
  
  return (
    <div className="h-full w-full flex flex-col">
      <div className="p-3 flex justify-between items-center bg-white">
        <h2 className="text-lg font-bold">양동작전 공약 지도</h2>
        <div className="flex space-x-2">
          {regions.slice(1).map(r => (
            <button
              key={r.id}
              onClick={() => setRegion(r)}
              className={`px-3 py-1 rounded-full text-sm ${
                region.id === r.id 
                  ? 'bg-purple-600 text-white' 
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              {r.name === "양주동" ? "양주동" : 
               r.name === "석금산" ? "석금산" : "사송"}
            </button>
          ))}
        </div>
      </div>
      
      <div className="flex-1 relative">
        <MapContainer 
          center={mapCenter} 
          zoom={mapZoom} 
          style={{ height: '100%', width: '100%' }}
          zoomControl={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <ChangeView center={mapCenter} zoom={mapZoom} />
          
          {filteredPromises.map(promise => (
            promise.location && (
              <Marker 
                key={promise.id} 
                position={promise.location.coordinates as [number, number]}
                icon={getCategoryIcon(promise.category)}
                eventHandlers={{
                  click: () => {
                    setSelectedMarker(promise);
                  }
                }}
              >
                <Popup>
                  <div className="text-sm">
                    <p className="font-bold">{promise.title}</p>
                    <p>{promise.summary}</p>
                  </div>
                </Popup>
              </Marker>
            )
          ))}
        </MapContainer>
        
        {/* 하단 공약 카드 */}
        {selectedMarker && (
          <div className="absolute bottom-0 left-0 right-0 bg-white shadow-lg rounded-t-xl p-3 max-h-[40%] overflow-y-auto">
            <PromiseCard
              promise={selectedMarker}
              onClick={() => {
                // 상세 페이지로 이동하는 로직
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
} 