'use client';

import { useState, useEffect } from 'react';

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const targetDate = new Date('2025-04-02T06:00:00+09:00');  // 한국 시간 2025년 4월 2일 06시

    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex gap-4 md:gap-8 justify-center items-center text-2xl md:text-4xl font-bold">
      <div className="text-center">
        <div className="bg-white rounded-lg shadow-lg px-4 py-2 min-w-[4rem] md:min-w-[6rem]">
          {timeLeft.days}
        </div>
        <div className="text-sm mt-1">일</div>
      </div>
      <div className="text-center">
        <div className="bg-white rounded-lg shadow-lg px-4 py-2 min-w-[4rem] md:min-w-[6rem]">
          {timeLeft.hours}
        </div>
        <div className="text-sm mt-1">시간</div>
      </div>
      <div className="text-center">
        <div className="bg-white rounded-lg shadow-lg px-4 py-2 min-w-[4rem] md:min-w-[6rem]">
          {timeLeft.minutes}
        </div>
        <div className="text-sm mt-1">분</div>
      </div>
      <div className="text-center">
        <div className="bg-white rounded-lg shadow-lg px-4 py-2 min-w-[4rem] md:min-w-[6rem]">
          {timeLeft.seconds}
        </div>
        <div className="text-sm mt-1">초</div>
      </div>
    </div>
  );
}