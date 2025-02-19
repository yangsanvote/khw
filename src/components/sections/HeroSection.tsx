'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import CountdownTimer from '../CountdownTimer';
import ScrollIndicator from '../ScrollIndicator';
import VisitorCounter from '../VisitorCounter';

export default function HeroSection() {
  return (
    <section className="h-screen snap-start relative flex flex-col items-center justify-between bg-white text-gray-900 overflow-hidden">
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
      <div className="w-full max-w-6xl mx-auto flex flex-col items-center z-10 mt-[4vh] md:mt-0 lg:mt-[2vh] xl:mt-[4vh] 2xl:mt-[6vh] px-4">
        {/* 메인 텍스트 */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl lg:text-6xl text-center -mb-4 md:-mb-8 font-nanum-brush z-10"
        >
          사는 곳을 바꿉니다,<br />
          삶을 바꿉니다
        </motion.h1>

        {/* 프로필 이미지와 텍스트 */}
        <div className="relative w-full flex flex-col justify-center items-center mb-4">
          <div className="flex w-full justify-center items-center">
            {/* 다르다 텍스트 */}
            <motion.span
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="absolute left-3 md:left-[15%] lg:left-[18%] xl:left-[20%] text-4xl md:text-5xl lg:text-6xl font-extrabold z-0"
            >
              다르다
            </motion.span>

            {/* 프로필 이미지 */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="w-[20rem] md:w-[22rem] lg:w-[25rem] xl:w-[28rem] 2xl:w-[30rem] h-[20rem] md:h-[22rem] lg:h-[25rem] xl:h-[28rem] 2xl:h-[30rem] relative z-20"
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
              className="absolute right-5 md:right-[15%] lg:right-[18%] xl:right-[20%] text-4xl md:text-5xl lg:text-6xl font-extrabold z-0"
            >
              진짜다
            </motion.span>
          </div>
        </div>

        {/* 후보자 텍스트와 카운트다운 */}
        <div className="space-y-0 md:space-y-1 z-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-xl md:text-3xl font-bold text-center -mb-1"
          >
            양산시의원예비후보 권현우
          </motion.h2>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center"
          >
            <p className="text-base md:text-lg mb-0">양산시의회의원 보궐선거까지</p>
            <CountdownTimer />
          </motion.div>
        </div>
      </div>

      {/* 하단 요소들 */}
      <div className="w-full flex flex-col items-center justify-center relative">
        <ScrollIndicator isDark={false} className="bottom-32 md:bottom-8" />
        <VisitorCounter className="px-4" />
      </div>
    </section>
  );
}