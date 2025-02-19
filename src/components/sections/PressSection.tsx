'use client';

import { motion } from 'framer-motion';
import { Newspaper } from 'lucide-react';
import ScrollIndicator from '../ScrollIndicator';

// PressItem 인터페이스를 Article 인터페이스와 통합
interface PressItem {
  title: string;
  date: string;
  source: string;
  link: string;
}

const pressItems: PressItem[] = [
  {
    title: '청어람아파트, "국토부 2024 최우수 관리단지" 선정',
    date: "2024.12.18",
    source: "양산신문",
    link: "https://www.yangsanilbo.com/news/articleView.html?idxno=113246"
  },
  {
    title: '우리 아파트 공사업체는 "투명성 담보 위해 시험 치러야"',
    date: "2024.12.07",
    source: "한국아파트신문",
    link: "https://www.hapt.co.kr/news/articleView.html?idxno=163830"
  },
  {
    title: '삽량초 졸업생의 꿈을 청어람마을이 응원해요',
    date: "2024.12.02",
    source: "양산신문", 
    link: "https://www.yangsanilbo.com/news/articleView.html?idxno=112817"
  },
  {
    title: '건진개발-양산신도시청어람 장수명화 업무협약',
    date: "2024.01.14",
    source: "한국아파트신문",
    link: "https://www.hapt.co.kr/news/articleView.html?idxno=164162"
  },
  {
    title: '이동·야외 근무자들을 위한 냉장고 옹달샘 커피 서비스 시작',
    date: "2024.08.13",
    source: "한국아파트신문",
    link: "https://www.hapt.co.kr/news/articleView.html?idxno=162850"
  },
  {
    title: '화재 신속대응 체험 - 양산신도시청어람 소방훈련',
    date: "2024.08.07",
    source: "한국아파트신문",
    link: "https://www.hapt.co.kr/news/articleView.html?idxno=162801"
  },
  {
    title: '경남 양산신도시청어람아파트 상생 협약',
    date: "2024.05.28",
    source: "한국아파트신문",
    link: "https://www.hapt.co.kr/news/articleView.html?idxno=162198"
  },
  {
    title: '양주동 청어람아파트, 친환경마을 변신중',
    date: "2023.08.07",
    source: "양산신문",
    link: "https://www.yangsanilbo.com/news/articleView.html?idxno=98836"
  },
  {
    title: '양산 청어람아파트 1인 가구 긴급돌봄 운영',
    date: "2023.03.08",
    source: "경남도민일보",
    link: "https://www.idomin.com/news/articleView.html?idxno=819269"
  }
];

// pressItems 배열을 날짜순으로 정렬
const sortedPressItems = [...pressItems].sort((a, b) => {
  const dateA = new Date(a.date.replace(/\./g, '-'));
  const dateB = new Date(b.date.replace(/\./g, '-'));
  return dateB.getTime() - dateA.getTime();
});

export default function PressSection() {
  return (
    <section className="h-screen snap-start relative flex flex-col items-center pt-8 md:pt-12 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4">
      <div className="w-full max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl md:text-5xl font-black text-white mb-2">
            언론으로 본 권현우의 활동
          </h2>
        </motion.div>

        <div className="relative overflow-hidden">
          <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-slate-900 to-transparent z-10" />
          <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-slate-900 to-transparent z-10" />
          
          <div className="space-y-4 max-h-[60vh] overflow-y-auto px-4 hide-scrollbar">
            {sortedPressItems.map((item, index) => (
              <motion.a
                key={index}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="block bg-white/10 backdrop-blur-sm rounded-lg p-4 shadow-lg hover:bg-white/20 transition-all group border border-white/10"
              >
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-white/10 rounded-lg text-white/80 mt-1">
                    <Newspaper className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg md:text-xl font-bold text-white group-hover:text-yellow-400 transition-colors">
                      {item.title}
                    </h3>
                    <div className="flex items-center gap-2 mt-2 text-sm text-white/60">
                      <span>{item.source}</span>
                      <span>•</span>
                      <span>{item.date}</span>
                    </div>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 w-full block">
        <ScrollIndicator isDark={false} color="text-white/80" className="bottom-24 md:bottom-16"/>
      </div>
    </section>
  );
} 