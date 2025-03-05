'use client';

import { motion } from 'framer-motion';
import { Heart, Utensils } from 'lucide-react';
import Image from 'next/image';

const careItems = [
  {
    icon: Heart,
    title: "다함께 돌봄센터 유치",
    description: "석금산과 양주동에 다함께 돌봄센터를 유치하겠습니다.",
    location: "권역별 돌봄센터가 일하는 부모를 돕습니다"
  },
  {
    icon: Utensils,
    title: "경로당 환경 개선 지원사업 확대",
    description: "어르신 돌봄이 가능한 환경 조성",
    location: "환경 개선과 더불어 돌봄 일자리도 확대"
  }
];

interface CareSectionProps {
  hideScrollIndicator?: boolean;
}

export default function CareSection({ hideScrollIndicator = false }: CareSectionProps) {
  return (
    <section className="h-screen snap-start relative flex flex-col items-center justify-center px-4 py-8 overflow-hidden">
      {/* 배경 이미지 */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image
          src="/images/IMG_9739.JPG"
          alt="배경 이미지"
          fill
          className="object-cover scale-150 translate-x-1/4"
          priority
        />
        {/* 그라데이션 오버레이 */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#FFED00]/70 via-yellow-50/80 to-[#FFED00]/70" />
      </div>

      {/* 컨텐츠 */}
      <div className="w-full max-w-6xl mx-auto relative z-10 -mt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl md:text-5xl font-black text-yellow-900 mb-4 font-giants">
            돌봄, 정주, 일자리<br />
            세마리 토끼를 한 번에
          </h2>
          <p className="text-lg md:text-xl text-yellow-800 max-w-3xl mx-auto mb-3">
            돌봄이 있어야 살고 싶은 도시가 됩니다.<br />
            돌봄이 있어야 살 수 있는 도시가 됩니다.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
          {careItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-white/95 backdrop-blur-sm rounded-xl p-5 border border-yellow-200 shadow-lg group hover:shadow-xl hover:border-yellow-400 transition-all"
            >
              <div className="flex items-center gap-4 mb-3">
                <div className="w-10 h-10 rounded-lg bg-yellow-100 flex items-center justify-center group-hover:bg-yellow-200 transition-colors shrink-0">
                  <item.icon className="w-5 h-5 text-yellow-700" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-yellow-700 transition-colors">
                  {item.title}
                </h3>
              </div>
              <p className="text-gray-600 text-sm md:text-base">
                {item.description}
              </p>
              <div className="mt-3 text-sm text-yellow-700 font-medium">
                {item.location}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 