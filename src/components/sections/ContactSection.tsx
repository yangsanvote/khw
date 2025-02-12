'use client';

import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Facebook, Instagram } from 'lucide-react';
import KakaoShareButton from '../KakaoShareButton';

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
    value: "경상남도 양산시 중앙로 39",
    href: "https://maps.google.com/?q=경상남도 양산시 양주로 94"
  }
];

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
              >
                <Facebook className="w-6 h-6" />
              </a>
              <a 
                href="https://www.instagram.com/fuller1107/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                <Instagram className="w-6 h-6" />
              </a>
            </div>

            <div className="bg-white/10 rounded-2xl p-6 md:p-8">
              <h3 className="text-xl md:text-2xl font-bold mb-4">실시간 소식받기</h3>
              <KakaoShareButton 
                title="권현우 후보 - 양산시의회의원"
                description="1년의 약속, 확실한 변화 - 기강 ON, 특권 OFF"
                imageUrl="https://권현우.kr/images/candidate/profile-1.jpg"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 