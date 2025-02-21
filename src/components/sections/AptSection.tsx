'use client';

import { motion } from 'framer-motion';
import { Home, Users, Shield } from 'lucide-react';
import ScrollIndicator from '../ScrollIndicator';
import Image from 'next/image';

const aptItems = [
  {
    icon: Home,
    title: "공동주택 유지보수 지원",
    description: "아파트 유지보수, 비용과 안전, 그리고 편의 세마리 토끼를 한꺼번에 잡는 비법, 권현우가 알려드립니다."
  },
  {
    icon: Users,
    title: "주민갈등 조정위원회 설립",
    description: "유명무실한 분쟁조정위원회의 내실 다지기"
  },
  {
    icon: Shield,
    title: "아파트 종사자 안전 지원",
    description: "노후 아파트의 아파트 종사자 휴게실 설치 허가 조건 간소화"
  }
];

export default function AptSection() {
  return (
    <section className="h-screen snap-start relative flex flex-col items-center justify-center bg-gradient-to-br from-rose-50 via-white to-rose-50 px-4 py-8">
      <div className="absolute inset-0 opacity-10">
        <Image
          src="/images/BAH07192.JPG"
          alt="청어람 아파트"
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="w-full max-w-6xl mx-auto relative mt-16 md:-mt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="text-2xl md:text-5xl font-black text-[#E8326E] mb-4">
            아파트의 개념을 새로 쓴 사람
          </h2>
          <p className="text-lg md:text-2xl text-rose-600 mb-3">
            사는 곳을 바꿉니다, 삶을 바꿉니다
          </p>
          <p className="text-base md:text-xl text-gray-600 max-w-3xl mx-auto">
            청어람 아파트를 전국 1등으로 만든 경험,<br/>
            양산시를 전국 1등으로 만들겠습니다
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {aptItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-white/95 backdrop-blur-sm rounded-xl p-5 border border-rose-200 shadow-lg group hover:shadow-xl hover:border-[#E8326E] transition-all"
            >
              <div className="flex items-center gap-4 mb-3">
                <div className="w-10 h-10 rounded-lg bg-rose-100 flex items-center justify-center group-hover:bg-rose-200 transition-colors shrink-0">
                  <item.icon className="w-5 h-5 text-[#E8326E]" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#E8326E] transition-colors">
                  {item.title}
                </h3>
              </div>
              <p className="text-gray-600 text-sm md:text-base">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-[10%] left-0 right-0 z-[100] flex justify-center">
        <ScrollIndicator isDark={false} />
      </div>
    </section>
  );
} 