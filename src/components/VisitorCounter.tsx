'use client';

import { useEffect, useState } from 'react';

export default function VisitorCounter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    fetch('/api/visitor')
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          console.error('Visitor counter error:', data.error);
        } else {
          setCount(data.count);
        }
      })
      .catch(error => {
        console.error('Failed to fetch visitor count:', error);
      });
  }, []);

  return (
    <div className="text-[10px] text-white/30 absolute bottom-2 right-2">
      방문자 {count}
    </div>
  );
} 