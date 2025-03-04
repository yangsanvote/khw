'use client';

import { Home, User, ScrollText, Heart } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

const navItems = [
  {
    label: '홈',
    href: '/',
    icon: Home
  },
  {
    label: '후보',
    href: '/#khw-section',
    icon: User
  },
  {
    label: '공약',
    href: '/#yd-section',
    icon: ScrollText
  },
  {
    label: '참여',
    href: '/#contact-section',
    icon: Heart
  }
];

export default function BottomNav() {
  const pathname = usePathname() || '';
  const router = useRouter();
  
  const handleNavClick = (href: string, label: string) => {
    // 모든 메뉴는 해당 경로로 이동
    router.push(href);
  };
  
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around items-center h-16 z-50">
      {navItems.map((item) => {
        const isActive = pathname === item.href || 
                        (item.href !== '/' && pathname.startsWith(item.href));
                        
        return (
          <button
            key={item.href}
            onClick={() => handleNavClick(item.href, item.label)}
            className={`flex flex-col items-center justify-center w-full h-full ${
              isActive ? 'text-purple-600' : 'text-gray-500'
            }`}
          >
            <item.icon size={20} className={isActive ? 'text-purple-600' : 'text-gray-500'} />
            <span className="text-xs mt-1">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
} 