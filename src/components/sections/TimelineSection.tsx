'use client';

import { motion } from 'framer-motion';
import { Gavel, Shield, Users, Trophy } from 'lucide-react';
import ScrollIndicator from '../ScrollIndicator';

const timelineEvents = [
  {
    phase: "1단계",
    period: "2025.4-7",
    icon: Gavel,
    title: "긴급 개혁",
    story: "시의회 기강 ON 특권 OFF",
    items: [
      "윤리강령 개정안",
      "징계기준 강화안",
      "예산투명성 강화"
    ],
    color: "bg-blue-500"
  },
  {
    phase: "2단계",
    period: "2025.8-11",
    icon: Shield,
    title: "제도 구축",
    story: "시민의 목소리 보호",
    items: [
      "공익제보자 보호",
      "의정활동 평가기준"
    ],
    color: "bg-purple-500"
  },
  {
    phase: "3단계",
    period: "2025.12-2026.2",
    icon: Users,
    title: "성과 창출",
    story: "시민과 함께 만드는 새로운 시의회",
    items: [
      "시민참여 활성화",
      "의회운영규칙 개정"
    ],
    color: "bg-green-500"
  },
  {
    phase: "4단계",
    period: "2026.3-6",
    icon: Trophy,
    title: "성과 확산",
    story: "변화된 시의회 시민과 공유",
    items: [
      "제도 운영 고도화",
      "성과 공유회"
    ],
    color: "bg-yellow-500"
  }
];

export default function TimelineSection() {
  return (
    <section className="min-h-[200vh] md:min-h-screen md:h-screen snap-start relative flex flex-col items-center pt-8 md:pt-[2vh] bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-4 md:px-4 text-white">
      <div className="w-full max-w-[90rem] mx-auto h-full flex flex-col">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-black text-center mb-10"
        >
          시의원 권현우의 14개월
        </motion.h2>

        <div className="relative flex-1 flex flex-col">
          {/* 중앙 세로선 */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-[2.5%] md:bottom-[15%] w-0.5 bg-yellow-400" />

          {/* 타임라인 이벤트들을 감싸는 div */}
          <div className="space-y-8 md:space-y-4">
            {timelineEvents.map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 ? 20 : -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className={`relative flex flex-col md:flex-row ${index % 2 ? 'md:flex-row-reverse' : ''} items-center gap-4 md:gap-4`}
              >
                {/* 단계 & 아이콘 */}
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 flex items-center justify-center z-10">
                  <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full ${event.color} shadow-lg flex items-center justify-center`}>
                    <event.icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
                  </div>
                </div>

                {/* 콘텐츠 */}
                <div className={`ml-24 md:ml-0 w-[calc(100%-6rem)] md:w-[calc(50%-4rem)] ${index % 2 ? 'md:pl-16' : 'md:pr-16'}`}>
                  <div className="bg-white/10 backdrop-blur rounded-xl p-6 md:p-8 relative z-0">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="text-xl md:text-lg font-bold text-gray-300">{event.phase}</div>
                      <div className="text-sm md:text-sm text-gray-400">({event.period})</div>
                    </div>
                    <div className="flex flex-col md:flex-row md:items-baseline gap-3 md:gap-3">
                      <h3 className="text-2xl md:text-xl font-bold">{event.title}</h3>
                      <p className="text-lg md:text-base italic text-gray-300">{event.story}</p>
                    </div>
                    <ul className="space-y-3 md:space-y-2 mt-4 md:mt-4">
                      {event.items.map((item, itemIndex) => (
                        <motion.li
                          key={itemIndex}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: 0.3 + (itemIndex * 0.1) }}
                          viewport={{ once: true }}
                          className="flex items-center gap-3 md:gap-2"
                        >
                          <span className="w-2 h-2 md:w-1.5 md:h-1.5 rounded-full bg-white/50" />
                          <span className="text-lg md:text-base text-gray-300">{item}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* 최종 목표 박스를 space-y의 영향을 받지 않도록 별도 컨테이너로 분리 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="relative flex justify-center items-center mt-auto md:mt-0 pt-20 md:pt-6"
          >
            {/* 모바일에서만 보이는 가로선 */}
            <div className="absolute md:hidden left-6 top-[7rem] w-[calc(50%-3rem)] h-0.5 bg-yellow-400" />
            
            {/* 박스 */}
            <div className="relative ml-auto md:ml-0 mr-4 md:mr-0 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-xl px-8 py-4 shadow-lg">
              <h3 className="text-2xl md:text-2xl font-bold text-gray-900">
                시민을 지키는 정치
              </h3>
            </div>
          </motion.div>
        </div>
      </div>

      {/* 스크롤 인디케이터를 섹션 바로 아래에 배치 */}
      <div className="absolute bottom-4 md:relative md:w-full md:h-20 w-full">
        <ScrollIndicator isDark={false} color="text-gray-400" />
      </div>
    </section>
  );
} 