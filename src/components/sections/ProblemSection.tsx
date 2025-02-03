'use client';

import { motion } from 'framer-motion';
import { AlertTriangle, Ban, VolumeX, HelpCircle, DollarSign } from 'lucide-react';
import ScrollIndicator from '../ScrollIndicator';

const problems = [
  {
    text: "돈은 마음대로 쓰고",
    icon: DollarSign,
    color: "text-red-500",
    description: "예산 심의 과정이 불투명하고 견제가 없습니다"
  },
  {
    text: "비위는 마음대로 저질러도",
    icon: AlertTriangle,
    color: "text-orange-500",
    description: "의원 비위 행위에 대한 제재가 미약합니다"
  },
  {
    text: "아무런 벌칙도 없는 시의회",
    icon: Ban,
    color: "text-yellow-600",
    description: "실효성 있는 징계 규정이 없습니다"
  },
  {
    text: "시민의 목소리는 외면하는 시의회",
    icon: VolumeX,
    color: "text-emerald-600",
    description: "시민 의견 수렴 창구가 부족합니다"
  },
  {
    text: "뭘 하는지 모르지만 뉴스에 나오면 부끄러운 소식뿐인 시의회",
    icon: HelpCircle,
    color: "text-blue-500",
    description: "의정활동 내용이 제대로 공개되지 않습니다"
  }
];

export default function ProblemSection() {
  return (
    <section className="h-screen snap-start relative flex flex-col items-center pt-16 bg-gray-900 px-4">
      <div className="w-full max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-black text-white text-center mb-5"
        >
          양산 시의회,<br/> 부끄러워서 살겠습니까?
        </motion.h2>

        <div className="space-y-3">
          {problems.map((problem, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-gray-800 rounded-lg shadow-lg p-4 md:p-6 transform hover:-translate-y-1 transition-transform duration-300"
            >
              <div className="flex items-start gap-3">
                <problem.icon className={`w-6 h-6 md:w-8 md:h-8 ${problem.color} shrink-0`} />
                <div>
                  <p className="text-lg md:text-2xl text-white font-bold mb-1 md:mb-2">{problem.text}</p>
                  <p className="text-sm md:text-base text-gray-400">{problem.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <ScrollIndicator isDark={true} />
    </section>
  );
} 