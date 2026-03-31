import React from 'react';
import { Search, SlidersHorizontal, ChevronDown } from 'lucide-react';
import { SORT_OPTIONS } from '@/lib/mock-data';

interface MarketplaceControlsProps {
  onMobileMenuToggle: () => void;
  resultCount: number;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function MarketplaceControls({ 
  onMobileMenuToggle,
  resultCount,
  searchQuery,
  onSearchChange
}: MarketplaceControlsProps) {
  return (
    <div className="px-4 py-3">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Search Bar */}
        <div className="relative flex-grow max-w-2xl group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400 group-focus-within:text-primary-500 transition-colors" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => onSearchChange(e.target.value)}
            className="block w-full pl-11 pr-4 py-3 bg-gray-50/50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 focus:bg-white text-sm transition-all outline-none"
            placeholder="Search for scrap metal, plastic, paper..."
          />
        </div>

        {/* Filters & Sorting */}
        <div className="flex items-center gap-3">
          <button
            onClick={onMobileMenuToggle}
            className="flex lg:hidden items-center gap-2 px-5 py-3 bg-white border border-gray-100 rounded-2xl text-sm font-semibold text-gray-700 hover:bg-gray-50 active:scale-95 transition-all"
          >
            <SlidersHorizontal className="w-4 h-4 text-primary-600" />
            Filters
          </button>

          <div className="relative flex-shrink-0 group">
            <select className="appearance-none pl-5 pr-12 py-3 bg-white border border-gray-100 rounded-2xl text-sm font-semibold text-gray-700 hover:bg-gray-50 focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 focus:outline-none cursor-pointer transition-all outline-none">
              {SORT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-hover:text-primary-500 transition-colors pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}
