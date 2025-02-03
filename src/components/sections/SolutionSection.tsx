'use client';

import { motion } from 'framer-motion';
import { Shield, Eye } from 'lucide-react';
import ScrollIndicator from '../ScrollIndicator';

const solutions = [
  {
    title: "시의회 책임성 강화",
    subtitle: "시의회도 잘못하면 벌받아야죠",
    icon: Shield,
    color: "text-blue-500",
    items: [
      "윤리강령 위반시 실질적 제재 조례 제정",
      "의정 불성실 및 비위행위 징계 기준 강화",
      "의회 예산 사용 위반시 처벌 조항 신설"
    ]
  },
  {
    title: "투명한 의정활동 실천",
    subtitle: "시의회 활동 시민들이 알아야죠",
    icon: Eye,
    color: "text-green-500",
    items: [
      "의정활동 실시간 공개",
      "예산 심의 과정 상세 공개",
      "주민 의견 청취 창구 상시 운영"
    ]
  }
];

export default function SolutionSection() {
  return (
    <section className="h-screen snap-start relative flex flex-col items-center pt-8 md:pt-24 bg-white px-4">
      <div className="w-full max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-black text-gray-900 text-center mb-8 md:mb-16"
        >
          견제와 감시,<br/> 이제는 제도로
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-4 md:gap-8">
          {solutions.map((solution, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-gray-50 rounded-xl shadow-xl p-4 md:p-8 hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
                <solution.icon className={`w-8 h-8 md:w-10 md:h-10 ${solution.color}`} />
                <div>
                  <h3 className="text-xl md:text-3xl font-bold text-gray-900">
                    {solution.title}
                  </h3>
                  <p className="text-base md:text-xl text-gray-600 mt-1">
                    {solution.subtitle}
                  </p>
                </div>
              </div>
              <ul className="space-y-2 md:space-y-4">
                {solution.items.map((item, itemIndex) => (
                  <motion.li
                    key={itemIndex}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: (index * 0.2) + (itemIndex * 0.1) }}
                    viewport={{ once: true }}
                    className="flex items-start gap-2 md:gap-3"
                  >
                    <span className="text-blue-500 text-xl md:text-2xl leading-none">•</span>
                    <span className="text-base md:text-xl text-gray-700">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
      <ScrollIndicator />
    </section>
  );
} 