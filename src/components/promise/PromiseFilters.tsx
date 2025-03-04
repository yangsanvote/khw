'use client';

interface FilterItemProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

function FilterItem({ label, isActive, onClick }: FilterItemProps) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap
        ${isActive 
          ? 'bg-purple-600 text-white' 
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
    >
      {label}
    </button>
  );
}

interface PromiseFiltersProps {
  activeCategory: string;
  activeRegion: string;
  onCategoryChange: (category: string) => void;
  onRegionChange: (region: string) => void;
  showSubCategories?: boolean;
  activeSubCategory?: string;
  onSubCategoryChange?: (subCategory: string) => void;
}

export default function PromiseFilters({
  activeCategory,
  activeRegion,
  onCategoryChange,
  onRegionChange,
  showSubCategories = false,
  activeSubCategory = '',
  onSubCategoryChange
}: PromiseFiltersProps) {
  // 카테고리 목록
  const categories = [
    { id: "전체", label: "전체" },
    { id: "공동주택", label: "공동주택" },
    { id: "돌봄", label: "돌봄" },
    { id: "자영업", label: "자영업" },
    { id: "정주여건", label: "정주여건" }
  ];
  
  // 지역 목록
  const regions = [
    { id: "전체", label: "전체" },
    { id: "공통", label: "공통" },
    { id: "양주동", label: "양주동" },
    { id: "석금산", label: "석금산" },
    { id: "사송", label: "사송" }
  ];
  
  // 서브 카테고리 목록 (정주여건 카테고리일 때만 표시)
  const subCategories = [
    { id: "전체", label: "전체" },
    { id: "문화", label: "문화" },
    { id: "안전", label: "안전" }
  ];
  
  return (
    <div className="space-y-4 mb-4">
      {/* 카테고리 필터 */}
      <div className="overflow-x-auto pb-2">
        <div className="flex gap-2">
          {categories.map(category => (
            <FilterItem
              key={category.id}
              label={category.label}
              isActive={activeCategory === category.id}
              onClick={() => onCategoryChange(category.id)}
            />
          ))}
        </div>
      </div>
      
      {/* 서브 카테고리 필터 (정주여건 카테고리일 때만 표시) */}
      {showSubCategories && activeCategory === "정주여건" && onSubCategoryChange && (
        <div className="overflow-x-auto pb-2">
          <div className="flex gap-2">
            {subCategories.map(subCategory => (
              <FilterItem
                key={subCategory.id}
                label={subCategory.label}
                isActive={activeSubCategory === subCategory.id}
                onClick={() => onSubCategoryChange(subCategory.id)}
              />
            ))}
          </div>
        </div>
      )}
      
      {/* 지역 필터 */}
      <div className="overflow-x-auto pb-2">
        <div className="flex gap-2">
          {regions.map(region => (
            <FilterItem
              key={region.id}
              label={region.label}
              isActive={activeRegion === region.id}
              onClick={() => onRegionChange(region.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
} 