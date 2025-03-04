interface Window {
  Kakao: {
    init: (key: string) => void;
    Share: {
      sendDefault: (options: {
        objectType: string;
        content: {
          title: string;
          description: string;
          imageUrl: string;
          link: {
            mobileWebUrl: string;
            webUrl: string;
          };
        };
        buttons?: Array<{
          title: string;
          link: {
            mobileWebUrl: string;
            webUrl: string;
          };
        }>;
      }) => void;
    };
  };
}

// Leaflet 타입 선언
declare module 'leaflet' {
  export interface MapOptions {
    preferCanvas?: boolean;
  }
}

// React Leaflet 타입 선언
declare module 'react-leaflet' {
  export const MapContainer: any;
  export const TileLayer: any;
  export const Marker: any;
  export const Popup: any;
  export const useMap: any;
} 