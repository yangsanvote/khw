'use client';

import { useEffect, useRef } from 'react';

interface FacebookPagePluginProps {
  href: string;
  width?: number | string;
  height?: number | string;
  tabs?: string;
  hideCover?: boolean;
  showFacepile?: boolean;
  smallHeader?: boolean;
  adaptContainerWidth?: boolean;
}

export default function FacebookPagePlugin({
  href,
  width = '',
  height = '',
  tabs = 'timeline',
  hideCover = false,
  showFacepile = true,
  smallHeader = false,
  adaptContainerWidth = true
}: FacebookPagePluginProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // SDK 스크립트 로드 확인
    const fbScript = document.getElementById('facebook-jssdk');
    const fbRoot = document.getElementById('fb-root');
    
    if (!fbRoot) {
      const rootDiv = document.createElement('div');
      rootDiv.id = 'fb-root';
      document.body.appendChild(rootDiv);
    }
    
    if (!fbScript) {
      const script = document.createElement('script');
      script.id = 'facebook-jssdk';
      script.src = 'https://connect.facebook.net/ko_KR/sdk.js#xfbml=1&version=v22.0&appId=9275590379193160';
      script.async = true;
      script.defer = true;
      script.crossOrigin = 'anonymous';
      document.body.appendChild(script);
      
      script.onload = () => {
        if (window.FB && containerRef.current) {
          window.FB.XFBML.parse(containerRef.current);
        }
      };
    } else if (window.FB && containerRef.current) {
      // 이미 로드되어 있으면 파싱
      window.FB.XFBML.parse(containerRef.current);
    }
    
    return () => {
      // 컴포넌트 언마운트 시 정리 로직
    };
  }, []);

  // width 및 height 값 문자열 처리
  const widthStr = width ? width.toString() : '';
  const heightStr = height ? height.toString() : '';
  
  // 기타 속성 문자열 변환
  const hideCoverStr = hideCover.toString();
  const showFacepileStr = showFacepile.toString();
  const smallHeaderStr = smallHeader.toString();
  const adaptContainerWidthStr = adaptContainerWidth.toString();

  return (
    <div ref={containerRef}>
      <div 
        className="fb-page" 
        data-href={href} 
        data-tabs={tabs}
        data-width={widthStr}
        data-height={heightStr}
        data-small-header={smallHeaderStr}
        data-adapt-container-width={adaptContainerWidthStr}
        data-hide-cover={hideCoverStr}
        data-show-facepile={showFacepileStr}
      ></div>
    </div>
  );
} 