export default async function handler(req, res) {
  // 페이스북 액세스 토큰과 페이지 ID
  // 실제로는 .env 파일에 저장해야 합니다
  const accessToken = process.env.FACEBOOK_ACCESS_TOKEN;
  const pageId = 'yangsankhw'; // 페이스북 페이지 ID 또는 사용자명
  
  try {
    const response = await fetch(
      `https://graph.facebook.com/v18.0/${pageId}/posts?access_token=${accessToken}&fields=id,message,created_time,full_picture,permalink_url&limit=5`
    );
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Facebook API 오류:', errorData);
      return res.status(response.status).json({ 
        error: '페이스북 게시물을 가져오는 데 실패했습니다.',
        details: errorData 
      });
    }
    
    const data = await response.json();
    res.status(200).json({ posts: data.data });
  } catch (error) {
    console.error('Facebook API 요청 오류:', error);
    res.status(500).json({ error: '페이스북 게시물을 가져오는 데 실패했습니다.' });
  }
} 