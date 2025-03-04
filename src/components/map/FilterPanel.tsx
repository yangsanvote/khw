import { motion } from 'framer-motion';

interface FilterPanelProps {
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
  onClose: () => void;
}

const categories = [
  { id: 'apt', name: '아파트', color: '#623D91' },
  { id: 'care', name: '돌봄', color: '#E8326E' },
  { id: 'worker', name: '자영업', color: '#00A367' },
  { id: 'residence', name: '정주여건', color: '#FFED00' },
];

const FilterPanel = ({ selectedCategory, onSelectCategory, onClose }: FilterPanelProps) => {
  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900">공약 필터</h3>
        <button 
          onClick={onClose}
          className="p-1 rounded-full hover:bg-gray-100"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onSelectCategory(null)}
          className={`px-3 py-1.5 rounded-full text-sm font-medium 
                    ${!selectedCategory 
                      ? 'bg-gray-800 text-white' 
                      : 'bg-gray-100 text-gray-700'}`}
        >
          전체
        </button>
        
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => onSelectCategory(category.id)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium 
                      ${selectedCategory === category.id 
                        ? 'text-white' 
                        : 'bg-gray-100 text-gray-700'}`}
            style={{
              backgroundColor: selectedCategory === category.id ? category.color : ''
            }}
          >
            {category.name}
          </button>
        ))}
      </div>
      
      <div className="mt-4">
        <button
          onClick={() => onSelectCategory(null)}
          className="w-full py-2 bg-gray-100 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-200"
        >
          필터 초기화
        </button>
      </div>
    </div>
  );
};

export default FilterPanel; 