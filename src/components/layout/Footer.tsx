import Link from 'next/link';
import { Recycle, Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Logo & About */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2">
              <Recycle className="h-8 w-8 text-primary-500" />
              <span className="text-xl font-bold text-white tracking-tight">ScrapMarket</span>
            </Link>
            <p className="text-sm leading-relaxed">
              Global B2B scrap marketplace connecting buyers and sellers for a sustainable future. 
              We make scrap recycling efficient, transparent, and profitable.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-primary-500 transition-colors"><Facebook className="h-5 w-5" /></a>
              <a href="#" className="hover:text-primary-500 transition-colors"><Twitter className="h-5 w-5" /></a>
              <a href="#" className="hover:text-primary-500 transition-colors"><Instagram className="h-5 w-5" /></a>
              <a href="#" className="hover:text-primary-500 transition-colors"><Linkedin className="h-5 w-5" /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-4 text-sm">
              <li><Link href="/marketplace" className="hover:text-primary-500 transition-colors">Marketplace</Link></li>
              <li><Link href="/about" className="hover:text-primary-500 transition-colors">About Us</Link></li>
              <li><Link href="/blog" className="hover:text-primary-500 transition-colors">Latest News</Link></li>
              <li><Link href="/contact" className="hover:text-primary-500 transition-colors">Contact Us</Link></li>
              <li><Link href="/terms" className="hover:text-primary-500 transition-colors">Terms & Conditions</Link></li>
            </ul>
          </div>

          {/* Sectors */}
          <div>
            <h4 className="text-white font-semibold mb-6">Our Sectors</h4>
            <ul className="space-y-4 text-sm">
              <li><Link href="/sectors/metal" className="hover:text-primary-500 transition-colors">Metal Scrap</Link></li>
              <li><Link href="/sectors/plastic" className="hover:text-primary-500 transition-colors">Plastic Scrap</Link></li>
              <li><Link href="/sectors/paper" className="hover:text-primary-500 transition-colors">Paper & Cardboard</Link></li>
              <li><Link href="/sectors/electronic" className="hover:text-primary-500 transition-colors">E-Waste</Link></li>
              <li><Link href="/sectors/textile" className="hover:text-primary-500 transition-colors">Textile Waste</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold mb-6">Get in Touch</h4>
            <div className="flex items-start gap-3 text-sm">
              <MapPin className="h-5 w-5 text-primary-500 shrink-0" />
              <p>123 Eco Street, Sustainability City, Green Road 5678</p>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Phone className="h-5 w-5 text-primary-500 shrink-0" />
              <p>+1 (555) 123-4567</p>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Mail className="h-5 w-5 text-primary-500 shrink-0" />
              <p>support@scrapmarket.com</p>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-gray-800 text-center text-xs">
          <p>© {new Date().getFullYear()} ScrapMarket Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
