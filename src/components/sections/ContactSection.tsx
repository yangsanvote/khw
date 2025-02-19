'use client';

import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Facebook, Instagram } from 'lucide-react';
import Link from 'next/link';
import { event } from '@/lib/gtag';
import { useState } from 'react';
import Image from 'next/image';

interface ContactInfo {
  icon: any;
  label: string;
  value: string;
  href: string;
  className?: string;
}

const contactInfo: ContactInfo[] = [
  {
    icon: Phone,
    label: "전화번호",
    value: "010-4855-5375",
    href: "tel:010-4855-5375"
  },
  {
    icon: Mail,
    label: "이메일",
    value: "mobydick1107@naver.com",
    href: "mailto:mobydick1107@naver.com"
  },
  {
    icon: MapPin,
    label: "사무실 위치",
    value: "경상남도 양산시 양주로 62 (lh 7단지상가) 2층 203호",
    href: "https://maps.google.com/?q=경상남도 양산시 양주로 62"
  },
];

const handleBandClick = () => {
  event({
    action: 'click_band_link',
    category: 'outbound',
    label: '네이버 밴드 방문'
  });
};

// 각 링크 클릭 추적
const handleContactClick = (type: string) => {
  event({
    action: 'contact_click',
    category: 'contact',
    label: type
  });
};

const handleSocialClick = (platform: string) => {
  event({
    action: 'social_click',
    category: 'social',
    label: platform
  });
};

export default function ContactSection() {
  const [showAccount, setShowAccount] = useState(false);

  return (
    <section className="h-screen snap-start relative flex flex-col items-center justify-center bg-gradient-to-br from-emerald-950 via-slate-900 to-emerald-950 px-4 text-white overflow-x-hidden">
      <div className="w-full max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-black text-center mb-16"
        >
          함께 만들어가요
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8 md:gap-16">
          {/* 연락처 정보 */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {contactInfo.map((info, index) => (
              <motion.a
                key={index}
                href={info.href}
                target={info.icon === MapPin ? "_blank" : "_self"}
                rel={info.icon === MapPin ? "noopener noreferrer" : ""}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`flex items-center gap-4 hover:text-yellow-400 transition-colors duration-300 ${info.className || ''}`}
                onClick={() => handleContactClick(info.label)}
              >
                <info.icon className="w-6 h-6 md:w-8 md:h-8 shrink-0" />
                <div>
                  <p className="text-sm text-gray-400">{info.label}</p>
                  <p className="text-lg md:text-xl font-medium">{info.value}</p>
                </div>
              </motion.a>
            ))}
          </motion.div>

          {/* 소셜 미디어 & 구독 */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="flex gap-4 text-white/80">
              <a 
                href="https://www.facebook.com/yangsankhw" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
                onClick={() => handleSocialClick('Facebook')}
              >
                <Facebook className="w-6 h-6" />
              </a>
              <a 
                href="https://www.instagram.com/fuller1107/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
                onClick={() => handleSocialClick('Instagram')}
              >
                <Instagram className="w-6 h-6" />
              </a>
            </div>

            <div className="bg-white/10 rounded-2xl p-6 md:p-8">
              <h3 className="text-xl md:text-2xl font-bold mb-4">실시간 소식받기</h3>
              <div className="space-y-3">
                <Link 
                  href="https://band.us/@khw" 
                  target="_blank"
                  className="flex items-center justify-between w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg px-6 py-3 transition-colors"
                  onClick={handleBandClick}
                >
                  <span className="font-medium">네이버 밴드 구경하기</span>
                  <span className="text-sm opacity-75">권현우와 함께하는 사람들</span>
                </Link>

                <button
                  onClick={() => setShowAccount(true)}
                  className="flex items-center justify-between w-full bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg px-6 py-3 transition-colors"
                >
                  <span className="font-medium">후원하기</span>
                  <span className="text-sm opacity-75">권현우 후보 후원계좌</span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>


      {showAccount && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-4 md:p-6 max-w-sm w-full">
            <h3 className="text-lg md:text-xl font-bold text-center mb-3">후원 계좌</h3>
            <div className="space-y-3">
              <div className="relative w-full aspect-[1/1.414] rounded-lg overflow-hidden">
                <Image
                  src="/images/donate.jpg"
                  alt="후원 안내"
                  fill
                  className="object-contain"
                />
              </div>
              <p className="text-center text-sm md:text-base text-gray-700">
                농협은행<br />
                301-0363-7467-81<br />
                예금주: 양산시마선거구시의회의원예비후보자권현우후원회
              </p>
              <Link
                href="http://bit.ly/khwm0402"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center py-2 text-sm md:text-base text-blue-600 hover:text-blue-700 transition-colors"
              >
                👉 영수증 발급 신청하기
              </Link>
            </div>
            <button
              onClick={() => setShowAccount(false)}
              className="mt-4 w-full px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg transition-colors text-sm md:text-base"
            >
              닫기
            </button>
          </div>
        </div>
      )}
    </section>
  );
} 