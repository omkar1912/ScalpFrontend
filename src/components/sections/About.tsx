import { CheckCircle2 } from 'lucide-react';

export function About() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="aspect-video rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80&w=1000" 
                alt="Recycling Facility"
                className="object-cover w-full h-full"
              />
            </div>
            <div className="absolute -bottom-8 -right-8 bg-white p-8 rounded-2xl shadow-xl hidden sm:block border border-gray-100">
              <div className="text-4xl font-bold text-primary-600">15+</div>
              <div className="text-gray-600 font-medium">Years of Experience</div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-primary-600 font-semibold uppercase tracking-wider text-sm">About ScrapMarket</h2>
              <h3 className="text-4xl font-bold text-gray-900 leading-tight">
                Global Leaders in Modern Scrap Trading Solutions
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                We've spent over a decade perfecting the art of scrap recycling and trading. Our platform brings 
                cutting-edge technology to one of the world's most vital industries, ensuring transparency 
                and efficiency for every transaction.
              </p>
            </div>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                'Verified Global Network',
                'Transparent Pricing',
                'Secure Transactions',
                'Expert Quality Control',
                'Logistics Support',
                'ESG Compliance Tracking'
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-gray-700">
                  <CheckCircle2 className="h-5 w-5 text-primary-600" />
                  <span className="font-medium">{item}</span>
                </li>
              ))}
            </ul>

            <button className="px-8 py-3 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800 transition-all">
              Learn More About Us
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
