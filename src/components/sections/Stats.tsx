export function Stats() {
  const stats = [
    { label: 'Registered Traders', value: '10k+' },
    { label: 'Successful Deals', value: '50k+' },
    { label: 'Countries Served', value: '45+' },
    { label: 'Tons Recycled', value: '1.2M' },
  ];

  return (
    <section className="py-20 bg-primary-600 text-white overflow-hidden relative">
      {/* Decorative circles */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-primary-500 rounded-full blur-3xl opacity-50" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-96 h-96 bg-primary-700 rounded-full blur-3xl opacity-50" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
          {stats.map((stat) => (
            <div key={stat.label} className="space-y-2">
              <div className="text-4xl lg:text-5xl font-extrabold tracking-tight">
                {stat.value}
              </div>
              <div className="text-primary-100 font-medium uppercase tracking-widest text-sm">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
