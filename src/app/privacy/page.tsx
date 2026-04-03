import React from 'react';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
        <div className="prose prose-blue max-w-none text-gray-600 space-y-6">
          <p>Last updated: April 2026</p>
          <p>
            At ScrapVault, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your personal information when you use our website and services.
          </p>
          
          <h2 className="text-2xl font-semibold text-gray-900">1. Information We Collect</h2>
          <p>
            We collect information you provide directly to us, such as when you create an account, submit an enquiry, or contact us. This may include your name, email address, phone number, company details, and GST/PAN information for KYC purposes.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900">2. How We Use Your Information</h2>
          <p>
            We use your information to:
          </p>
          <ul className="list-disc pl-6">
            <li>Provide and improve our scrap marketplace services.</li>
            <li>Verify your identity and process KYC documents.</li>
            <li>Facilitate communication between buyers and sellers.</li>
            <li>Send notifications and updates about your enquiries.</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-900">3. Information Sharing</h2>
          <p>
            We do not sell your personal information. We may share your information with industrial partners only as necessary to facilitate scrap trading enquiries you have initiated.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900">4. Data Security</h2>
          <p>
            We implement industry-standard security measures to protect your data. However, no method of transmission over the internet is 100% secure.
          </p>
        </div>
      </div>
    </div>
  );
}
