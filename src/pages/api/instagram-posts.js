export default async function handler(req, res) {
  // 인스타그램 액세스 토큰
  // 실제로는 .env 파일에 저장해야 합니다
  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
  
  try {
    // 인스타그램 비즈니스 계정이나 페이스북 페이지와 연결된 인스타그램 계정이 필요합니다
    const response = await fetch(
      `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,permalink,thumbnail_url,timestamp&access_token=${accessToken}&limit=5`
    );
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Instagram API 오류:', errorData);
      return res.status(response.status).json({ 
        error: '인스타그램 게시물을 가져오는 데 실패했습니다.',
        details: errorData 
      });
    }
    
    const data = await response.json();
    res.status(200).json({ posts: data.data });
  } catch (error) {
    console.error('Instagram API 요청 오류:', error);
    res.status(500).json({ error: '인스타그램 게시물을 가져오는 데 실패했습니다.' });
  }
} 