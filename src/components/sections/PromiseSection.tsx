'use client';

import { motion } from 'framer-motion';
import { GanttChartSquare } from 'lucide-react';
import ScrollIndicator from '../ScrollIndicator';

const promises = [
  {
    icon: GanttChartSquare,
    title: "공익제보자 보호 제도화",
    description: "시민의 목소리를 보호하겠습니다",
    items: [
      "공익제보자 보호 및 지원 조례 제정",
      "제보자 신분 보장 및 불이익 방지",
      "제보자 지원 전담 창구 운영"
    ],
    color: "bg-blue-500"
  },
  {
    icon: ScaleIcon,
    title: "현장 중심 의정활동",
    description: "시민의 옆에 있겠습니다",
    items: [
      "주민 불편사항 즉각 해결",
      "지역 현안 해결을 위한 협력"
    ],
    color: "bg-purple-500"
  }
];

export default function PromiseSection() {
  return (
    <section className="h-screen snap-start relative flex flex-col items-center pt-4 md:pt-[15vh] bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-400 px-4 text-gray-900">
      <div className="w-full max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-black text-center mb-12"
        >
          시민을 지키는 정치
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {promises.map((promise, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative bg-white/20 backdrop-blur-lg rounded-2xl p-6 border border-white/20
                         hover:bg-white/30 transition-all duration-300"
            >
              <div className={`absolute top-6 right-6 w-16 h-16 ${promise.color} rounded-full opacity-10
                              group-hover:opacity-20 transition-opacity duration-300`} />
              
              <div className="flex flex-col gap-4">
                <div className="flex items-start gap-4">
                  <div className={`${promise.color} p-3 rounded-xl`}>
                    <promise.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold mb-2 text-white">{promise.title}</h3>
                    <p className="text-lg text-gray-700">{promise.description}</p>
                  </div>
                </div>
                <ul className="space-y-2 pl-16">
                  {promise.items.map((item, itemIndex) => (
                    <motion.li
                      key={itemIndex}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 + (itemIndex * 0.1) }}
                      viewport={{ once: true }}
                      className="flex items-center gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-600" />
                      <span className="text-base md:text-lg text-gray-700">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-8 w-full">
        <ScrollIndicator isDark={true} color="text-gray-700" />
      </div>
    </section>
  );
} 