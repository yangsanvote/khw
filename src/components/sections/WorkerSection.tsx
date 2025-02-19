'use client';

import { motion } from 'framer-motion';
import { Percent, Briefcase } from 'lucide-react';
import ScrollIndicator from '../ScrollIndicator';

const workerItems = [
  {
    icon: Percent,
    title: "자영업자 이자 5% 지원 조례",
    description: "진주처럼 자영업자의 이자지원을 5%로 늘리겠습니다."
  },
  {
    icon: Briefcase,
    title: "일자리 창출 우수기업 지원",
    description: "지역 시민 채용기업에게 관급 입찰 우선권을 부여하겠습니다."
  }
];

export default function WorkerSection() {
  return (
    <section className="h-screen snap-start relative flex flex-col items-center justify-center bg-gradient-to-br from-[#623D91] via-purple-950 to-[#623D91] px-4 py-8 overflow-hidden">
      {/* 배경 장식 */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-300 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-300 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="w-full max-w-6xl mx-auto relative -mt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-black text-white mb-4">
            돈은 &lsquo;잘&rsquo; 써야합니다
          </h2>
          <p className="text-xl md:text-2xl text-purple-200">
            일하는 사람들에게 힘이되는 시의원
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {workerItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="w-full"
            >
              <div className="relative h-full">
                {/* 배경 블러 효과 */}
                <div className="absolute inset-0 bg-white/5 backdrop-blur-sm rounded-2xl transform group-hover:scale-105 transition-transform duration-500" />
                
                {/* 테두리 효과 */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-400/30 to-purple-300/30 transform group-hover:scale-105 transition-transform duration-500" />
                
                {/* 컨텐츠 */}
                <div className="relative p-6 backdrop-blur-sm h-full">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-purple-400/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shrink-0">
                      <item.icon className="w-6 h-6 text-purple-200" />
                    </div>
                    <h3 className="text-xl font-bold text-white group-hover:text-purple-200 transition-colors">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-purple-200 text-base">
                    {item.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-[10%] left-0 right-0 z-[100] flex justify-center">
        <ScrollIndicator isDark={false} color="text-white/80" />
      </div>
    </section>
  );
} 