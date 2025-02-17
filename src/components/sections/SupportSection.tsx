'use client';

import { motion } from 'framer-motion';
import ScrollIndicator from '../ScrollIndicator';

export default function SupportSection() {
  return (
    <section 
      id="support"
      className="h-screen snap-start relative flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 px-4"
    >
      <div className="w-full max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center space-y-4"
        >
          <h2 className="text-3xl md:text-5xl font-black text-blue-900">
            자영업자에게 힘이 되는 후보
          </h2>
          <p className="text-xl md:text-2xl text-blue-800">
            자영업자 지원사업을 도와드립니다
          </p>
        </motion.div>
      </div>
      <ScrollIndicator />
    </section>
  );
} 