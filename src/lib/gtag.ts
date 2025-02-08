// Google Analytics 설정
export const GA_TRACKING_ID = 'G-ZJ1V8MJ081'

export const pageview = (url: string) => {
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  })
}

// gtag 타입 정의 추가
declare global {
  interface Window {
    gtag: (
      command: string,
      targetId: string,
      config?: Record<string, any>
    ) => void;
  }
} 