# 양산시 양주동 및 동면 인터랙티브 지도 공약 플랫폼 PRD

**제품명**: 양동작전 인터랙티브 공약 지도  
**작성일**: 2025-03-02  
**버전**: 1.0  
**작성자**: Monica  

## 1. 개요

본 문서는 **권현우** 양산시의회의원 선거 웹사이트의 지역공약 시각화를 위한 인터랙티브 지도 플랫폼에 관한 제품 요구사항을 정의합니다. 이 플랫폼은 모바일 사용자 경험을 최우선으로 고려하여 설계되었으며, 기존 공통공약과 지역공약을 통합적으로 제시하는 것을 목표로 합니다.

## 2. 제품 목표

- 양산시 양주동과 동면의 지역별 공약을 직관적인 지도 인터페이스로 시각화
- 모바일 사용자를 최우선으로 고려한 UI/UX 제공
- 공통공약과 지역공약 간의 자연스러운 연결성 구현
- 유권자들의 지역 공약 이해도 및 접근성 향상
- "양동작전" 컨셉을 시각적으로 강화

## 3. 사용자 페르소나

### 주요 페르소나: 모바일 유권자
- **이름**: 김지역 (35세)
- **특성**: 
  - 스마트폰으로 대부분의 정보 소비
  - 출퇴근 시간에 주로 콘텐츠 확인
  - 자신의 동네 관련 공약에 특히 관심
  - 복잡한 정치 용어보다 실질적 변화에 관심
- **목표**: 
  - 자신의 동네에 어떤 변화가 생길지 빠르게 파악
  - 후보자의 지역 이해도 확인
  - 공약의 실현 가능성 평가

## 4. 핵심 기능 요구사항

### 4.1 모바일 최적화 UI

#### 하단 네비게이션 바
- 항상 접근 가능한 5개 주요 섹션 제공
  - 홈, 공약, 지도, 후보, 참여
- 현재 선택된 탭 시각적 하이라이트
- 최소 터치 영역 44x44px 보장

#### 통합 공약 카드 인터페이스
- 카테고리 탭 네비게이션
  - 전체, 아파트, 돌봄, 자영업, 지역별
- 스와이프 가능한 공약 카드 디자인
- 카드별 진행 상태 인디케이터
- 카드 내 공약 요약 및 상세보기 옵션

#### 지역별 맵 인터페이스
- 지역 선택 토글: 양주동/동면
- 인터랙티브 지도 (핀치 줌/패닝 지원)
- 지역별 공약 위치 마커
- 하단 스와이프 가능한 공약 카드
- 지도-카드 연동 인터랙션

### 4.2 데이터 구조

#### 공약 데이터 모델
```json
{
  "id": "string",
  "title": "string",
  "summary": "string",
  "description": "string",
  "category": "string", // "아파트", "돌봄", "자영업", "기타"
  "type": "string", // "공통", "지역"
  "location": {
    "name": "string", // "양주동" 또는 "동면" 또는 null(공통공약)
    "coordinates": [number, number], // 위도, 경도
    "address": "string" // 상세 주소
  },
  "relatedPolicies": ["string"], // 관련 공약 ID
  "importance": number, // 1-5 중요도
  "imageUrl": "string"
}
```

#### 공약 데이터 예시
```
| 공약                               | 카테고리     | 서브카테고리 | 지역             |
|-----------------------------------|------------|------------|-----------------|
| 공동주택 유지보수 지원                | 공동주택     |            | 양주동           |
| 주민 갈등 조정위원회 설립              | 공동주택     |            | 양주동           |
| 아파트 종사자 안전 지원               | 공동주택     |            | 양주동           |
| 공동주택 지원금 지원 확대              | 공동주택     |            | 양주동           |
| 권역별 아이돌봄센터 설립              | 돌봄        |            | 공통             |
| 달빛어린이병원과 심야약국              | 돌봄        |            | 공통             |
| 경로당 환경개선 및 식사도우미          | 돌봄        |            | 공통             |
| 자영업자 이자 지원 5%               | 자영업       |            | 공통             |
| 일자리 창출 우수기업 지원             | 자영업       |            | 공통             |
| 자영업자 지원사업 지원                | 자영업       |            | 공통             |
| 작은도서관 지원 확대                 | 정주여건     | 문화        | 공통             |
| 119안전센터                        | 정주여건     | 문화        | 사송, 석금산      |
| 치안센터                          | 정주여건     | 안전        | 사송, 석금산      |
| 대중교통(버스노선)                  | 정주여건     | 안전        | 공통, 사송        |
| 자원회수시설                        | 정주여건     |            | 석금산           |
| 양주문화체육센터 활성화               | 정주여건     | 문화        | 양주동           |
| 수질정화공원(금빛마을) 황토길 조성      | 정주여건     | 문화        | 석금산           |
| 석산로터리 신호체계 개선              | 정주여건     |            | 석금산           |
| 버스정류장 온열시트 확대              | 정주여건     |            | 양주동           |
```

