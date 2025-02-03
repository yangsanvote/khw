'use client';

import { motion } from 'framer-motion';
import CountdownTimer from '../CountdownTimer';
import Image from 'next/image';
import ScrollIndicator from '../ScrollIndicator';

const BulbText = ({ text, isOn }: { text: string; isOn: boolean }) => {
  return (
    <span className={`text ${isOn ? 'on' : 'off'} inline-flex items-center`}>
      <span className="bulb-container" style={{ 
        transform: `scale(${isOn ? '7.0' : '4.5'}) md:scale(${isOn ? '9.5' : '6.3'})`,
        margin: '0 2rem md:3rem',
        transformOrigin: 'center center'
      }}>
        {isOn && <span className="outer-glow"></span>}
        <svg className="bulb" viewBox="0 0 100 100">
          <defs>
            <radialGradient id={`bulbGradient${isOn ? 'On' : 'Off'}`} cx="50%" cy="40%" r="50%">
              {isOn ? (
                <>
                  <stop offset="0%" style={{ stopColor: 'rgba(255,255,255,1)' }} />
                  <stop offset="40%" style={{ stopColor: 'rgba(255,255,200,0.95)' }} />
                  <stop offset="90%" style={{ stopColor: 'rgba(255,235,59,0.9)' }} />
                </>
              ) : (
                <>
                  <stop offset="0%" style={{ stopColor: 'rgba(150,150,150,0.9)' }} />
                  <stop offset="90%" style={{ stopColor: 'rgba(80,80,80,0.9)' }} />
                </>
              )}
            </radialGradient>
          </defs>
          <circle className="bulb-light" cx="50" cy="40" r="40"/>
          <path className="filament" fill="none" 
                d="M35,45 L42,35 L38,40 L45,32 L42,38 L50,30 L47,38 L55,32 L52,38 L58,35 L55,40 L65,35" />
          {isOn && (
            <path className="filament-glow" fill="none" 
                  d="M35,45 L42,35 L38,40 L45,32 L42,38 L50,30 L47,38 L55,32 L52,38 L58,35 L55,40 L65,35" />
          )}
          <path className="glass-highlight" 
                d="M30,25 Q50,10 70,25 L65,35 Q50,20 35,35 Z" />
          <path className="glass-reflection"
                d="M25,40 Q23,50 25,60 L30,58 Q28,50 30,42 Z" />
          <path className="glass-reflection"
                d="M75,40 Q77,50 75,60 L70,58 Q72,50 70,42 Z" />
          <path className="bulb-body" d="M30,80 L70,80 L65,88 L35,88 Z" />
          <path className="metal-ring" d="M32,79 L68,79 L68,80 L32,80 Z" />
          <path className="metal-shine" d="M32,79 L68,79 L68,79.3 L32,79.3 Z" />
          <path className="bulb-body" d="M37,88 L63,88 L60,95 L40,95 Z" />
          <path className="metal-shine" d="M37,88 L63,88 L63,88.5 L37,88.5 Z" />
        </svg>
      </span>
      <span className={`${text === "FF" ? "-ml-2 md:-ml-6 text-[2.5em] md:text-[3em]" : "-ml-2 md:-ml-4 text-[2.8em] md:text-[3.4em]"}`}>{text}</span>
    </span>
  );
};

export default function HeroSection() {
  return (
    <section className="h-screen snap-start relative flex flex-col items-center pt-4 md:pt-8 bg-gradient-to-b from-yellow-50 to-white px-4 overflow-hidden">
      <div className="flex-1 w-full flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center relative z-10 w-full flex flex-col items-center gap-2 md:gap-8"
        >
          <motion.h1 
            className="text-4xl md:text-6xl font-black text-gray-900"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            1년의 약속,<br /> 확실한 변화
          </motion.h1>

          {/* 기강/이미지/특권 컨테이너 */}
          <div className="w-full flex flex-row items-center justify-center relative">
            {/* 중앙 이미지 - 먼저 렌더링되도록 순서 변경 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="w-full max-w-[288px] md:max-w-2xl flex flex-col items-center z-0"
            >
              <Image
                src="/images/candidate/profile.png"
                alt="후보자 프로필"
                width={500}
                height={700}
                priority
                className="w-auto h-auto max-h-[40vh] md:max-h-[60vh] object-contain mx-auto"
              />
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="mt-6 text-2xl md:text-4xl font-bold text-gray-800 whitespace-nowrap"
              >
                양산시의원예비후보 권현우
              </motion.p>
            </motion.div>

            {/* 왼쪽 기강 */}
            <motion.div
              className="text-xl md:text-4xl font-bold flex flex-col items-center shrink-0 z-10 absolute left-1 md:left-1/4 top-[10%] md:top-[20%]"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <span className="text-[2.3em] md:text-[2.5em] mb-2 md:mb-4">기강</span>
              <BulbText text="N" isOn={true} />
            </motion.div>

            {/* 오른쪽 특권 */}
            <motion.div
              className="text-xl md:text-4xl font-bold flex flex-col items-center shrink-0 z-10 absolute right-[-1rem] md:right-[20%] top-[60%] md:top-[55%]"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <span className="text-[2.3em] md:text-[2.5em] mb-2 md:mb-4">특권</span>
              <BulbText text="FF" isOn={false} />
            </motion.div>
          </div>

          {/* 타이머 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="w-full max-w-3xl mx-auto mt-2 md:mt-4"
          >
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-lg md:text-2xl font-medium text-gray-700 mb-2 md:mb-4"
            >
              양산시의회 변화까지 남은 시간
            </motion.p>
            <CountdownTimer />
          </motion.div>
        </motion.div>
      </div>

      {/* 스크롤 인디케이터를 섹션 바로 아래에 배치 */}
      <div className="relative w-full h-8 md:h-4">  {/* h-12 → h-8, md:h-8 → md:h-4 */}
        <ScrollIndicator isDark={true} color="text-gray-400" />
      </div>
    </section>
  );
}