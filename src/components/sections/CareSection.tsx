'use client';

import { motion } from 'framer-motion';
import { Heart, Utensils } from 'lucide-react';
import ScrollIndicator from '../ScrollIndicator';

const careItems = [
  {
    icon: Heart,
    title: "다함께 돌봄센터 유치",
    description: "석금산에 다함께 돌봄센터를 유치하겠습니다.",
    location: "권역별 돌봄센터가 일하는 부모를 돕습니다"
  },
  {
    icon: Utensils,
    title: "경로당 식사도우미 운영",
    description: "경로당 식사도우미를 운영하겠습니다.",
    location: "어르신을 돌보고 일자리는 만들고"
  }
];

export default function CareSection() {
  return (
    <section className="h-screen snap-start relative flex flex-col items-center justify-center bg-gradient-to-br from-[#FFED00] via-yellow-50 to-[#FFED00] px-4 py-8">
      <div className="w-full max-w-6xl mx-auto relative -mt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl md:text-5xl font-black text-yellow-900 mb-4">
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

      <div className="hidden md:block">
        <ScrollIndicator isDark={false} className="bottom-24 md:bottom-16" />
      </div>
    </section>
  );
} 