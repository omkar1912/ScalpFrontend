import { Search, ClipboardList, TrendingUp, Truck } from 'lucide-react';

const steps = [
  {
    title: 'List Your Scrap',
    description: 'Post your scrap listings with detailed descriptions and photos for buyers to browse.',
    icon: ClipboardList,
  },
  {
    title: 'Receive Offers',
    description: 'Get competitive quotes from verified buyers and choose the one that suits you best.',
    icon: TrendingUp,
  },
  {
    title: 'Verify Quality',
    description: 'Use our inspection services to ensure scrap quality matches descriptions.',
    icon: Search,
  },
  {
    title: 'Safe Logistics',
    description: 'Arrange for pickup and delivery with our integrated logistics partners.',
    icon: Truck,
  }
];

export function HowItWorks() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-20">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">How it Works</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Trade your scrap in 4 simple steps with our seamless and secure platform.
          </p>
        </div>

        <div className="relative">
          {/* Connector line for desktop */}
          <div className="hidden lg:block absolute top-12 left-[10%] right-[10%] h-0.5 bg-gray-200 -z-0" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
            {steps.map((step, index) => (
              <div key={step.title} className="text-center group">
                <div className="w-24 h-24 mx-auto bg-white rounded-full flex items-center justify-center border-4 border-gray-50 shadow-xl mb-8 group-hover:scale-110 group-hover:border-primary-100 transition-all duration-300">
                  <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center text-white">
                    <step.icon className="h-8 w-8" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center text-sm font-bold border-4 border-white">
                    {index + 1}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
