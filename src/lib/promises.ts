export interface Promise {
  id: string;
  title: string;
  summary: string;
  description: string;
  category: string; // "apt", "care", "worker", "residence"
  subcategory?: string; // "문화", "안전"
  location: string; // "양주동", "동면", "공통"
  coordinates?: [number, number]; // 실제 지도 좌표로 사용될 값
  address?: string;
  importance: number; // 1-5 중요도
  relatedPromises?: string[]; // 관련 공약 ID
  imageUrl?: string;
}

// 샘플 공약 데이터
const samplePromises: Array<{
  id: string;
  title: string;
  summary: string;
  description: string;
  category: string;
  subCategory?: string;
  type: string;
  location?: {
    name: string;
    coordinates: [number, number];
    address: string;
  };
  importance: number;
  relatedPromises?: string[];
  imageUrl?: string;
}> = [
  {
    id: "housing-1",
    title: "공동주택 유지보수 지원",
    summary: "아파트 등 공동주택의 유지보수를 위한 지원금 확대",
    description: "양주동 지역 아파트 및 공동주택의 안전하고 쾌적한 환경을 위해 유지보수 지원금을 확대 지원합니다. 특히 노후화된 주택을 중심으로 우선 지원합니다.",
    category: "공동주택",
    type: "지역",
    location: {
      name: "양주동",
      coordinates: [35.3456, 129.0378], // 임의의 좌표값
      address: "양산시 양주동 일대"
    },
    importance: 4
  },
  // 생략된 샘플 데이터들...
  {
    id: "living-10",
    title: "버스정류장 온열시트 확대",
    summary: "양주동 버스정류장 온열시트 설치 확대",
    description: "겨울철 시민들의 대중교통 이용 편의를 위해 양주동 지역 버스정류장에 온열시트 설치를 확대합니다.",
    category: "정주여건",
    type: "지역",
    location: {
      name: "양주동",
      coordinates: [35.3495, 129.0415], // 임의의 좌표값
      address: "양산시 양주동 버스정류장"
    },
    importance: 2
  }
];

// 카테고리 매핑 (기존 데이터 호환성을 위함)
const categoryMap: Record<string, string> = {
  "공동주택": "apt",
  "돌봄": "care",
  "자영업": "worker",
  "정주여건": "residence"
};

// 지역 매핑 (기존 데이터 호환성을 위함)
const locationMap: Record<string, string> = {
  "양주동": "양주동",
  "석금산": "동면",
  "사송": "동면"
};

// 기존 데이터를 새 형식으로 변환
const legacyPromises = samplePromises.map(p => {
  const promise: Promise = {
    id: p.id,
    title: p.title,
    summary: p.summary,
    description: p.description,
    category: categoryMap[p.category] || p.category,
    subcategory: p.subCategory,
    location: p.location?.name ? locationMap[p.location.name] : '공통',
    importance: p.importance,
    relatedPromises: p.relatedPromises,
    imageUrl: p.imageUrl
  };
  
  if (p.location?.coordinates) {
    promise.coordinates = p.location.coordinates;
    promise.address = p.location.address;
  }
  
  return promise;
});

// 신규 샘플 공약 데이터 추가
const newPromises: Promise[] = [
  {
    id: "living-11",
    title: "양주동 공원 개선 사업",
    summary: "주민 친화적 공원 환경 조성",
    description: "양주동 내 노후화된 공원 시설을 개선하고, 주민들이 편안하게 이용할 수 있는 휴식 공간으로 재조성합니다.",
    category: "residence",
    subcategory: "문화",
    location: "양주동",
    coordinates: [35.3495, 129.0415],
    address: "양산시 양주동 중앙공원",
    importance: 3
  },
  {
    id: "living-12",
    title: "동면 농산물 직거래 장터",
    summary: "지역 농산물 판로 확대",
    description: "동면 지역 농산물의 판로를 확대하기 위한 직거래 장터를 정기적으로 개설합니다.",
    category: "residence",
    location: "동면",
    coordinates: [35.3710, 129.0520],
    address: "양산시 동면 주민센터 앞",
    importance: 3
  },
  {
    id: "care-4",
    title: "동면 노인복지관 건립",
    summary: "어르신 맞춤형 복지 서비스 제공",
    description: "동면 지역 어르신들을 위한 복지관을 건립하여 다양한 프로그램과 서비스를 제공합니다.",
    category: "care",
    location: "동면",
    coordinates: [35.3715, 129.0525],
    address: "양산시 동면 중심지역",
    importance: 4
  }
];

// 최종 공약 데이터
export const promises: Promise[] = [...legacyPromises, ...newPromises];

// 지역 정보
export const regions = [
  {
    id: "common",
    name: "공통",
    center: [35.3350, 129.0350], // 중심 좌표
    zoomLevel: 12
  },
  {
    id: "yangju",
    name: "양주동",
    center: [35.3480, 129.0400], // 중심 좌표
    zoomLevel: 14,
    boundaries: [
      // 경계선 좌표 (간략한 예시)
      [35.3450, 129.0370],
      [35.3510, 129.0370],
      [35.3510, 129.0430],
      [35.3450, 129.0430]
    ]
  },
  {
    id: "seokgeum",
    name: "석금산",
    center: [35.3210, 129.0210], // 중심 좌표
    zoomLevel: 14,
    boundaries: [
      // 경계선 좌표 (간략한 예시)
      [35.3190, 129.0190],
      [35.3230, 129.0190],
      [35.3230, 129.0230],
      [35.3190, 129.0230]
    ]
  },
  {
    id: "sasong",
    name: "사송",
    center: [35.3300, 129.0300], // 중심 좌표
    zoomLevel: 14,
    boundaries: [
      // 경계선 좌표 (간략한 예시)
      [35.3280, 129.0280],
      [35.3320, 129.0280],
      [35.3320, 129.0320],
      [35.3280, 129.0320]
    ]
  }
];

// 필터링 함수
export function filterPromises(
  promiseList: Promise[],
  category?: string,
  region?: string
) {
  let filtered = [...promiseList];
  
  if (category) {
    filtered = filtered.filter(p => p.category === category);
  }
  
  if (region) {
    filtered = filtered.filter(p => 
      p.location === region || p.location === '공통'
    );
  }
  
  return filtered;
} 