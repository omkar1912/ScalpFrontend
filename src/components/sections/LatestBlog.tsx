import Link from 'next/link';
import { Calendar, User, ArrowRight } from 'lucide-react';

const posts = [
  {
    title: 'The Future of Circular Economy in 2024',
    excerpt: 'How scrap trading is becoming the backbone of sustainable manufacturing globally.',
    image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80&w=800',
    author: 'Sarah Johnson',
    date: 'Mar 24, 2024',
    category: 'Industry Trends'
  },
  {
    title: 'Metal Prices: Weekly Market Analysis',
    excerpt: 'A deep dive into the current fluctuations of copper and aluminum scrap prices.',
    image: 'https://images.unsplash.com/photo-1558449028-b53a39d100fc?auto=format&fit=crop&q=80&w=800',
    author: 'Michael Chen',
    date: 'Mar 22, 2024',
    category: 'Market Report'
  },
  {
    title: '5 Tips for Efficient Scrap Sorting',
    excerpt: 'Maximize your profit by following these industry-standard sorting techniques.',
    image: 'https://images.unsplash.com/photo-1605600611284-195205ef91b6?auto=format&fit=crop&q=80&w=800',
    author: 'David Smith',
    date: 'Mar 20, 2024',
    category: 'Guides'
  }
];

export function LatestBlog() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-16">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Latest from our Blog</h2>
            <p className="text-lg text-gray-600 max-w-xl">
              Stay updated with the latest industry news, market trends, and recycling guides.
            </p>
          </div>
          <Link 
            href="/blog" 
            className="hidden sm:flex items-center gap-2 text-primary-600 font-semibold hover:text-primary-700 transition-colors"
          >
            View all posts
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article key={post.title} className="group bg-white rounded-3xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300">
              <div className="aspect-[16/10] overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-8">
                <div className="flex items-center gap-4 mb-4">
                  <span className="px-3 py-1 bg-primary-50 text-primary-600 text-xs font-bold rounded-full uppercase tracking-wider">
                    {post.category}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-primary-600 transition-colors">
                  {post.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-2">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {post.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      {post.author}
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 sm:hidden">
          <Link 
            href="/blog" 
            className="flex items-center justify-center gap-2 w-full py-4 bg-gray-50 text-primary-600 font-semibold rounded-xl"
          >
            View all posts
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
