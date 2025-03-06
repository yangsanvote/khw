'use client';

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { event } from '@/lib/gtag';
import Image from 'next/image';
import { Newspaper, ChevronLeft, ChevronRight, Footprints, Users, Trophy, Facebook, Instagram } from 'lucide-react';
import Link from 'next/link';
import ScrollIndicator from '../ScrollIndicator';

interface KhwSectionProps {
  isStandalone?: boolean;
  showHeader?: boolean;
}

// PressItem 인터페이스 추가
interface PressItem {
  title: string;
  date: string;
  source: string;
  link: string;
}

// 언론 기사 데이터 추가
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

// 날짜순으로 정렬된 기사 데이터
const sortedPressItems = [...pressItems].sort((a, b) => {
  const dateA = new Date(a.date.replace(/\./g, '-'));
  const dateB = new Date(b.date.replace(/\./g, '-'));
  return dateB.getTime() - dateA.getTime();
});

// 살아온 길 섹션을 위한 데이터 추가
const careers = [
  { year: "2019~", title: "양산부산대학교 치과병원 총무인사팀 근무" },
  { year: "2025", title: "한국방송통신대학교 교육학과/행정학과 졸업" },
  { year: "2013", title: "오봉도시락 양산점 대표" },
  { year: "2013", title: "양산으로 이사" },
  { year: "2012", title: "둘째 아들 탄생" },
  { year: "2010", title: "첫째 아들 탄생" },
  { year: "1999", title: "1118 야공단 전역" },
  { year: "1995", title: "동아공업고등학교 졸업" },
  { year: "1976", title: "부산 동래 출생" }
];

const activities = [
  { year: "2024~", title: "정의당 양산시위원회 민생상담 소장" },
  { year: "2024~", title: "웅상공공의료원 설립 추진운동본부 공동대표" },
  { year: "2023~", title: "민주평화통일자문회의 양산시협의회 위원" },
  { year: "2022", title: "제8회 동시지방선거 양산시의회선거 후보자" },
  { year: "2022~", title: "청어람우리마을 아이돌봄센터 대표" },
  { year: "2022~", title: "'다움' 성교육 연구소 대표" },
  { year: "2022~", title: "중앙중학교 운영위원회 위원" },
  { year: "2022~", title: "현) 청어람협의체 대표" },
  { year: "2021~", title: "신도시아파트 연합회 사무국장" },
  { year: "2021~", title: "부산울산경남노동역사관 건립추진위원회 위원" },
  { year: "2020", title: "제21대 국회의원 양산시(을) 후보자" },
  { year: "2019~", title: "청어람작은도서관 운영위원" },
  { year: "2019~", title: "양산신도시아파트 청어람 입주자대표" },
  { year: "2018", title: "제7회 동시지방선거 양산시의회선거 후보자" },
  { year: "전)", title: "경상남도 주민참여예산위원회 위원회 위원" },
  { year: "전)", title: "삽량초등학교 운영위원회 부위원장" },
  { year: "전)", title: "삽량초등학교 교권보호위원회 위원장" },
  { year: "전)", title: "꿈을 꾸는 어린이집 운영위원" },
  { year: "전)", title: "양산 아이쿱 대의원 및 감사" },
  { year: "전)", title: "양산기후위기비상행동 공동대표" },
  { year: "전)", title: "차별금지법제정 양산시민행동 공동대표" },
  { year: "전)", title: "정의당 양산시위원회 위원장" },
  { year: "전)", title: "양산시 공동주택지원심의위원회 위원" },
  { year: "전)", title: "메깃들 마을학교 사무국장" },
  { year: "전)", title: "김해양산환경운동연합 운영위원" },
  { year: "전)", title: "청어람작은도서관 관장" },
  { year: "전)", title: "양주동 주민자치회 위원" },
  { year: "전)", title: "양산시 주민참여예산위원회 위원" },
  { year: "전)", title: "경상남도 기후도민회의 위원" },
  { year: "전)", title: "바람꽃 작은도서관 운영위원" },
  { year: "전)", title: "중앙중학교 운영위원회 부위원장" },
  { year: "전)", title: "양산 YMCA 이사" },
];

const awards = [
  { year: "2024", title: "경상남도 아파트공동체 유공 도지사 표창" },
  { year: "2022", title: "대한적십자사 사회봉사 유공 회장 표창" },
  { year: "2021", title: "경상남도 아파트공동체 유공 도지사 표창" }
];

const profileImages = [
  '/images/candidate/profile-1.jpg',
  ...Array.from({ length: 9 }, (_, i) => `/images/candidate/profile-${i + 2}.jpg`)
];

// Instagram 전역 객체를 위한 타입 정의
declare global {
  interface Window {
    instgrm?: {
      Embeds: {
        process(): void;
      };
    };
  }
}

