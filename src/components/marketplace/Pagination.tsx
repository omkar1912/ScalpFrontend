import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Pagination() {
  return (
    <div className="flex items-center justify-center gap-2 mt-12">
      <button className="p-2 rounded-lg border border-gray-200 text-gray-400 hover:bg-gray-50 hover:text-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
        <ChevronLeft className="w-5 h-5" />
      </button>
      
      {[1, 2, 3, '...', 12].map((page, index) => (
        <button
          key={index}
          className={cn(
            "w-10 h-10 rounded-lg text-sm font-medium transition-colors",
            page === 1 
              ? "bg-primary-600 text-white shadow-md shadow-primary-200" 
              : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 border border-transparent hover:border-gray-200"
          )}
        >
          {page}
        </button>
      ))}

      <button className="p-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors">
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}
