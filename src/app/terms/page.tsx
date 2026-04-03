import React from 'react';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms & Conditions</h1>
        <div className="prose prose-blue max-w-none text-gray-600 space-y-6">
          <p>Last updated: April 2026</p>
          <p>
            Welcome to ScrapVault. By using our website and services, you agree to comply with and be bound by the following terms and conditions.
          </p>
          
          <h2 className="text-2xl font-semibold text-gray-900">1. Use of Service</h2>
          <p>
            You must be at least 18 years old and represent a valid industrial entity to use our marketplace for professional scrap trading.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900">2. User Accounts</h2>
          <p>
            You are responsible for maintaining the confidentiality of your account credentials. You agree to provide accurate information, including company details and KYC documents.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900">3. Marketplace Listings</h2>
          <p>
            ScrapVault reserves the right to approve, reject, or remove any listing that does not meet our quality standards or violates our policies.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900">4. Limitation of Liability</h2>
          <p>
            ScrapVault acts as a facilitator for industrial scrap trading. We are not liable for the quality of materials traded or any disputes between buyers and sellers.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900">5. Governing Law</h2>
          <p>
            These terms are governed by the laws of India, with jurisdiction in Mumbai.
          </p>
        </div>
      </div>
    </div>
  );
}