#### 지역 데이터 모델
```json
{
  "id": "string",
  "name": "string", // "양주동" 또는 "동면"
  "boundaries": [
    [number, number], // 경계선 좌표 배열
    // ...
  ],
  "center": [number, number], // 중심 좌표
  "zoomLevel": number // 기본 줌 레벨
}
```

### 4.3 인터랙션 요구사항

#### 터치 인터랙션
- 지도 마커 터치: 관련 공약 카드 표시
- 카드 스와이프: 다음/이전 공약으로 이동
- 하단 시트 스와이프: 확장/축소
- 더블 탭: 지도 확대
- 핀치: 지도 확대/축소

#### 상태 전환
- 지역 토글 전환 시 부드러운 지도 이동 애니메이션
- 공약 카드 전환 시 슬라이드 애니메이션
- 카테고리 변경 시 페이드 전환 효과

## 5. 기술 요구사항

### 5.1 프론트엔드
- **프레임워크**: Next.js 14 (App Router)
- **스타일링**: Tailwind CSS
- **지도 라이브러리**: Leaflet.js 또는 MapLibre GL
- **애니메이션**: Framer Motion
- **상태 관리**: React Context API 또는 Zustand

### 5.2 성능 요구사항
- **초기 로딩**: 모바일에서 3초 이내 초기 로딩 완료
- **인터랙션 응답**: 터치 후 100ms 이내 피드백
- **애니메이션**: 최소 30fps, 목표 60fps
- **메모리 사용**: 최대 200MB 이내
- **배터리 효율성**: 지속적 사용 시 배터리 소모 최소화

### 5.3 모바일 최적화
- **반응형 디자인**: 모든 모바일 기기 화면 크기 지원
- **데이터 최적화**: 
  - 필요한 지도 타일만 로드
  - 이미지 최적화 (WebP 포맷, 적절한 크기)
  - 데이터 캐싱 전략
- **오프라인 지원**: 기본 지도 및 핵심 공약 데이터 오프라인 캐싱
- **터치 최적화**: 모든 인터랙션 요소 최소 44x44px

## 6. UI 디자인 명세

### 6.1 레이아웃 구조

#### 모바일 레이아웃
- **상단**: 간결한 타이틀 바 (현재 섹션 표시)
- **중앙**: 주요 콘텐츠 영역 (지도 또는 카드)
- **하단**: 고정 네비게이션 바 + 스와이프 가능한 카드 영역

#### 태블릿/데스크톱 레이아웃
- **좌측**: 지도 인터페이스 (60%)
- **우측**: 공약 목록 및 상세 정보 (40%)

### 6.2 컬러 팔레트

#### 브랜드 컬러 (제공된 색상)
- **주요 보라색**: #623D91 (rgb(98, 61, 145))
- **선명한 핑크**: #E8326E (rgb(232, 50, 110))
- **비비드 그린**: #00A367 (rgb(0, 163, 103))
- **밝은 노랑**: #FFED00 (rgb(255, 237, 0))

#### 확장 컬러 팔레트
- **보라색 계열**:
  - 라이트 보라: #8A68B4 (보라색 밝은 버전)
  - 다크 보라: #472A6A (보라색 어두운 버전)
  
- **핑크색 계열**:
  - 라이트 핑크: #F26A9B (핑크색 밝은 버전)
  - 다크 핑크: #C01A51 (핑크색 어두운 버전)

- **그린 계열**:
  - 라이트 그린: #40BF8E (그린 밝은 버전)
  - 다크 그린: #007A4D (그린 어두운 버전)

- **노랑 계열**:
  - 라이트 옐로우: #FFF373 (노랑 밝은 버전)
  - 골드: #D9C000 (노랑 어두운 버전)

#### 기능적 컬러
- **배경색**: 
  - 라이트 모드: #F8F9FA
  - 카드 배경: #FFFFFF
  
- **텍스트 색상**:
  - 주요 텍스트: #212529
  - 보조 텍스트: #495057
  - 비활성 텍스트: #ADB5BD
  
- **기능 색상**:
  - 성공: #00A367 (비비드 그린)
  - 경고: #FFED00 (밝은 노랑)
  - 오류: #E8326E (선명한 핑크)

#### 카테고리 색상 매핑
- **아파트**: #623D91 (보라색)
- **돌봄**: #E8326E (핑크색)
- **자영업**: #00A367 (그린)
- **기타**: #FFED00 (노랑)

### 6.3 타이포그래피

#### 폰트 설정
- **기본 폰트**: Pretendard
- **강조 폰트**: Giants-Bold (후보자 이름 및 주요 타이틀용)

