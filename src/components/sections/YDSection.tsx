"use client"

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FolderOpen, MapPin, Building2, HeartPulse, Briefcase, Store, Home, Check } from 'lucide-react';
import PromiseDetail from '../PromiseDetail';
import { Promise, Category, Region } from '@/types';
import PromiseCard from '../PromiseCard';
import ScrollIndicator from '../ScrollIndicator';

// 카테고리 및 지역 데이터 정의
const categories: Category[] = [
  { id: 'housing', name: '공동주택', icon: Home },
  { id: 'care', name: '돌봄', icon: HeartPulse },
  { id: 'business', name: '자영업', icon: Store },
  { id: 'job', name: '일자리', icon: Briefcase },
  { id: 'living', name: '정주여건', icon: Building2 },
  { id: 'etc', name: '기타', icon: FolderOpen },
];

const regions: Region[] = [
  { id: 'common', name: '공통', icon: MapPin },
  { id: 'yangju', name: '양주동', icon: MapPin },
  { id: 'seokgeum', name: '석금산', icon: MapPin },
  { id: 'sasong', name: '사송', icon: MapPin },
  { id: 'village', name: '자연마을', icon: MapPin },
];

// Promise 타입 정의 (만약 @/types에서 가져오는 것이 문제가 있다면)
interface PromiseType {
  id: string;
  title: string;
  category: string;
  subCategory?: string;
  region: string;
  effect: string;
  content: string;
}

