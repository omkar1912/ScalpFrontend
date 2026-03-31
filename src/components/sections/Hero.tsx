import { ArrowRight, ShieldCheck, Globe, Zap } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary-100/50 rounded-full blur-3xl" />
        <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-blue-50/50 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-8 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 text-primary-700 text-sm font-medium border border-primary-100">
            <Zap className="h-4 w-4" />
            <span>The Future of Scrap Trading</span>
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-extrabold text-gray-900 tracking-tight">
            Revolutionizing the <span className="text-primary-600">Scrap Marketplace</span>
          </h1>
          
          <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
            Connect with verified buyers and sellers globally. Trade metal, plastic, paper, and more with transparency and efficiency.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button className="w-full sm:w-auto px-8 py-4 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700 transition-all shadow-lg shadow-primary-200 flex items-center justify-center gap-2">
              Start Trading Now
              <ArrowRight className="h-5 w-5" />
            </button>
            <button className="w-full sm:w-auto px-8 py-4 bg-white text-gray-700 border border-gray-200 rounded-xl font-semibold hover:bg-gray-50 transition-all flex items-center justify-center gap-2">
              View Marketplace
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-16">
            <div className="flex items-center justify-center gap-3 text-gray-600">
              <ShieldCheck className="h-6 w-6 text-primary-600" />
              <span className="font-medium">Verified Traders</span>
            </div>
            <div className="flex items-center justify-center gap-3 text-gray-600">
              <Globe className="h-6 w-6 text-primary-600" />
              <span className="font-medium">Global Reach</span>
            </div>
            <div className="flex items-center justify-center gap-3 text-gray-600">
              <Zap className="h-6 w-6 text-primary-600" />
              <span className="font-medium">Instant Quotes</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
