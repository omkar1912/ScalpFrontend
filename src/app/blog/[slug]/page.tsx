'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  User, 
  Share2, 
  Facebook, 
  Twitter, 
  Linkedin, 
  Copy,
  CheckCircle2,
  Newspaper
} from 'lucide-react';
import { BLOG_POSTS, BlogPost } from '@/lib/blog-data';
import { api } from '@/lib/api-client';
import { cn } from '@/lib/utils';

export default function BlogDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [post, setPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response: any = await api.get(`/blogs/${slug}`);
        setPost(response.data);
      } catch (err: any) {
        console.error('Failed to fetch blog post:', err);
        // Fallback to mock data
        const mockPost = BLOG_POSTS.find(p => p.slug === slug);
        if (mockPost) {
          setPost(mockPost);
        } else {
          setError(err.message || 'Article not found');
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (slug) {
      fetchPost();
    }
  }, [slug]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <div className="w-20 h-20 bg-red-50 rounded-3xl flex items-center justify-center mb-6 text-red-600">
          <Newspaper className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Article Not Found</h2>
        <p className="text-gray-500 mb-8">{error || "The article you're looking for doesn't exist."}</p>
        <Link 
          href="/blog" 
          className="bg-primary-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-primary-700 transition-all"
        >
          Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pb-24">
      {/* Article Header */}
      <header className="bg-gray-50 pt-32 pb-16 lg:pt-40 lg:pb-24 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-primary-100/30 blur-[120px] rounded-full translate-x-1/2 -z-10" />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link 
            href="/blog" 
            className="inline-flex items-center gap-2 text-sm font-bold text-primary-600 hover:text-primary-700 mb-8 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Articles
          </Link>

          <div className="flex items-center gap-3 mb-6">
            <span className="px-3 py-1 bg-primary-600 text-white text-[10px] font-black uppercase tracking-widest rounded-full">
              {post.category}
            </span>
            <div className="h-px w-8 bg-gray-300" />
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{post.readTime}</span>
          </div>

          <h1 className="text-4xl lg:text-6xl font-black text-gray-900 leading-tight mb-8 tracking-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-8 pt-8 border-t border-gray-200">
            <div className="flex items-center gap-4">
              <img src={post.author.avatar} alt={post.author.name} className="w-12 h-12 rounded-2xl border-2 border-white shadow-sm" />
              <div>
                <p className="text-sm font-black text-gray-900">{post.author.name}</p>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{post.author.role}</p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex flex-col">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-0.5">Published</span>
                <span className="text-sm font-bold text-gray-900">{post.date}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="relative aspect-[21/9] rounded-[40px] overflow-hidden mb-16 shadow-2xl">
          <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Share Sidebar */}
          <aside className="lg:col-span-1 flex lg:flex-col gap-4 sticky top-24 h-fit">
            <div className="hidden lg:block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 rotate-180 [writing-mode:vertical-lr]">
              Share This Article
            </div>
            <button className="w-12 h-12 rounded-2xl bg-gray-50 text-gray-500 hover:bg-blue-600 hover:text-white transition-all flex items-center justify-center">
              <Facebook className="w-5 h-5" />
            </button>
            <button className="w-12 h-12 rounded-2xl bg-gray-50 text-gray-500 hover:bg-sky-500 hover:text-white transition-all flex items-center justify-center">
              <Twitter className="w-5 h-5" />
            </button>
            <button className="w-12 h-12 rounded-2xl bg-gray-50 text-gray-500 hover:bg-blue-700 hover:text-white transition-all flex items-center justify-center">
              <Linkedin className="w-5 h-5" />
            </button>
            <button 
              onClick={handleCopyLink}
              className={cn(
                "w-12 h-12 rounded-2xl transition-all flex items-center justify-center",
                isCopied ? "bg-emerald-500 text-white" : "bg-gray-50 text-gray-500 hover:bg-gray-900 hover:text-white"
              )}
            >
              {isCopied ? <CheckCircle2 className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
            </button>
          </aside>

          {/* Article Text */}
          <article className="lg:col-span-11 prose prose-lg prose-primary max-w-none">
            <div className="text-xl text-gray-600 font-medium leading-relaxed mb-12 italic border-l-4 border-primary-500 pl-8 py-2 bg-gray-50 rounded-r-2xl">
              {post.excerpt}
            </div>
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
            
            {/* Mock Article Content if using static data */}
            {post.content === 'Full content here...' && (
              <div className="space-y-8 text-gray-700 leading-relaxed">
                <p>
                  As we move further into 2026, the landscape of industrial recycling is undergoing a seismic shift. 
                  New regulations and technological advancements are making it more profitable than ever for 
                  businesses to optimize their scrap management processes.
                </p>
                <h2 className="text-2xl font-black text-gray-900">The Power of Data in Recycling</h2>
                <p>
                  Modern recycling is no longer just about moving physical material; it's about data. 
                  Real-time tracking of material grades, market prices, and logistics carbon footprints is 
                  becoming standard practice for industry leaders.
                </p>
                <blockquote className="border-l-4 border-primary-600 pl-6 my-10 font-bold text-2xl text-gray-900">
                  "Sustainability is no longer a cost center; it's a competitive advantage that drives operational efficiency."
                </blockquote>
                <p>
                  Companies that embrace circular economy principles are seeing up to a 15% reduction in raw material 
                  procurement costs. By treating waste as a resource, these businesses are building more resilient 
                  supply chains in an increasingly volatile global market.
                </p>
              </div>
            )}
          </article>
        </div>

        {/* Newsletter Signup or CTA */}
        <div className="mt-24 bg-gray-900 rounded-[40px] p-12 lg:p-20 relative overflow-hidden text-center">
          <div className="absolute top-0 left-0 w-full h-full bg-primary-600/10 -z-10" />
          <h2 className="text-3xl lg:text-5xl font-black text-white mb-6">Stay ahead of the curve</h2>
          <p className="text-gray-400 text-lg mb-12 max-w-2xl mx-auto">
            Get the latest industrial market insights and sustainability guides delivered to your inbox every week.
          </p>
          <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-4">
            <input 
              type="email" 
              placeholder="Enter your work email"
              className="flex-grow px-6 py-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder:text-gray-500 outline-none focus:border-primary-500 transition-all"
            />
            <button className="bg-primary-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-primary-700 transition-all shadow-xl shadow-primary-900/20">
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
