'use client';

import React, { useEffect, useRef } from 'react';

declare global {
  interface Window {
    kakao: any;
    initKakaoMap: () => void;
  }
}

export default function KaKaoMapOnly() {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // 카카오 지도 초기화 함수를 전역에 정의
    window.initKakaoMap = () => {
      try {
        console.log('카카오맵 SDK 로드 완료, 지도 초기화 시작');
        
        if (!mapContainerRef.current) {
          console.error('맵 컨테이너가 없습니다.');
          return;
        }
        
        // 양산시 좌표
        const options = {
          center: new window.kakao.maps.LatLng(35.338, 129.027),
          level: 7,
          draggable: true, // 드래그 가능 설정
          scrollwheel: true, // 스크롤 확대/축소 가능
          disableDoubleClickZoom: false // 더블클릭 확대 가능
        };
        
        const map = new window.kakao.maps.Map(mapContainerRef.current, options);
        
        // 모바일 환경에서 터치 이벤트 최적화
        if ('ontouchstart' in window) {
          console.log('모바일 환경 감지, 터치 이벤트 최적화 적용');
          // 모바일용 컨트롤러 추가
          map.addControl(new window.kakao.maps.ZoomControl(), window.kakao.maps.ControlPosition.RIGHT);
          map.addControl(new window.kakao.maps.MapTypeControl(), window.kakao.maps.ControlPosition.TOPRIGHT);
        }
        
        // 테스트용 마커 추가
        const markerPosition = new window.kakao.maps.LatLng(35.338, 129.027);
        const marker = new window.kakao.maps.Marker({
          position: markerPosition
        });
        marker.setMap(map);
        
        // 마커 클릭 이벤트
        window.kakao.maps.event.addListener(marker, 'click', function() {
          alert('양산시 중심 지점입니다!');
        });
        
        console.log('카카오맵 초기화 완료');
      } catch (error) {
        console.error('카카오맵 초기화 오류:', error);
      }
    };
    
    // 이미 로드된 스크립트가 있는지 확인
    const existingScript = document.getElementById('kakao-map-script');
    if (!existingScript) {
      // 스크립트 요소 생성
      const script = document.createElement('script');
      script.id = 'kakao-map-script';
      script.src = 'https://dapi.kakao.com/v2/maps/sdk.js?appkey=bcdb78ab10f40874637c27c3c8a5e3c1&libraries=services&autoload=false';
      script.onload = () => {
        console.log('카카오 스크립트 로드됨, kakao.maps 초기화 중');
        window.kakao.maps.load(window.initKakaoMap);
      };
      
      // DOM에 스크립트 추가
      document.head.appendChild(script);
      console.log('카카오맵 스크립트 태그 추가됨');
    } else {
      // 이미 로드되어 있다면 지도 초기화 직접 시도
      if (window.kakao && window.kakao.maps) {
        console.log('이미 로드된 카카오 맵 SDK 사용');
        try {
          window.kakao.maps.load(window.initKakaoMap);
        } catch (e) {
          console.error('기존 SDK 초기화 오류:', e);
          window.initKakaoMap();
        }
      }
    }
    
    // 클린업 함수
    return () => {
      // 전역 콜백 함수 제거
      if (window.initKakaoMap) {
        // 참조만 제거하고 실제 함수는 남겨둠
        // window.initKakaoMap = undefined;
      }
    };
  }, []);
  
  return (
    <div className="w-full h-full flex flex-col">
      <div 
        id="map" 
        ref={mapContainerRef} 
        className="w-full h-full min-h-[400px]"
        style={{ width: '100%', height: '100%' }}
      >
        카카오맵을 로딩중입니다...
      </div>
    </div>
  );
} 