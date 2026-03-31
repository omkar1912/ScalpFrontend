export interface Seller {
  id: string;
  name: string;
  location: string;
  rating: number;
  joinedDate: string;
  verified: boolean;
  totalListings: number;
}

export interface Product {
  id: string;
  title: string;
  category: string;
  price: number;
  unit: string;
  quantity: string;
  location: string;
  image: string;
  images?: string[];
  condition: 'Excellent' | 'Good' | 'Fair';
  description?: string;
  sellerId: string;
}

export const SELLERS: Seller[] = [
  {
    id: 's1',
    name: 'Global Metal Recyclers Ltd',
    location: 'Mumbai, India',
    rating: 4.8,
    joinedDate: 'Jan 2022',
    verified: true,
    totalListings: 124,
  },
  {
    id: 's2',
    name: 'EcoPlastic Solutions',
    location: 'Dubai, UAE',
    rating: 4.5,
    joinedDate: 'Mar 2023',
    verified: true,
    totalListings: 45,
  },
];

export const CATEGORIES = [
  'All Sectors',
  'Metal',
  'Plastic',
  'Paper',
  'Electronics',
  'Rubber',
  'Glass',
  'Textile',
];

export const SORT_OPTIONS = [
  { label: 'Newest Arrivals', value: 'newest' },
  { label: 'Price: Low to High', value: 'price_asc' },
  { label: 'Price: High to Low', value: 'price_desc' },
  { label: 'Quantity: High to Low', value: 'qty_desc' },
];

export const PRODUCTS: Product[] = [
  {
    id: '1',
    title: 'Industrial Aluminum Scrap - 6063 Grade',
    category: 'Metal',
    price: 1.25,
    unit: 'kg',
    quantity: '5000 kg',
    location: 'Mumbai, India',
    image: 'https://images.unsplash.com/photo-1558449028-b53a39d100fc?q=80&w=800&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1558449028-b53a39d100fc?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1605557202138-097824c36b0b?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1516216628859-9bccecad13ef?q=80&w=800&auto=format&fit=crop',
    ],
    condition: 'Excellent',
    description: 'High-quality 6063 aluminum scrap available for immediate dispatch. Clean, free of attachments, and sorted. Ideal for secondary smelting and extrusion production. Each bale is approximately 500kg.',
    sellerId: 's1',
  },
  {
    id: '2',
    title: 'High-Density Polyethylene (HDPE) Blue Drums',
    category: 'Plastic',
    price: 0.45,
    unit: 'kg',
    quantity: '2500 kg',
    location: 'Dubai, UAE',
    image: 'https://images.unsplash.com/photo-1612965110667-418701ba338e?q=80&w=800&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1612965110667-418701ba338e?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1591193113735-5260d2392c20?q=80&w=800&auto=format&fit=crop',
    ],
    condition: 'Good',
    description: 'Crushed and washed HDPE blue drums. Free from chemical residues and contaminants. Suitable for manufacturing plastic pellets or direct injection molding processes.',
    sellerId: 's2',
  },
  {
    id: '3',
    title: 'Mixed Office Paper Bales',
    category: 'Paper',
    price: 0.15,
    unit: 'kg',
    quantity: '10,000 kg',
    location: 'London, UK',
    image: 'https://images.unsplash.com/photo-1605600611284-1b213c4a830a?q=80&w=800&auto=format&fit=crop',
    condition: 'Good',
    description: 'Standard office paper mix, shredded and baled. Contains white bond, colored paper, and computer printouts. Low moisture content and minimal plastic inclusion.',
    sellerId: 's1',
  },
  {
    id: '4',
    title: 'E-Waste: Motherboards & Components',
    category: 'Electronics',
    price: 4.50,
    unit: 'kg',
    quantity: '200 kg',
    location: 'San Jose, USA',
    image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?q=80&w=800&auto=format&fit=crop',
    condition: 'Fair',
    description: 'Sorted e-waste components including high-grade motherboards, RAM modules, and CPU scrap. Recovered from decommissioned enterprise servers. Perfect for precious metal recovery.',
    sellerId: 's2',
  },
  {
    id: '5',
    title: 'Copper Wire Scrap (Millberry)',
    category: 'Metal',
    price: 6.80,
    unit: 'kg',
    quantity: '1500 kg',
    location: 'Berlin, Germany',
    image: 'https://images.unsplash.com/photo-1605557202138-097824c36b0b?q=80&w=800&auto=format&fit=crop',
    condition: 'Excellent',
    description: 'Pure copper wire scrap (Millberry grade). Minimum 99.9% copper content. No insulation, no grease, no oxidation. High-value material for high-conductivity applications.',
    sellerId: 's1',
  },
];