#### 폰트 적용 방법
```css
@import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css');

@font-face {
    font-family: 'Giants-Bold';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_2307-1@1.1/Giants-Bold.woff2') format('woff2');
    font-weight: 700;
    font-style: normal;
}

* {
  font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, Roboto, sans-serif;
}

.emphasis-text, h1, .candidate-name {
  font-family: 'Giants-Bold', 'Pretendard', sans-serif;
}
```

#### 폰트 크기 및 스타일
- **메인 타이틀 (후보자 이름)**: Giants-Bold, 24px, 700 웨이트
- **섹션 타이틀**: Giants-Bold, 20px, 700 웨이트
- **서브 타이틀**: Pretendard, 18px, 600 웨이트
- **본문**: Pretendard, 16px, 400 웨이트
- **작은 텍스트**: Pretendard, 14px, 400 웨이트
- **최소 텍스트 크기**: 14px (가독성 보장)

### 6.4 컴포넌트 디자인

#### 하단 네비게이션 바
- 높이: 56px
- 배경색: #FFFFFF
- 아이콘 + 텍스트 레이블
- 선택된 항목: #623D91 (보라색) 강조
- 비선택 항목: #ADB5BD
- 상단 경계선: 1px 그림자 효과
- 폰트: Pretendard, 12px, 500 웨이트

#### 공약 카드
- 배경색: #FFFFFF
- 패딩: 16px
- 둥근 모서리: 12px
- 테두리: 없음
- 그림자: 0 2px 8px rgba(0,0,0,0.1)
- 카테고리 색상 인디케이터 (왼쪽 상단 4px 두께 바)
- 제목: Pretendard, 16px, 600 웨이트, #212529
- 요약: Pretendard, 14px, 400 웨이트, #495057
- 액션 버튼: #623D91 (보라색) 텍스트 또는 아웃라인 버튼

#### 후보자 프로필 카드
- 배경색: #FFFFFF
- 패딩: 20px
- 둥근 모서리: 16px
- 그림자: 0 4px 12px rgba(0,0,0,0.15)
- 후보자 이름: Giants-Bold, 24px, 700 웨이트, #623D91
- 소속정당: Pretendard, 16px, 500 웨이트, #E8326E
- 슬로건/캐치프레이즈: Giants-Bold, 18px, 700 웨이트, #212529

#### 지도 마커
- 기본 크기: 24px
- 활성 크기: 32px
- 아파트 마커: #623D91 (보라색)
- 돌봄 마커: #E8326E (핑크색)
- 자영업 마커: #00A367
#### 지역 선택 토글
- 배경색: #F8F9FA
- 선택된 항목: 
  - 배경: #623D91 (보라색)
  - 텍스트: #FFFFFF
- 비선택 항목:
  - 배경: 투명
  - 텍스트: #623D91 (보라색)
- 둥근 모서리: 20px (캡슐 형태)
- 전환 애니메이션: 0.3초 이징

#### 하단 시트
- 배경색: #FFFFFF
- 상단 둥근 모서리: 16px
- 그림자: 0 -2px 10px rgba(0,0,0,0.1)
- 핸들 바: 
  - 너비: 36px
  - 높이: 4px
  - 색상: #DFE2E6
  - 둥근 모서리: 2px
- 기본 높이: 25% (미니 모드)
- 확장 높이: 50% (표준 모드)
- 전체 확장: 90% (상세 모드)

## 7. 사용자 흐름

### 7.1 기본 탐색 흐름

1. **초기 접근**
   - 웹사이트 접속 → 홈 화면
   - 하단 네비게이션에서 "공약" 또는 "지도" 선택

2. **공약 탐색 흐름**
   - "공약" 탭 → 카테고리 선택 → 공약 카드 스와이프
   - "지역별" 카테고리 선택 → 지도 인터페이스로 전환

3. **지도 탐색 흐름**
   - "지도" 탭 → 지역 선택(양주동/동면)
   - 지도에서 마커 터치 → 하단에 관련 공약 카드 표시
   - 카드 상세보기 → 전체 화면 상세 정보

4. **연계 탐색**
   - 지역공약 카드에서 관련 공통공약 링크 발견
   - 링크 터치 → 관련 공통공약 카드로 이동

### 7.2 주요 사용자 시나리오

#### 시나리오 1: 내 동네 공약 확인
1. 사용자가 웹사이트 접속
2. 하단 네비게이션에서 "지도" 선택
3. 자신의 지역(양주동) 선택
4. 지도에서 집 근처 마커 확인
5. 마커 터치하여 관련 공약 확인
6. 공약 카드의 "상세보기" 터치
7. 전체 화면으로 공약 상세 내용 확인

#### 시나리오 2: 카테고리별 공약 확인
1. 사용자가 웹사이트 접속
2. 하단 네비게이션에서 "공약" 선택
3. 카테고리 탭에서 "돌봄" 선택
4. 돌봄 관련 공약 카드 스와이프하며 탐색
5. 지역 관련 공약 발견 시 "지도에서 보기" 링크 터치
6. 지도 인터페이스로 전환되어 해당 위치 표시

