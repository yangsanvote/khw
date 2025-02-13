'use client';

import { useEffect, useState } from 'react';

export default function VisitorCounter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // 로컬스토리지에서 방문 기록 확인
    const lastVisit = localStorage.getItem('lastVisit');
    const today = new Date().toDateString();

    // 오늘 첫 방문인 경우에만 카운트 증가
    if (lastVisit !== today) {
      const currentCount = Number(localStorage.getItem('visitorCount') || 0);
      const newCount = currentCount + 1;
      localStorage.setItem('visitorCount', newCount.toString());
      localStorage.setItem('lastVisit', today);
      setCount(newCount);
    } else {
      setCount(Number(localStorage.getItem('visitorCount') || 0));
    }
  }, []);

  return (
    <div className="text-[10px] text-white/30 absolute bottom-2 right-2">
      방문자 {count}
    </div>
  );
} 