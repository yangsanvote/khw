'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ScrollIndicator from '../ScrollIndicator';
import Image from 'next/image';

const careers = [
  { year: "19xx", title: "어디서 태어남" },
  { year: "19xx", title: "어쩌고 졸업" },
  { year: "20xx", title: "어디전역" },
  { year: "20xx", title: "저쩌고 졸업" }
];

const activities = [
  { year: "2023", title: "이런 활동" },
  { year: "2022", title: "저런 활동" },
  { year: "2021", title: "그런 활동" },
  { year: "20xx", title: "저쩌고 졸업" },
  { year: "20xx", title: "저쩌고 졸업" },
  { year: "20xx", title: "저쩌고 졸업" },
  { year: "20xx", title: "저쩌고 졸업" },
  { year: "20xx", title: "저쩌고 졸업" },
  { year: "20xx", title: "저쩌고 졸업" },
  { year: "20xx", title: "저쩌고 졸업" }
];

const awards = [
  { year: "2022", title: "이런상" },
  { year: "2021", title: "저런상" },
  { year: "20xx", title: "그런상" },
  { year: "20xx", title: "요런상" },
  { year: "20xx", title: "밥상" },
  { year: "20xx", title: "마상" }
];

export default function CandidateSection() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null; // 또는 로딩 상태를 보여줄 수 있습니다
  }

  return (
    <section 
      suppressHydrationWarning={true}
      className="h-screen snap-start relative flex flex-col items-center pt-4 md:pt-[2vh] bg-gradient-to-br from-slate-100 via-slate-200 to-slate-100 px-4 text-gray-800 overflow-x-hidden"
    >
      <div className="w-full max-w-7xl mx-auto h-full flex flex-col">
        {/* 사진 */}
        <div className="flex flex-col mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="w-full h-[40vh] bg-white/10 rounded-2xl overflow-hidden"
          >
            <div className="w-full h-full relative">
              <Image
                src="/images/candidate/profile_l.png"
                alt="권현우"
                fill
                className="object-cover"
              />
            </div>
          </motion.div>
        </div>

        {/* 제목 */}
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-800"
        >
          권현우 살아온 길
        </motion.h2>

        {/* 약력 카드들 */}
        <div className="flex-1 overflow-y-auto flex flex-col">
          {/* 데스크탑 뷰 */}
          <div className="hidden md:grid md:grid-cols-3 gap-8 max-h-[40vh] overflow-y-auto scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-300">
            {/* 직업 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white/60 backdrop-blur-lg rounded-2xl p-8 border border-gray-200 shadow-sm"
            >
              <h3 className="text-2xl font-bold mb-8 text-emerald-600">주요이력</h3>
              <ul className="space-y-6">
                {careers.map((career, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex flex-col"
                  >
                    <span className="text-sm text-gray-500">{career.year}</span>
                    <span className="text-lg text-gray-700">{career.title}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* 사회활동 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white/60 backdrop-blur-lg rounded-2xl p-8 border border-gray-200 shadow-sm"
            >
              <h3 className="text-2xl font-bold mb-8 text-emerald-600">사회활동</h3>
              <ul className="space-y-6">
                {activities.map((activity, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex flex-col"
                  >
                    <span className="text-sm text-gray-500">{activity.year}</span>
                    <span className="text-lg text-gray-700">{activity.title}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* 수상 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white/60 backdrop-blur-lg rounded-2xl p-8 border border-gray-200 shadow-sm"
            >
              <h3 className="text-2xl font-bold mb-8 text-emerald-600">수상</h3>
              <ul className="space-y-6">
                {awards.map((award, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex flex-col"
                  >
                    <span className="text-sm text-gray-500">{award.year}</span>
                    <span className="text-lg text-gray-700">{award.title}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* 모바일 뷰 - 하나의 카드로 통합 */}
          <div className="md:hidden bg-white/60 backdrop-blur-lg rounded-2xl p-6 border border-gray-200 h-[30vh] overflow-y-auto scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-300 mb-4 shadow-sm">
            {/* 직업 섹션 */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-6 text-emerald-600">주요이력</h3>
              <ul className="space-y-4">
                {careers.map((career, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex flex-col"
                  >
                    <span className="text-sm text-gray-500">{career.year}</span>
                    <span className="text-lg text-gray-700">{career.title}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* 사회활동 섹션 */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-6 text-emerald-600">사회활동</h3>
              <ul className="space-y-4">
                {activities.map((activity, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex flex-col"
                  >
                    <span className="text-sm text-gray-500">{activity.year}</span>
                    <span className="text-lg text-gray-700">{activity.title}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* 수상 섹션 */}
            <div>
              <h3 className="text-2xl font-bold mb-6 text-emerald-600">수상</h3>
              <ul className="space-y-4">
                {awards.map((award, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex flex-col"
                  >
                    <span className="text-sm text-gray-500">{award.year}</span>
                    <span className="text-lg text-gray-700">{award.title}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="relative w-full h-8 md:h-4">
        <ScrollIndicator isDark={false} color="text-gray-400" />
      </div>
    </section>
  );
} 