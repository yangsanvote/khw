'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Footprints, Users, Trophy } from 'lucide-react';
import ScrollIndicator from '../ScrollIndicator';
import Image from 'next/image';

const careers = [
  { year: "2019~", title: "양산부산대학교 치과병원 총무인사팀 근무" },
  { year: "2025", title: "한국방송통신대학교 교육학과/행정학과 졸업" },
  { year: "2013", title: "오봉도시락 양산점 대표" },
  { year: "2013", title: "양산으로 이사" },
  { year: "2012", title: "둘째 아들 탄생" },
  { year: "2010", title: "첫째 아들 탄생" },
  { year: "1999", title: "1118 야공단 전역" },
  { year: "1995", title: "동아공업고등학교 졸업" },
  { year: "1976", title: "부산 동래 출생" }
];
const activities = [
  { year: "2024~", title: "정의당 양산시위원회 민생상담 소장" },
  { year: "2024~", title: "웅상공공의료원 설립 추진운동본부 공동대표" },
  { year: "2023~", title: "민주평화통일자문회의 양산시협의회 위원" },
  { year: "2022", title: "제8회 동시지방선거 양산시의회선거 후보자" },
  { year: "2022~", title: "청어람우리마을 아이돌봄센터 대표" },
  { year: "2022~", title: "'다움' 성교육 연구소 대표" },
  { year: "2022~", title: "중앙중학교 운영위원회 위원" },
  { year: "2022~", title: "현) 청어람협의체 대표" },
  { year: "2021~", title: "신도시아파트 연합회 사무국장" },
  { year: "2021~", title: "부산울산경남노동역사관 건립추진위원회 위원" },
  { year: "2020", title: "제21대 국회의원 양산시(을) 후보자" },
  { year: "2019~", title: "청어람작은도서관 운영위원" },
  { year: "2019~", title: "양산신도시아파트 청어람 입주자대표" },
  { year: "2018", title: "제7회 동시지방선거 양산시의회선거 후보자" },
  { year: "전)", title: "경상남도 주민참여예산위원회 위원회 위원" },
  { year: "전)", title: "삽량초등학교 운영위원회 부위원장" },
  { year: "전)", title: "삽량초등학교 교권보호위원회 위원장" },
  { year: "전)", title: "꿈을 꾸는 어린이집 운영위원" },
  { year: "전)", title: "양산 아이쿱 대의원 및 감사" },
  { year: "전)", title: "양산기후위기비상행동 공동대표" },
  { year: "전)", title: "차별금지법제정 양산시민행동 공동대표" },
  { year: "전)", title: "정의당 양산시위원회 위원장" },
  { year: "전)", title: "양산시 공동주택지원심의위원회 위원" },
  { year: "전)", title: "메깃들 마을학교 사무국장" },
  { year: "전)", title: "김해양산환경운동연합 운영위원" },
  { year: "전)", title: "청어람작은도서관 관장" },
  { year: "전)", title: "양주동 주민자치회 위원" },
  { year: "전)", title: "양산시 주민참여예산위원회 위원" },
  { year: "전)", title: "경상남도 기후도민회의 위원" },
  { year: "전)", title: "바람꽃 작은도서관 운영위원" },
  { year: "전)", title: "중앙중학교 운영위원회 부위원장" },
  { year: "전)", title: "양산 YMCA 이사" },
];

const awards = [
  { year: "2024", title: "경상남도 아파트공동체 유공 도지사 표창" },
  { year: "2022", title: "대한적십자사 사회봉사 유공 회장 표창" },
  { year: "2021", title: "경상남도 아파트공동체 유공 도지사 표창" }
];

const profileImages = [
  '/images/candidate/profile-1.jpg',
  ...Array.from({ length: 9 }, (_, i) => `/images/candidate/profile-${i + 2}.jpg`)
];

