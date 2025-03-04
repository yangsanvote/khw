'use client';

import { useEffect, useRef } from 'react';
import Script from 'next/script';

declare global {
  interface Window {
    kakao: any;
    initKakaoMap: () => void;
  }
}

export default function KakaoPromiseMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  
  // 카카오맵 초기화 함수 등록
  function initMap() {
    if (!window.kakao || !mapRef.current) return;
    
    const container = mapRef.current;
    const options = {
      center: new window.kakao.maps.LatLng(37.566826, 126.9786567),
      level: 3
    };
    
    try {
      const map = new window.kakao.maps.Map(container, options);
      console.log('지도 생성 성공!');
      
      // 마커 추가
      const marker = new window.kakao.maps.Marker({
        position: options.center
      });
      marker.setMap(map);
    } catch (error) {
      console.error('지도 초기화 오류:', error);
    }
  }
  
  // 카카오맵 SDK 로드 후 초기화
  useEffect(() => {
    // 전역 콜백 함수 등록
    window.initKakaoMap = initMap;
    
    // 이미 로드된 경우 직접 초기화
    if (window.kakao && window.kakao.maps) {
      initMap();
    }
  }, []);
  
  return (
    <div className="h-full w-full flex flex-col">
      <Script 
        id="kakao-map-sdk"
        src={`https://dapi.kakao.com/v2/maps/sdk.js?appkey=bcdb78ab10f40874637c27c3c8a5e3c1&autoload=true&libraries=services&callback=initKakaoMap`}
        strategy="afterInteractive"
      />
      
      <div className="bg-gray-200 p-4 text-center font-bold">
        카카오맵 테스트 (개발자 도구 콘솔에서 오류 확인)
      </div>
      
      <div className="flex-1 relative">
        <div 
          ref={mapRef}
          id="kakao-map" 
          style={{ width: '100%', height: '100%', background: '#e0e0e0' }}
        />
      </div>
    </div>
  );
} 