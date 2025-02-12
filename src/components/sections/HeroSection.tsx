'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import CountdownTimer from '../CountdownTimer';
import ScrollIndicator from '../ScrollIndicator';

export default function HeroSection() {
  return (
    <section className="h-screen snap-start relative flex flex-col items-center justify-center bg-white text-gray-900 px-4 overflow-hidden">
      {/* 네 귀퉁이 삼각형 - 최하위 레이어 */}
      <div className="absolute top-0 left-0 w-32 h-32 md:w-48 md:h-48 z-0">
        <div className="w-full h-full" style={{
          background: 'rgb(255, 237, 0)',
          clipPath: 'polygon(0 0, 0% 100%, 100% 0)'
        }} />
      </div>

      {/* 오른쪽 상단 삼각형 */}
      <div className="absolute top-0 right-0 w-32 h-32 md:w-48 md:h-48 z-0">
        <div className="w-full h-full" style={{
          background: 'rgb(0, 163, 103)',
          clipPath: 'polygon(100% 0, 0 0, 100% 100%)'
        }} />
      </div>

      {/* 왼쪽 하단 삼각형 */}
      <div className="absolute bottom-0 left-0 w-32 h-32 md:w-48 md:h-48 z-0">
        <div className="w-full h-full" style={{
          background: 'rgb(232, 50, 110)',
          clipPath: 'polygon(0 100%, 100% 100%, 0 0)'
        }} />
      </div>

      {/* 오른쪽 하단 삼각형 */}
      <div className="absolute bottom-0 right-0 w-32 h-32 md:w-48 md:h-48 z-0">
        <div className="w-full h-full" style={{
          background: 'rgb(98, 61, 145)',
          clipPath: 'polygon(100% 100%, 100% 0, 0 100%)'
        }} />
      </div>

      {/* 메인 컨텐츠 */}
      <div className="w-full max-w-6xl mx-auto flex flex-col items-center z-10 mt-[0vh] md:mt-[5vh]">
        {/* 메인 텍스트 */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-8xl text-center mb-8 font-nanum-brush z-10"
        >
          사는 곳을 바꿉니다,<br />
          삶을 바꿉니다
        </motion.h1>

        {/* 프로필 이미지와 텍스트 */}
        <div className="relative w-full flex flex-col justify-center items-center mb-8 -mt-[10vh]">
          <div className="flex w-full justify-center items-center">
            {/* 다르다 텍스트 */}
            <motion.span
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="absolute left-0 md:left-[15%] top-1/2 text-4xl md:text-7xl font-extrabold z-0"
            >
              다르다
            </motion.span>

            {/* 프로필 이미지 - 최상위 */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="w-[25.92rem] md:w-[38.88rem] h-[25.92rem] md:h-[38.88rem] relative z-20"
            >
              <Image
                src="/images/profile.png"
                alt="권현우 후보"
                fill
                className="object-contain"
                priority
              />
            </motion.div>

            {/* 진짜다 텍스트 */}
            <motion.span
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="absolute right-0 md:right-[15%] top-1/2 text-4xl md:text-7xl font-extrabold z-0"
            >
              진짜다
            </motion.span>
          </div>

          {/* 후보자 텍스트 */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-2xl md:text-4xl font-bold mt-4 md:mt-6"
          >
            양산시의원예비후보 권현우
          </motion.h2>
        </div>

        {/* 카운트다운 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center -mt-4"
        >
          <p className="text-lg md:text-xl mb-2">양산시의회의원 보궐선거까지</p>
          <CountdownTimer />
        </motion.div>
      </div>

      <ScrollIndicator />
    </section>
  );
}