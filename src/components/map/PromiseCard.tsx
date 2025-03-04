import { motion } from 'framer-motion';
import { Promise } from '@/lib/promises';

interface PromiseCardProps {
  promise: Promise;
  isSelected: boolean;
  onSelect: () => void;
}

const categoryColors = {
  apt: '#623D91',
  care: '#E8326E',
  worker: '#00A367',
  residence: '#FFED00',
};

const categoryIcons = {
  apt: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205 3 1m1.5.5-1.5-.5M6.75 7.364V3h-3v18m3-13.636 10.5-3.819" />
    </svg>
  ),
  care: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z" />
    </svg>
  ),
  worker: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z" />
    </svg>
  ),
  residence: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12 12 1.5l9.75 10.5m-19.5 0v8.25M3.375 19.5h17.25m-17.25 0c-.621 0-1.125-.504-1.125-1.125V12m15.75 7.5c.621 0 1.125-.504 1.125-1.125V12" />
    </svg>
  ),
};

const PromiseCard = ({ promise, isSelected, onSelect }: PromiseCardProps) => {
  const categoryColor = categoryColors[promise.category as keyof typeof categoryColors] || '#333';
  const categoryIcon = categoryIcons[promise.category as keyof typeof categoryIcons];
  
  return (
    <motion.div
      onClick={onSelect}
      className={`p-4 rounded-xl ${
        isSelected 
          ? 'bg-white shadow-md border-l-4' 
          : 'bg-white/80 shadow-sm hover:shadow-md'
      } transition-all cursor-pointer`}
      style={{
        borderLeftColor: isSelected ? categoryColor : 'transparent'
      }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-center mb-2">
        <div 
          className="w-8 h-8 rounded-full flex items-center justify-center mr-2 text-white"
          style={{ backgroundColor: categoryColor }}
        >
          {categoryIcon}
        </div>
        <div className="flex-1">
          <h4 className="text-gray-900 font-medium">{promise.title}</h4>
          <div className="flex items-center text-xs text-gray-500">
            <span>{promise.location}</span>
            {promise.subcategory && (
              <>
                <span className="mx-1">•</span>
                <span>{promise.subcategory}</span>
              </>
            )}
          </div>
        </div>
      </div>
      
      <p className="text-sm text-gray-600 ml-10">{promise.summary}</p>
      
      {isSelected && (
        <div className="mt-3 flex justify-end">
          <button className="text-xs text-[#623D91] font-medium px-3 py-1 rounded-full bg-purple-50">
            상세보기
          </button>
        </div>
      )}
    </motion.div>
  );
};

export default PromiseCard; 