'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Building2, Utensils, Lightbulb, Shield, Sparkles, Briefcase, ChevronDown, ChevronUp } from 'lucide-react';

const supportItems = [
  {
    title: "소상공인 경영환경개선 지원",
    description: "2025년 소상공인 소규모 경영환경개선 사업 및 디지털 인프라 지원",
    icon: Building2,
    link: "https://www.yangsan.go.kr/portal/board/post/view.do?bcIdx=293&mid=0101010000&idx=1007964"
  },
  {
    title: "고용보험료 지원",
    description: "2025년 소상공인 고용보험료 지원사업",
    icon: Shield,
    link: "https://www.yangsan.go.kr/portal/board/post/view.do?bcIdx=293&mid=0101010000&idx=1008430"
  },
  {
    title: "정책자금 지원",
    description: "2025년도 경상남도 소상공인 정책자금 운용계획",
    icon: Briefcase,
    link: "https://www.yangsan.go.kr/portal/board/post/view.do?bcIdx=293&mid=0101010000&idx=1007928"
  },
  {
    title: "고효율기기 지원",
    description: "2024년 효율향상사업 소상공인 고효율기기 지원",
    icon: Lightbulb,
    link: "https://home.kepco.co.kr/kepco/CY/K/ntcob/ntcobView.do?pageIndex=1&boardSeq=21069445&boardCd=BRD_000039&menuCd=FN02070501&parnScrpSeq=21069451&searchCondition=total&searchKeyword="
  },
  {
    title: "주방 위생환경 개선",
    description: "2025년 일반음식점 주방 위생환경개선사업 지원",
    icon: Utensils,
    link: "https://www.yangsan.go.kr/portal/saeol/gosi/view.do?notAncmtMgtNo=69436&mid=0102010000"
  },
  {
    title: "청소소독비 지원",
    description: "2025년 식품위생업소 청소소독비 지원사업",
    icon: Sparkles,
    link: "https://www.yangsan.go.kr/portal/saeol/gosi/view.do?notAncmtMgtNo=69438&mid=0102010000"
  }
];

interface SupportSectionProps {
  isStandalone?: boolean;
  hideScrollIndicator?: boolean;
}

export default function SupportSection({ isStandalone = false, hideScrollIndicator = false }: SupportSectionProps) {
  // 다음 섹션으로 스크롤하는 함수
  const scrollToNextSection = () => {
    const nextSection = document.getElementById('yd-section');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // 이전 섹션으로 스크롤하는 함수
  const scrollToPrevSection = () => {
    const prevSection = document.getElementById('khw-section');
    if (prevSection) {
      prevSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="support"
      className={`${isStandalone ? 'h-full' : 'min-h-screen'} relative flex flex-col items-center justify-center bg-gradient-to-br from-green-50 to-green-100 px-4 py-8`}
    >
      <div className="w-full max-w-6xl mx-auto -mt-12">
        {/* 이전 섹션으로 이동하는 버튼 */}
        <motion.button
          onClick={scrollToPrevSection}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="absolute top-4 left-4 md:top-8 md:left-8 p-2 rounded-full bg-white/80 shadow-md hover:bg-white transition-colors"
          aria-label="이전 섹션으로 이동"
        >
          <ChevronUp className="w-5 h-5 text-green-600" />
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-6 md:mb-8"
        >
          <h2 className="text-3xl md:text-5xl font-black text-green-900 mb-2 font-giants">
            자영업 경력 8년<br />삶의 고단함을 아는 후보
          </h2>
          <p className="text-xl md:text-2xl text-green-800">
            자영업자 지원사업을 도와드립니다
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-6">
          {supportItems.map((item, index) => (
            <motion.a
              key={index}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg p-3 md:p-4 shadow-lg hover:shadow-xl transition-all group"
            >
              <div className="flex items-center justify-center gap-2 h-full">
                <div className="p-2 bg-green-100 rounded-lg text-green-600">
                  <item.icon className="w-4 h-4 md:w-5 md:h-5" />
                </div>
                <h3 className="text-sm md:text-base font-bold text-gray-900 group-hover:text-green-600 transition-colors text-center">
                  {item.title}
                </h3>
              </div>
            </motion.a>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-4 md:mt-6"
        >
          <p className="text-sm md:text-lg text-gray-700 mb-1 md:mb-2">
            각 지원사업의 자세한 내용은 제목을 클릭하시면 확인하실 수 있습니다.<br />
            궁금하신 점은 언제든 연락주세요.
          </p>
          <a 
            href="tel:010-4855-5375"
            className="inline-flex items-center gap-1 md:gap-2 text-base md:text-xl font-bold text-green-600 hover:text-green-700 transition-colors"
          >
            <span>010-4855-5375</span>
            <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
          </a>
        </motion.div>

        {/* 전체 공약 보기 버튼 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          viewport={{ once: true }}
          className="text-center mt-8 md:mt-12"
        >
          <a 
            href="#yd-section"
            onClick={(e) => {
              e.preventDefault();
              scrollToNextSection();
            }}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white rounded-full font-bold hover:bg-green-700 transition-colors shadow-md"
          >
            <span>전체 공약 보기</span>
            <ArrowRight className="w-5 h-5" />
          </a>
        </motion.div>

        {/* 다음 섹션으로 이동하는 버튼 */}
        <motion.button
          onClick={scrollToNextSection}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 p-2 rounded-full bg-white/80 shadow-md hover:bg-white transition-colors"
          aria-label="다음 섹션으로 이동"
        >
          <ChevronDown className="w-5 h-5 text-green-600" />
        </motion.button>
      </div>
    </section>
  );
} 