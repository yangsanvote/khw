"use client"

import React from 'react';
import { Promise } from '@/types';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { categoryMapping, regionMapping } from '@/data/promises';

interface PromiseDetailProps {
  promise: Promise;
  onClose: () => void;
}

const PromiseDetail: React.FC<PromiseDetailProps> = ({ promise, onClose }) => {
  // 지역 배열로 변환
  const regions = promise.region.split(',');

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
      onClick={onClose}
    >
      <motion.div
        className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-auto"
        onClick={(e) => e.stopPropagation()}
        initial={{ y: 20 }}
        animate={{ y: 0 }}
      >
        <div className="sticky top-0 bg-[#623D91] p-4 text-white flex items-center justify-between">
          <h2 className="text-xl font-bold">{promise.title}</h2>
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-white/20"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="p-6">
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="px-3 py-1 bg-purple-100 text-[#623D91] rounded-full text-sm font-medium">
              {categoryMapping[promise.category as keyof typeof categoryMapping]}
            </span>
            {promise.subcategory && (
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                {promise.subcategory}
              </span>
            )}
            {regions.map((region) => (
              <span 
                key={region} 
                className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-sm font-medium"
              >
                {regionMapping[region as keyof typeof regionMapping]}
              </span>
            ))}
          </div>
          
          <div className="mt-6">
            <h3 className="text-lg font-bold text-gray-800 mb-2">공약 내용</h3>
            <p className="text-gray-700">{promise.description}</p>
          </div>
          
          <div className="mt-8 border-t pt-4">
            <h3 className="text-lg font-bold text-gray-800 mb-4">기대효과</h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li>주민 생활 만족도 향상</li>
              <li>지역 내 안전성 및 편의성 증대</li>
              <li>지역사회 활성화 및 공동체 의식 함양</li>
            </ul>
          </div>
          
          <div className="mt-8 flex justify-end">
            <button 
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors"
            >
              닫기
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PromiseDetail; 