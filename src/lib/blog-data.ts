export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  date: string;
  image: string;
  readTime: string;
}

export const BLOG_CATEGORIES = [
  'All',
  'Market Trends',
  'Sustainability',
  'Recycling Tips',
  'Industrial News',
  'Regulations'
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    slug: 'future-aluminum-recycling-2026',
    title: 'The Future of Aluminum Recycling in 2026',
    excerpt: 'Explore how new smelting technologies are revolutionizing the secondary aluminum market and driving sustainability in the automotive sector.',
    content: 'Full content here...',
    category: 'Market Trends',
    author: {
      name: 'Dr. Sarah Chen',
      role: 'Sustainability Expert',
      avatar: 'https://i.pravatar.cc/150?u=sarah'
    },
    date: 'March 25, 2026',
    image: 'https://images.unsplash.com/photo-1558449028-b53a39d100fc?q=80&w=800&auto=format&fit=crop',
    readTime: '6 min read'
  },
  {
    id: '2',
    slug: 'plastic-waste-regulations-businesses-need-to-know',
    title: 'Plastic Waste Regulations: What Businesses Need to Know',
    excerpt: 'A comprehensive guide to the latest international treaties and local regulations affecting plastic scrap exports and domestic processing.',
    content: 'Full content here...',
    category: 'Regulations',
    author: {
      name: 'James Wilson',
      role: 'Legal Consultant',
      avatar: 'https://i.pravatar.cc/150?u=james'
    },
    date: 'March 20, 2026',
    image: 'https://images.unsplash.com/photo-1612965110667-418701ba338e?q=80&w=800&auto=format&fit=crop',
    readTime: '8 min read'
  },
  {
    id: '3',
    slug: '5-tips-maximizing-value-office-paper-scrap',
    title: '5 Tips for Maximizing Value from Office Paper Scrap',
    excerpt: 'Learn how to sort and bale your office paper waste to ensure you get the best market rates from recyclers.',
    content: 'Full content here...',
    category: 'Recycling Tips',
    author: {
      name: 'Emily Rose',
      role: 'Operations Manager',
      avatar: 'https://i.pravatar.cc/150?u=emily'
    },
    date: 'March 15, 2026',
    image: 'https://images.unsplash.com/photo-1605600611284-1b213c4a830a?q=80&w=800&auto=format&fit=crop',
    readTime: '4 min read'
  },
  {
    id: '4',
    slug: 'rise-e-waste-multi-billion-dollar-opportunity',
    title: 'The Rise of E-Waste: A Multi-Billion Dollar Opportunity',
    excerpt: 'Why electronics scrap is becoming the most valuable sector in the recycling industry and how to capitalize on it.',
    content: 'Full content here...',
    category: 'Market Trends',
    author: {
      name: 'Michael Tan',
      role: 'Market Analyst',
      avatar: 'https://i.pravatar.cc/150?u=michael'
    },
    date: 'March 10, 2026',
    image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?q=80&w=800&auto=format&fit=crop',
    readTime: '10 min read'
  },
  {
    id: '5',
    slug: 'circular-economy-beyond-just-recycling',
    title: 'Circular Economy: Beyond Just Recycling',
    excerpt: 'How businesses are redesigning their supply chains to eliminate waste and create long-term value through closed-loop systems.',
    content: 'Full content here...',
    category: 'Sustainability',
    author: {
      name: 'Dr. Sarah Chen',
      role: 'Sustainability Expert',
      avatar: 'https://i.pravatar.cc/150?u=sarah'
    },
    date: 'March 05, 2026',
    image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=800&auto=format&fit=crop',
    readTime: '7 min read'
  }
];
