'use client';

import { useEffect, useState } from 'react';

export default function VisitorCounter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    fetch('/api/visitor')
      .then(res => res.json())
      .then(data => setCount(data.count));
  }, []);

  return (
    <div className="text-[10px] text-white/30 absolute bottom-2 right-2">
      방문자 {count}
    </div>
  );
} 