import { Trash2, Factory, Monitor, Car, Construction, FlaskConical } from 'lucide-react';

const sectors = [
  {
    name: 'Metal Scrap',
    description: 'Ferrous and non-ferrous metals including copper, aluminum, and steel.',
    icon: Factory,
    color: 'bg-blue-50 text-blue-600',
    count: '2.4k+ Listings'
  },
  {
    name: 'Plastic Scrap',
    description: 'PET, HDPE, PVC, and other plastic resins for industrial recycling.',
    icon: Trash2,
    color: 'bg-green-50 text-green-600',
    count: '1.8k+ Listings'
  },
  {
    name: 'Electronic Waste',
    description: 'Old computers, smartphones, and circuit boards for precious metal recovery.',
    icon: Monitor,
    color: 'bg-purple-50 text-purple-600',
    count: '950+ Listings'
  },
  {
    name: 'Automotive Scrap',
    description: 'End-of-life vehicles, engines, and spare parts for recycling.',
    icon: Car,
    color: 'bg-orange-50 text-orange-600',
    count: '1.2k+ Listings'
  },
  {
    name: 'Construction Waste',
    description: 'Concrete, wood, and metal debris from construction and demolition sites.',
    icon: Construction,
    color: 'bg-amber-50 text-amber-600',
    count: '800+ Listings'
  },
  {
    name: 'Chemical Waste',
    description: 'Industrial chemicals and hazardous waste requiring specialized handling.',
    icon: FlaskConical,
    color: 'bg-rose-50 text-rose-600',
    count: '450+ Listings'
  }
];

export function Sectors() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Explore by Sectors</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find the right marketplace for your specific scrap needs with our specialized industry sectors.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sectors.map((sector) => (
            <div 
              key={sector.name} 
              className="group p-8 bg-white border border-gray-100 rounded-3xl hover:shadow-xl hover:border-primary-100 transition-all duration-300"
            >
              <div className={`w-14 h-14 ${sector.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <sector.icon className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{sector.name}</h3>
              <p className="text-gray-600 mb-6 line-clamp-2">{sector.description}</p>
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
                <span className="text-sm font-semibold text-primary-600">{sector.count}</span>
                <button className="text-sm font-medium text-gray-400 group-hover:text-primary-600 transition-colors">
                  Browse Marketplace →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