// 공약 데이터 추가
const promises: PromiseType[] = [
  {
    id: '1',
    title: '공동주택 유지보수 지원',
    category: 'housing',
    region: 'yangju',
    effect: '노후시설 개선\n주민간의 대화와 소통의 장 형성\n공동주택 내 분쟁 감소\n공동주택 내구연한 증대로 장기수선충당금 절감',
    content: '아파트 유지보수, 비용과 안전, 그리고 편의 세마리 토끼를 한꺼번에 잡는 비법, 권현우가 알려드립니다.'
  },
  {
    id: '2',
    title: '주민 갈등 조정위원회 설립',
    category: 'housing',
    region: 'yangju',
    effect: '공동주택 내 분쟁 감소\n입주자대표회의 효율성 증대\n입주민의 공동주택 관리 참여 제고',
    content: '유명무실한 분쟁조정위원회의 내실 다지기'
  },
  {
    id: '3',
    title: '아파트 종사자 안전 지원',
    category: 'housing',
    region: 'yangju',
    effect: '아파트 종사자 휴게실 설치 허가 절차 간소화\n근로기준법 과태료 리스크 감소',
    content: '아파트관리 종사자의 안전작업을 위한 환경 조성을 지원합니다.'
  },
  {
    id: '4',
    title: '공동주택 지원금 지원 확대',
    category: 'housing',
    region: 'yangju',
    effect: '노후시설 개선\n주민간의 대화와 소통의 장 형성\n공동주택 내 분쟁 감소\n공동주택 내구연한 증대로 장기수선충당금 절감',
    content: '공동주택 지원금을 확대하여 주거환경을 개선합니다.'
  },
  {
    id: '5',
    title: '권역별 아이돌봄센터 설립',
    category: 'care',
    region: 'common',
    effect: '아동의 돌봄 공백 감소(평일에 자녀가 혼자 있는 시간을 줄입니다.)\n학습 프로그램 운영\n친구, 지역 어른들과 함께 지내 정서 발달',
    content: '권역별 돌봄센터가 일하는 부모를 돕습니다'
  },
  {
    id: '6',
    title: '달빛어린이병원과 심야약국',
    category: 'care',
    region: 'common',
    effect: '저녁 늦은 시간이나 휴일에도 소아과전문의의 진료를 받을 수 있습니다.\n소아과의 대형병원-동네병원의 지역완결형 의료체계를 구성할 수 있습니다.',
    content: '늦은 밤 아이가 아프면 어떻게 하지? 이제 고민 끝!'
  },
  {
    id: '7',
    title: '노인정 환경 개선: 입식 테이블 설치 지원',
    category: 'care',
    region: 'common',
    effect: '모든 노인정에 입식테이블 설치\n오래된 노인정의 환경 개선\n노인정 활성화\n어르신 자조와 돌봄 여건 확대',
    content: '무릎이 아픈 어르신들도 즐겁게 노인정에세 시간을 보내요.'
  },
  {
    id: '8',
    title: '노인정 인력 지원: 식사 도우미 지원',
    category: 'care',
    region: 'common',
    effect: '식사 여력이 되지 않는 노인정에 식사 도우미 지원\n돌봄 인력을 지원하여 일자리 창출\n식사를 함께함으로써 시니어 공동체 활성화',
    content: '돌봄과 함께 일자리도 늘리는 일석이조!'
  },
  {
    id: '9',
    title: '자영업자 이자 지원 5%',
    category: 'business',
    region: 'common',
    effect: '불경기에 소상공인이 버틸 수 있는 힘을',
    content: '진주처럼 자영업자 이자 지원을 5%로 늘리겠습니다.'
  },
  {
    id: '10',
    title: '일자리 창출 우수기업 지원',
    category: 'job',
    region: 'common',
    effect: '양산시민에게 일자리를\n양산기업에게 일거리를',
    content: '양산시 입찰 시 지역 주민 채용 기업에 가점 부가하겠습니다.'
  },
  {
    id: '11',
    title: '자영업자 지원사업 지원',
    category: 'business',
    region: 'common',
    effect: '지원사업을 모르는 분에게 지원사업 소개를\n지원사업 신청서류 작성이 어려운 분에게는 서류 작업 지원을',
    content: '자영업자 대상 공공지원사업을 연결시켜 드리겠습니다.'
  },
  {
    id: '12',
    title: '작은도서관 지원 확대',
    category: 'living',
    subCategory: '문화',
    region: 'common',
    effect: '주민간의 대화와 소통의 장 형성\n아이들에게는 놀이공간을 형성',
    content: '작은도서관을 내 집앞 문화센터로 만들겠습니다.'
  },
  {
    id: '13',
    title: '119안전센터',
    category: 'living',
    subCategory: '문화',
    region: 'seokgeum,sasong',
    effect: '양산소방서 과포화 해소\n석금산, 사송 주민들이 골든타임을 놓치지 않도록!',
    content: '석금산, 사송 119안전센터를 조기 건립하겠습니다.'
  },
  {
    id: '14',
    title: '치안센터',
    category: 'living',
    subCategory: '안전',
    region: 'seokgeum,sasong',
    effect: '석금산, 사송 주민들이 안심할 수 있는 동네를',
    content: '석금산, 사송 치안센터를 조기 건립하겠습니다.'
  },
  {
    id: '15',
    title: '대중교통(버스노선)',
    category: 'living',
    subCategory: '안전',
    region: 'common,sasong',
    effect: '학부모의 도움 없는 원거리 통학\n지역 내 취업 시 자차가 없어도 통근할 수 있는 환경 제공\n상업시설 조기 활성화\n사송역 환승센터 활성화',
    content: '간선, 지선, 마을버스 체계를 우리동네에 맞게 만들겠습니다.'
  },
  {
    id: '16',
    title: '자원회수시설',
    category: 'living',
    region: 'seokgeum',
    effect: '노후화된 자원회수시설의 이전/확장 방안에 대해 주민 공청회 실시\n양산시 폐기물 처리에 대해 시민 합의 도출\n폐기물 처리비용 절감',
    content: '자원회수시설의 미래를 위한 공청회를 열겠습니다.'
  },
  {
    id: '17',
    title: '양주문화체육센터 활성화',
    category: 'living',
    subCategory: '문화',
    region: 'yangju',
    effect: '시민들의 운동공간 활성화\n주민 만족도 증대\n주민 건강 증진',
    content: '양주문화체육센터의 이용도를 제고하겠습니다.'
  },
  {
    id: '18',
    title: '수질정화공원(금빛마을) 황토길 조성',
    category: 'living',
    subCategory: '문화',
    region: 'seokgeum',
    effect: '주민 만족도 증대\n주민 건강 증진',
    content: '수질정화공원 주위에 황토길을 조성하겠습니다.'
  },
  {
    id: '19',
    title: '석산로터리 신호체계 개선',
    category: 'living',
    region: 'seokgeum',
    effect: '차량 속도 향상\n지체시간 감소\n탄소발생 절감\n교통체증 완화\n유류비 절감으로 가처분 소득 증가',
    content: '석산로터리 신호체계를 개선하겠습니다.'
  },
  {
    id: '20',
    title: '버스정류장 온열시트 확대',
    category: 'living',
    region: 'yangju',
    effect: '주민 만족도 증대\n대중교통 이용 증진',
    content: '버스정류장 온열시트를 확대 설치하겠습니다.'
  },
  {
    id: '21',
    title: '주민편익시설 진입 보행로 미끄럼 방지 시공',
    category: 'living',
    subCategory: '문화',
    region: 'yangju',
    effect: '주민 안전',
    content: '주민편익시설 진입 보행로에 미끄럼 방지 시공을 하겠습니다.'
  },
  {
    id: '22',
    title: '대중목욕탕이 있는 주민자치센터 건립',
    category: 'living',
    subCategory: '문화',
    region: 'sasong',
    effect: '사송 주민 문화시설 확대\n주민자치회 자생사업 시행',
    content: '사송에 대중목욕탕이 있는 동면 주민자치센터를 설립하겠습니다.'
  },
  {
    id: '23',
    title: '마을관리소 설치 운영',
    category: 'living',
    region: 'village',
    effect: '생활 민원 처리 : 마을 주민들의 생활 민원을 처리하여 지역 사회의 안정을 도모합니다.\n취약계층 돌보기 : 취약계층을 돌보아 지역 사회의 행복을 증진시킵니다.\n공공 일자리 창출 : 마을 관리소 업무를 맡기면서 일자리를 창출할 수 있습니다.\n지역 경제 활성화 : 생활밀착형 공공서비스를 제공하여 지역 경제를 활성화시킵니다.',
    content: '아파트에는 아파트관리소, 자연마을에는 마을관리소'
  }
];

