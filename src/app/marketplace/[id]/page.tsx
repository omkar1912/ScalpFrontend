'use client';

import Link from 'next/link';
import { ArrowLeft, MapPin, Package, ShieldCheck, Star, Calendar, MessageSquare, Info, TrendingUp } from 'lucide-react';
import { PRODUCTS, SELLERS, Product } from '@/lib/mock-data';
import ImageGallery from '@/components/marketplace/ImageGallery';
import ProductCard from '@/components/marketplace/ProductCard';
import { cn } from '@/lib/utils';
import { notFound } from 'next/navigation';

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = PRODUCTS.find((p) => p.id === params.id);
  
  if (!product) {
    notFound();
  }

  const seller = SELLERS.find((s) => s.id === product.sellerId);
  const relatedProducts = PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <div className="min-h-screen bg-[#F9FAFB] pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumbs / Back Button */}
        <Link 
          href="/marketplace" 
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-primary-600 transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Marketplace
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left: Images */}
          <div className="lg:col-span-7">
            <ImageGallery images={product.images || [product.image]} />
            
            {/* Description - Desktop */}
            <div className="hidden lg:block mt-12 pt-12 border-t border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Product Description</h2>
              <div className="prose prose-primary max-w-none text-gray-600 leading-relaxed">
                <p>{product.description}</p>
                <div className="grid grid-cols-2 gap-8 mt-10">
                  <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center">
                        <Package className="w-5 h-5 text-primary-600" />
                      </div>
                      <span className="font-bold text-gray-900">Specifications</span>
                    </div>
                    <ul className="space-y-3">
                      <li className="flex justify-between text-sm">
                        <span className="text-gray-500">Material</span>
                        <span className="font-medium text-gray-900">{product.category}</span>
                      </li>
                      <li className="flex justify-between text-sm">
                        <span className="text-gray-500">Condition</span>
                        <span className="font-medium text-gray-900">{product.condition}</span>
                      </li>
                      <li className="flex justify-between text-sm">
                        <span className="text-gray-500">Min. Order</span>
                        <span className="font-medium text-gray-900">500 kg</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center">
                        <TrendingUp className="w-5 h-5 text-orange-600" />
                      </div>
                      <span className="font-bold text-gray-900">Logistics</span>
                    </div>
                    <ul className="space-y-3">
                      <li className="flex justify-between text-sm">
                        <span className="text-gray-500">Loading Port</span>
                        <span className="font-medium text-gray-900">{product.location}</span>
                      </li>
                      <li className="flex justify-between text-sm">
                        <span className="text-gray-500">Delivery</span>
                        <span className="font-medium text-gray-900">15-30 Days</span>
                      </li>
                      <li className="flex justify-between text-sm">
                        <span className="text-gray-500">Payment</span>
                        <span className="font-medium text-gray-900">L/C, T/T</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Product Details & Action Card */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-white rounded-[32px] p-8 border border-gray-100 shadow-sm sticky top-24">
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 bg-primary-50 text-primary-700 text-[10px] font-bold uppercase tracking-wider rounded-full">
                  {product.category}
                </span>
                <span className={cn(
                  "px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full",
                  product.condition === 'Excellent' ? "bg-green-100 text-green-700" :
                  product.condition === 'Good' ? "bg-blue-100 text-blue-700" :
                  "bg-orange-100 text-orange-700"
                )}>
                  {product.condition} Condition
                </span>
              </div>

              <h1 className="text-3xl font-extrabold text-gray-900 mb-6 leading-tight">
                {product.title}
              </h1>

              <div className="flex items-baseline gap-2 mb-8 p-6 bg-gray-50 rounded-2xl border border-gray-100">
                <span className="text-4xl font-black text-gray-900">${product.price.toFixed(2)}</span>
                <span className="text-gray-500 font-medium">per {product.unit}</span>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3 text-gray-600">
                  <MapPin className="w-5 h-5 text-gray-400" />
                  <span className="font-medium">{product.location}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <Package className="w-5 h-5 text-gray-400" />
                  <span className="font-medium">{product.quantity} available</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 gap-4 mb-8">
                <button className="w-full bg-primary-600 text-white py-5 rounded-2xl font-bold hover:bg-primary-700 active:scale-[0.98] transition-all shadow-xl shadow-primary-200 flex items-center justify-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Send Enquiry
                </button>
                <button className="w-full bg-white text-gray-900 py-5 rounded-2xl font-bold border-2 border-gray-100 hover:border-primary-600 hover:text-primary-600 active:scale-[0.98] transition-all flex items-center justify-center gap-2">
                  Download Specs
                </button>
              </div>

              {/* Seller Brief */}
              {seller && (
                <div className="pt-8 border-t border-gray-100">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Verified Seller</h3>
                    <Link href={`/sellers/${seller.id}`} className="text-xs font-bold text-primary-600 hover:underline">View Profile</Link>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-primary-50 flex items-center justify-center text-primary-600 font-black text-xl border border-primary-100 shadow-sm">
                      {seller.name.charAt(0)}
                    </div>
                    <div className="flex-grow">
                      <div className="flex items-center gap-1.5 mb-1">
                        <h4 className="font-bold text-gray-900">{seller.name}</h4>
                        {seller.verified && <ShieldCheck className="w-4 h-4 text-primary-500" />}
                      </div>
                      <div className="flex items-center gap-4 text-xs">
                        <div className="flex items-center gap-1 text-orange-500 font-bold">
                          <Star className="w-3.5 h-3.5 fill-current" />
                          {seller.rating}
                        </div>
                        <div className="flex items-center gap-1 text-gray-500 font-medium">
                          <Calendar className="w-3.5 h-3.5" />
                          Since {seller.joinedDate}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-24 pt-24 border-t border-gray-100">
            <div className="flex items-end justify-between mb-10">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Related Listings</h2>
                <p className="text-gray-500">Other {product.category} materials you might be interested in</p>
              </div>
              <Link href="/marketplace" className="text-sm font-bold text-primary-600 hover:underline">View All</Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
