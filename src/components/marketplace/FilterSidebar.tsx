import { CATEGORIES } from '@/lib/mock-data';
import { Filter, X, RotateCcw, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FilterSidebarProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  isOpen: boolean;
  onClose: () => void;
  onClearFilters: () => void;
}

const CONDITIONS = ['Excellent', 'Good', 'Fair'];
const PRICE_RANGES = [
  'Under $0.50',
  '$0.50 - $1.00',
  '$1.00 - $5.00',
  'Above $5.00',
];

export default function FilterSidebar({ 
  selectedCategory, 
  onSelectCategory,
  isOpen,
  onClose,
  onClearFilters
}: FilterSidebarProps) {
  return (
    <aside className={cn(
      "fixed inset-y-0 left-0 z-40 w-80 bg-white border-r border-gray-100 transform transition-all duration-300 ease-in-out lg:relative lg:translate-x-0 lg:z-0",
      isOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"
    )}>
      <div className="h-full flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-50 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-primary-50 flex items-center justify-center">
              <Filter className="w-4 h-4 text-primary-600" />
            </div>
            <h2 className="text-lg font-bold text-gray-900">Filters</h2>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={onClearFilters}
              className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all group"
              title="Reset Filters"
            >
              <RotateCcw className="w-4 h-4 group-hover:rotate-[-45deg] transition-transform" />
            </button>
            <button onClick={onClose} className="p-2 -mr-2 text-gray-500 hover:text-gray-900 lg:hidden">
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-grow overflow-y-auto p-6 space-y-8 custom-scrollbar">
          {/* Categories */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                Sectors
              </h3>
              {selectedCategory !== 'All Sectors' && (
                <span className="text-[10px] font-bold text-primary-600 bg-primary-50 px-2 py-0.5 rounded-full">
                  1 Active
                </span>
              )}
            </div>
            <div className="space-y-1.5">
              {CATEGORIES.map((category) => (
                <button
                  key={category}
                  onClick={() => onSelectCategory(category)}
                  className={cn(
                    "w-full group flex items-center justify-between px-3 py-2.5 rounded-xl text-sm transition-all duration-200",
                    selectedCategory === category
                      ? "bg-primary-600 text-white shadow-md shadow-primary-100 font-semibold translate-x-1"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  )}
                >
                  <span className="flex items-center gap-3">
                    <div className={cn(
                      "w-1.5 h-1.5 rounded-full transition-all duration-300",
                      selectedCategory === category ? "bg-white scale-125" : "bg-gray-200 group-hover:bg-primary-300"
                    )} />
                    {category}
                  </span>
                  {selectedCategory === category ? (
                    <ChevronRight className="w-4 h-4 text-white/70" />
                  ) : (
                    <span className="text-[10px] font-medium text-gray-400 group-hover:text-primary-500 transition-colors">
                      {Math.floor(Math.random() * 50) + 10}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Condition */}
          <div className="pt-6 border-t border-gray-50">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
              Material Condition
            </h3>
            <div className="grid grid-cols-1 gap-2">
              {CONDITIONS.map((condition) => (
                <label key={condition} className="relative flex items-center group cursor-pointer">
                  <input
                    type="checkbox"
                    className="peer sr-only"
                  />
                  <div className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-white peer-checked:border-primary-500 peer-checked:bg-primary-50/30 peer-checked:ring-1 peer-checked:ring-primary-500 transition-all hover:border-gray-200 group-hover:bg-gray-50/50 flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700 peer-checked:text-primary-700 transition-colors">
                      {condition}
                    </span>
                    <div className="w-5 h-5 rounded-md border border-gray-200 bg-white peer-checked:bg-primary-600 peer-checked:border-primary-600 transition-all flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-white opacity-0 peer-checked:opacity-100 transition-opacity" />
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div className="pt-6 border-t border-gray-50 pb-8">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
              Price Range
            </h3>
            <div className="space-y-3">
              {PRICE_RANGES.map((range) => (
                <label key={range} className="flex items-center group cursor-pointer">
                  <div className="relative flex items-center">
                    <input
                      type="radio"
                      name="price_range"
                      className="peer sr-only"
                    />
                    <div className="w-5 h-5 rounded-full border-2 border-gray-200 peer-checked:border-primary-600 peer-checked:border-[6px] transition-all duration-200 group-hover:border-primary-300" />
                    <span className="ml-3 text-sm font-medium text-gray-600 group-hover:text-gray-900 transition-colors">
                      {range}
                    </span>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Footer (Mobile Only) */}
        <div className="p-6 bg-white border-t border-gray-50 lg:hidden">
          <button
            onClick={onClose}
            className="w-full bg-primary-600 text-white py-4 rounded-2xl font-bold hover:bg-primary-700 active:scale-[0.98] transition-all shadow-lg shadow-primary-200 flex items-center justify-center gap-2"
          >
            Show Results
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </aside>
  );
}

