import { NextResponse } from 'next/server';

// 환경 변수에서 API 키 및 토큰 가져오기
const FB_ACCESS_TOKEN = process.env.FB_ACCESS_TOKEN;
const IG_ACCESS_TOKEN = process.env.IG_ACCESS_TOKEN;

// 페이스북/인스타그램 게시물 인터페이스
interface FacebookPost {
  id: string;
  message?: string;
  created_time: string;
  full_picture?: string;
}

interface InstagramPost {
  id: string;
  caption?: string;
  media_url: string;
  permalink: string;
  timestamp: string;
}

export async function GET() {
  try {
    // 페이스북 및 인스타그램 데이터를 병렬로 가져오기
    const [facebookData, instagramData] = await Promise.all([
      fetchFacebookPosts(),
      fetchInstagramPosts()
    ]);

    return NextResponse.json({
      facebook: facebookData,
      instagram: instagramData
    });
  } catch (error) {
    console.error('소셜 미디어 데이터 로딩 중 오류:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다' },
      { status: 500 }
    );
  }
}

/**
 * 페이스북 페이지에서 최근 게시물 가져오기
 */
async function fetchFacebookPosts(): Promise<FacebookPost[]> {
  if (!FB_ACCESS_TOKEN) {
    console.warn('페이스북 액세스 토큰이 설정되지 않았습니다.');
    return mockFacebookPosts();
  }

  try {
    // 페이스북 Graph API 호출
    const pageId = 'yangsankhw'; // 페이스북 페이지 ID
    const fields = 'id,message,created_time,full_picture';
    const limit = 1; // 최근 게시물 1개만 가져오기
    
    const response = await fetch(
      `https://graph.facebook.com/v18.0/${pageId}/posts?fields=${fields}&limit=${limit}&access_token=${FB_ACCESS_TOKEN}`,
      { next: { revalidate: 3600 } } // 1시간마다 재검증
    );

    if (!response.ok) {
      throw new Error(`Facebook API 오류: ${response.status}`);
    }

    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error('Facebook 데이터 가져오기 오류:', error);
    return mockFacebookPosts();
  }
}

/**
 * 인스타그램에서 최근 게시물 가져오기
 */
async function fetchInstagramPosts(): Promise<InstagramPost[]> {
  if (!IG_ACCESS_TOKEN) {
    console.warn('인스타그램 액세스 토큰이 설정되지 않았습니다.');
    return mockInstagramPosts();
  }

  try {
    // 인스타그램 Graph API 호출
    const fields = 'id,caption,media_url,permalink,timestamp';
    const limit = 1; // 최근 게시물 1개만 가져오기
    
    const response = await fetch(
      `https://graph.instagram.com/me/media?fields=${fields}&limit=${limit}&access_token=${IG_ACCESS_TOKEN}`,
      { next: { revalidate: 3600 } } // 1시간마다 재검증
    );

    if (!response.ok) {
      throw new Error(`Instagram API 오류: ${response.status}`);
    }

    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error('Instagram 데이터 가져오기 오류:', error);
    return mockInstagramPosts();
  }
}

/**
 * 페이스북 게시물 임시 데이터
 */
function mockFacebookPosts(): FacebookPost[] {
  return [
    {
      id: '1',
      message: '안녕하세요! 저는 권현우입니다. 양산시민의 행복과 더 나은 미래를 위해 최선을 다하겠습니다.',
      created_time: '2024-03-15T12:30:00Z',
      full_picture: '/images/candidate/profile-1.jpg'
    }
  ];
}

/**
 * 인스타그램 게시물 임시 데이터
 */
function mockInstagramPosts(): InstagramPost[] {
  return [
    {
      id: '101',
      caption: '양산의 미래를 함께 만들어가요 #권현우 #양산시',
      media_url: '/images/candidate/profile-3.jpg',
      permalink: 'https://www.instagram.com/khyun.woo.kr/',
      timestamp: '2024-03-20T09:15:00Z'
    }
  ];
} 