'use client';

export default function KakaoShareButton({ title, description, imageUrl }: {
  title: string;
  description: string;
  imageUrl: string;
}) {
  const shareToKakao = () => {
    if (window.Kakao) {
      window.Kakao.Share.sendDefault({
        objectType: 'feed',
        content: {
          title: title,
          description: description,
          imageUrl: imageUrl,
          link: {
            mobileWebUrl: window.location.href,
            webUrl: window.location.href,
          },
        },
        buttons: [
          {
            title: '자세히 보기',
            link: {
              mobileWebUrl: window.location.href,
              webUrl: window.location.href,
            },
          },
        ],
      });
    }
  };

  return (
    <button
      onClick={shareToKakao}
      className="flex items-center gap-2 px-4 py-2 bg-[#FEE500] text-[#000000] rounded-lg hover:bg-[#FDD700] transition-colors"
    >
      <img src="/kakao.png" alt="카카오톡" className="w-5 h-5" />
      <span>카카오톡으로 공유하기</span>
    </button>
  );
} 