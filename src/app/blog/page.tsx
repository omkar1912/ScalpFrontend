'use client';

import { useState } from 'react';
import { BLOG_POSTS } from '@/lib/blog-data';
import BlogCard from '@/components/blog/BlogCard';
import BlogSidebar from '@/components/blog/BlogSidebar';
import { Newspaper } from 'lucide-react';

export default function BlogListingPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = BLOG_POSTS.filter((post) => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#F9FAFB] py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-1 w-12 bg-primary-600 rounded-full" />
            <span className="text-sm font-bold text-primary-600 uppercase tracking-widest flex items-center gap-2">
              <Newspaper className="w-4 h-4" />
              Our Blog
            </span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-black text-gray-900 tracking-tight mb-6">
            Insights into the <span className="text-primary-600">Circular Economy</span>
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl leading-relaxed">
            Stay updated with the latest market trends, sustainability guides, and industrial recycling regulations from our experts.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main Content */}
          <div className="flex-grow min-w-0">
            {filteredPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
                {filteredPosts.map((post, idx) => (
                  <BlogCard key={post.id} post={post} featured={idx === 0 && selectedCategory === 'All' && searchQuery === ''} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-[40px] p-20 text-center border border-gray-100 shadow-sm">
                <div className="w-20 h-20 bg-gray-50 rounded-3xl flex items-center justify-center mx-auto mb-6">
                  <Newspaper className="w-10 h-10 text-gray-300" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">No articles found</h3>
                <p className="text-gray-500">Try adjusting your search or category filter.</p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <BlogSidebar
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
        </div>
      </div>
    </div>
  );
}
