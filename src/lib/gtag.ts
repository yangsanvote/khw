// Google Analytics 설정
export const GA_TRACKING_ID = 'G-ZJ1V8MJ081'

type GtagEvent = {
  action: string;
  category: string;
  label: string;
  value?: number;
}

export const pageview = (url: string) => {
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  })
}

export const event = ({ action, category, label, value }: GtagEvent) => {
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value
  });
}

// gtag 타입 정의 추가
declare global {
  interface Window {
    gtag: (
      command: string,
      targetId: string,
      config?: {
        page_path?: string;
        event_category?: string;
        event_label?: string;
        value?: number;
        [key: string]: string | number | undefined;
      }
    ) => void;
  }
} 