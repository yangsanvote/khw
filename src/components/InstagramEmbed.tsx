'use client';

import { useEffect, useRef } from 'react';

interface InstagramEmbedProps {
  url: string;
  maxWidth?: number | string;
  hideCaption?: boolean;
}

export default function InstagramEmbed({
  url,
  maxWidth = 500,
  hideCaption = false
}: InstagramEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 인스타그램 임베드 스크립트가 이미 있는지 확인
    const instagramScript = document.getElementById('instagram-embed-script');
    
    if (!instagramScript) {
      const script = document.createElement('script');
      script.id = 'instagram-embed-script';
      script.src = 'https://www.instagram.com/embed.js';
      script.async = true;
      document.body.appendChild(script);
      
      script.onload = () => {
        if (window.instgrm) {
          window.instgrm.Embeds.process();
        }
      };
    } else if (window.instgrm) {
      // 이미 스크립트가 로드되어 있다면 처리 진행
      window.instgrm.Embeds.process();
    }
    
    return () => {
      // 컴포넌트 언마운트 시 정리 로직
    };
  }, [url]);

  // Caption 표시 여부
  const captionParam = hideCaption ? 'captioned=false' : 'captioned=true';
  
  // 실제 포스트 ID 추출
  const getPostId = (instagramUrl: string) => {
    // URL 형식: https://www.instagram.com/p/POST_ID/
    const parts = instagramUrl.split('/');
    for (let i = 0; i < parts.length; i++) {
      if (parts[i] === 'p' && i + 1 < parts.length) {
        return parts[i + 1].replace(/\/$/, '').replace(/\?.*$/, '');
      }
    }
    return '';
  };
  
  const postId = getPostId(url);
  const embedUrl = `https://www.instagram.com/p/${postId}/embed/?${captionParam}`;

  return (
    <div ref={containerRef} className="instagram-embed-container">
      {postId ? (
        <iframe
          title="Instagram Post"
          src={embedUrl}
          width="100%"
          height="550"
          frameBorder="0"
          scrolling="no"
          allowtransparency="true"
          style={{ 
            maxWidth: typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth,
            margin: '0 auto',
            display: 'block',
            borderRadius: '8px',
            overflow: 'hidden'
          }}
        ></iframe>
      ) : (
        <div className="p-4 bg-gray-100 rounded-md text-center">
          인스타그램 게시물을 불러올 수 없습니다.
        </div>
      )}
    </div>
  );
} 