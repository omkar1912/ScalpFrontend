import Image from 'next/image';
import { MapPin, Package, Tag, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Product } from '@/lib/mock-data';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col overflow-hidden">
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="px-2.5 py-1 bg-white/90 backdrop-blur-sm text-[10px] font-bold uppercase tracking-wider text-primary-700 rounded-full shadow-sm">
            {product.category}
          </span>
          <span className={cn(
            "px-2.5 py-1 backdrop-blur-sm text-[10px] font-bold uppercase tracking-wider rounded-full shadow-sm",
            product.condition === 'Excellent' ? "bg-green-100/90 text-green-700" :
            product.condition === 'Good' ? "bg-blue-100/90 text-blue-700" :
            "bg-orange-100/90 text-orange-700"
          )}>
            {product.condition}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-semibold text-gray-900 leading-snug mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">
          {product.title}
        </h3>

        <div className="space-y-2 mb-4 flex-grow">
          <div className="flex items-center text-xs text-gray-500 gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-gray-400" />
            <span>{product.location}</span>
          </div>
          <div className="flex items-center text-xs text-gray-500 gap-1.5">
            <Package className="w-3.5 h-3.5 text-gray-400" />
            <span>{product.quantity} available</span>
          </div>
        </div>

        <div className="flex items-end justify-between mt-auto pt-3 border-t border-gray-50">
          <div>
            <span className="text-xs text-gray-500 block mb-0.5 font-medium">Price per {product.unit}</span>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
              <span className="text-xs text-gray-500 font-medium">/{product.unit}</span>
            </div>
          </div>
          <button className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary-50 text-primary-600 hover:bg-primary-600 hover:text-white transition-all duration-300">
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
