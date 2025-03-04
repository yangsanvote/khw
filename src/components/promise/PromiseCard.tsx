'use client';

import { MapPin } from 'lucide-react';
import { Promise } from '@/lib/promises';
import { useRouter } from 'next/navigation';

// 카테고리 색상 매핑
const categoryColors = {
  "공동주택": "border-purple-600 bg-purple-50",
  "돌봄": "border-pink-500 bg-pink-50",
  "자영업": "border-green-600 bg-green-50",
  "정주여건": "border-yellow-500 bg-yellow-50"
};

const regionColors = {
  "공통": "bg-purple-100 text-purple-800",
  "양주동": "bg-pink-100 text-pink-800",
  "석금산": "bg-green-100 text-green-800",
  "사송": "bg-yellow-100 text-yellow-800"
};

interface PromiseCardProps {
  promise: Promise;
  onClick?: () => void;
  onMapView?: () => void;
}

export default function PromiseCard({ promise, onClick, onMapView }: PromiseCardProps) {
  const router = useRouter();
  
  const handleMapView = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onMapView) {
      onMapView();
    } else if (promise.location) {
      router.push(`/map?id=${promise.id}`);
    }
  };
  
  return (
    <div 
      className={`rounded-lg p-4 shadow-md transition-all border-l-4 my-3 
        ${categoryColors[promise.category] || 'border-gray-300 bg-gray-50'}`}
      onClick={onClick}
    >
      <div className="flex justify-between items-start">
        <h3 className="font-bold text-lg">{promise.title}</h3>
        <span className={`text-xs px-2 py-1 rounded-full ${
          promise.type === "공통" 
            ? regionColors["공통"]
            : promise.location?.name 
              ? regionColors[promise.location.name] 
              : "bg-gray-100 text-gray-800"
        }`}>
          {promise.type === "공통" ? "전체 지역" : promise.location?.name}
        </span>
      </div>
      
      <p className="mt-2 text-gray-600 text-sm">{promise.summary}</p>
      
      <div className="mt-4 flex justify-between">
        <div className="flex gap-2">
          <span className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full">
            {promise.category}
          </span>
          {promise.subCategory && (
            <span className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full">
              {promise.subCategory}
            </span>
          )}
        </div>
        
        <div className="flex gap-2">
          <button 
            onClick={onClick}
            className="text-purple-600 font-medium text-sm px-2 py-1"
          >
            자세히 보기
          </button>
          
          {promise.type === "지역" && promise.location && (
            <button 
              onClick={handleMapView}
              className="text-blue-600 font-medium text-sm flex items-center px-2 py-1"
            >
              <MapPin size={14} className="mr-1" /> 지도에서 보기
            </button>
          )}
        </div>
      </div>
    </div>
  );
} 