export default function KhwSection({ 
  isStandalone = false,
  showHeader = false
}: KhwSectionProps) {
  const [activeButton, setActiveButton] = useState('declaration');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showStickyHeader, setShowStickyHeader] = useState(false);
  const [activeSnsTab, setActiveSnsTab] = useState('facebook'); // 'facebook' 또는 'instagram'
  const sectionRef = useRef<HTMLDivElement>(null);
  const declarationSectionRef = useRef<HTMLDivElement>(null);
  const pressSectionRef = useRef<HTMLDivElement>(null);
  const bioSectionRef = useRef<HTMLDivElement>(null);
  const snsSectionRef = useRef<HTMLDivElement>(null);
  const chungeoramsectionRef = useRef<HTMLDivElement>(null); // 청어람 마을 섹션 참조 추가
  
  // 살아온 길 섹션을 위한 상태 추가
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [lastClickTime, setLastClickTime] = useState(0);
  
  // 페이지 로드 시 스크롤을 상단으로 이동
  useEffect(() => {
      window.scrollTo(0, 0);
    setIsMounted(true);
  }, []);

  // 인스타그램 스크립트 로드
  useEffect(() => {
    if (activeSnsTab === 'instagram') {
      // 새로운 방식으로 스크립트 로드
      const loadInstagramEmbed = () => {
        try {
          // 글로벌 인스타그램 객체가 이미 있으면 다시 로드
          if (window.instgrm) {
      window.instgrm.Embeds.process();
          } else {
            // 없으면 스크립트 로드
            const script = document.createElement('script');
            script.async = true;
            script.defer = true;
            script.src = '//www.instagram.com/embed.js';
            document.body.appendChild(script);
          }
        } catch (error) {
          console.error('인스타그램 임베드 로드 오류:', error);
        }
      };

      // 약간의 지연 후 로드 (DOM이 완전히 렌더링 된 후)
      const timer = setTimeout(() => {
        loadInstagramEmbed();
      }, 500);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [activeSnsTab]);

  // 이미지 자동 전환을 위한 효과
  useEffect(() => {
    if (!isAutoPlaying) return;

    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % profileImages.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  // 스크롤 위치를 감지하여 헤더 표시 여부 결정 및 활성 버튼 업데이트
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const sectionTop = sectionRef.current.getBoundingClientRect().top;
      const sectionHeight = sectionRef.current.offsetHeight;
      const windowHeight = window.innerHeight;
      
      // YDSection 요소 가져오기
      const ydSection = document.getElementById('yd-section');
      
      // KhwSection이 화면의 1/3 이상 보이고, YDSection이 화면의 1/2를 넘지 않았을 때만 헤더를 표시
      if (sectionTop <= windowHeight / 3 && sectionTop > -sectionHeight + 100) {
        // YDSection이 있고, 화면의 1/2를 넘어갔는지 확인
        if (ydSection) {
          const ydSectionTop = ydSection.getBoundingClientRect().top;
          // YDSection이 화면의 1/2보다 위에 있으면 헤더를 숨김
          if (ydSectionTop < windowHeight / 2) {
            setShowStickyHeader(false);
          } else {
            setShowStickyHeader(true);
          }
        } else {
          setShowStickyHeader(true);
        }
      } else {
        setShowStickyHeader(false);
      }
      
      // 현재 화면에 가장 많이 보이는 섹션을 찾아 활성 버튼 업데이트
      const updateActiveSection = () => {
        // 각 섹션의 가시성 계산
        let declarationVisible = 0;
        let chungeoramsectionVisible = 0;
        let pressVisible = 0;
        let bioVisible = 0;
        let snsVisible = 0;
        
        // 선언문 섹션 가시성 계산
        if (declarationSectionRef.current) {
          const declarationRect = declarationSectionRef.current.getBoundingClientRect();
          declarationVisible = Math.max(0, 
            Math.min(declarationRect.bottom, windowHeight) - 
            Math.max(declarationRect.top, 0)
          );
        }
        
        // 청어람마을 섹션 가시성 계산
        if (chungeoramsectionRef.current) {
          const chungeoramsectionRect = chungeoramsectionRef.current.getBoundingClientRect();
          chungeoramsectionVisible = Math.max(0, 
            Math.min(chungeoramsectionRect.bottom, windowHeight) - 
            Math.max(chungeoramsectionRect.top, 0)
          );
          
          // 청어람마을 섹션이 화면에 조금이라도 보이면 가시성 점수를 높임
          if (chungeoramsectionVisible > 0) {
            // 섹션의 중앙이 화면의 중앙에 가까울수록 가시성 점수를 높임
            const sectionCenter = (chungeoramsectionRect.top + chungeoramsectionRect.bottom) / 2;
            const viewportCenter = windowHeight / 2;
            const distanceFromCenter = Math.abs(sectionCenter - viewportCenter);
            const centerBonus = Math.max(0, 1 - distanceFromCenter / (windowHeight / 2)) * 100;
            
            chungeoramsectionVisible += centerBonus;
          }
        }
        
        // 언론 섹션 가시성 계산
        if (pressSectionRef.current) {
          const pressRect = pressSectionRef.current.getBoundingClientRect();
          pressVisible = Math.max(0, 
            Math.min(pressRect.bottom, windowHeight) - 
            Math.max(pressRect.top, 0)
          );
        }
        
        // 살아온 길 섹션 가시성 계산
        if (bioSectionRef.current) {
          const bioRect = bioSectionRef.current.getBoundingClientRect();
          bioVisible = Math.max(0, 
            Math.min(bioRect.bottom, windowHeight) - 
            Math.max(bioRect.top, 0)
          );
        }
        
        // SNS 섹션 가시성 계산
        if (snsSectionRef.current) {
          const snsRect = snsSectionRef.current.getBoundingClientRect();
          snsVisible = Math.max(0, 
            Math.min(snsRect.bottom, windowHeight) - 
            Math.max(snsRect.top, 0)
          );
        }
        
        // 가장 많이 보이는 섹션을 활성화
        const visibilities = [
          { id: 'declaration', visible: declarationVisible },
          { id: 'chungeoram', visible: chungeoramsectionVisible },
          { id: 'press', visible: pressVisible },
          { id: 'bio', visible: bioVisible },
          { id: 'sns', visible: snsVisible }
        ];
        
        // 디버깅을 위한 콘솔 로그
        console.log('Visibilities:', {
          declaration: declarationVisible,
          chungeoram: chungeoramsectionVisible,
          press: pressVisible,
          bio: bioVisible,
          sns: snsVisible
        });
        
        // 가시성이 0보다 큰 항목 중 가장 많이 보이는 섹션 찾기
        const visibleSections = visibilities.filter(item => item.visible > 0);
        if (visibleSections.length > 0) {
          const maxVisibleSection = visibleSections.reduce((max, current) => 
            current.visible > max.visible ? current : max, visibleSections[0]);
          
          console.log('Max visible section:', maxVisibleSection.id, 'with visibility:', maxVisibleSection.visible);
          
          // 활성 버튼 설정
          setActiveButton(maxVisibleSection.id);
        }
      };
      
      updateActiveSection();
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // 초기 로드 시 한 번 실행
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const fullText = `
존경하는 양주동면 주민 여러분, 그리고 양산시민 여러분.
안녕하십니까?
저는 이번 4월 2일 양주동면 시의원 보궐선거에 출마하는 정의당 권현우입니다.

2018년 이후 세 번의 선거에 도전했습니다. 2022년 선거를 치르고 나서는 이만 포기해야 하는 걸까 고민했습니다. 저 혼자만의 짝사랑이었던 것만 같았습니다. 조용히 지역에서 봉사하는 삶을 살아가겠다는 생각을 했습니다. 아파트에서 입주자대표 활동에 더욱 매진했습니다.

하지만 역설적으로, 입주자대표 활동을 깊이 하면 할 수록, 지금 우리에게 필요한 것이 바로 정치라는 것을 알게되었습니다. 제가 사는 청어람아파트에서는 경비원과 미화원들이 쉴 곳이 없어 아파트 지하에서 지내고 있습니다. 이것은 산업안전보건법 위반입니다. 하지만 민간아파트는 건설사들이 최대한의 이익을 뽑아내기 위해 용적률에 여유가 없습니다. 이 상황에서 아파트 노동자들을 위한 휴게실을 짓고자 하면, 그것은 용적률을 위반합니다. 사람의 선의 만으로는 해결되지 않는 것입니다. 이런 때 정치가 작동해야 합니다. 저는 양산시와는 용적률과 관련해서, 입주민들과는 휴게실 건립과 관련해서 원만한 합의를 이뤄내었고, 올해 초 아파트 노동자 휴게실 건립이 시작됩니다. 
아파트에 노인정이 있습니다. 저희 아파트 노인회에는 마음 좋고 손 크신 분들이 계셔서, 마을 내 어르신들을 매일 불러 내 밥 한끼를 먹이시곤 합니다. 이 노인회 어르신들의 손을 빌려, 마을과 주변 저소득 이웃에 김장김치와 반찬 봉사를 시작했습니다. 아파트에 작은도서관이 있습니다. 여기에 마을 사람들이 언제든 찾아와 지낼 수 있는 복합 문화공간을 만들어보자고 시작했던 일이, 마을 사랑방의 역할을 하게 되었고, 마을 주민과 아이들이 함께 어울리는 공간이 되었습니다. 저 역시 맞벌이를 하고 있지만, 마을에 맞벌이 부부가 많습니다. 둘째 아이까지 초등학교에 들어가면서, 돌봄이 결국 부모의 일자리와 직결된다는 것을 체감하게 됐고 우리마을아이돌봄센터를 운영하게 됐습니다. 이런 작은 시도들이 공동체 활성화 공모사업 선정과 같은 성과로 돌아오게 되고, 작게나마 함께 나누는 일자리가 되기도 했습니다.
아파트 사람들을 모아 헌혈 행사를 열려고 했더니 양산에는 헌혈의 집이 없었습니다. 그래서 주기적으로 헌혈버스를 부르던 일이, 양주동 전체로 번지고, 결국 양산에 헌혈의 집이 생겨나기까지 했습니다. 저는 항상 일회적인 이벤트를 하기보다는 처음에는 크게 보이지 않더라도 지속 가능한 일들을 만들어 내고자 했습니다. 그리고 결국 그것이 더 큰 결과를 가져온다는 것을 배웠습니다.
그 결과 청어람아파트는 작년말, 국토교통부 최우수 관리단지로 선정되었으며, 제7회 대한민국 주거복지문화대상에서 대상을 수상하였습니다. 결국 주거환경 개선은 단순히 아파트의 외장을 바꾸고, 더 비싼 집으로 이사를 가는 것이 아니라, 주거와 함께 돌봄이 이루어지고, 일자리를 만들어내며, 함께 성장할 수 있어야 한다는 것을 저는 우리 청어람아파트를 통해 배웠습니다.

아파트를 바꿔보겠다고 했더니, 저와 이웃의 삶이 바뀌었습니다. 결국 우리가 사는 곳을 바꾸고자 하면 우리의 삶이 바뀐다는 것을 알게 되었습니다. 그리고 우리의 삶을 바꾸는 그 것, 그것이 바로 정치라는 것을 알게 되었습니다. 정치를 제가 피하려 한다고 피할 수 있는 것이 아니라는 것, 우리의 삶을 바꾸려 한다면 결국 다시 맞닥뜨려야 하는 것이 정치라는 것을, 말이 아니라 피부로 느끼게 되었습니다. 
청어람아파트에서 이룬 이 변화들을, 이제는 양주동면 전체로 확장하고 싶습니다. 주거, 돌봄, 일자리가 함께 어우러지는 양주동과 동면을 만들겠습니다. 아파트로 전국 1등을 해 봤습니다. 이제는 양산시를 전국 1등으로 만들어 보겠습니다.

존경하는 양주동면 주민 여러분!
저 권현우, 이제 준비가 되었습니다.
실력으로 검증받았고, 현장에서 경험을 쌓았습니다. 이제는 양주동면의 변화를 이끌어낼 때입니다.
4월 2일, 권현우를 선택 해 주십시오. 양주동면의 새로운 미래, 제가 만들어내겠습니다. 양주 동면을 바꾸고, 양산을 바꾸고, 우리의 삶을 바꾸겠습니다. 
감사합니다.`;

  const handleOpenModal = () => {
    event({
      action: 'view_full_declaration',
      category: 'engagement',
      label: '전문보기 클릭'
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    event({
      action: 'close_full_declaration',
      category: 'engagement',
      label: '전문보기 닫기'
    });
    setIsModalOpen(false);
  };

  const handleContentClick = (e: React.MouseEvent) => {
    const currentTime = new Date().getTime();
    const timeDiff = currentTime - lastClickTime;
    
    // 300ms 이내의 클릭은 더블 클릭으로 간주
    if (timeDiff < 300 && timeDiff > 0) {
      handleCloseModal();
    }
    
    setLastClickTime(currentTime);
    
    // 텍스트 선택 중이면 모달 닫기 방지
    const selection = window.getSelection();
    if (selection && selection.toString().length > 0) {
      e.stopPropagation();
    }
  };

  // 모달이 열렸을 때 body 스크롤 방지
  useEffect(() => {
    if (isModalOpen && declarationSectionRef.current) {
      // body 스크롤은 유지하고 섹션 내부만 제어
      declarationSectionRef.current.style.overflow = 'hidden';
    } else if (declarationSectionRef.current) {
      declarationSectionRef.current.style.overflow = '';
    }
    
    return () => {
      if (declarationSectionRef.current) {
        declarationSectionRef.current.style.overflow = '';
      }
    };
  }, [isModalOpen]);

  // 이미지 슬라이더 기능 추가
  const pauseAutoPlay = () => setIsAutoPlaying(false);
  const resumeAutoPlay = () => setIsAutoPlaying(true);
  
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % profileImages.length);
  };
  
  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + profileImages.length) % profileImages.length);
  };

  const handleButtonClick = (buttonId: string) => {
    setActiveButton(buttonId);
    
    // 해당 섹션으로 스크롤
    let targetSection = null;
    
    switch (buttonId) {
      case 'declaration':
        targetSection = declarationSectionRef.current;
        break;
      case 'chungeoram':
        targetSection = chungeoramsectionRef.current;
        break;
      case 'press':
        targetSection = pressSectionRef.current;
        break;
      case 'bio':
        if (!bioSectionRef.current) {
          // bio 섹션이 아직 렌더링되지 않았으면 먼저 상태 업데이트
          setActiveButton('bio');
          // 다음 렌더링 사이클에서 스크롤 시도
          setTimeout(() => {
            if (bioSectionRef.current) {
              bioSectionRef.current.scrollIntoView({ behavior: 'smooth' });
            }
          }, 100);
        } else {
          targetSection = bioSectionRef.current;
        }
        break;
      case 'sns':
        if (!snsSectionRef.current) {
          // sns 섹션이 아직 렌더링되지 않았으면 먼저 상태 업데이트
          setActiveButton('sns');
          // 다음 렌더링 사이클에서 스크롤 시도
          setTimeout(() => {
            if (snsSectionRef.current) {
              snsSectionRef.current.scrollIntoView({ behavior: 'smooth' });
            }
          }, 100);
        } else {
          targetSection = snsSectionRef.current;
        }
        break;
    }
    
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!isMounted && activeButton === 'bio') {
    return null; // 또는 로딩 상태를 보여줄 수 있습니다
  }

      return (
    <main ref={sectionRef} className={`w-full min-h-screen bg-white ${showStickyHeader ? 'pt-[100px] md:pt-[90px]' : ''}`}>
      {/* 녹색 헤더 영역 - KhwSection이 화면에 보일 때만 표시 */}
      {showStickyHeader && (
        <div className="bg-[#00A367] text-white fixed top-0 left-0 right-0 z-50 py-6 shadow-md">
            <div className="container mx-auto px-8 md:px-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <h1 
                className="text-3xl md:text-4xl font-extrabold text-white mb-4 md:mb-0" 
                style={{ fontFamily: 'Giants-Bold, sans-serif' }}
              >
                권현우를 소개합니다
              </h1>
              
              <div className="flex flex-wrap gap-2 justify-center md:justify-end">
                {/* 첫 번째 줄 버튼 그룹 */}
                <div className="flex flex-wrap gap-2 justify-center">
                  <button 
                    className={`px-4 py-2 rounded-full font-bold text-sm transition ${
                      activeButton === 'declaration' 
                        ? 'bg-[#006D44] text-white border-2 border-white shadow-lg' 
                        : 'bg-white text-[#00A367] hover:bg-gray-100'
                    }`}
                    onClick={() => handleButtonClick('declaration')}
                  >
                    출마 선언
                  </button>
                  <button 
                    className={`px-4 py-2 rounded-full font-bold text-sm transition ${
                      activeButton === 'chungeoram' 
                        ? 'bg-[#006D44] text-white border-2 border-white shadow-lg' 
                        : 'bg-white text-[#00A367] hover:bg-gray-100'
                    }`}
                    onClick={() => handleButtonClick('chungeoram')}
                  >
                    청어람 마을
                  </button>
                  <button 
                    className={`px-4 py-2 rounded-full font-bold text-sm transition ${
                      activeButton === 'press' 
                        ? 'bg-[#006D44] text-white border-2 border-white shadow-lg' 
                        : 'bg-white text-[#00A367] hover:bg-gray-100'
                    }`}
                    onClick={() => handleButtonClick('press')}
                  >
                    언론
                  </button>
                </div>
                
                {/* 두 번째 줄 버튼 그룹 */}
                <div className="flex flex-wrap gap-2 justify-center w-full md:w-auto mt-2 md:mt-0">
                  <button 
                    className={`px-4 py-2 rounded-full font-bold text-sm transition ${
                      activeButton === 'bio' 
                        ? 'bg-[#006D44] text-white border-2 border-white shadow-lg' 
                        : 'bg-white text-[#00A367] hover:bg-gray-100'
                    }`}
                    onClick={() => handleButtonClick('bio')}
                  >
                    살아온 길
                  </button>
                  <button 
                    className={`px-4 py-2 rounded-full font-bold text-sm transition ${
                      activeButton === 'sns' 
                        ? 'bg-[#006D44] text-white border-2 border-white shadow-lg' 
                        : 'bg-white text-[#00A367] hover:bg-gray-100'
                    }`}
                    onClick={() => handleButtonClick('sns')}
                  >
                    SNS
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 출마선언 콘텐츠 영역 - 항상 표시 */}
      <div ref={declarationSectionRef} className="w-full bg-yellow-100 text-white relative overflow-hidden pb-20">
        <div className="absolute inset-0 bg-grid-white/[0.08] bg-[length:28px_28px]"></div>
        
        <div className="relative z-10 pt-8 md:pt-16 pb-10 px-8 md:px-4 container mx-auto">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-2 md:mb-3"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-yellow-800" style={{ fontFamily: 'Giants-Bold, sans-serif' }}>양산시의원 출마 기자회견</h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-2 md:space-y-3 text-gray-800"
            >
              <p className="text-base md:text-lg">존경하는 양주동, 동면 주민 여러분, 그리고 양산시민 여러분.</p>
              <p className="text-base md:text-lg">안녕하십니까? </p>
              <p className="text-base md:text-lg">저는 이번 4월 2일 양산시의원 보궐선거에 출마하는 정의당 권현우입니다.</p>

              <div className="bg-yellow-50 p-2.5 md:p-3 rounded-xl my-2.5 md:my-4 border border-yellow-200">
                <p className="text-base md:text-lg font-medium">주거, 돌봄, 일자리가 함께 어우러지는 양주동과 동면을 만들겠습니다.</p>
                <p className="text-base md:text-lg font-medium">아파트로 전국 1등을 해 봤습니다.</p>
                <p className="text-base md:text-lg font-medium">이제는 양산시를 전국 1등으로 만들어 보겠습니다.</p>
              </div>

              <p className="text-base md:text-lg">실력으로 검증받았고, 현장에서 경험을 쌓았습니다.</p>
              <p className="text-base md:text-lg">4월 2일, 권현우를 선택해 주십시오.</p>
              <p className="text-base md:text-lg">청어람마을을 넘어, 양주동과 동면을 바꾸고, 양산시를 바꾸어 내겠습니다.</p>

              <div className="text-right mt-2 md:mt-4">
                <p className="text-base md:text-lg font-semibold text-yellow-800">2025년 2월 13일</p>
                <p className="text-base md:text-lg font-semibold text-yellow-800">권현우 올림</p>
                <p className="text-base md:text-lg font-semibold text-yellow-800"></p>
              </div>
            </motion.div>

            <div className="text-center mt-3">
              <button
                onClick={handleOpenModal}
                className="px-5 py-1.5 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg transition-colors"
              >
                전문 보기
              </button>
              
              {/* 스크롤 인디케이터 추가 */}
              <div className="mt-25 mb-4 flex justify-center">
                <ScrollIndicator isFixed={false} color="text-yellow-700" />
              </div>
            </div>
          </div>
          
          {isModalOpen && (
            <div className="absolute inset-0 bg-black/80 z-[9999] flex items-center justify-center p-4 overflow-hidden" onClick={handleCloseModal}>
              <div 
                className="bg-white rounded-2xl p-6 md:p-8 w-full max-w-4xl max-h-[80vh] overflow-y-auto text-gray-800 shadow-2xl"
                style={{ maxHeight: 'calc(100% - 2rem)' }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">출마선언문 전문</h3>
                    <p className="text-xs text-gray-500 mt-1">(내용을 더블 클릭하거나 빠르게 두 번 탭하면 닫힙니다)</p>
                  </div>
                  <button 
                    onClick={handleCloseModal}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div className="prose prose-base max-w-none" onClick={handleContentClick}>
                  {fullText.split('\n').map((line, index) => (
                    <p key={index} className="text-base md:text-lg mb-3 text-gray-800">
                      {line || <br />}
                    </p>
                  ))}
                </div>
                <div className="mt-6 text-center">
                  <button
                    onClick={handleCloseModal}
                    className="px-6 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg transition-colors"
                  >
                    닫기
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 청어람 마을 콘텐츠 영역 */}
      <div ref={chungeoramsectionRef} className="w-full bg-slate-100 text-gray-800 relative overflow-hidden pb-20">
        <div className="absolute inset-0 bg-grid-white/[0.08] bg-[length:28px_28px]"></div>
        
        {/* 배경 이미지 추가 */}
        <div 
          className="absolute inset-0 opacity-15" 
          style={{ 
            backgroundImage: 'url(/images/BAH07186.JPG)', 
            backgroundSize: 'cover', 
            backgroundPosition: 'center',
            filter: 'blur(1px) grayscale(30%)'
          }}
        ></div>
        
        <div className="relative z-10 pt-8 md:pt-16 pb-10 px-8 md:px-4 container mx-auto">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-6 md:mb-8"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-slate-700" style={{ fontFamily: 'Giants-Bold, sans-serif' }}>
                청어람 마을
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-4 md:space-y-6"
            >
              <div className="text-center mb-6">
                <p className="text-xl md:text-2xl font-semibold text-slate-700 italic">
                  "아파트의 개념을 새로 쓴 사람"
                </p>
                <p className="text-base md:text-lg mt-2">
                  함께 일하는 청어람 작은도서관 활동가가 저에 대해 한 말입니다.
                </p>
              </div>
              
              <p className="text-base md:text-lg">
                하지만 저는 그렇게 새롭고 별스러운 일을 하지는 않았습니다.
              </p>
              
              <p className="text-base md:text-lg">
                그저 재미있는 마을을 만들고 싶었습니다. 함께 하니 재미있었고, 함께 하다보니 의미있는 일들도 하고 싶었습니다. 이 과정에서 지속가능한 마을을 위한 묘미들을 찾아내었습니다.
              </p>
              
              <div className="bg-slate-200 bg-opacity-80 p-4 md:p-6 rounded-xl my-4 md:my-6 border border-slate-300">
                <p className="text-base md:text-lg font-medium text-slate-800">
                  재미와 의미, 그리고 묘미. 청어람의 삼미(三味)입니다. 
                </p>
                <p className="text-base md:text-lg font-medium text-slate-800">이것으로 국토교통부 전국 최우수 관리단지에 선정되었습니다.</p>
              </div>
              
              <p className="text-base md:text-lg font-semibold text-slate-700">
                청출어람 청어람. 청어람 마을은 항상 내일이 더 좋을 것입니다.
              </p>
              
              <p className="text-base md:text-lg">
                그리고 저도 청어람에서 배운대로 앞으로 한걸음 더 나아갑니다.
              </p>
            </motion.div>
            
            {/* 스크롤 인디케이터 추가 */}
            <div className="mt-26 mb-4 flex justify-center">
              <ScrollIndicator isFixed={false} color="text-slate-700" />
            </div>
          </div>
        </div>
        
        </div>

      {/* 언론 콘텐츠 영역 - 항상 표시 */}
      <div ref={pressSectionRef} className="w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden pb-20">
        <div className="relative z-10 pt-8 pb-10 px-8 md:px-4 container mx-auto">
          <div className="w-full max-w-6xl mx-auto relative mt-4 md:mt-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-6"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-white-700" style={{ fontFamily: 'Giants-Bold, sans-serif' }}>
                언론 보도
              </h2>
            </motion.div>

            <div className="relative">
              {/* 그라데이션 오버레이 제거 */}
              
              {/* 내부 스크롤 제거하고 그리드 레이아웃으로 변경 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 px-2">
                {sortedPressItems.map((item, index) => (
                  <motion.a
                    key={index}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: Math.min(index * 0.05, 0.5) }}
                    viewport={{ once: true, margin: "-50px" }}
                    className="block bg-white/10 backdrop-blur-sm rounded-lg p-3 shadow-lg hover:bg-white/20 transition-all group border border-white/10"
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-1.5 bg-white/10 rounded-lg text-white/80 mt-0.5">
                        <Newspaper className="w-4 h-4" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-base md:text-lg font-bold text-white group-hover:text-yellow-400 transition-colors line-clamp-1">
                          {item.title}
                        </h3>
                        <div className="flex items-center gap-2 mt-1 text-xs text-white/60">
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
          
          {/* 스크롤 인디케이터 추가 */}
          <div className="mt-26 mb-4 flex justify-center">
            <ScrollIndicator isFixed={false} color="text-white" />
          </div>
        </div>
      </div>

      {/* 살아온 길 콘텐츠 영역 - 항상 표시 */}
      <div ref={bioSectionRef} className="w-full bg-gradient-to-br from-slate-100 via-slate-200 to-slate-100 text-gray-800 relative overflow-hidden pb-20">
        <div className="relative z-10 pt-8 pb-10 px-8 md:px-4 container mx-auto">
          <div className="w-full max-w-6xl mx-auto relative mt-0 pt-0">
            <div className="flex flex-col">
              {/* 사진 */}
              <div className="flex flex-col mb-0 md:mb-4 mt-0 pt-0">
                <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="w-full h-[25vh] bg-white/10 rounded-2xl overflow-hidden relative group"
                  onMouseEnter={pauseAutoPlay}
                  onMouseLeave={resumeAutoPlay}
                >
                  <div className="w-full h-full relative">
                    <Image
                      src={profileImages[currentImageIndex]}
                      alt="권현우"
                      fill
                      className="object-contain transition-opacity duration-300"
                    />
                  </div>

                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 p-2 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 p-2 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </motion.div>
              </div>

              {/* 제목 */}
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-6" style={{ fontFamily: 'Giants-Bold, sans-serif' }}>
                권현우 살아온 길
              </h2>

              {/* 모바일 버전 */}
              <div className="block md:hidden flex-1">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-xl p-3 shadow-lg h-[40vh]"
                >
                  <div className="h-full overflow-y-auto scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-300">
                    {/* 수상 */}
                    <div className="mb-8">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center">
                          <Trophy className="w-5 h-5 text-slate-600" />
                        </div>
                        <h3 className="text-lg font-bold">수상</h3>
                      </div>
                      <ul className="space-y-6">
                        {awards.map((award, index) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="flex items-start gap-2"
                          >
                            <span className="text-sm text-gray-500 shrink-0 w-14">{award.year}</span>
                            <span className="text-base text-gray-700">{award.title}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    {/* 사회활동 */}
                    <div className="mb-8">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center">
                          <Users className="w-5 h-5 text-slate-600" />
                        </div>
                        <h3 className="text-lg font-bold">사회활동</h3>
                      </div>
                      <ul className="space-y-6">
                        {activities.map((activity, index) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="flex items-start gap-2"
                          >
                            <span className="text-sm text-gray-500 shrink-0 w-14">{activity.year}</span>
                            <span className="text-base text-gray-700">{activity.title}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    {/* 삶의 발자취 */}
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center">
                          <Footprints className="w-5 h-5 text-slate-600" />
                        </div>
                        <h3 className="text-lg font-bold">삶의 발자취</h3>
                      </div>
                      <ul className="space-y-6">
                        {careers.map((career, index) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="flex items-start gap-2"
                          >
                            <span className="text-sm text-gray-500 shrink-0 w-14">{career.year}</span>
                            <span className="text-base text-gray-700">{career.title}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* 데스크탑 버전 */}
              <div className="hidden md:grid md:grid-cols-3 gap-4 mb-2 flex-1">
                {/* 삶의 발자취 */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-xl p-3 shadow-lg md:h-[40vh]"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center">
                      <Footprints className="w-5 h-5 text-slate-600" />
                    </div>
                    <h3 className="text-lg font-bold">삶의 발자취</h3>
                  </div>
                  <div className="h-[calc(100%-3.5rem)] overflow-y-auto scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-300">
                    <ul className="space-y-6">
                      {careers.map((career, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          viewport={{ once: true }}
                          className="flex items-start gap-2"
                        >
                          <span className="text-sm text-gray-500 shrink-0 w-14">{career.year}</span>
                          <span className="text-base text-gray-700">{career.title}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </motion.div>

                {/* 사회활동 */}
                <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                  className="bg-white rounded-xl p-3 shadow-lg md:h-[40vh]"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center">
                      <Users className="w-5 h-5 text-slate-600" />
                    </div>
                    <h3 className="text-lg font-bold">사회활동</h3>
                  </div>
                  <div className="h-[calc(100%-3.5rem)] overflow-y-auto scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-300">
                    <ul className="space-y-6">
                      {activities.map((activity, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          viewport={{ once: true }}
                          className="flex items-start gap-2"
                        >
                          <span className="text-sm text-gray-500 shrink-0 w-14">{activity.year}</span>
                          <span className="text-base text-gray-700">{activity.title}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </motion.div>

                {/* 수상 */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-xl p-3 shadow-lg md:h-[40vh]"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center">
                      <Trophy className="w-5 h-5 text-slate-600" />
                    </div>
                    <h3 className="text-lg font-bold">수상</h3>
                  </div>
                  <div className="h-[calc(100%-3.5rem)] overflow-y-auto scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-300">
                    <ul className="space-y-6">
                      {awards.map((award, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          viewport={{ once: true }}
                          className="flex items-start gap-2"
                        >
                          <span className="text-sm text-gray-500 shrink-0 w-14">{award.year}</span>
                          <span className="text-base text-gray-700">{award.title}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
          
          {/* 스크롤 인디케이터 추가 */}
          <div className="mt-26 mb-4 flex justify-center">
            <ScrollIndicator isFixed={false} color="text-gray-700" />
          </div>
        </div>
      </div>

      {/* SNS 콘텐츠 영역 - 항상 표시 */}
      <div ref={snsSectionRef} className="w-full bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-800 text-white relative overflow-hidden pb-20">
        <div className="relative z-10 pt-8 pb-10 px-8 md:px-4 container mx-auto">
          <div className="w-full max-w-6xl mx-auto relative mt-0 pt-0">
          <h2 className="text-2xl md:text-3xl font-bold text-white-700 text-center mb-6" style={{ fontFamily: 'Giants-Bold, sans-serif' }}>
                권현우를 더 가깝게 만나보세요
              </h2>

            {/* SNS 탭 버튼 */}
            <div className="flex justify-center gap-4 mb-6">
                <button
                onClick={() => setActiveSnsTab('facebook')}
                className={`flex items-center gap-2 px-5 py-2 rounded-full transition ${
                  activeSnsTab === 'facebook' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-slate-700 text-blue-300 hover:bg-slate-600'
                }`}
              >
                <Facebook className="w-5 h-5" />
                <span className="font-medium">페이스북</span>
                </button>
                <button
                onClick={() => setActiveSnsTab('instagram')}
                className={`flex items-center gap-2 px-5 py-2 rounded-full transition ${
                  activeSnsTab === 'instagram' 
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' 
                    : 'bg-slate-700 text-pink-300 hover:bg-slate-600'
                }`}
              >
                <Instagram className="w-5 h-5" />
                <span className="font-medium">인스타그램</span>
                </button>
            </div>

            {/* SNS 콘텐츠 */}
            <div className="flex justify-center">
              {activeSnsTab === 'facebook' ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white rounded-xl p-4 shadow-lg max-w-xl w-full border border-slate-300"
                >
                  <div className="flex justify-center">
                          <iframe 
                      src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fyangsankhw%2Fposts%2Fpfbid02MQGSzmdyR4q2sGcBKNGGndTawe3r9ZzRCuG67bSMkVKDktzDM9HZpsQ1AMWeoRpDl&show_text=true&width=500" 
                            width="500" 
                      height="653" 
                            style={{ border: 'none', overflow: 'hidden' }} 
                            scrolling="no" 
                            frameBorder="0" 
                            allowFullScreen={true} 
                            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                          ></iframe>
                        </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white rounded-xl p-4 shadow-lg max-w-xl w-full border border-slate-300"
                >
                  <div className="flex justify-center">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: `
                          <blockquote 
                            class="instagram-media" 
                            data-instgrm-captioned 
                            data-instgrm-permalink="https://www.instagram.com/p/DGP-39oSXj3/?utm_source=ig_embed&amp;utm_campaign=loading" 
                            data-instgrm-version="14" 
                            style="background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:540px; min-width:326px; padding:0; width:99.375%; width:calc(100% - 2px);">
                            <div style="padding:16px;">
                              <div style="display: flex; flex-direction: row; align-items: center;">
                                <div style="background-color: #F4F4F4; border-radius: 50%; flex-grow: 0; height: 40px; margin-right: 14px; width: 40px;"></div>
                                <div style="display: flex; flex-direction: column; flex-grow: 1; justify-content: center;">
                                  <div style="background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; margin-bottom: 6px; width: 100px;"></div>
                                  <div style="background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; width: 60px;"></div>
                                </div>
                              </div>
                              <div style="padding: 19% 0;"></div>
                              <div style="display:block; height:50px; margin:0 auto 12px; width:50px;">
                                <svg width="50px" height="50px" viewBox="0 0 60 60" version="1.1" xmlns="https://www.w3.org/2000/svg" xmlns:xlink="https://www.w3.org/1999/xlink">
                                  <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                    <g transform="translate(-511.000000, -20.000000)" fill="#000000">
                                      <g>
                                        <path d="M556.869,30.41 C554.814,30.41 553.148,32.076 553.148,34.131 C553.148,36.186 554.814,37.852 556.869,37.852 C558.924,37.852 560.59,36.186 560.59,34.131 C560.59,32.076 558.924,30.41 556.869,30.41 M541,60.657 C535.114,60.657 530.342,55.887 530.342,50 C530.342,44.114 535.114,39.342 541,39.342 C546.887,39.342 551.658,44.114 551.658,50 C551.658,55.887 546.887,60.657 541,60.657 M541,33.886 C532.1,33.886 524.886,41.1 524.886,50 C524.886,58.899 532.1,66.113 541,66.113 C549.9,66.113 557.115,58.899 557.115,50 C557.115,41.1 549.9,33.886 541,33.886 M565.378,62.101 C565.244,65.022 564.756,66.606 564.346,67.663 C563.803,69.06 563.154,70.057 562.106,71.106 C561.058,72.155 560.06,72.803 558.662,73.347 C557.607,73.757 556.021,74.244 553.102,74.378 C549.944,74.521 548.997,74.552 541,74.552 C533.003,74.552 532.056,74.521 528.898,74.378 C525.979,74.244 524.393,73.757 523.338,73.347 C521.94,72.803 520.942,72.155 519.894,71.106 C518.846,70.057 518.197,69.06 517.654,67.663 C517.244,66.606 516.755,65.022 516.623,62.101 C516.479,58.943 516.448,57.996 516.448,50 C516.448,42.003 516.479,41.056 516.623,37.899 C516.755,34.978 517.244,33.391 517.654,32.338 C518.197,30.938 518.846,29.942 519.894,28.894 C520.942,27.846 521.94,27.196 523.338,26.654 C524.393,26.244 525.979,25.756 528.898,25.623 C532.057,25.479 533.004,25.448 541,25.448 C548.997,25.448 549.943,25.479 553.102,25.623 C556.021,25.756 557.607,26.244 558.662,26.654 C560.06,27.196 561.058,27.846 562.106,28.894 C563.154,29.942 563.803,30.938 564.346,32.338 C564.756,33.391 565.244,34.978 565.378,37.899 C565.522,41.056 565.552,42.003 565.552,50 C565.552,57.996 565.522,58.943 565.378,62.101 M570.82,37.631 C570.674,34.438 570.167,32.258 569.425,30.349 C568.659,28.377 567.633,26.702 565.965,25.035 C564.297,23.368 562.623,22.342 560.652,21.575 C558.743,20.834 556.562,20.326 553.369,20.18 C550.169,20.033 549.148,20 541,20 C532.853,20 531.831,20.033 528.631,20.18 C525.438,20.326 523.257,20.834 521.349,21.575 C519.376,22.342 517.703,23.368 516.035,25.035 C514.368,26.702 513.342,28.377 512.574,30.349 C511.834,32.258 511.326,34.438 511.181,37.631 C511.035,40.831 511,41.851 511,50 C511,58.147 511.035,59.17 511.181,62.369 C511.326,65.562 511.834,67.743 512.574,69.651 C513.342,71.625 514.368,73.296 516.035,74.965 C517.703,76.634 519.376,77.658 521.349,78.425 C523.257,79.167 525.438,79.673 528.631,79.82 C531.831,79.965 532.853,80.001 541,80.001 C549.148,80.001 550.169,79.965 553.369,79.82 C556.562,79.673 558.743,79.167 560.652,78.425 C562.623,77.658 564.297,76.634 565.965,74.965 C567.633,73.296 568.659,71.625 569.425,69.651 C570.167,67.743 570.674,65.562 570.82,62.369 C570.966,59.17 571,58.147 571,50 C571,41.851 570.966,40.831 570.82,37.631"></path>
                                      </g>
                                    </g>
                                  </g>
                                </svg>
                              </div>
                              <div style="padding-top: 8px;">
                                <div style="color:#3897f0; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:550; line-height:18px;">Instagram에서 이 게시물 보기</div>
                              </div>
                              <div style="padding: 12.5% 0;"></div>
                              <div style="display: flex; flex-direction: row; margin-bottom: 14px; align-items: center;">
                                <div>
                                  <div style="background-color: #F4F4F4; border-radius: 50%; height: 12.5px; width: 12.5px; transform: translateX(0px) translateY(7px);"></div>
                                  <div style="background-color: #F4F4F4; height: 12.5px; transform: rotate(-45deg) translateX(3px) translateY(1px); width: 12.5px; flex-grow: 0; margin-right: 14px; margin-left: 2px;"></div>
                                  <div style="background-color: #F4F4F4; border-radius: 50%; height: 12.5px; width: 12.5px; transform: translateX(9px) translateY(-18px);"></div>
                                </div>
                                <div style="margin-left: 8px;">
                                  <div style="background-color: #F4F4F4; border-radius: 50%; flex-grow: 0; height: 20px; width: 20px;"></div>
                                  <div style="width: 0; height: 0; border-top: 2px solid transparent; border-left: 6px solid #f4f4f4; border-bottom: 2px solid transparent; transform: translateX(16px) translateY(-4px) rotate(30deg)"></div>
                                </div>
                                <div style="margin-left: auto;">
                                  <div style="width: 0px; border-top: 8px solid #F4F4F4; border-right: 8px solid transparent; transform: translateY(16px);"></div>
                                  <div style="background-color: #F4F4F4; flex-grow: 0; height: 12px; width: 16px; transform: translateY(-4px);"></div>
                                  <div style="width: 0; height: 0; border-top: 8px solid #F4F4F4; border-left: 8px solid transparent; transform: translateY(-4px) translateX(8px);"></div>
                      </div>
                    </div>
                              <div style="display: flex; flex-direction: column; flex-grow: 1; justify-content: center; margin-bottom: 24px;">
                                <div style="background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; margin-bottom: 6px; width: 224px;"></div>
                                <div style="background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; width: 144px;"></div>
                              </div>
                              <p style="color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; line-height:17px; margin-bottom:0; margin-top:8px; overflow:hidden; padding:8px 0 7px; text-align:center; text-overflow:ellipsis; white-space:nowrap;">
                                <a href="https://www.instagram.com/p/DGP-39oSXj3/?utm_source=ig_embed&amp;utm_campaign=loading" style="color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:normal; line-height:17px; text-decoration:none;" target="_blank">양산 권현우(@khyun.woo.kr)님의 공유 게시물</a>
                              </p>
                    </div>
                          </blockquote>
                        `
                          }}
                        />
                      </div>
                </motion.div>
              )}
            </div>
          </div>
          
          {/* 스크롤 인디케이터 추가 */}
          <div className="mt-26 mb-4 flex justify-center">
            <ScrollIndicator isFixed={false} color="text-white" />
          </div>
        </div>
      </div>
    </main>
    );
} 