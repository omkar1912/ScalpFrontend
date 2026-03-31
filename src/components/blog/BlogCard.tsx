import Link from 'next/link';
import { Clock, Calendar, User, ArrowRight } from 'lucide-react';
import { BlogPost } from '@/lib/blog-data';
import { cn } from '@/lib/utils';

interface BlogCardProps {
  post: BlogPost;
  featured?: boolean;
}

export default function BlogCard({ post, featured }: BlogCardProps) {
  return (
    <div className={cn(
      "group bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden flex flex-col h-full",
      featured ? "lg:flex-row lg:col-span-2" : ""
    )}>
      {/* Image Container */}
      <div className={cn(
        "relative overflow-hidden bg-gray-100",
        featured ? "lg:w-1/2" : "aspect-[16/10]"
      )}>
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-[10px] font-bold uppercase tracking-widest text-primary-700 rounded-full shadow-sm">
            {post.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className={cn(
        "p-6 lg:p-8 flex flex-col flex-grow",
        featured ? "lg:w-1/2 lg:justify-center" : ""
      )}>
        <div className="flex items-center gap-4 text-xs text-gray-400 mb-4">
          <span className="flex items-center gap-1.5 font-medium">
            <Calendar className="w-3.5 h-3.5" />
            {post.date}
          </span>
          <span className="flex items-center gap-1.5 font-medium">
            <Clock className="w-3.5 h-3.5" />
            {post.readTime}
          </span>
        </div>

        <h3 className={cn(
          "font-black text-gray-900 leading-tight mb-4 group-hover:text-primary-600 transition-colors",
          featured ? "text-2xl lg:text-3xl" : "text-xl"
        )}>
          {post.title}
        </h3>

        <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-3">
          {post.excerpt}
        </p>

        <div className="mt-auto pt-6 border-t border-gray-50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={post.author.avatar} alt={post.author.name} className="w-8 h-8 rounded-full border border-gray-100" />
            <div className="flex flex-col">
              <span className="text-xs font-bold text-gray-900">{post.author.name}</span>
              <span className="text-[10px] text-gray-400">{post.author.role}</span>
            </div>
          </div>
          <Link 
            href={`/blog/${post.id}`}
            className="w-10 h-10 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center hover:bg-primary-600 hover:text-white transition-all duration-300 group/btn"
          >
            <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}
