'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState, useRef } from 'react';
import { FaFacebook, FaInstagram, FaRegClock, FaRegComment } from 'react-icons/fa';
import { IoIosArrowDown } from 'react-icons/io';
import DeclarationSection from './DeclarationSection';
import PressSection from './PressSection';
import CandidateSection from './CandidateSection';
import ScrollIndicator from '../ScrollIndicator';

// Window 인터페이스 확장
declare global {
  interface Window {
    instgrm?: {
      Embeds: {
        process: () => void;
      };
    };
  }
}

// 게시물 타입 정의
interface FacebookPost {
  id: string;
  message?: string;
  created_time: string;
  full_picture?: string;
  permalink_url: string;
}

interface KhwSectionProps {
  hideScrollIndicator?: boolean;
  isStandalone?: boolean;
}

export default function KhwSection({ hideScrollIndicator = false, isStandalone = false }: KhwSectionProps) {
  const [activeSection, setActiveSection] = useState<string>('declaration-section');
  const [activeTab, setActiveTab] = useState<'facebook' | 'instagram'>('facebook');
  const [loading, setLoading] = useState(true);
  const [facebookPosts, setFacebookPosts] = useState<FacebookPost[]>([]);
  const [error, setError] = useState('');
  
  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({
    'declaration-section': null,
    'press-section': null,
    'candidate-section': null,
    'act-section': null
  });

  useEffect(() => {
    // IntersectionObserver를 사용하여 현재 뷰포트에 있는 섹션 감지
    const observerOptions = {
      root: null, // 뷰포트 기준
      rootMargin: '0px',
      threshold: 0.5 // 50% 이상 보일 때 활성화
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
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // 소셜 미디어 데이터 가져오기
  useEffect(() => {
    async function fetchSocialData() {
      setLoading(true);
      setError('');
      
      try {
        // 페이스북 데이터만 가져오기 (인스타그램은 직접 임베드)
        // API 개발 전 목업 데이터
        const mockFacebookPosts = [
          {
            id: '123456789',
            message: '양산시 곳곳을 다니며 시민 여러분의 목소리를 듣고 있습니다. 여러분의 소중한 의견이 양산시의 미래를 만듭니다.',
            created_time: '2023-10-15T10:30:00+0000',
            full_picture: 'https://via.placeholder.com/500x300?text=Facebook+Post+Image',
            permalink_url: 'https://www.facebook.com/yangsankhw'
          },
          {
            id: '987654321',
            message: '오늘은 양산시 중앙동 주민들과 함께하는 시간을 가졌습니다. 많은 분들이 참여해주셔서 감사합니다.',
            created_time: '2023-10-10T14:20:00+0000',
            full_picture: 'https://via.placeholder.com/500x300?text=Facebook+Post+Image+2',
            permalink_url: 'https://www.facebook.com/yangsankhw'
          }
        ];
        
        // API 사용 시:
        // const fbResponse = await fetch('/api/facebook-posts');
        // const fbData = await fbResponse.json();
        // if (fbData.error) throw new Error(fbData.error);
        // setFacebookPosts(fbData.posts);
        
        // 개발 중이므로 목업 데이터 사용
        setFacebookPosts(mockFacebookPosts);
      } catch (err) {
        console.error('소셜 미디어 데이터 로딩 오류:', err);
        setError('소셜 미디어 데이터를 불러오는 중 오류가 발생했습니다.');
      } finally {
        // 로딩 시간 짧게 설정
        setTimeout(() => {
          setLoading(false);
        }, 800);
      }
    }
    
    fetchSocialData();
  }, []);

  // 인스타그램 임베드 스크립트 로드 (별도 useEffect로 분리)
  useEffect(() => {
    if (activeTab === 'instagram') {
      // 인스타그램 임베드 스크립트가 이미 로드되었는지 확인
      const existingScript = document.getElementById('instagram-embed-script');
      
      if (!existingScript) {
        // 스크립트가 없으면 추가
        const script = document.createElement('script');
        script.id = 'instagram-embed-script';
        script.async = true;
        script.src = '//www.instagram.com/embed.js';
        script.defer = true;
        document.body.appendChild(script);
      } else {
        // 인스타그램 API가 이미 로드된 경우 수동으로 처리 함수 호출 (약간의 딜레이 추가)
        setTimeout(() => {
          if (window.instgrm) {
            window.instgrm.Embeds.process();
          }
        }, 300);
      }
    }
  }, [activeTab]);

  // 날짜 포맷 함수
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  // SNS 링크
  const facebookUrl = "https://www.facebook.com/yangsankhw";
  const instagramUrl = "https://www.instagram.com/khyun.woo.kr/";
  const specificInstagramPostUrl = "https://www.instagram.com/p/DGP-39oSXj3/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==";

  return (
    <div className="bg-white relative h-full overflow-hidden">
      {/* 상단 고정 헤더 - 항상 표시 */}
      <header
        style={{ backgroundColor: '#00A367' }}
        className="sticky top-0 z-40 w-full bg-[#00A367] text-white py-4 px-4 sm:px-5 shadow-md"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 
                className="text-xl sm:text-2xl md:text-3xl mb-1" 
                style={{ 
                  fontFamily: 'Giants-Bold', 
                  fontWeight: 700
                }}
              >
                권현우를 소개합니다
              </h2>
            </motion.div>
            
            <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-4">
              <button
                onClick={() => scrollToSection('declaration-section')}
                className={`px-3 py-1 rounded-full transition-all text-sm sm:text-base ${
                  activeSection === 'declaration-section'
                    ? 'bg-[#004e31] text-white font-medium border-2 border-white shadow-inner'
                    : 'text-white hover:bg-white/20'
                }`}
              >
                출마선언
              </button>
              <button
                onClick={() => scrollToSection('press-section')}
                className={`px-3 py-1 rounded-full transition-all text-sm sm:text-base ${
                  activeSection === 'press-section'
                    ? 'bg-[#004e31] text-white font-medium border-2 border-white shadow-inner'
                    : 'text-white hover:bg-white/20'
                }`}
              >
                언론보도
              </button>
              <button
                onClick={() => scrollToSection('candidate-section')}
                className={`px-3 py-1 rounded-full transition-all text-sm sm:text-base ${
                  activeSection === 'candidate-section'
                    ? 'bg-[#004e31] text-white font-medium border-2 border-white shadow-inner'
                    : 'text-white hover:bg-white/20'
                }`}
              >
                살아온 길
              </button>
              <button
                onClick={() => scrollToSection('act-section')}
                className={`px-3 py-1 rounded-full transition-all text-sm sm:text-base ${
                  activeSection === 'act-section'
                    ? 'bg-[#004e31] text-white font-medium border-2 border-white shadow-inner'
                    : 'text-white hover:bg-white/20'
                }`}
              >
                SNS
              </button>
            </div>
          </div>
        </div>
      </header>
      
      {/* 콘텐츠 영역 */}
      <div className="w-full overflow-y-auto snap-y snap-mandatory h-screen">
        {/* 출마선언문 섹션 */}
        <div id="declaration-section" className="w-full min-h-screen snap-start">
          <DeclarationSection />
        </div>

        {/* 언론보도 섹션 */}
        <div id="press-section" className="w-full min-h-screen snap-start">
          <PressSection />
        </div>

        {/* 권현우 살아온 길 섹션 */}
        <div id="candidate-section" className="w-full min-h-screen snap-start">
          <CandidateSection />
        </div>

        {/* SNS 활동 섹션 */}
        <div id="act-section" className="w-full min-h-screen snap-start">
          <div className="bg-white pt-0 pb-16 px-4">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-center mb-8"
              >
              </motion.div>
              
              {/* 탭 버튼 */}
              <div className="flex justify-center mb-6 border-b border-gray-200">
                <button
                  onClick={() => {
                    setActiveTab('facebook');
                  }}
                  className={`flex items-center gap-2 px-6 py-3 border-b-2 transition-all ${
                    activeTab === 'facebook' 
                      ? 'border-blue-600 text-blue-600' 
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <FaFacebook className={`text-xl ${activeTab === 'facebook' ? 'text-blue-600' : 'text-gray-500'}`} />
                  <span className="font-medium">페이스북</span>
                </button>
                <button
                  onClick={() => {
                    setActiveTab('instagram');
                  }}
                  className={`flex items-center gap-2 px-6 py-3 border-b-2 transition-all ${
                    activeTab === 'instagram' 
                      ? 'border-pink-600 text-pink-600' 
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <FaInstagram className={`text-xl ${activeTab === 'instagram' ? 'text-pink-600' : 'text-gray-500'}`} />
                  <span className="font-medium">인스타그램</span>
                </button>
              </div>
              
              {/* 탭 컨텐츠 */}
              <div className="mb-12">
                {/* 페이스북 탭 컨텐츠 */}
                {activeTab === 'facebook' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-6 max-w-2xl mx-auto"
                  >
                    {loading ? (
                      <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                        <div className="animate-pulse flex flex-col items-center">
                          <FaFacebook className="text-blue-600 text-5xl mb-4" />
                          <div className="h-4 bg-blue-200 rounded w-3/4 mb-2"></div>
                          <div className="h-4 bg-blue-200 rounded w-1/2"></div>
                          <p className="mt-4 text-gray-500">페이스북 게시물을 불러오는 중...</p>
                        </div>
                      </div>
                    ) : error ? (
                      <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                        <p className="text-red-500">{error}</p>
                        <p className="mt-4 text-gray-600">페이스북 페이지를 직접 방문해보세요.</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                          <div className="flex justify-center p-4">
                            <iframe 
                              src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fyangsankhw%2Fposts%2Fpfbid0Ns1nenw3aiTzwYHTsSfvW7PQ52z93Xz7oBe96XK21j72RsAR6GBkdL6PteKimBD7l&show_text=true&width=500" 
                              width="500" 
                              height="714" 
                              style={{ border: 'none', overflow: 'hidden' }} 
                              scrolling="no" 
                              frameBorder="0" 
                              allowFullScreen={true} 
                              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                            ></iframe>
                          </div>
                          
                          <div className="p-4 text-center">
                            <Link 
                              href={facebookUrl} 
                              target="_blank"
                              className="inline-block bg-blue-600 text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-blue-700 transition-colors"
                            >
                              페이스북 페이지 방문하기
                            </Link>
                          </div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}

                {/* 인스타그램 탭 컨텐츠 */}
                {activeTab === 'instagram' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-6 max-w-2xl mx-auto"
                  >
                    {loading ? (
                      <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                        <div className="animate-pulse flex flex-col items-center">
                          <FaInstagram className="text-pink-600 text-5xl mb-4" />
                          <div className="h-4 bg-pink-200 rounded w-3/4 mb-2"></div>
                          <div className="h-4 bg-pink-200 rounded w-1/2"></div>
                          <p className="mt-4 text-gray-500">인스타그램 게시물을 불러오는 중...</p>
                        </div>
                      </div>
                    ) : error ? (
                      <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                        <p className="text-red-500">{error}</p>
                        <p className="mt-4 text-gray-600">인스타그램을 직접 방문해보세요.</p>
                      </div>
                    ) : (
                      <div className="space-y-4 flex flex-col items-center">
                        {/* 공식 인스타그램 임베드 */}
                        <div className="w-full max-w-[540px] mx-auto">
                          <div 
                            dangerouslySetInnerHTML={{ 
                              __html: `<blockquote class="instagram-media" data-instgrm-captioned data-instgrm-permalink="https://www.instagram.com/p/DGP-39oSXj3/?utm_source=ig_embed&amp;utm_campaign=loading" data-instgrm-version="14" style=" background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:540px; min-width:326px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);"><div style="padding:16px;"> <a href="https://www.instagram.com/p/DGP-39oSXj3/?utm_source=ig_embed&amp;utm_campaign=loading" style=" background:#FFFFFF; line-height:0; padding:0 0; text-align:center; text-decoration:none; width:100%;" target="_blank"> <div style=" display: flex; flex-direction: row; align-items: center;"> <div style="background-color: #F4F4F4; border-radius: 50%; flex-grow: 0; height: 40px; margin-right: 14px; width: 40px;"></div> <div style="display: flex; flex-direction: column; flex-grow: 1; justify-content: center;"> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; margin-bottom: 6px; width: 100px;"></div> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; width: 60px;"></div></div></div><div style="padding: 19% 0;"></div> <div style="display:block; height:50px; margin:0 auto 12px; width:50px;"><svg width="50px" height="50px" viewBox="0 0 60 60" version="1.1" xmlns="https://www.w3.org/2000/svg" xmlns:xlink="https://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-511.000000, -20.000000)" fill="#000000"><g><path d="M556.869,30.41 C554.814,30.41 553.148,32.076 553.148,34.131 C553.148,36.186 554.814,37.852 556.869,37.852 C558.924,37.852 560.59,36.186 560.59,34.131 C560.59,32.076 558.924,30.41 556.869,30.41 M541,60.657 C535.114,60.657 530.342,55.887 530.342,50 C530.342,44.114 535.114,39.342 541,39.342 C546.887,39.342 551.658,44.114 551.658,50 C551.658,55.887 546.887,60.657 541,60.657 M541,33.886 C532.1,33.886 524.886,41.1 524.886,50 C524.886,58.899 532.1,66.113 541,66.113 C549.9,66.113 557.115,58.899 557.115,50 C557.115,41.1 549.9,33.886 541,33.886 M565.378,62.101 C565.244,65.022 564.756,66.606 564.346,67.663 C563.803,69.06 563.154,70.057 562.106,71.106 C561.058,72.155 560.06,72.803 558.662,73.347 C557.607,73.757 556.021,74.244 553.102,74.378 C549.944,74.521 548.997,74.552 541,74.552 C533.003,74.552 532.056,74.521 528.898,74.378 C525.979,74.244 524.393,73.757 523.338,73.347 C521.94,72.803 520.942,72.155 519.894,71.106 C518.846,70.057 518.197,69.06 517.654,67.663 C517.244,66.606 516.755,65.022 516.623,62.101 C516.479,58.943 516.448,57.996 516.448,50 C516.448,42.003 516.479,41.056 516.623,37.899 C516.755,34.978 517.244,33.391 517.654,32.338 C518.197,30.938 518.846,29.942 519.894,28.894 C520.942,27.846 521.94,27.196 523.338,26.654 C524.393,26.244 525.979,25.756 528.898,25.623 C532.057,25.479 533.004,25.448 541,25.448 C548.997,25.448 549.943,25.479 553.102,25.623 C556.021,25.756 557.607,26.244 558.662,26.654 C560.06,27.196 561.058,27.846 562.106,28.894 C563.154,29.942 563.803,30.938 564.346,32.338 C564.756,33.391 565.244,34.978 565.378,37.899 C565.522,41.056 565.552,42.003 565.552,50 C565.552,57.996 565.522,58.943 565.378,62.101 M570.82,37.631 C570.674,34.438 570.167,32.258 569.425,30.349 C568.659,28.377 567.633,26.702 565.965,25.035 C564.297,23.368 562.623,22.342 560.652,21.575 C558.743,20.834 556.562,20.326 553.369,20.18 C550.169,20.033 549.148,20 541,20 C532.853,20 531.831,20.033 528.631,20.18 C525.438,20.326 523.257,20.834 521.349,21.575 C519.376,22.342 517.703,23.368 516.035,25.035 C514.368,26.702 513.342,28.377 512.574,30.349 C511.834,32.258 511.326,34.438 511.181,37.631 C511.035,40.831 511,41.851 511,50 C511,58.147 511.035,59.17 511.181,62.369 C511.326,65.562 511.834,67.743 512.574,69.651 C513.342,71.625 514.368,73.296 516.035,74.965 C517.703,76.634 519.376,77.658 521.349,78.425 C523.257,79.167 525.438,79.673 528.631,79.82 C531.831,79.965 532.853,80.001 541,80.001 C549.148,80.001 550.169,79.965 553.369,79.82 C556.562,79.673 558.743,79.167 560.652,78.425 C562.623,77.658 564.297,76.634 565.965,74.965 C567.633,73.296 568.659,71.625 569.425,69.651 C570.167,67.743 570.674,65.562 570.82,62.369 C570.966,59.17 571,58.147 571,50 C571,41.851 570.966,40.831 570.82,37.631"></path></g></g></g></svg></div><div style="padding-top: 8px;"> <div style=" color:#3897f0; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:550; line-height:18px;">Instagram에서 이 게시물 보기</div></div><div style="padding: 12.5% 0;"></div> <div style="display: flex; flex-direction: row; margin-bottom: 14px; align-items: center;"><div> <div style="background-color: #F4F4F4; border-radius: 50%; height: 12.5px; width: 12.5px; transform: translateX(0px) translateY(7px);"></div> <div style="background-color: #F4F4F4; height: 12.5px; transform: rotate(-45deg) translateX(3px) translateY(1px); width: 12.5px; flex-grow: 0; margin-right: 14px; margin-left: 2px;"></div> <div style="background-color: #F4F4F4; border-radius: 50%; height: 12.5px; width: 12.5px; transform: translateX(9px) translateY(-18px);"></div></div><div style="margin-left: 8px;"> <div style=" background-color: #F4F4F4; border-radius: 50%; flex-grow: 0; height: 20px; width: 20px;"></div> <div style=" width: 0; height: 0; border-top: 2px solid transparent; border-left: 6px solid #f4f4f4; border-bottom: 2px solid transparent; transform: translateX(16px) translateY(-4px) rotate(30deg)"></div></div><div style="margin-left: auto;"> <div style=" width: 0px; border-top: 8px solid #F4F4F4; border-right: 8px solid transparent; transform: translateY(16px);"></div> <div style=" background-color: #F4F4F4; flex-grow: 0; height: 12px; width: 16px; transform: translateY(-4px);"></div> <div style=" width: 0; height: 0; border-top: 8px solid #F4F4F4; border-left: 8px solid transparent; transform: translateY(-4px) translateX(8px);"></div></div></div> <div style="display: flex; flex-direction: column; flex-grow: 1; justify-content: center; margin-bottom: 24px;"> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; margin-bottom: 6px; width: 224px;"></div> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; width: 144px;"></div></div></a><p style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; line-height:17px; margin-bottom:0; margin-top:8px; overflow:hidden; padding:8px 0 7px; text-align:center; text-overflow:ellipsis; white-space:nowrap;"><a href="https://www.instagram.com/p/DGP-39oSXj3/?utm_source=ig_embed&amp;utm_campaign=loading" style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:normal; line-height:17px; text-decoration:none;" target="_blank">양산 권현우(@khyun.woo.kr)님의 공유 게시물</a></p></div></blockquote>`
                            }}
                          />
                        </div>
                        
                        {/* 인스타그램 프로필 링크 */}
                        <div className="mt-4 text-center">
                          <Link 
                            href={instagramUrl} 
                            target="_blank"
                            className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full text-sm font-medium hover:from-purple-600 hover:to-pink-600 transition-colors"
                          >
                            인스타그램 프로필 바로가기
                          </Link>
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}
              </div>
              
              {/* SNS 섹션 내부 스크롤 인디케이터 */}
              <div className="mt-12 flex justify-center">
                <div className="text-gray-800 flex flex-col items-center">
                  <p className="text-xs text-gray-800 mb-1 text-center">아래로 스크롤</p>
                  <IoIosArrowDown className="text-2xl text-gray-800 animate-bounce mb-1" />
                  <ScrollIndicator isDark={true} color="text-gray-800" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 스크롤 화살표 - hideScrollIndicator가 false일 때만 표시 */}
      {!hideScrollIndicator && (
        <div className="absolute bottom-[15%] left-0 right-0 z-[100] flex justify-center">
          <div className="flex flex-col items-center">
            <p className="text-xs text-white/80 mb-1 text-center">아래로 스크롤</p>
            <IoIosArrowDown className="text-2xl text-white/80 animate-bounce mb-1" />
            <ScrollIndicator isDark={false} color="text-white/80" />
          </div>
        </div>
      )}
    </div>
  );
} 