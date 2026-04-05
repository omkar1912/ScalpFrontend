import { Search, Filter, TrendingUp, ArrowRight } from 'lucide-react';
import { BLOG_CATEGORIES, BLOG_POSTS } from '@/lib/blog-data';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface BlogSidebarProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function BlogSidebar({
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange
}: BlogSidebarProps) {
  const recentPosts = BLOG_POSTS.slice(0, 3);

  return (
    <aside className="lg:w-80 flex flex-col gap-10">
      {/* Search */}
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400 group-focus-within:text-primary-500 transition-colors" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="block w-full pl-11 pr-4 py-4 bg-white border border-gray-100 rounded-2xl focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 outline-none transition-all text-sm font-medium shadow-sm"
          placeholder="Search articles..."
        />
      </div>

      {/* Categories */}
      <div className="bg-white rounded-[32px] p-8 border border-gray-100 shadow-sm">
        <div className="flex items-center gap-2.5 mb-6">
          <div className="w-8 h-8 rounded-lg bg-primary-50 flex items-center justify-center">
            <Filter className="w-4 h-4 text-primary-600" />
          </div>
          <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest">Categories</h3>
        </div>
        <div className="space-y-1.5">
          {BLOG_CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => onSelectCategory(category)}
              className={cn(
                "w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm transition-all duration-200",
                selectedCategory === category
                  ? "bg-primary-600 text-white shadow-md shadow-primary-100 font-semibold"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              )}
            >
              {category}
              {selectedCategory !== category && (
                <span className="text-[10px] font-bold text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full">
                  {category === 'All' ? BLOG_POSTS.length : BLOG_POSTS.filter(p => p.category === category).length}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Recent Posts */}
      <div className="bg-white rounded-[32px] p-8 border border-gray-100 shadow-sm">
        <div className="flex items-center gap-2.5 mb-6">
          <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center">
            <TrendingUp className="w-4 h-4 text-orange-600" />
          </div>
          <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest">Recent Posts</h3>
        </div>
        <div className="space-y-6">
          {recentPosts.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`} className="group block">
              <div className="flex gap-4">
                <div className="w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0 bg-gray-100 border border-gray-100">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                </div>
                <div className="flex flex-col justify-center min-w-0">
                  <span className="text-[10px] font-bold text-primary-600 uppercase tracking-widest mb-1">{post.category}</span>
                  <h4 className="text-sm font-bold text-gray-900 leading-tight line-clamp-2 group-hover:text-primary-600 transition-colors">
                    {post.title}
                  </h4>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
}
