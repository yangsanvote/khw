import React from 'react';
import { Promise } from '@/types';
import { motion } from 'framer-motion';
import { MapPin, FileText } from 'lucide-react';
import { categoryMapping, regionMapping } from '@/data/promises';

interface PromiseCardProps {
  promise: Promise;
  onClick: (promise: Promise) => void;
}

const PromiseCard: React.FC<PromiseCardProps> = ({ promise, onClick }) => {
  // 지역 문자열을 배열로 변환
  const regions = promise.region.split(',');

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer border border-purple-100 hover:border-purple-300 transition-colors"
      onClick={() => onClick(promise)}
    >
      <div className="bg-gradient-to-r from-[#623D91] to-[#8C5FCF] p-3 text-white">
        <h3 className="text-lg font-bold truncate">{promise.title}</h3>
      </div>
      
      <div className="p-4">
        <div className="mb-3 flex items-center text-sm text-gray-600">
          <FileText size={16} className="mr-1" />
          <span className="font-medium">
            {categoryMapping[promise.category as keyof typeof categoryMapping]}
          </span>
          {promise.subcategory && (
            <span className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs">
              {promise.subcategory}
            </span>
          )}
        </div>
        
        <div className="flex flex-wrap gap-1 items-center text-sm text-gray-600 mb-3">
          <MapPin size={16} className="mr-1" />
          {regions.map((region, index) => (
            <React.Fragment key={region}>
              <span className="font-medium">
                {regionMapping[region as keyof typeof regionMapping]}
              </span>
              {index < regions.length - 1 && <span className="mx-1">|</span>}
            </React.Fragment>
          ))}
        </div>
        
        <p className="text-gray-700 text-sm line-clamp-2">
          {promise.description || "자세한 내용은 클릭하여 확인하세요."}
        </p>
        
        <div className="mt-3 text-right">
          <span className="text-xs font-medium text-purple-600 hover:text-purple-800">
            상세 보기 &rarr;
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default PromiseCard; 