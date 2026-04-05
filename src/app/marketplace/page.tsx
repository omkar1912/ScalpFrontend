'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import FilterSidebar from '@/components/marketplace/FilterSidebar';
import ProductGrid from '@/components/marketplace/ProductGrid';
import MarketplaceControls from '@/components/marketplace/MarketplaceControls';
import Pagination from '@/components/marketplace/Pagination';
import { PRODUCTS, Product } from '@/lib/mock-data';
import { api } from '@/lib/api-client';

export default function MarketplacePage() {
  const [selectedCategory, setSelectedCategory] = useState('All Sectors');
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [listings, setListings] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchListings = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const queryParams = new URLSearchParams();
        if (selectedCategory !== 'All Sectors') {
          queryParams.append('sector', selectedCategory);
        }
        if (searchQuery) {
          queryParams.append('search', searchQuery);
        }
        
        const response: any = await api.get(`/listings?${queryParams.toString()}`);
        const data = response.data?.docs ?? response.data ?? [];
        setListings(Array.isArray(data) && data.length > 0 ? data : PRODUCTS);
      } catch (err: any) {
        console.error('Failed to fetch listings:', err);
        setError(err.message || 'Failed to fetch listings');
        // Fallback to mock data if backend fails
        setListings(PRODUCTS);
      } finally {
        setIsLoading(false);
      }
    };

    fetchListings();
  }, [selectedCategory, searchQuery]);

  const filteredProducts = listings.filter(product => {
    const matchesCategory = selectedCategory === 'All Sectors' || product.category === selectedCategory || product.sector === selectedCategory;
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         product.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleClearFilters = () => {
    setSelectedCategory('All Sectors');
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Sidebar */}
          <FilterSidebar 
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
            onClearFilters={handleClearFilters}
          />

          {/* Main Content */}
          <main className="flex-grow min-w-0">
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-3">
                <div className="h-1 w-12 bg-primary-600 rounded-full" />
                <span className="text-sm font-bold text-primary-600 uppercase tracking-widest">Marketplace</span>
              </div>
              <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-4">
                Available Listings
              </h1>
              <p className="text-lg text-gray-500 max-w-2xl leading-relaxed">
                Discover and trade high-quality scrap materials. Connect with verified industrial partners for a circular economy.
              </p>
            </div>

            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-2 mb-8">
              <MarketplaceControls 
                onMobileMenuToggle={() => setIsMobileMenuOpen(true)}
                resultCount={filteredProducts.length}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
              />
            </div>

            <div className="flex items-center justify-between mb-6 px-2">
              <p className="text-sm text-gray-500">
                Showing <span className="font-bold text-gray-900">{filteredProducts.length}</span> results
              </p>
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-gray-400">View:</span>
                <div className="flex bg-gray-100 p-1 rounded-lg">
                  <div className="w-8 h-8 bg-white rounded-md shadow-sm flex items-center justify-center">
                    <div className="grid grid-cols-2 gap-0.5">
                      <div className="w-1.5 h-1.5 bg-primary-600 rounded-[1px]" />
                      <div className="w-1.5 h-1.5 bg-primary-600 rounded-[1px]" />
                      <div className="w-1.5 h-1.5 bg-primary-600 rounded-[1px]" />
                      <div className="w-1.5 h-1.5 bg-primary-600 rounded-[1px]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              {/* Grid with smooth transition feel */}
              <div className={cn(
                "transition-opacity duration-300",
                filteredProducts.length === 0 ? "opacity-50" : "opacity-100"
              )}>
                <ProductGrid products={filteredProducts} />
              </div>
            </div>

            <div className="mt-16 pt-8 border-t border-gray-100">
              <Pagination />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
