'use client';

import { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Facebook, 
  Twitter, 
  Linkedin, 
  Instagram, 
  Youtube, 
  Send,
  MessageCircle,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

const contactInfo = [
  {
    icon: MapPin,
    title: 'Visit Us',
    details: '123, Business Hub, Bandra Kurla Complex, Mumbai, India - 400051',
    color: 'bg-blue-50 text-blue-600',
  },
  {
    icon: Phone,
    title: 'Call Us',
    details: '+91 (22) 555-0123',
    subDetails: 'Mon - Sat, 9am - 6pm',
    color: 'bg-green-50 text-green-600',
  },
  {
    icon: Mail,
    title: 'Email Us',
    details: 'support@scrapvault.com',
    subDetails: '24/7 Support Response',
    color: 'bg-purple-50 text-purple-600',
  },
  {
    icon: Clock,
    title: 'Office Hours',
    details: 'Mon - Sat: 9:00 AM - 6:00 PM',
    subDetails: 'Sunday: Closed',
    color: 'bg-orange-50 text-orange-600',
  },
];

const socialLinks = [
  { icon: Facebook, href: '#', label: 'Facebook', color: 'hover:bg-blue-600 hover:text-white' },
  { icon: Twitter, href: '#', label: 'Twitter', color: 'hover:bg-sky-500 hover:text-white' },
  { icon: Linkedin, href: '#', label: 'LinkedIn', color: 'hover:bg-blue-700 hover:text-white' },
  { icon: Instagram, href: '#', label: 'Instagram', color: 'hover:bg-pink-600 hover:text-white' },
  { icon: Youtube, href: '#', label: 'YouTube', color: 'hover:bg-red-600 hover:text-white' },
];

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary-100/30 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 -z-10" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-blue-100/30 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/2 -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-24">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 rounded-full text-primary-700 text-xs font-bold uppercase tracking-widest mb-6">
            <Mail className="w-3.5 h-3.5" />
            Contact Us
          </div>
          <h1 className="text-4xl lg:text-5xl font-black text-gray-900 mb-6 tracking-tight leading-tight">
            Let's Start a <span className="text-primary-600">Conversation</span>
          </h1>
          <p className="text-lg text-gray-500 leading-relaxed">
            Have questions about industrial scrap trading? Our team of experts is here to help you optimize your recycling supply chain.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Contact Info & Socials */}
          <div className="lg:col-span-5 space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
              {contactInfo.map((info, idx) => (
                <div key={idx} className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-md transition-all group">
                  <div className="flex items-start gap-6">
                    <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110", info.color)}>
                      <info.icon className="w-7 h-7" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-1">{info.title}</h3>
                      <p className="text-sm text-gray-600 leading-relaxed mb-1">{info.details}</p>
                      {info.subDetails && <p className="text-xs text-gray-400 font-medium">{info.subDetails}</p>}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Social Links Card */}
            <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm">
              <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-6 ml-1">Follow Us</h3>
              <div className="flex flex-wrap gap-4">
                {socialLinks.map((social, idx) => (
                  <a
                    key={idx}
                    href={social.href}
                    className={cn(
                      "w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-500 transition-all duration-300",
                      social.color
                    )}
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-[40px] p-8 lg:p-12 border border-gray-100 shadow-xl shadow-gray-200/50">
              {isSubmitted ? (
                <div className="py-20 text-center">
                  <div className="w-20 h-20 bg-primary-50 rounded-3xl flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-10 h-10 text-primary-600" />
                  </div>
                  <h2 className="text-3xl font-black text-gray-900 mb-4">Message Received!</h2>
                  <p className="text-gray-500 mb-8 leading-relaxed max-w-sm mx-auto">
                    Thank you for reaching out. One of our support representatives will get back to you within 24 hours.
                  </p>
                  <button 
                    onClick={() => setIsSubmitted(false)}
                    className="bg-primary-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-primary-700 active:scale-95 transition-all shadow-xl shadow-primary-100"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <>
                  <div className="mb-10">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Send us a Message</h2>
                    <p className="text-gray-500 text-sm">Fill out the form below and we'll get back to you as soon as possible.</p>
                  </div>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
                        <input 
                          type="text" 
                          required
                          placeholder="John Doe"
                          className="w-full px-5 py-4 bg-gray-50/50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 outline-none transition-all text-sm font-medium"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Work Email</label>
                        <input 
                          type="email" 
                          required
                          placeholder="john@company.com"
                          className="w-full px-5 py-4 bg-gray-50/50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 outline-none transition-all text-sm font-medium"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Phone Number</label>
                      <input 
                        type="tel" 
                        required
                        placeholder="+91 (555) 000-0000"
                        className="w-full px-5 py-4 bg-gray-50/50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 outline-none transition-all text-sm font-medium"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Message</label>
                      <textarea 
                        rows={5}
                        required
                        placeholder="Tell us how we can help you..."
                        className="w-full px-5 py-4 bg-gray-50/50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 outline-none transition-all text-sm font-medium resize-none"
                      />
                    </div>
                    <button 
                      type="submit"
                      className="w-full bg-primary-600 text-white py-5 rounded-2xl font-black hover:bg-primary-700 active:scale-[0.98] transition-all shadow-2xl shadow-primary-200 flex items-center justify-center gap-3 text-lg"
                    >
                      Submit Message
                      <Send className="w-5 h-5" />
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-24 lg:mt-32">
          <div className="bg-white rounded-[40px] p-2 border border-gray-100 shadow-sm overflow-hidden h-[400px] relative group">
            {/* Google Maps Embed Placeholder */}
            <div className="absolute inset-0 bg-gray-100 flex flex-col items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-white shadow-md flex items-center justify-center mb-4 transition-transform group-hover:scale-110">
                <MapPin className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">Our Mumbai HQ</h3>
              <p className="text-gray-500 text-sm">Bandra Kurla Complex, Mumbai</p>
              
              {/* Actual Placeholder for Embed */}
              <div className="mt-8 px-6 py-2 bg-white/80 backdrop-blur rounded-full text-xs font-bold text-gray-400 uppercase tracking-widest">
                Google Maps Embed Placeholder
              </div>
            </div>
            {/* 
              Real Google Map Embed would go here:
              <iframe 
                src="https://www.google.com/maps/embed?..." 
                className="w-full h-full border-0"
                allowFullScreen
                loading="lazy"
              ></iframe>
            */}
          </div>
        </div>
      </div>

      {/* Floating WhatsApp Button */}
      <a 
        href="https://wa.me/91225550123" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 w-16 h-16 bg-[#25D366] text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-50 group"
        title="Chat with us on WhatsApp"
      >
        <MessageCircle className="w-8 h-8" />
        <span className="absolute right-full mr-4 bg-white text-gray-900 px-4 py-2 rounded-xl text-sm font-bold shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-gray-100">
          Chat with us!
        </span>
      </a>
    </div>
  );
}
