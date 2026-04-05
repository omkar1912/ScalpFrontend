'use client';

import { useState } from 'react';
import { 
  Send, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Layers, 
  Package, 
  MessageSquare,
  CheckCircle2,
  ArrowRight,
  AlertCircle
} from 'lucide-react';
import { CATEGORIES } from '@/lib/mock-data';
import { cn } from '@/lib/utils';
import { api } from '@/lib/api-client';

export default function EnquiryPage() {
  const [type, setType] = useState<'buy' | 'sell'>('buy');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    sector: '',
    material: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Parse quantity and material from "material" field
      // For simplicity, we'll send material as name and quantity as 1
      // In a real app, we'd have separate fields
      await api.post('/enquiries', {
        type,
        ...formData,
        quantity: 1, // Default to 1 if not specified
      });
      setIsSubmitted(true);
    } catch (err: any) {
      setError(err.message || 'Failed to submit enquiry');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-[40px] p-10 border border-gray-100 shadow-2xl text-center">
          <div className="w-20 h-20 bg-primary-50 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-primary-600" />
          </div>
          <h2 className="text-3xl font-black text-gray-900 mb-4">Enquiry Sent!</h2>
          <p className="text-gray-500 mb-8 leading-relaxed">
            Thank you for your interest. Our industrial procurement team will review your request and contact you within 24 hours.
          </p>
          <button 
            onClick={() => setIsSubmitted(false)}
            className="w-full bg-primary-600 text-white py-4 rounded-2xl font-bold hover:bg-primary-700 active:scale-95 transition-all shadow-xl shadow-primary-100"
          >
            Submit Another Request
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB] py-16 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 rounded-full text-primary-700 text-xs font-bold uppercase tracking-widest mb-4">
            <Send className="w-3.5 h-3.5" />
            Quick Enquiry
          </div>
          <h1 className="text-4xl font-black text-gray-900 mb-4 tracking-tight">
            How can we help you?
          </h1>
          <p className="text-gray-500 max-w-lg mx-auto leading-relaxed">
            Whether you're looking to procure bulk scrap or offload industrial waste, we provide streamlined solutions for your business.
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-[40px] shadow-2xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
          {/* Buy/Sell Toggle */}
          <div className="p-2 bg-gray-50/50 border-b border-gray-100 flex gap-2">
            <button
              onClick={() => setType('buy')}
              className={cn(
                "flex-1 py-4 rounded-[32px] text-sm font-bold transition-all flex items-center justify-center gap-2",
                type === 'buy' 
                  ? "bg-white text-primary-600 shadow-sm border border-gray-100" 
                  : "text-gray-400 hover:text-gray-600"
              )}
            >
              I want to Buy
            </button>
            <button
              onClick={() => setType('sell')}
              className={cn(
                "flex-1 py-4 rounded-[32px] text-sm font-bold transition-all flex items-center justify-center gap-2",
                type === 'sell' 
                  ? "bg-white text-primary-600 shadow-sm border border-gray-100" 
                  : "text-gray-400 hover:text-gray-600"
              )}
            >
              I want to Sell
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-8 lg:p-12 space-y-8">
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-2xl text-sm flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                {error}
              </div>
            )}
            {/* Personal Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-primary-500 transition-colors" />
                  <input 
                    type="text" 
                    required
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full pl-12 pr-4 py-4 bg-gray-50/50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 focus:bg-white outline-none transition-all text-sm font-medium"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Work Email</label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-primary-500 transition-colors" />
                  <input 
                    type="email" 
                    required
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@company.com"
                    className="w-full pl-12 pr-4 py-4 bg-gray-50/50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 focus:bg-white outline-none transition-all text-sm font-medium"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Phone Number</label>
                <div className="relative group">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-primary-500 transition-colors" />
                  <input 
                    type="tel" 
                    required
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 000-0000"
                    className="w-full pl-12 pr-4 py-4 bg-gray-50/50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 focus:bg-white outline-none transition-all text-sm font-medium"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">City / Location</label>
                <div className="relative group">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-primary-500 transition-colors" />
                  <input 
                    type="text" 
                    required
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Mumbai, India"
                    className="w-full pl-12 pr-4 py-4 bg-gray-50/50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 focus:bg-white outline-none transition-all text-sm font-medium"
                  />
                </div>
              </div>
            </div>

            {/* Material Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-50">
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Material Sector</label>
                <div className="relative group">
                  <Layers className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none group-focus-within:text-primary-500 transition-colors" />
                  <select 
                    required
                    name="sector"
                    value={formData.sector}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-4 bg-gray-50/50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 focus:bg-white outline-none transition-all text-sm font-medium appearance-none"
                  >
                    <option value="">Select Sector</option>
                    {CATEGORIES.filter(c => c !== 'All Sectors').map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Material + Approx. Qty</label>
                <div className="relative group">
                  <Package className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-primary-500 transition-colors" />
                  <input 
                    type="text" 
                    required
                    name="material"
                    value={formData.material}
                    onChange={handleChange}
                    placeholder="e.g. Copper Wire, 5000 kg"
                    className="w-full pl-12 pr-4 py-4 bg-gray-50/50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 focus:bg-white outline-none transition-all text-sm font-medium"
                  />
                </div>
              </div>
            </div>

            {/* Message Area */}
            <div className="space-y-2 pt-4 border-t border-gray-50">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Detailed Message (Optional)</label>
              <div className="relative group">
                <MessageSquare className="absolute left-4 top-5 w-5 h-5 text-gray-400 group-focus-within:text-primary-500 transition-colors" />
                <textarea 
                  rows={4}
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us more about your requirements..."
                  className="w-full pl-12 pr-4 py-4 bg-gray-50/50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 focus:bg-white outline-none transition-all text-sm font-medium resize-none"
                />
              </div>
            </div>

            {/* Submit */}
            <button 
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary-600 text-white py-5 rounded-2xl font-black hover:bg-primary-700 active:scale-[0.98] transition-all shadow-2xl shadow-primary-200 flex items-center justify-center gap-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Sending...' : 'Send Request'}
              <ArrowRight className="w-6 h-6" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
