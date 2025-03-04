'use client';

import { XCircle, MapPin } from 'lucide-react';
import { Promise, promises } from '@/lib/promises';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface PromiseModalProps {
  promise: Promise;
  onClose: () => void;
}

export default function PromiseModal({ promise, onClose }: PromiseModalProps) {
  const router = useRouter();
  
  // ESC 키로 모달 닫기
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);
  
  // 연관 공약 찾기
  const relatedPromises = promise.relatedPromises
    ? promises.filter(p => promise.relatedPromises?.includes(p.id))
    : [];
  
  // 지도에서 보기
  const handleMapView = () => {
    if (promise.location) {
      router.push(`/map?id=${promise.id}`);
    }
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-lg w-full max-h-[80vh] overflow-y-auto">
        <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
          <h3 className="text-xl font-bold">{promise.title}</h3>
          <button onClick={onClose} className="p-1">
            <XCircle className="w-6 h-6 text-gray-400 hover:text-gray-600" />
          </button>
        </div>
        
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
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
            
            <span className={`text-xs px-2 py-1 rounded-full ${
              promise.type === "공통" 
                ? "bg-purple-100 text-purple-800"
                : promise.location?.name === "양주동"
                  ? "bg-pink-100 text-pink-800"
                  : promise.location?.name === "석금산"
                    ? "bg-green-100 text-green-800"
                    : "bg-yellow-100 text-yellow-800"
            }`}>
              {promise.type === "공통" ? "전체 지역" : promise.location?.name}
            </span>
          </div>
          
          <div className="mb-6">
            <p className="text-lg font-medium mb-2">{promise.summary}</p>
            <p className="text-gray-600 whitespace-pre-line">{promise.description}</p>
          </div>
          
          {promise.location && (
            <div className="mb-6">
              <h4 className="text-lg font-medium mb-2">위치 정보</h4>
              <p className="text-gray-600">{promise.location.address}</p>
              <button 
                onClick={handleMapView}
                className="mt-2 text-blue-600 font-medium flex items-center text-sm"
              >
                <MapPin size={16} className="mr-1" /> 지도에서 보기
              </button>
            </div>
          )}
          
          {relatedPromises.length > 0 && (
            <div>
              <h4 className="text-lg font-medium mb-2">연관 공약</h4>
              <ul className="space-y-2">
                {relatedPromises.map(related => (
                  <li key={related.id} className="p-3 bg-gray-50 rounded-md">
                    <p className="font-medium">{related.title}</p>
                    <p className="text-sm text-gray-600">{related.summary}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        
        <div className="border-t p-4 flex justify-end">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
} 