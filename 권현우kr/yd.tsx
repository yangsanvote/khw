"use client"

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, FolderOpen, MapPin, Building2, HeartPulse, Briefcase, Store, Home } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ScrollIndicator from '../ScrollIndicator';
import { promises } from '@/data/promises';
import PromiseCard from '../PromiseCard';
import PromiseDetail from '../PromiseDetail';
import { Promise } from '@/types';

interface YDSectionProps {
  isStandalone?: boolean;
  hideScrollIndicator?: boolean;
}

const YDSection = ({ isStandalone, hideScrollIndicator = false }: YDSectionProps) => {
  const [activeTab, setActiveTab] = useState("alternative");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [showCollision, setShowCollision] = useState(false);
  const [collisionComplete, setCollisionComplete] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [selectedPromise, setSelectedPromise] = useState<Promise | null>(null);

  // 화면 크기 감지를 위한 useEffect
  useEffect(() => {
    const checkIfDesktop = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    
    // 초기 실행
    checkIfDesktop();
    
    // 리사이즈 이벤트 리스너
    window.addEventListener('resize', checkIfDesktop);
    
    // 클린업
    return () => window.removeEventListener('resize', checkIfDesktop);
  }, []);

  // 애니메이션이 완료된 후 충돌 효과를 보여주기 위한 useEffect
  useEffect(() => {
    const collisionTimer = setTimeout(() => {
      setShowCollision(true);
    }, 1000); // 애니메이션 시작 후 1초 후에 충돌 효과 표시 (약간 더 빠르게)

    // 충돌 완료 효과 표시를 위한 타이머 추가
    const completeTimer = setTimeout(() => {
      setCollisionComplete(true);
    }, 2500); // 충돌 애니메이션 완료 후 상태 전환

    return () => {
      clearTimeout(collisionTimer);
      clearTimeout(completeTimer);
    };
  }, []);

  const categories = [
    { id: 'apartment', name: '공동주택', icon: Building2 },
    { id: 'care', name: '돌봄', icon: HeartPulse },
    { id: 'job', name: '일자리', icon: Briefcase },
    { id: 'business', name: '자영업', icon: Store },
    { id: 'living', name: '정주여건', icon: Home }
  ];

  const regions = [
    { id: 'common', name: '지역공통', icon: MapPin },
    { id: 'yangju', name: '양주동', icon: MapPin },
    { id: 'seokgeum', name: '석금산', icon: MapPin },
    { id: 'sasong', name: '사송', icon: MapPin },
    { id: 'rural', name: '자연부락', icon: MapPin }
  ];

  const toggleCategory = (categoryId: string) => {
    if (selectedCategories.includes(categoryId)) {
      setSelectedCategories(selectedCategories.filter(id => id !== categoryId));
    } else {
      setSelectedCategories([...selectedCategories, categoryId]);
    }
  };

  const toggleRegion = (regionId: string) => {
    // 공통 지역은 모든 지역을 다 클릭한 것과 같은 효과
    if (regionId === 'common') {
      if (selectedRegions.includes('common')) {
        // 이미 공통이 선택되어 있다면 제거
        setSelectedRegions(selectedRegions.filter(id => id !== 'common'));
      } else {
        // 공통 지역 선택시 다른 모든 지역은 해제하고 공통만 선택
        setSelectedRegions(['common']);
      }
    } else {
      // 공통이 아닌 지역을 선택했을 때
      if (selectedRegions.includes(regionId)) {
        // 이미 선택된 지역을 클릭하면 해제
        setSelectedRegions(selectedRegions.filter(id => id !== regionId));
      } else {
        // 새 지역 선택시 공통은 제거하고 해당 지역 추가
        const newRegions = selectedRegions.filter(id => id !== 'common');
        setSelectedRegions([...newRegions, regionId]);
      }
    }
  };

  // 필터링된 공약 목록
  const filteredPromises = promises.filter(promise => {
    // 선택된 카테고리가 없으면 모든 카테고리 표시
    const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(promise.category);
    
    // 선택된 지역이 없으면 모든 지역 표시
    if (selectedRegions.length === 0) {
      return categoryMatch;
    }
    
    // 공통 지역이 선택되어 있으면 모든 지역 포함
    if (selectedRegions.includes('common')) {
      return categoryMatch;
    }
    
    // 선택된 지역과 공약 지역이 매칭되는지 확인
    const promiseRegions = promise.region.split(',');
    return categoryMatch && selectedRegions.some(region => promiseRegions.includes(region));
  });

  const handlePromiseClick = (promise: Promise) => {
    setSelectedPromise(promise);
  };

  const closePromiseDetail = () => {
    setSelectedPromise(null);
  };

  return (
    <section id="yd-section" className={`w-full py-3 md:py-4 ${!isStandalone ? 'bg-gradient-to-br from-purple-50 to-purple-100' : ''}`}>
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-3 md:mb-4 text-center"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-[#623D91]" style={{ 
                  fontFamily: 'Giants-Bold', 
                  fontWeight: 700
                }}>권현우의 양동작전</h2>
          <p className="text-xl md:text-2xl text-[#547EB9] mt-2" style={{ 
                  fontFamily: 'Giants-Bold', 
                  fontWeight: 200
                }}>
            <span className="text-[#623D91] font-bold"  style={{ 
                  fontFamily: 'Giants-Bold', 
                  fontWeight: 200
                }}>양</span>주동과 
            <span className="text-[#623D91] font-bold"  style={{ 
                  fontFamily: 'Giants-Bold', 
                  fontWeight: 200
                }}> 동</span>면의 
            <span className="text-[#623D91] font-bold" style={{ 
                  fontFamily: 'Giants-Bold', 
                  fontWeight: 200
                }}> 작</span>지만 소중한 
            <span className="text-[#623D91] font-bold" style={{ 
                  fontFamily: 'Giants-Bold', 
                  fontWeight: 200
                }}> 전</span>망
          </p>
        </motion.div>

        <Tabs defaultValue="alternative" className="w-full mb-6">
          <div className="flex justify-center mb-2 overflow-x-auto">
            <TabsList className="bg-purple-50 p-1">
              <TabsTrigger 
                value="alternative" 
                onClick={() => setActiveTab("alternative")}
                className={`text-sm md:text-base py-1.5 px-3 ${activeTab === "alternative" ? "data-[state=active]:bg-[#623D91] data-[state=active]:text-white" : ""}`}
              >
                지역 현안 진단
              </TabsTrigger>
              <TabsTrigger 
                value="issues" 
                onClick={() => setActiveTab("issues")}
                className={`text-sm md:text-base py-1.5 px-3 ${activeTab === "issues" ? "data-[state=active]:bg-[#623D91] data-[state=active]:text-white" : ""}`}
              >
                지역별 공약
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="alternative" className="mt-0">
            <div className="grid grid-cols-1 gap-4 md:gap-8">
              <div>
                <h2 className="text-xl md:text-3xl font-bold text-[#623D91] mb-2 font-giants">위기와 기회가 공존하는 양산</h2>
                <div className="space-y-1 md:space-y-3 relative h-[120px] md:h-[200px]">
                  {/* 왼쪽에서 오는 "위기의 양산" */}
                  <motion.div
                    initial={{ opacity: 0, x: -120, rotate: -5 }}
                    animate={{ 
                      opacity: 1, 
                      x: showCollision ? (
                        collisionComplete 
                          ? (isDesktop ? -20 : -15)
                          : isDesktop
                            ? [-30, -25, -28, -25] 
                            : [-20, -15, -18, -15]
                      ) : 0,
                      rotate: showCollision ? (collisionComplete ? -2 : [-4, -2, -3, -2]) : -5,
                      scale: showCollision ? (collisionComplete ? 1.05 : [1.02, 1.05, 1.03, 1.05]) : 1
                    }}
                    transition={{ 
                      duration: collisionComplete ? 0.5 : 1.2,
                      x: { 
                        duration: collisionComplete ? 0.5 : 1.2, 
                        ease: collisionComplete ? "easeOut" : "easeInOut",
                        repeat: collisionComplete ? 0 : 0,
                        repeatType: "reverse" as const
                      },
                      rotate: { duration: 1.2 },
                      scale: { duration: 0.3, delay: 1.2 }
                    }}
                    className="bg-purple-50 rounded-lg p-3 md:p-5 border-2 border-purple-200 absolute left-0 top-0 right-1/2 md:right-[52%] z-10 shadow-lg"
                  >
                    <h3 className="text-lg md:text-2xl font-bold text-[#623D91] mb-2 md:mb-3 font-giants">위기의 양산</h3>
                    <p className="text-sm md:text-lg text-gray-700">2024년 경남에서 가장 <a href="https://www.yangsanilbo.com/news/articleView.html?idxno=114530" target="_blank" rel="noopener noreferrer" className="underline text-[#623D91] font-medium">고용률이 낮은 도시</a></p>
                  </motion.div>
                  
                  {/* 오른쪽에서 오는 "기회의 양산" */}
                  <motion.div
                    initial={{ opacity: 0, x: 120, rotate: 5 }}
                    animate={{ 
                      opacity: 1, 
                      x: showCollision ? (
                        collisionComplete 
                          ? (isDesktop ? 20 : 15)
                          : isDesktop
                            ? [30, 25, 28, 25] 
                            : [20, 15, 18, 15]
                      ) : 0,
                      rotate: showCollision ? (collisionComplete ? 2 : [4, 2, 3, 2]) : 5,
                      scale: showCollision ? (collisionComplete ? 1.05 : [1.02, 1.05, 1.03, 1.05]) : 1
                    }}
                    transition={{ 
                      duration: collisionComplete ? 0.5 : 1.2,
                      x: { 
                        duration: collisionComplete ? 0.5 : 1.2, 
                        ease: collisionComplete ? "easeOut" : "easeInOut",
                        repeat: collisionComplete ? 0 : 0,
                        repeatType: "reverse" as const
                      },
                      rotate: { duration: 1.2 },
                      scale: { duration: 0.3, delay: 1.2 }
                    }}
                    className="bg-pink-50 rounded-lg p-3 md:p-5 border-2 border-pink-200 absolute right-0 top-0 left-1/2 md:left-[52%] z-10 shadow-lg"
                  >
                    <h3 className="text-lg md:text-2xl font-bold text-[#E8326E] mb-2 md:mb-3 font-giants">기회의 양산</h3>
                    <p className="text-sm md:text-lg text-gray-700">경남에서 가장 <a href="https://www.yangsanilbo.com/news/articleView.html?idxno=114797" target="_blank" rel="noopener noreferrer" className="underline text-[#E8326E] font-medium">인구유입이 많은 도시</a></p>
                  </motion.div>
                  
                  {/* 충돌 효과 - 사라지지 않도록 수정 */}
                  {showCollision && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ 
                        opacity: collisionComplete ? 1 : [0, 1, 0.8, 1], 
                        scale: collisionComplete ? [1.1, 1.4, 1.1] : [0, 2.2, 1.8, 2],
                        rotateZ: collisionComplete ? [0, 15, 0, -15, 0] : [0, 20, -20, 0]
                      }}
                      transition={{ 
                        duration: collisionComplete ? 2 : 1.5, 
                        ease: "easeOut",
                        scale: {
                          repeat: collisionComplete ? Infinity : 0,
                          repeatType: "reverse" as const,
                          duration: collisionComplete ? 3 : 1.5
                        },
                        rotateZ: {
                          repeat: collisionComplete ? Infinity : 0,
                          repeatType: "reverse" as const,
                          duration: collisionComplete ? 5 : 1.5
                        }
                      }}
                      className={`absolute top-1/2 md:top-[40%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                        w-20 h-20 md:w-32 md:h-32 rounded-full z-20 flex items-center justify-center overflow-hidden
                        bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-300 
                        shadow-[0_0_25px_12px_rgba(255,204,0,0.7)] border-4 border-yellow-300`}
                    >
                      {/* 내부 발광 효과 */}
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-br from-yellow-200 via-transparent to-transparent opacity-60"
                        animate={{
                          rotate: [0, 360],
                          scale: collisionComplete ? [0.8, 0.9, 0.8] : 0.8
                        }}
                        transition={{
                          rotate: {
                            duration: 8,
                            repeat: Infinity,
                            ease: "linear"
                          },
                          scale: {
                            duration: 2,
                            repeat: Infinity,
                            repeatType: "reverse"
                          }
                        }}
                      />
                      
                      {/* 반짝이는 효과 */}
                      <motion.div 
                        className="absolute inset-0 bg-white opacity-0"
                        animate={{
                          opacity: collisionComplete ? [0, 0.3, 0] : [0, 0.5, 0]
                        }}
                        transition={{
                          duration: collisionComplete ? 1.5 : 0.5,
                          repeat: Infinity,
                          repeatDelay: collisionComplete ? 3 : 1
                        }}
                      />
                      
                      <motion.span 
                        animate={{ 
                          scale: collisionComplete ? [1, 1.3, 1] : 1,
                          rotate: collisionComplete ? [0, 8, 0, -8, 0] : 0
                        }}
                        transition={{ 
                          repeat: collisionComplete ? Infinity : 0, 
                          repeatType: "reverse" as const, 
                          duration: 1.5 
                        }}
                        className="text-base md:text-2xl font-bold text-amber-900 text-center px-1 relative z-10"
                      >
                        같은 것은<br/> 같게!
                      </motion.span>
                    </motion.div>
                  )}
                </div>
              </div>
              
              <div className="mt-8">
                <h3 className="text-xl md:text-3xl font-bold text-[#E8326E] mb-3 font-giants">서로 다른 양주동과 동면</h3>
                <div className="space-y-1 md:space-y-3 relative h-[120px] md:h-[200px]">
                  {/* 왼쪽에서 오는 "안정과 연륜의 양주동" */}
                  <motion.div
                    initial={{ opacity: 0, x: -120, rotate: -5 }}
                    animate={{ 
                      opacity: 1, 
                      x: showCollision ? (
                        collisionComplete 
                          ? (isDesktop ? -20 : -15)
                          : isDesktop
                            ? [-30, -25, -28, -25] 
                            : [-20, -15, -18, -15]
                      ) : 0,
                      rotate: showCollision ? (collisionComplete ? -2 : [-4, -2, -3, -2]) : -5,
                      scale: showCollision ? (collisionComplete ? 1.05 : [1.02, 1.05, 1.03, 1.05]) : 1
                    }}
                    transition={{ 
                      duration: collisionComplete ? 0.5 : 1.2,
                      x: { 
                        duration: collisionComplete ? 0.5 : 1.2, 
                        ease: collisionComplete ? "easeOut" : "easeInOut",
                        repeat: collisionComplete ? 0 : 0,
                        repeatType: "reverse" as const
                      },
                      rotate: { duration: 1.2 },
                      scale: { duration: 0.3, delay: 1.2 }
                    }}
                    className="bg-pink-50 rounded-lg p-3 md:p-5 border-2 border-pink-200 absolute left-0 top-0 right-1/2 md:right-[52%] z-10 shadow-lg"
                  >
                    <h3 className="text-lg md:text-2xl font-bold text-[#E8326E] mb-2 md:mb-3 font-giants">안정과 연륜의 양주동</h3>
                    <p className="text-sm md:text-lg text-gray-700">노후화된 시설들을 안전하고 편리하게</p>
                  </motion.div>
                  
                  {/* 오른쪽에서 오는 "새롭게 개발되는 동면" */}
                  <motion.div
                    initial={{ opacity: 0, x: 120, rotate: 5 }}
                    animate={{ 
                      opacity: 1, 
                      x: showCollision ? (
                        collisionComplete 
                          ? (isDesktop ? 20 : 15)
                          : isDesktop
                            ? [30, 25, 28, 25] 
                            : [20, 15, 18, 15]
                      ) : 0,
                      rotate: showCollision ? (collisionComplete ? 2 : [4, 2, 3, 2]) : 5,
                      scale: showCollision ? (collisionComplete ? 1.05 : [1.02, 1.05, 1.03, 1.05]) : 1
                    }}
                    transition={{ 
                      duration: collisionComplete ? 0.5 : 1.2,
                      x: { 
                        duration: collisionComplete ? 0.5 : 1.2, 
                        ease: collisionComplete ? "easeOut" : "easeInOut",
                        repeat: collisionComplete ? 0 : 0,
                        repeatType: "reverse" as const
                      },
                      rotate: { duration: 1.2 },
                      scale: { duration: 0.3, delay: 1.2 }
                    }}
                    className="bg-purple-50 rounded-lg p-3 md:p-5 border-2 border-purple-200 absolute right-0 top-0 left-1/2 md:left-[52%] z-10 shadow-lg"
                  >
                    <h3 className="text-lg md:text-2xl font-bold text-[#623D91] mb-2 md:mb-3 font-giants">새롭게 성장하는 동면</h3>
                    <p className="text-sm md:text-lg text-gray-700">정주여건을 개선하여 오래도록 살 수 있게</p>
                  </motion.div>
                  
                  {/* 충돌 효과 - 사라지지 않도록 수정 */}
                  {showCollision && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ 
                        opacity: collisionComplete ? 1 : [0, 1, 0.8, 1], 
                        scale: collisionComplete ? [1.1, 1.4, 1.1] : [0, 2.2, 1.8, 2],
                        rotateZ: collisionComplete ? [0, 15, 0, -15, 0] : [0, 20, -20, 0]
                      }}
                      transition={{ 
                        duration: collisionComplete ? 2 : 1.5, 
                        ease: "easeOut",
                        scale: {
                          repeat: collisionComplete ? Infinity : 0,
                          repeatType: "reverse" as const,
                          duration: collisionComplete ? 3 : 1.5
                        },
                        rotateZ: {
                          repeat: collisionComplete ? Infinity : 0,
                          repeatType: "reverse" as const,
                          duration: collisionComplete ? 5 : 1.5
                        }
                      }}
                      className={`absolute top-1/2 md:top-[40%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                        w-20 h-20 md:w-32 md:h-32 rounded-full z-20 flex items-center justify-center overflow-hidden
                        bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-300 
                        shadow-[0_0_25px_12px_rgba(255,204,0,0.7)] border-4 border-yellow-300`}
                    >
                      {/* 내부 발광 효과 */}
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-br from-yellow-200 via-transparent to-transparent opacity-60"
                        animate={{
                          rotate: [0, 360],
                          scale: collisionComplete ? [0.8, 0.9, 0.8] : 0.8
                        }}
                        transition={{
                          rotate: {
                            duration: 8,
                            repeat: Infinity,
                            ease: "linear"
                          },
                          scale: {
                            duration: 2,
                            repeat: Infinity,
                            repeatType: "reverse"
                          }
                        }}
                      />
                      
                      {/* 반짝이는 효과 */}
                      <motion.div 
                        className="absolute inset-0 bg-white opacity-0"
                        animate={{
                          opacity: collisionComplete ? [0, 0.3, 0] : [0, 0.5, 0]
                        }}
                        transition={{
                          duration: collisionComplete ? 1.5 : 0.5,
                          repeat: Infinity,
                          repeatDelay: collisionComplete ? 3 : 1
                        }}
                      />
                      
                      <motion.span 
                        animate={{ 
                          scale: collisionComplete ? [1, 1.3, 1] : 1,
                          rotate: collisionComplete ? [0, 8, 0, -8, 0] : 0
                        }}
                        transition={{ 
                          repeat: collisionComplete ? Infinity : 0, 
                          repeatType: "reverse" as const, 
                          duration: 1.5 
                        }}
                        className="text-base md:text-2xl font-bold text-amber-900 text-center px-1 relative z-10"
                      >
                        다른 것은<br/> 다르게!
                      </motion.span>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="issues" className="mt-0">
            {/* 필터 영역을 가운데로 배치 */}
            <div className="flex flex-col items-center justify-center gap-3 mb-4">
              <div className="grid grid-cols-2 gap-2 w-full max-w-4xl">
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-purple-50 rounded-lg md:rounded-2xl shadow-lg overflow-hidden border-2 border-purple-200"
                >
                  <div className="bg-[#623D91] p-2 md:p-4 text-white">
                    <div className="flex items-center gap-1 md:gap-2">
                      <FolderOpen className="w-3 h-3 md:w-5 md:h-5 flex-shrink-0" />
                      <h4 className="text-base md:text-xl font-semibold truncate">같은 문제는<br/>강력한 대안으로</h4>
                    </div>
                    <p className="text-xs md:text-base text-white/80 ml-4 md:ml-7 line-clamp-1">"젊고 패기있는 전국1등 입대표"</p>
                  </div>
                  
                  <div className="p-2 md:p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-1 md:gap-2">
                      {categories.map((category) => (
                        <div 
                          key={category.id}
                          onClick={() => toggleCategory(category.id)}
                          className={`flex items-center gap-1 md:gap-2 p-1 md:p-2 rounded-lg cursor-pointer transition-colors ${
                            selectedCategories.includes(category.id)
                              ? 'bg-purple-100 text-[#623D91]'
                              : 'hover:bg-gray-50'
                          }`}
                        >
                          <div className={`w-3 h-3 md:w-5 md:h-5 rounded-md flex items-center justify-center flex-shrink-0 ${
                            selectedCategories.includes(category.id)
                              ? 'bg-[#623D91] text-white'
                              : 'border border-gray-300'
                          }`}>
                            {selectedCategories.includes(category.id) && <Check className="w-2 h-2 md:w-4 md:h-4" />}
                          </div>
                          <div className="flex items-center gap-1 md:gap-2 min-w-0">
                            <category.icon className="w-3 h-3 md:w-5 md:h-5 flex-shrink-0" />
                            <span className="text-[10px] md:text-base truncate">{category.name}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="bg-pink-50 rounded-lg md:rounded-2xl shadow-lg overflow-hidden border-2 border-pink-300"
                >
                  <div 
                    className="p-2 md:p-4 text-white" 
                    style={{ backgroundColor: '#E8326E', backgroundImage: 'linear-gradient(to right, #E8326E, #FF4081)' }}
                  >
                    <div className="flex items-center gap-1 md:gap-2">
                      <FolderOpen className="w-3 h-3 md:w-5 md:h-5 flex-shrink-0" />
                      <h4 className="text-base md:text-xl font-semibold truncate">다른 상황에는<br/>세심한 정책으로</h4>
                    </div>
                    <p className="text-xs md:text-base text-white/80 ml-4 md:ml-7 line-clamp-1">"손에 잡히는 양주동, 동면"</p>
                  </div>
                  
                  <div className="p-2 md:p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-1 md:gap-2">
                      {regions.map((region) => (
                        <div 
                          key={region.id}
                          onClick={() => toggleRegion(region.id)}
                          className={`flex items-center gap-1 md:gap-2 p-1 md:p-2 rounded-lg cursor-pointer transition-colors ${
                            selectedRegions.includes(region.id)
                              ? 'bg-pink-100 text-[#E8326E]'
                              : 'hover:bg-gray-50'
                          }`}
                        >
                          <div className={`w-3 h-3 md:w-5 md:h-5 rounded-md flex items-center justify-center flex-shrink-0 ${
                            selectedRegions.includes(region.id)
                              ? 'bg-[#E8326E] text-white'
                              : 'border border-gray-300'
                          }`}>
                            {selectedRegions.includes(region.id) && <Check className="w-2 h-2 md:w-4 md:h-4" />}
                          </div>
                          <div className="flex items-center gap-1 md:gap-2 min-w-0">
                            <region.icon className={`w-3 h-3 md:w-5 md:h-5 flex-shrink-0 ${
                              region.id === 'common' ? 'text-blue-500' :
                              region.id === 'yangju' ? 'text-green-500' :
                              region.id === 'seokgeum' ? 'text-yellow-500' :
                              'text-purple-500'
                            }`} />
                            <span className="text-[10px] md:text-base truncate">{region.name}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white/80 backdrop-blur-sm rounded-xl p-3 md:p-4 shadow-md"
            >
              <h3 className="text-base md:text-lg font-bold text-[#623D91] mb-3 md:mb-4 text-center">
                {filteredPromises.length > 0 
                  ? `권현우의 약속 (${filteredPromises.length}개)` 
                  : "카테고리나 지역을 선택하시면 공약이 표시됩니다"}
              </h3>
              
              {filteredPromises.length > 0 ? (
                <div className="max-h-[45vh] overflow-y-auto px-2 pb-4 overscroll-contain">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {filteredPromises.map(promise => (
                      <PromiseCard 
                        key={promise.id} 
                        promise={promise} 
                        onClick={handlePromiseClick}
                      />
                    ))}
                  </div>
                  {/* 스크롤 버퍼 공간 추가 */}
                  <div className="h-32 md:h-40"></div>
                </div>
              ) : (
                <div className="text-center py-10">
                  <p className="text-gray-500">선택한 조건에 해당하는 공약이 없습니다.</p>
                  <p className="text-gray-500 text-sm mt-2">다른 카테고리나 지역을 선택해보세요.</p>
                </div>
              )}
            </motion.div>
            
            {/* 하단 여백 크기 조정 */}
            <div className="h-16 md:h-24"></div>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* 공약 상세 모달 */}
      <AnimatePresence>
        {selectedPromise && (
          <PromiseDetail 
            promise={selectedPromise} 
            onClose={closePromiseDetail} 
          />
        )}
      </AnimatePresence>
      
      {/* 스크롤 화살표 */}
      {false && !hideScrollIndicator && (
        <div className="absolute bottom-[10%] left-0 right-0 z-[100] flex justify-center">
          <ScrollIndicator isDark={false} color="text-[#623D91]" />
        </div>
      )}
    </section>
  );
};

export default YDSection; 