export default function CandidateSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % profileImages.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  const pauseAutoPlay = () => setIsAutoPlaying(false);
  const resumeAutoPlay = () => setIsAutoPlaying(true);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % profileImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + profileImages.length) % profileImages.length);
  };

  if (!isMounted) {
    return null; // 또는 로딩 상태를 보여줄 수 있습니다
  }

  return (
    <section 
      suppressHydrationWarning={true}
      className="h-screen snap-start relative flex flex-col items-center pt-8 md:pt-0 bg-gradient-to-br from-slate-100 via-slate-200 to-slate-100 px-4 text-gray-800 overflow-x-hidden"
    >
      <div className="w-full max-w-6xl mx-auto relative mt-4 md:mt-0">
        <div className="flex flex-col h-[90vh] md:h-full">
          {/* 사진 */}
          <div className="flex flex-col mb-2 md:mb-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="w-full h-[35vh] bg-white/10 rounded-2xl overflow-hidden relative group"
              onMouseEnter={pauseAutoPlay}
              onMouseLeave={resumeAutoPlay}
            >
              <div className="w-full h-full relative">
                <Image
                  src={profileImages[currentImageIndex]}
                  alt="권현우"
                  fill
                  className="object-contain transition-opacity duration-300"
                />
              </div>

              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 p-2 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 p-2 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {profileImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-200 ${
                      index === currentImageIndex ? 'bg-white scale-125' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </motion.div>
          </div>

          {/* 제목 */}
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl font-bold text-center mb-2 md:mb-4 text-gray-800"
          >
            권현우 살아온 길
          </motion.h2>

          {/* 모바일 버전 */}
          <div className="block md:hidden flex-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-3 shadow-lg h-[40vh]"
            >
              <div className="h-full overflow-y-auto scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-300">
                {/* 수상 */}
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center">
                      <Trophy className="w-5 h-5 text-slate-600" />
                    </div>
                    <h3 className="text-lg font-bold">수상</h3>
                  </div>
                  <ul className="space-y-6">
                    {awards.map((award, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-start gap-2"
                      >
                        <span className="text-sm text-gray-500 shrink-0 w-14">{award.year}</span>
                        <span className="text-base text-gray-700">{award.title}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* 사회활동 */}
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center">
                      <Users className="w-5 h-5 text-slate-600" />
                    </div>
                    <h3 className="text-lg font-bold">사회활동</h3>
                  </div>
                  <ul className="space-y-6">
                    {activities.map((activity, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-start gap-2"
                      >
                        <span className="text-sm text-gray-500 shrink-0 w-14">{activity.year}</span>
                        <span className="text-base text-gray-700">{activity.title}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* 삶의 발자취 */}
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center">
                      <Footprints className="w-5 h-5 text-slate-600" />
                    </div>
                    <h3 className="text-lg font-bold">삶의 발자취</h3>
                  </div>
                  <ul className="space-y-6">
                    {careers.map((career, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-start gap-2"
                      >
                        <span className="text-sm text-gray-500 shrink-0 w-14">{career.year}</span>
                        <span className="text-base text-gray-700">{career.title}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>

          {/* 데스크탑 버전 */}
          <div className="hidden md:grid md:grid-cols-3 gap-4 mb-2 flex-1">
            {/* 삶의 발자취 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-3 shadow-lg md:h-[40vh]"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center">
                  <Footprints className="w-5 h-5 text-slate-600" />
                </div>
                <h3 className="text-lg font-bold">삶의 발자취</h3>
              </div>
              <div className="h-[calc(100%-3.5rem)] overflow-y-auto scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-300">
                <ul className="space-y-6">
                  {careers.map((career, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-start gap-2"
                    >
                      <span className="text-sm text-gray-500 shrink-0 w-14">{career.year}</span>
                      <span className="text-base text-gray-700">{career.title}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* 사회활동 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-3 shadow-lg md:h-[40vh]"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center">
                  <Users className="w-5 h-5 text-slate-600" />
                </div>
                <h3 className="text-lg font-bold">사회활동</h3>
              </div>
              <div className="h-[calc(100%-3.5rem)] overflow-y-auto scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-300">
                <ul className="space-y-6">
                  {activities.map((activity, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-start gap-2"
                    >
                      <span className="text-sm text-gray-500 shrink-0 w-14">{activity.year}</span>
                      <span className="text-base text-gray-700">{activity.title}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* 수상 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-3 shadow-lg md:h-[40vh]"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center">
                  <Trophy className="w-5 h-5 text-slate-600" />
                </div>
                <h3 className="text-lg font-bold">수상</h3>
              </div>
              <div className="h-[calc(100%-3.5rem)] overflow-y-auto scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-300">
                <ul className="space-y-6">
                  {awards.map((award, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-start gap-2"
                    >
                      <span className="text-sm text-gray-500 shrink-0 w-14">{award.year}</span>
                      <span className="text-base text-gray-700">{award.title}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* 스크롤 화살표 */}
      <div className="absolute bottom-[10%] left-0 right-0 z-10">
        <ScrollIndicator isDark={true} color="text-gray-400" />
      </div>
    </section>
  );
} 