interface YDSectionProps {
  isStandalone?: boolean;
  hideScrollIndicator?: boolean;
  showHeader?: boolean;
  isActive?: boolean;
}

// 타입스크립트 인터페이스 선언 추가
declare global {
  interface Window {
    instgrm?: {
      Embeds: {
        process(): void;
      };
    };
  }
}

const YDSection = ({ isStandalone, hideScrollIndicator = false, showHeader = false, isActive = true }: YDSectionProps) => {
  const [selectedPromise, setSelectedPromise] = useState<PromiseType | null>(null);
  const [showCollision, setShowCollision] = useState(false);
  const [collisionComplete, setCollisionComplete] = useState(false);
  const [showSecondCollision, setShowSecondCollision] = useState(false);
  const [secondCollisionComplete, setSecondCollisionComplete] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [showStickyHeader, setShowStickyHeader] = useState(false);
  const [activeButton, setActiveButton] = useState('alternative');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [filteredPromises, setFilteredPromises] = useState<PromiseType[]>(promises);
  const sectionRef = useRef<HTMLDivElement>(null);
  const firstAnimationRef = useRef<HTMLDivElement>(null);
  const secondAnimationRef = useRef<HTMLDivElement>(null);
  const regionalOutlookRef = useRef<HTMLDivElement>(null);

  // 화면 크기 감지를 위한 useEffect
  useEffect(() => {
    const checkIfDesktop = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    
    // 초기 실행
    checkIfDesktop();
    
    // 리사이즈 이벤트 리스너
    window.addEventListener('resize', checkIfDesktop);
    
    return () => {
      window.removeEventListener('resize', checkIfDesktop);
    };
  }, []);

  // 스크롤 감지 및 애니메이션 재시작을 위한 Intersection Observer
  useEffect(() => {
    const resetAnimations = () => {
      setShowCollision(false);
      setCollisionComplete(false);
      setShowSecondCollision(false);
      setSecondCollisionComplete(false);
    };

    const startFirstAnimation = () => {
      resetAnimations();
      
      // 첫 번째 충돌 효과 애니메이션
      const collisionTimer = setTimeout(() => {
        setShowCollision(true);
        
        const completeTimer = setTimeout(() => {
          setCollisionComplete(true);
        }, 2000);
        
        return () => clearTimeout(completeTimer);
      }, 500);
      
      return () => clearTimeout(collisionTimer);
    };
    
    const startSecondAnimation = () => {
      // 두 번째 충돌 효과 애니메이션
      const secondCollisionTimer = setTimeout(() => {
        setShowSecondCollision(true);
        
        const secondCompleteTimer = setTimeout(() => {
          setSecondCollisionComplete(true);
        }, 2000);
        
        return () => clearTimeout(secondCompleteTimer);
      }, 500);
      
      return () => clearTimeout(secondCollisionTimer);
    };

    // 첫 번째 애니메이션 영역 관찰
    const firstObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          startFirstAnimation();
          setActiveButton('alternative');
        }
      });
    }, { threshold: 0.5 });
    
    // 두 번째 애니메이션 영역 관찰
    const secondObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          startSecondAnimation();
          setActiveButton('issues');
        }
      });
    }, { threshold: 0.5 });
    
    // 지역별 전망 섹션 관찰
    const regionalOutlookObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveButton('issues');
        }
      });
    }, { threshold: 0.2 });
    
    if (firstAnimationRef.current) {
      firstObserver.observe(firstAnimationRef.current);
    }
    
    if (secondAnimationRef.current) {
      secondObserver.observe(secondAnimationRef.current);
    }
    
    if (regionalOutlookRef.current) {
      regionalOutlookObserver.observe(regionalOutlookRef.current);
    }
    
    return () => {
      if (firstAnimationRef.current) {
        firstObserver.unobserve(firstAnimationRef.current);
      }
      if (secondAnimationRef.current) {
        secondObserver.unobserve(secondAnimationRef.current);
      }
      if (regionalOutlookRef.current) {
        regionalOutlookObserver.unobserve(regionalOutlookRef.current);
      }
    };
  }, []);

  // 스크롤 관련 핸들러
  const handleSmoothScroll = (elementId: string) => {
    setActiveButton(elementId);
    
    // elementId가 'alternative'나 'issues'인 경우 해당 요소로 스크롤
    let targetId = elementId;
    if (elementId === 'issues') {
      targetId = 'regional-outlook';
    }
    
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // 스크롤 이벤트 - 헤더 표시 관련
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const sectionRect = sectionRef.current.getBoundingClientRect();
      const sectionHeight = sectionRef.current.offsetHeight;
      const windowHeight = window.innerHeight;
      
      // YDSection이 화면의 1/3 이상 보이고, 아직 화면 내에 있을 때만 헤더를 표시
      // 추가로 isActive가 true일 때만 헤더 표시
      if (isActive && sectionRect.top <= windowHeight / 3 && sectionRect.top > -sectionHeight + 100) {
        setShowStickyHeader(true);
      } else {
        setShowStickyHeader(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // 초기 상태 설정
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isActive]);

  // Instagram 임베드 스크립트 로딩
  useEffect(() => {
    // Instagram 임베드 처리 함수
    const loadInstagramEmbed = () => {
      setTimeout(() => {
        if (window.instgrm) {
          window.instgrm.Embeds.process();
        } else {
          const script = document.createElement('script');
          script.async = true;
          script.defer = true;
          script.src = 'https://www.instagram.com/embed.js';
          document.body.appendChild(script);
        }
      }, 500); // 500ms 지연 추가
    };

    loadInstagramEmbed();
  }, []);

  // 카테고리 토글 함수
  const toggleCategory = (categoryId: string) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  // 지역 토글 함수
  const toggleRegion = (regionId: string) => {
    setSelectedRegions(prev => 
      prev.includes(regionId) 
        ? prev.filter(id => id !== regionId)
        : [...prev, regionId]
    );
  };

  // 필터링된 공약 계산
  useEffect(() => {
    let filtered = [...promises];
    
    // 카테고리 필터링
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(promise => 
        selectedCategories.includes(promise.category)
      );
    }
    
    // 지역 필터링
    if (selectedRegions.length > 0) {
      filtered = filtered.filter(promise => {
        // 쉼표로 구분된 여러 지역을 처리
        const promiseRegions = promise.region.split(',');
        return promiseRegions.some(region => selectedRegions.includes(region));
      });
    }
    
    setFilteredPromises(filtered);
  }, [selectedCategories, selectedRegions]);

  // 공약 클릭 핸들러
  const handlePromiseClick = (promise: PromiseType) => {
    setSelectedPromise(promise);
  };

  const closePromiseDetail = () => {
    setSelectedPromise(null);
  };

  // 공약 카드 컴포넌트
  const PromiseCard = ({ promise, onClick }: { promise: PromiseType, onClick: (promise: PromiseType) => void }) => {
    // 카테고리에 따른 색상 설정
    const getCategoryColor = (category: string) => {
      switch(category) {
        case 'housing': return 'bg-blue-100 text-blue-800 border-blue-300';
        case 'care': return 'bg-green-100 text-green-800 border-green-300';
        case 'business': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
        case 'job': return 'bg-purple-100 text-purple-800 border-purple-300';
        case 'living': return 'bg-pink-100 text-pink-800 border-pink-300';
        default: return 'bg-gray-100 text-gray-800 border-gray-300';
      }
    };
    
    // 지역에 따른 색상 설정
    const getRegionColor = (region: string) => {
      if (region.includes('common')) return 'bg-blue-50 text-blue-600';
      if (region.includes('yangju')) return 'bg-green-50 text-green-600';
      if (region.includes('seokgeum')) return 'bg-yellow-50 text-yellow-600';
      if (region.includes('sasong')) return 'bg-purple-50 text-purple-600';
      if (region.includes('village')) return 'bg-orange-50 text-orange-600';
      return 'bg-gray-50 text-gray-600';
    };
    
    // 카테고리 이름 가져오기
    const getCategoryName = (categoryId: string) => {
      const category = categories.find(c => c.id === categoryId);
      return category ? category.name : categoryId;
    };
    
    // 지역 이름 가져오기
    const getRegionNames = (regionIds: string) => {
      return regionIds.split(',').map(regionId => {
        const region = regions.find(r => r.id === regionId);
        return region ? region.name : regionId;
      }).join(', ');
    };
    
    return (
      <div 
        className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer"
        onClick={() => onClick(promise)}
      >
        <div className="p-4">
          <h3 className="font-bold text-lg mb-2 text-[#623D91]">{promise.title}</h3>
          <div className="flex flex-wrap gap-2 mb-2">
            <span className={`text-xs px-2 py-1 rounded-full ${getCategoryColor(promise.category)}`}>
              {getCategoryName(promise.category)}
            </span>
            <span className={`text-xs px-2 py-1 rounded-full ${getRegionColor(promise.region)}`}>
              {getRegionNames(promise.region)}
            </span>
          </div>
          <p className="text-sm text-gray-600 line-clamp-2">{promise.content}</p>
        </div>
      </div>
    );
  };

  // 공약 상세 모달 컴포넌트
  const PromiseDetail = ({ promise, onClose }: { promise: PromiseType, onClose: () => void }) => {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          className="bg-white rounded-xl shadow-xl max-w-lg w-full max-h-[80vh] overflow-y-auto"
          onClick={e => e.stopPropagation()}
        >
          <div className="p-6">
            <h2 className="text-2xl font-bold text-[#623D91] mb-4">{promise.title}</h2>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <h3 className="text-sm font-semibold text-gray-500 mb-1">카테고리</h3>
                <p className="text-base">{categories.find(c => c.id === promise.category)?.name || promise.category}</p>
              </div>
              {promise.subCategory && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 mb-1">서브카테고리</h3>
                  <p className="text-base">{promise.subCategory}</p>
                </div>
              )}
              <div>
                <h3 className="text-sm font-semibold text-gray-500 mb-1">지역</h3>
                <p className="text-base">
                  {promise.region.split(',').map(regionId => {
                    const region = regions.find(r => r.id === regionId);
                    return region ? region.name : regionId;
                  }).join(', ')}
                </p>
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-[#623D91] mb-2">공약 내용</h3>
              <p className="text-base bg-purple-50 p-4 rounded-lg">{promise.content}</p>
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-[#623D91] mb-2">기대효과</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                {promise.effect.split('\n').map((line, index) => (
                  <p key={index} className="text-base mb-2 flex items-start">
                    <span className="text-[#623D91] mr-2">•</span>
                    <span>{line}</span>
                  </p>
                ))}
              </div>
            </div>
            
            <div className="flex justify-end">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-[#623D91] text-white rounded-lg hover:bg-[#4e3173] transition-colors"
              >
                닫기
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <div ref={sectionRef} id="yd-section" className={`w-full py-3 md:py-4 ${!isStandalone ? 'bg-gradient-to-br from-purple-50 to-purple-100' : ''}`}>
      {(showHeader || showStickyHeader) && isActive ? (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="fixed top-0 left-0 w-full bg-gradient-to-r from-[#623D91] to-[#8757D9] text-white py-6 z-50 shadow-md"
        >
          <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
            <div className="flex flex-col items-center md:items-start">
              <h2 className="text-3xl md:text-4xl font-extrabold mb-2 md:mb-1" style={{ fontFamily: 'Giants-Bold' }}>권현우의 양동작전</h2>
              <p className="text-sm md:text-base mb-3 md:mb-0">
                <span className="font-bold text-base md:text-lg text-white">양</span>주동과 
                <span className="font-bold text-base md:text-lg text-white"> 동</span>면의 
                <span className="font-bold text-base md:text-lg text-white"> 작</span>지만 소중한 
                <span className="font-bold text-base md:text-lg text-white"> 전</span>망
              </p>
            </div>
            <div className="flex flex-wrap gap-2 justify-center md:justify-end">
              <button 
                onClick={() => handleSmoothScroll('alternative')}
                className={`px-4 py-2 rounded-full font-bold text-sm transition ${
                  activeButton === 'alternative' 
                    ? 'bg-[#3A1D6E] text-white border-2 border-white shadow-lg' 
                    : 'bg-white text-[#623D91]'
                } hover:bg-opacity-90`}
              >
                지역 현안 진단
              </button>
              <button 
                onClick={() => handleSmoothScroll('issues')}
                className={`px-4 py-2 rounded-full font-bold text-sm transition ${
                  activeButton === 'issues' 
                    ? 'bg-[#3A1D6E] text-white border-2 border-white shadow-lg' 
                    : 'bg-white text-[#623D91]'
                } hover:bg-opacity-90`}
              >
                새로운 전망
              </button>
            </div>
          </div>
        </motion.div>
      ) : null}
      
      <div className={`max-w-7xl mx-auto px-8 md:px-6 ${(showHeader || showStickyHeader) ? 'pt-[100px] md:pt-[90px]' : ''}`}>


        <div className="mt-8">
          <div className="grid grid-cols-1 gap-4 md:gap-8">
            <div>
              <h2 className="text-xl md:text-3xl font-bold text-[#623D91] mb-2 font-giants">위기와 기회가 공존하는 양산</h2>
              <div id="alternative" ref={firstAnimationRef} className="space-y-1 md:space-y-3 relative h-[150px] md:h-[250px]">
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
                    duration: showCollision ? (collisionComplete ? 0.5 : 1.2) : 1,
                    ease: showCollision ? (collisionComplete ? "easeOut" : "easeInOut") : "easeOut"
                  }}
                  className="absolute top-0 left-0 md:left-[5%] bg-purple-100 p-4 md:p-6 rounded-xl border-2 border-[#623D91] shadow-lg z-20 w-[160px] md:w-[500px]"
                >
                  <h3 className="text-lg md:text-3xl font-bold text-[#623D91] mb-1">위기의 양산</h3>
                  <p className="text-sm md:text-lg text-gray-700">경남에서 <a href="https://www.yangsanilbo.com/news/articleView.html?idxno=114797" target="_blank" rel="noopener noreferrer" className="underline text-[#623D91] font-medium">고용률이 가장 낮은 도시</a></p>
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
                    duration: showCollision ? (collisionComplete ? 0.5 : 1.2) : 1,
                    ease: showCollision ? (collisionComplete ? "easeOut" : "easeInOut") : "easeOut",
                    delay: 0.3
                  }}
                  className="absolute top-0 right-0 md:right-[5%] bg-pink-100 p-4 md:p-6 rounded-xl border-2 border-[#E8326E] shadow-lg z-20 w-[160px] md:w-[500px]"
                >
                  <h3 className="text-lg md:text-3xl font-bold text-[#E8326E] mb-1">기회의 양산</h3>
                  <p className="text-sm md:text-lg text-gray-700">경남에서 <a href="https://www.yangsanilbo.com/news/articleView.html?idxno=114530" target="_blank" rel="noopener noreferrer" className="underline text-[#E8326E] font-medium">인구 유입이 가장 많은 도시</a></p>
                </motion.div>
                
                {/* 가운데 충돌 파티클 */}
                {showCollision && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ 
                      opacity: collisionComplete ? 0.9 : [0, 0.8, 0.7, 0.8], 
                      scale: collisionComplete ? [1, 1.2, 0.9, 1.1] : [0, 1.5, 1.3, 1.5],
                      rotateZ: collisionComplete ? [0, 5, 0, -5, 0] : [0, 10, -10, 0]
                    }}
                    transition={{ 
                      duration: collisionComplete ? 1.5 : 1, 
                      ease: "easeOut",
                      scale: {
                        repeat: collisionComplete ? Infinity : 0,
                        repeatType: "reverse",
                        duration: collisionComplete ? 2 : 1
                      },
                      rotateZ: {
                        repeat: collisionComplete ? Infinity : 0,
                        repeatType: "reverse",
                        duration: collisionComplete ? 3 : 1
                      }
                    }}
                    className={`absolute top-[65%] md:top-[60%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                      w-28 h-28 md:w-44 md:h-44 rounded-full z-20 flex items-center justify-center overflow-hidden
                      bg-yellow-400 shadow-[0_0_20px_10px_rgba(255,204,0,0.6)] border-4 border-yellow-300`}
                  >
                    {/* 내부 발광 효과 - 단순화 */}
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-b from-yellow-300 to-yellow-500 opacity-40"
                      animate={{
                        rotate: [0, 180],
                        scale: collisionComplete ? [0.8, 1.1, 0.9] : 0.9
                      }}
                      transition={{
                        rotate: {
                          duration: 6,
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
                    
                    <motion.span 
                      animate={{ 
                        scale: collisionComplete ? [0.9, 1.2, 1] : 1,
                        rotate: collisionComplete ? [0, 3, 0, -3, 0] : 0
                      }}
                      transition={{ 
                        repeat: collisionComplete ? Infinity : 0, 
                        repeatType: "reverse", 
                        duration: 1.5 
                      }}
                      className="text-base md:text-xl font-bold text-amber-900 text-center px-1 relative z-10"
                    >
                      같은 문제는<br/> 같게!
                    </motion.span>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 두 번째 카드 세트: 서로 다른 양주동과 동면 */}
        <div className="mt-16">
          <h2 className="text-xl md:text-3xl font-bold text-[#623D91] mb-2 font-giants">서로 다른 양주동과 동면</h2>
          <div id="issues" ref={secondAnimationRef} className="space-y-1 md:space-y-3 relative h-[150px] md:h-[250px]">
            {/* 왼쪽에서 오는 "안정과 연륜의 양주동" */}
            <motion.div
              initial={{ opacity: 0, x: -120, rotate: -5 }}
              animate={{ 
                opacity: 1, 
                x: showSecondCollision ? (
                  secondCollisionComplete 
                    ? (isDesktop ? -20 : -15)
                    : isDesktop
                      ? [-30, -25, -28, -25] 
                      : [-20, -15, -18, -15]
                ) : 0,
                rotate: showSecondCollision ? (secondCollisionComplete ? -2 : [-4, -2, -3, -2]) : -5,
                scale: showSecondCollision ? (secondCollisionComplete ? 1.05 : [1.02, 1.05, 1.03, 1.05]) : 1
              }}
              transition={{ 
                duration: showSecondCollision ? (secondCollisionComplete ? 0.5 : 1.2) : 1,
                ease: showSecondCollision ? (secondCollisionComplete ? "easeOut" : "easeInOut") : "easeOut"
              }}
              className="absolute top-0 left-0 md:left-[5%] bg-pink-100 p-4 md:p-6 rounded-xl border-2 border-[#E8326E] shadow-lg z-20 w-[160px] md:w-[500px]"
            >
              <h3 className="text-lg md:text-3xl font-bold text-[#E8326E] mb-1">안정과 연륜의 양주동</h3>
              <p className="text-sm md:text-lg text-gray-700">노후한 시설을 정비하여 더 살기좋게</p>
            </motion.div>
            
            {/* 오른쪽에서 오는 "새롭게 성장하는 동면" */}
            <motion.div
              initial={{ opacity: 0, x: 120, rotate: 5 }}
              animate={{ 
                opacity: 1, 
                x: showSecondCollision ? (
                  secondCollisionComplete 
                    ? (isDesktop ? 20 : 15) 
                    : isDesktop 
                      ? [30, 25, 28, 25] 
                      : [20, 15, 18, 15]
                ) : 0,
                rotate: showSecondCollision ? (secondCollisionComplete ? 2 : [4, 2, 3, 2]) : 5,
                scale: showSecondCollision ? (secondCollisionComplete ? 1.05 : [1.02, 1.05, 1.03, 1.05]) : 1
              }}
              transition={{ 
                duration: showSecondCollision ? (secondCollisionComplete ? 0.5 : 1.2) : 1,
                ease: showSecondCollision ? (secondCollisionComplete ? "easeOut" : "easeInOut") : "easeOut",
                delay: 0.3
              }}
              className="absolute top-0 right-0 md:right-[5%] bg-purple-100 p-4 md:p-6 rounded-xl border-2 border-[#623D91] shadow-lg z-20 w-[160px] md:w-[500px]"
            >
              <h3 className="text-lg md:text-3xl font-bold text-[#623D91] mb-1">새롭게 성장하는 동면</h3>
              <p className="text-sm md:text-lg text-gray-700">정주여건을 마련하여 오래도록 안착하게</p>
            </motion.div>
            
            {/* 가운데 충돌 파티클 - 두 번째 세트 */}
            {showSecondCollision && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: secondCollisionComplete ? 0.9 : [0, 0.8, 0.7, 0.8], 
                  scale: secondCollisionComplete ? 1.1 : [0, 1.5, 1.3, 1.5],
                  rotateZ: secondCollisionComplete ? [0, 5, 0, -5, 0] : [0, 10, -10, 0]
                }}
                transition={{ 
                  duration: secondCollisionComplete ? 1.5 : 1, 
                  ease: "easeOut",
                  scale: {
                    repeat: secondCollisionComplete ? Infinity : 0,
                    repeatType: "reverse",
                    duration: secondCollisionComplete ? 2 : 1
                  },
                  rotateZ: {
                    repeat: secondCollisionComplete ? Infinity : 0,
                    repeatType: "reverse",
                    duration: secondCollisionComplete ? 3 : 1
                  }
                }}
                className={`absolute top-[65%] md:top-[60%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                  w-28 h-28 md:w-44 md:h-44 rounded-full z-20 flex items-center justify-center overflow-hidden
                  bg-yellow-400 shadow-[0_0_20px_10px_rgba(255,204,0,0.6)] border-4 border-yellow-300`}
              >
                {/* 내부 발광 효과 - 단순화 */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-b from-yellow-300 to-yellow-500 opacity-40"
                  animate={{
                    rotate: [0, 180],
                    scale: secondCollisionComplete ? [0.8, 1.1, 0.9] : 0.9
                  }}
                  transition={{
                    rotate: {
                      duration: 6,
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
                
                <motion.span 
                  animate={{ 
                    scale: secondCollisionComplete ? [0.9, 1.2, 1] : 1,
                    rotate: secondCollisionComplete ? [0, 3, 0, -3, 0] : 0
                  }}
                  transition={{ 
                    repeat: secondCollisionComplete ? Infinity : 0, 
                    repeatType: "reverse", 
                    duration: 1.5 
                  }}
                  className="text-base md:text-xl font-bold text-amber-900 text-center px-1 relative z-10"
                >
                  다른 문제는<br/> 다르게!
                </motion.span>
              </motion.div>
            )}
          </div>
        </div>
      </div>
      
      {/* 하단 여백 추가 */}
      <div className="h-[250px] md:h-[350px] flex flex-col justify-end">
        {/* 스크롤 인디케이터 추가 */}
        {!hideScrollIndicator && (
          <motion.div 
            className="mb-4  flex justify-center"
            initial={{ opacity: 0, y: -10 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              transition: { 
                duration: 0.5,
                repeat: Infinity,
                repeatType: "reverse"
              }
            }}
          >
            <ScrollIndicator isFixed={false} color="text-purple-700" />
          </motion.div>
        )}
      </div>
      
      <div id="regional-outlook" ref={regionalOutlookRef} className="mt-0 max-w-7xl mx-auto px-8 md:px-6">

        
        {/* 필터 영역을 가운데로 배치 */}
        <div className="flex flex-col items-center justify-center gap-3 mb-8">
          <div className="grid grid-cols-2 gap-2 md:gap-4 w-full max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-purple-50 rounded-lg md:rounded-2xl shadow-lg overflow-hidden border-2 border-purple-200"
            >
              <div className="bg-[#623D91] p-2 md:p-4 text-white">
                <div className="flex items-center gap-1 md:gap-2">
                  <FolderOpen className="w-3 h-3 md:w-5 md:h-5 flex-shrink-0" />
                  <h4 className="text-xs md:text-xl font-semibold truncate">같은 문제는<br/>강력한 대안으로</h4>
                </div>
                <p className="text-[8px] md:text-base text-white/80 ml-3 md:ml-7 line-clamp-1">"젊고 패기있는 전국 1등 입대표"</p>
              </div>
              
              <div className="p-1 md:p-4">
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
                        <span className="text-[8px] md:text-base truncate">{category.name}</span>
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
                  <MapPin className="w-3 h-3 md:w-5 md:h-5 flex-shrink-0" />
                  <h4 className="text-xs md:text-xl font-semibold truncate">다른 상황에는<br/>세심한 정책으로</h4>
                </div>
                <p className="text-[8px] md:text-base text-white/80 ml-3 md:ml-7 line-clamp-1">"손에 잡히는 양주동, 동면"</p>
              </div>
              
              <div className="p-1 md:p-4">
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
                          region.id === 'sasong' ? 'text-purple-500' :
                          'text-orange-500'
                        }`} />
                        <span className="text-[8px] md:text-base truncate">{region.name}</span>
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
          className="bg-white/80 backdrop-blur-sm rounded-xl p-3 md:p-4 shadow-md mb-10"
        >
          <h3 className="text-base md:text-lg font-bold text-[#623D91] mb-3 md:mb-4 text-center">
            {filteredPromises.length > 0 
              ? `권현우의 약속 (${filteredPromises.length}개)` 
              : "카테고리나 지역을 선택하시면 공약이 표시됩니다"}
          </h3>
          
          <div className="px-2 pb-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {filteredPromises.map(promise => (
                <PromiseCard 
                  key={promise.id} 
                  promise={promise} 
                  onClick={handlePromiseClick}
                />
              ))}
            </div>
            {/* 스크롤 버퍼 공간 제거 */}
          </div>
        </motion.div>
        
        {/* 하단 여백 크기 조정 */}
        <div className="h-16 md:h-24"></div>
      </div>
      
      {/* 하단 여백 추가 */}
      <div className="h-[100px] md:h-[150px] relative">
        {/* 스크롤 인디케이터 추가 */}
        {!hideScrollIndicator && <ScrollIndicator className="absolute bottom-20 left-1/2 transform -translate-x-1/2" isFixed={false} />}
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
    </div>
  );
};

export default YDSection; 