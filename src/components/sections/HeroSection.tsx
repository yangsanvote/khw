'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import CountdownTimer from '../CountdownTimer';
import VisitorCounter from '../VisitorCounter';
import ScrollIndicator from '../ScrollIndicator';

// 폰트 스타일 정의
const fontsStyle = `
  @font-face {
    font-family: 'Pretendard-Regular';
    src: url('https://fastly.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
    font-weight: 400;
    font-style: normal;
  }
  
  @font-face {
    font-family: 'Giants-Bold';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_2307-1@1.1/Giants-Bold.woff2') format('woff2');
    font-weight: 700;
    font-style: normal;
  }
  
  @font-face {
    font-family: 'InkLipquid';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_one@1.0/InkLipquid.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }
  
  body, h1, h2, h3, h4, h5, h6, p, span, button {
    font-family: 'Pretendard-Regular', sans-serif;
  }
`;

export default function HeroSection() {
  return (
    <>
      {/* Pretendard 폰트 스타일 적용 */}
      <style jsx global>{fontsStyle}</style>
      
      <section className="h-screen snap-start relative flex flex-col items-center justify-start pt-8 md:pt-10 bg-white text-gray-900 overflow-visible px-4 py-8 font-[Pretendard-Regular]">
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
        <div className="w-full max-w-6xl mx-auto mt-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center z-10 px-4"
          >
            {/* 메인 텍스트 */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl lg:text-7xl text-center -mb-1 md:-mb-2 z-10"
              style={{ fontFamily: 'InkLipquid, cursive', letterSpacing: '0.01em' }}
            >
              사는 곳을 바꿉니다,{' '}
              <span className="md:hidden"><br /></span>
              삶을 바꿉니다
            </motion.h1>

            {/* 프로필 이미지와 텍스트 */}
            <div className="relative w-full flex flex-col justify-center items-center mb-1">
              <div className="flex w-full justify-center items-center">
                {/* 다르다 텍스트 */}
                <motion.span
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="absolute left-3 md:left-[15%] lg:left-[18%] xl:left-[20%] text-4xl md:text-5xl lg:text-6xl font-extrabold z-0"
                  style={{ fontFamily: 'Giants-Bold, sans-serif' }}
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
                    sizes="(max-width: 768px) 20rem, (max-width: 1024px) 22rem, (max-width: 1280px) 25rem, (max-width: 1536px) 28rem, 30rem"
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
                  style={{ fontFamily: 'Giants-Bold, sans-serif' }}
                >
                  진짜다
                </motion.span>
              </div>
            </div>

            {/* 후보자 텍스트와 카운트다운 */}
            <div className="space-y-0 z-10">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-xl md:text-3xl font-bold text-center -mb-0.5 font-giants"
              >
                양산시의원예비후보(양주동, 동면) 권현우
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
          </motion.div>

          {/* 하단 요소들 수정 */}
          <div className="w-full flex flex-col items-center justify-center">
            <VisitorCounter className="px-4" />
            
            {/* 스크롤 인디케이터 추가 */}
            <ScrollIndicator className="mt-4" />
          </div>
        </div>
      </section>
    </>
  );
}