'use client';

import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Facebook, Instagram } from 'lucide-react';
import Link from 'next/link';
import { event } from '@/lib/gtag';

const contactInfo = [
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
    value: "경상남도 양산시 양주로 62 (lh7단지상가) 2층",
    href: "https://maps.google.com/?q=경상남도 양산시 양주로 62"
  }
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
                className="flex items-center gap-4 hover:text-yellow-400 transition-colors duration-300"
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
              <Link 
                href="https://band.us/@khw" 
                target="_blank"
                className="flex items-center gap-2 px-4 py-2 bg-[#2DB400] hover:bg-[#249c00] text-white rounded-lg transition-colors"
                onClick={handleBandClick}
              >
                <svg 
                  viewBox="0 0 24 24" 
                  className="w-5 h-5"
                  fill="currentColor"
                >
                  <path d="M19.1,4.9C15.2,1,8.8,1,4.9,4.9C1,8.8,1,15.2,4.9,19.1C8.8,23,15.2,23,19.1,19.1C23,15.2,23,8.8,19.1,4.9zM13.8,17.3h-3.6v-4.7H7.5V9h2.7V7.2h3.6V9h2.7v3.6h-2.7V17.3z"/>
                </svg>
                <span>네이버 밴드 구경하기</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 