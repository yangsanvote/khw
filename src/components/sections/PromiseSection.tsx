'use client';

import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { FaMap, FaHome, FaHeartbeat, FaBriefcase, FaStore } from 'react-icons/fa';
import { IoIosArrowDown } from 'react-icons/io';
import AptSection from './AptSection';
import CareSection from './CareSection';
import WorkerSection from './WorkerSection';
import SupportSection from './SupportSection';
import YDSection from './YDSection';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from 'next/image';

interface PromiseSectionProps {
  isStandalone?: boolean;
  hideScrollIndicator?: boolean;
}

export default function PromiseSection({ isStandalone = false, hideScrollIndicator = false }: PromiseSectionProps) {
  const [activeTab, setActiveTab] = useState("alternative");
  const [activeRegion, setActiveRegion] = useState("all");
  const [activeSection, setActiveSection] = useState<string>('yd-section');
  
  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({
    'yd-section': null,
    'apt-section': null,
    'care-section': null,
    'worker-section': null,
    'support-section': null,
    'map-section': null
  });

  useEffect(() => {
    // IntersectionObserver를 사용하여 현재 뷰포트에 있는 섹션 감지
    const observerOptions = {
      root: null, // 뷰포트 기준
      rootMargin: '0px',
      threshold: 0.4 // 40% 이상 보일 때 활성화
    };

    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // 모든 섹션 관찰 시작
    Object.keys(sectionRefs.current).forEach(sectionId => {
      const element = document.getElementById(sectionId);
      if (element) {
        observer.observe(element);
        sectionRefs.current[sectionId] = element as HTMLDivElement;
      }
    });

    return () => {
      // 컴포넌트 언마운트 시 관찰 중단
      Object.values(sectionRefs.current).forEach(section => {
        if (section) observer.unobserve(section);
      });
    };
  }, []);

  useEffect(() => {
    // 컴포넌트가 마운트되고 isStandalone이 true인 경우(공약 페이지인 경우) YDSection으로 자동 스크롤
    if (isStandalone) {
      const ydElement = document.getElementById('yd-section');
      if (ydElement) {
        // setTimeout을 사용하여 DOM이 완전히 렌더링된 후 스크롤
        setTimeout(() => {
          ydElement.scrollIntoView({ behavior: 'auto' });
          setActiveSection('yd-section');
        }, 100);
      }
    }
  }, [isStandalone]);
  
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full">
      {/* 상단 소개 및 네비게이션 - isStandalone일 때만 보이게 설정 */}
      {isStandalone && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="pt-6 pb-4 bg-gradient-to-r from-green-50 to-yellow-50 sticky top-0 z-50 shadow-sm"
        >
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-green-800 mb-2 font-giants">권현우가 제안하는 양동작전</h2>
            <p className="text-center text-green-700 mb-4">양주동과 동면의 작지만 소중한 전망</p>
            
            <Tabs 
              value={activeTab} 
              onValueChange={setActiveTab}
              className="w-full max-w-4xl mx-auto"
            >
              <TabsList className="w-full mb-4 bg-white/80 backdrop-blur-sm p-1 rounded-full">
                <TabsTrigger 
                  value="alternative" 
                  className="w-1/2 py-3 rounded-full data-[state=active]:bg-[#623D91] data-[state=active]:text-white"
                >
                  <div className="flex flex-col items-center">
                    <span className="font-semibold text-base">같은 문제는 강력한 대안으로</span>
                    <span className="text-xs mt-1">"젊고 패기있는 전국1등 입대표"</span>
                  </div>
                </TabsTrigger>
                <TabsTrigger 
                  value="specific" 
                  className="w-1/2 py-3 rounded-full data-[state=active]:bg-[#623D91] data-[state=active]:text-white"
                >
                  <div className="flex flex-col items-center">
                    <span className="font-semibold text-base">다른 상황에는 세심한 정책으로</span>
                    <span className="text-xs mt-1">"손에 잡히는 양주동, 동면"</span>
                  </div>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="alternative" className="mt-0">
                <div className="flex flex-wrap justify-center gap-3 mb-4">
                  <button
                    onClick={() => scrollToSection('apt-section')}
                    className={`px-4 py-2 ${activeSection === 'apt-section' 
                      ? 'bg-rose-600 ring-2 ring-rose-300' 
                      : 'bg-rose-500 hover:bg-rose-600'} text-white rounded-full transition-colors shadow-md text-base flex items-center gap-2`}
                  >
                    <FaHome size={18} />
                    <span>아파트</span>
                  </button>
                  
                  <button
                    onClick={() => scrollToSection('care-section')}
                    className={`px-4 py-2 ${activeSection === 'care-section' 
                      ? 'bg-yellow-600 ring-2 ring-yellow-300' 
                      : 'bg-yellow-500 hover:bg-yellow-600'} text-white rounded-full transition-colors shadow-md text-base flex items-center gap-2`}
                  >
                    <FaHeartbeat size={18} />
                    <span>돌봄</span>
                  </button>
                  
                  <button
                    onClick={() => scrollToSection('worker-section')}
                    className={`px-4 py-2 ${activeSection === 'worker-section' 
                      ? 'bg-purple-600 ring-2 ring-purple-300' 
                      : 'bg-purple-500 hover:bg-purple-600'} text-white rounded-full transition-colors shadow-md text-base flex items-center gap-2`}
                  >
                    <FaBriefcase size={18} />
                    <span>일자리</span>
                  </button>
                  
                  <button
                    onClick={() => scrollToSection('support-section')}
                    className={`px-4 py-2 ${activeSection === 'support-section' 
                      ? 'bg-green-600 ring-2 ring-green-300' 
                      : 'bg-green-500 hover:bg-green-600'} text-white rounded-full transition-colors shadow-md text-base flex items-center gap-2`}
                  >
                    <FaStore size={18} />
                    <span>자영업</span>
                  </button>
                </div>
              </TabsContent>
              
              <TabsContent value="specific" className="mt-0">
                <div className="bg-white p-4 rounded-xl shadow-md">
                  <h3 className="text-xl font-semibold text-[#623D91] mb-4">양주동과 동면의 변화, 지역별로 보기</h3>
                  
                  <div className="flex justify-center gap-3 mb-4">
                    <button
                      onClick={() => setActiveRegion('all')}
                      className={`px-4 py-2 rounded-full transition-colors shadow-md text-base flex items-center gap-2 ${activeRegion === 'all' ? 'bg-[#623D91] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                    >
                      <FaMap size={18} />
                      <span>전체</span>
                    </button>
                    <button
                      onClick={() => setActiveRegion('yangju')}
                      className={`px-4 py-2 rounded-full transition-colors shadow-md text-base flex items-center gap-2 ${activeRegion === 'yangju' ? 'bg-[#623D91] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                    >
                      <span>양주동</span>
                    </button>
                    <button
                      onClick={() => setActiveRegion('seokgeum')}
                      className={`px-4 py-2 rounded-full transition-colors shadow-md text-base flex items-center gap-2 ${activeRegion === 'seokgeum' ? 'bg-[#623D91] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                    >
                      <span>동면(석금산)</span>
                    </button>
                    <button
                      onClick={() => setActiveRegion('sasong')}
                      className={`px-4 py-2 rounded-full transition-colors shadow-md text-base flex items-center gap-2 ${activeRegion === 'sasong' ? 'bg-[#623D91] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                    >
                      <span>동면(사송)</span>
                    </button>
                  </div>
                  
                  <div className="relative h-[500px] bg-gray-100 rounded-lg overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-full max-w-2xl">
                        {activeRegion === 'all' && (
                          <div className="bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg">
                            <h4 className="text-lg font-bold text-[#623D91] mb-2">전체 지역 공약</h4>
                            <ul className="space-y-3">
                              <li className="flex items-start gap-2">
                                <span className="w-2 h-2 bg-[#623D91] rounded-full mt-2"></span>
                                <span>권역별 아이돌봄센터 설립</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="w-2 h-2 bg-[#623D91] rounded-full mt-2"></span>
                                <span>달빛어린이병원과 심야약국</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="w-2 h-2 bg-[#623D91] rounded-full mt-2"></span>
                                <span>경로당 환경개선 및 식사도우미</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="w-2 h-2 bg-[#623D91] rounded-full mt-2"></span>
                                <span>자영업자 이자 지원 5%</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="w-2 h-2 bg-[#623D91] rounded-full mt-2"></span>
                                <span>작은도서관 지원 확대</span>
                              </li>
                            </ul>
                            <div className="mt-6 text-center">
                              <a 
                                href="/map" 
                                className="inline-block px-6 py-3 bg-[#623D91] text-white rounded-full hover:bg-[#472A6A] transition-colors text-lg"
                              >
                                지도에서 자세히 보기
                              </a>
                            </div>
                          </div>
                        )}
                        
                        {activeRegion === 'yangju' && (
                          <div className="bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg">
                            <h4 className="text-lg font-bold text-[#623D91] mb-2">양주동 지역 공약</h4>
                            <ul className="space-y-3">
                              <li className="flex items-start gap-2">
                                <span className="w-2 h-2 bg-[#623D91] rounded-full mt-2"></span>
                                <span>공동주택 유지보수 지원</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="w-2 h-2 bg-[#623D91] rounded-full mt-2"></span>
                                <span>주민 갈등 조정위원회 설립</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="w-2 h-2 bg-[#623D91] rounded-full mt-2"></span>
                                <span>양주문화체육센터 활성화</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="w-2 h-2 bg-[#623D91] rounded-full mt-2"></span>
                                <span>버스정류장 온열시트 확대</span>
                              </li>
                            </ul>
                          </div>
                        )}
                        
                        {activeRegion === 'seokgeum' && (
                          <div className="bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg">
                            <h4 className="text-lg font-bold text-[#623D91] mb-2">동면(석금산) 지역 공약</h4>
                            <ul className="space-y-3">
                              <li className="flex items-start gap-2">
                                <span className="w-2 h-2 bg-[#623D91] rounded-full mt-2"></span>
                                <span>119안전센터</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="w-2 h-2 bg-[#623D91] rounded-full mt-2"></span>
                                <span>자원회수시설</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="w-2 h-2 bg-[#623D91] rounded-full mt-2"></span>
                                <span>수질정화공원(금빛마을) 황토길 조성</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="w-2 h-2 bg-[#623D91] rounded-full mt-2"></span>
                                <span>석산로터리 신호체계 개선</span>
                              </li>
                            </ul>
                          </div>
                        )}
                        
                        {activeRegion === 'sasong' && (
                          <div className="bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg">
                            <h4 className="text-lg font-bold text-[#623D91] mb-2">동면(사송) 지역 공약</h4>
                            <ul className="space-y-3">
                              <li className="flex items-start gap-2">
                                <span className="w-2 h-2 bg-[#623D91] rounded-full mt-2"></span>
                                <span>119안전센터</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="w-2 h-2 bg-[#623D91] rounded-full mt-2"></span>
                                <span>치안센터</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="w-2 h-2 bg-[#623D91] rounded-full mt-2"></span>
                                <span>대중교통(버스노선) 확충</span>
                              </li>
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* 지도 배경 이미지 */}
                    <div className="absolute inset-0 opacity-30">
                      <Image 
                        src="/images/map-background.jpg" 
                        alt="양산시 지도" 
                        fill 
                        className="object-cover"
                        priority
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </motion.div>
      )}

      {/* 스크롤 인디케이터와 스와이프 힌트 - isStandalone이 false일 때만 보이게 설정 */}
      {!isStandalone && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="fixed bottom-12 left-1/2 transform -translate-x-1/2 z-50 flex flex-col items-center gap-2"
        >
          <div className="text-sm text-gray-600 font-medium">아래로 스와이프</div>
          <IoIosArrowDown className="animate-bounce text-2xl text-gray-600" />
        </motion.div>
      )}

      {/* 섹션 내비게이션 - isStandalone일 때만 보이게 설정 */}
      {isStandalone && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="fixed left-4 top-1/2 transform -translate-y-1/2 z-50 flex flex-col gap-4"
        >
          <div className="flex flex-col gap-3 items-center">
            <button
              onClick={() => scrollToSection('yd-section')}
              className={`w-3 h-3 rounded-full ${activeSection === 'yd-section' 
                ? 'bg-[#623D91] ring-4 ring-purple-200 scale-125' 
                : 'bg-purple-400'} transition-all hover:scale-125 focus:scale-125`}
              aria-label="양동작전 개요로 이동"
            />
            <div className="w-0.5 h-6 bg-gray-300"></div>
            <button
              onClick={() => scrollToSection('apt-section')}
              className={`w-3 h-3 rounded-full ${activeSection === 'apt-section' 
                ? 'bg-rose-600 ring-4 ring-rose-200 scale-125' 
                : 'bg-rose-400'} transition-all hover:scale-125 focus:scale-125`}
              aria-label="아파트 정책으로 이동"
            />
            <div className="w-0.5 h-6 bg-gray-300"></div>
            <button
              onClick={() => scrollToSection('care-section')}
              className={`w-3 h-3 rounded-full ${activeSection === 'care-section' 
                ? 'bg-yellow-600 ring-4 ring-yellow-200 scale-125' 
                : 'bg-yellow-400'} transition-all hover:scale-125 focus:scale-125`}
              aria-label="돌봄 정책으로 이동"
            />
            <div className="w-0.5 h-6 bg-gray-300"></div>
            <button
              onClick={() => scrollToSection('worker-section')}
              className={`w-3 h-3 rounded-full ${activeSection === 'worker-section' 
                ? 'bg-purple-600 ring-4 ring-purple-200 scale-125' 
                : 'bg-purple-400'} transition-all hover:scale-125 focus:scale-125`}
              aria-label="일자리 정책으로 이동"
            />
            <div className="w-0.5 h-6 bg-gray-300"></div>
            <button
              onClick={() => scrollToSection('support-section')}
              className={`w-3 h-3 rounded-full ${activeSection === 'support-section' 
                ? 'bg-green-600 ring-4 ring-green-200 scale-125' 
                : 'bg-green-400'} transition-all hover:scale-125 focus:scale-125`}
              aria-label="자영업 지원 정책으로 이동"
            />
            <div className="w-0.5 h-6 bg-gray-300"></div>
            <button
              onClick={() => scrollToSection('map-section')}
              className={`w-3 h-3 rounded-full ${activeSection === 'map-section' 
                ? 'bg-[#E8326E] ring-4 ring-pink-200 scale-125' 
                : 'bg-pink-400'} transition-all hover:scale-125 focus:scale-125`}
              aria-label="지역별 맞춤 공약으로 이동"
            />
          </div>
        </motion.div>
      )}

      {/* 섹션 id 추가 */}
      <div id="promise-main" className="w-full">
        {/* YD섹션 - 비우지 않고 공약 통합 섹션으로 활용 */}
        <div id="yd-section" className="w-full min-h-screen" ref={(el) => { sectionRefs.current['yd-section'] = el; }}>
          <YDSection isStandalone={true} hideScrollIndicator={hideScrollIndicator} />
        </div>

        {/* 아파트 정책 */}
        <div id="apt-section" className="w-full min-h-screen" ref={(el) => { sectionRefs.current['apt-section'] = el; }}>
          <AptSection hideScrollIndicator={hideScrollIndicator} />
        </div>

        {/* 돌봄 정책 */}
        <div id="care-section" className="w-full min-h-screen" ref={(el) => { sectionRefs.current['care-section'] = el; }}>
          <CareSection hideScrollIndicator={hideScrollIndicator} />
        </div>

        {/* 일자리 정책 */}
        <div id="worker-section" className="w-full min-h-screen" ref={(el) => { sectionRefs.current['worker-section'] = el; }}>
          <WorkerSection hideScrollIndicator={hideScrollIndicator} />
        </div>

        {/* 자영업 지원 정책 */}
        <div id="support-section" className="w-full min-h-screen" ref={(el) => { sectionRefs.current['support-section'] = el; }}>
          <SupportSection hideScrollIndicator={hideScrollIndicator} isStandalone={true} />
        </div>

        {/* 지역별 공약 지도 섹션 */}
        <div id="map-section" className="w-full min-h-screen bg-white py-16 px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-6xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-giants text-center mb-10 text-[#E8326E]">
              지역별 맞춤 공약
            </h2>
            
            <div className="flex flex-col md:flex-row gap-8 mt-12">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="flex-1"
              >
                <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-[#E8326E]/20">
                  <h3 className="text-2xl font-semibold mb-4 text-[#E8326E] flex items-center">
                    지역별 공약 네비게이션
                  </h3>
                  
                  <div className="space-y-4 mt-6">
                    <button onClick={() => setActiveRegion('all')}
                      className={`w-full py-3 px-4 rounded-lg text-left flex items-center gap-3 transition-colors ${
                        activeRegion === 'all' ? 'bg-[#E8326E] text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                      }`}
                    >
                      <FaMap className={activeRegion === 'all' ? 'text-white' : 'text-[#E8326E]'} />
                      <span className="font-medium">전체 지역 공통 공약</span>
                    </button>
                    
                    <button onClick={() => setActiveRegion('yangju')}
                      className={`w-full py-3 px-4 rounded-lg text-left flex items-center gap-3 transition-colors ${
                        activeRegion === 'yangju' ? 'bg-[#E8326E] text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                      }`}
                    >
                      <span className="font-medium">양주동 특화 공약</span>
                    </button>
                    
                    <button onClick={() => setActiveRegion('seokgeum')}
                      className={`w-full py-3 px-4 rounded-lg text-left flex items-center gap-3 transition-colors ${
                        activeRegion === 'seokgeum' ? 'bg-[#E8326E] text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                      }`}
                    >
                      <span className="font-medium">동면(석금산) 특화 공약</span>
                    </button>
                    
                    <button onClick={() => setActiveRegion('sasong')}
                      className={`w-full py-3 px-4 rounded-lg text-left flex items-center gap-3 transition-colors ${
                        activeRegion === 'sasong' ? 'bg-[#E8326E] text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                      }`}
                    >
                      <span className="font-medium">동면(사송) 특화 공약</span>
                    </button>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                className="flex-[1.5]"
              >
                <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-[#E8326E]/20 h-full">
                  {activeRegion === 'all' && (
                    <div>
                      <h3 className="text-2xl font-semibold mb-6 text-[#E8326E]">전체 지역 공통 공약</h3>
                      <ul className="space-y-4">
                        <li className="flex items-start gap-3">
                          <span className="w-3 h-3 bg-[#E8326E] rounded-full mt-1.5"></span>
                          <div>
                            <span className="font-medium text-lg">권역별 아이돌봄센터 설립</span>
                            <p className="text-gray-600 mt-1">지역 내 아이돌봄 서비스를 확대하여 양육부담을 줄이고 일·가정 양립을 지원합니다.</p>
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="w-3 h-3 bg-[#E8326E] rounded-full mt-1.5"></span>
                          <div>
                            <span className="font-medium text-lg">달빛어린이병원과 심야약국</span>
                            <p className="text-gray-600 mt-1">야간에도 안심하고 의료서비스를 받을 수 있도록 24시간 어린이병원과 심야약국을 지원합니다.</p>
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="w-3 h-3 bg-[#E8326E] rounded-full mt-1.5"></span>
                          <div>
                            <span className="font-medium text-lg">경로당 환경개선 및 식사도우미</span>
                            <p className="text-gray-600 mt-1">어르신들의 쾌적한 여가생활을 위해 경로당 환경을 개선하고, 식사 지원 서비스를 확대합니다.</p>
                          </div>
                        </li>
                      </ul>
                    </div>
                  )}
                  
                  {activeRegion === 'yangju' && (
                    <div>
                      <h3 className="text-2xl font-semibold mb-6 text-[#E8326E]">양주동 특화 공약</h3>
                      <ul className="space-y-4">
                        <li className="flex items-start gap-3">
                          <span className="w-3 h-3 bg-[#E8326E] rounded-full mt-1.5"></span>
                          <div>
                            <span className="font-medium text-lg">공동주택 유지보수 지원</span>
                            <p className="text-gray-600 mt-1">노후화된 공동주택의 안전과 쾌적한 주거환경을 위한 유지보수 지원금을 확대합니다.</p>
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="w-3 h-3 bg-[#E8326E] rounded-full mt-1.5"></span>
                          <div>
                            <span className="font-medium text-lg">주민 갈등 조정위원회 설립</span>
                            <p className="text-gray-600 mt-1">아파트 관련 민원과 갈등을 효과적으로 해결할 수 있는 전문 조정위원회를 설립합니다.</p>
                          </div>
                        </li>
                      </ul>
                    </div>
                  )}
                  
                  {activeRegion === 'seokgeum' && (
                    <div>
                      <h3 className="text-2xl font-semibold mb-6 text-[#E8326E]">동면(석금산) 특화 공약</h3>
                      <ul className="space-y-4">
                        <li className="flex items-start gap-3">
                          <span className="w-3 h-3 bg-[#E8326E] rounded-full mt-1.5"></span>
                          <div>
                            <span className="font-medium text-lg">119안전센터 신설</span>
                            <p className="text-gray-600 mt-1">석금산 지역의 안전을 위한 119안전센터를 신설하여 응급상황 대응 시간을 단축합니다.</p>
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="w-3 h-3 bg-[#E8326E] rounded-full mt-1.5"></span>
                          <div>
                            <span className="font-medium text-lg">자원회수시설 개선</span>
                            <p className="text-gray-600 mt-1">환경보호와 자원순환을 위한 자원회수시설을 현대화하고 확장합니다.</p>
                          </div>
                        </li>
                      </ul>
                    </div>
                  )}
                  
                  {activeRegion === 'sasong' && (
                    <div>
                      <h3 className="text-2xl font-semibold mb-6 text-[#E8326E]">동면(사송) 특화 공약</h3>
                      <ul className="space-y-4">
                        <li className="flex items-start gap-3">
                          <span className="w-3 h-3 bg-[#E8326E] rounded-full mt-1.5"></span>
                          <div>
                            <span className="font-medium text-lg">치안센터 설립</span>
                            <p className="text-gray-600 mt-1">사송 지역 주민들의 안전을 위한 치안센터를 설립하여 방범 체계를 강화합니다.</p>
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="w-3 h-3 bg-[#E8326E] rounded-full mt-1.5"></span>
                          <div>
                            <span className="font-medium text-lg">대중교통 확충</span>
                            <p className="text-gray-600 mt-1">사송 지역의 접근성 향상을 위해 버스 노선을 확충하고 배차 간격을 개선합니다.</p>
                          </div>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 