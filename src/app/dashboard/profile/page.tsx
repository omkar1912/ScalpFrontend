"use client";

import { User, Mail, Phone, Building2, CreditCard, MapPin, Upload, CheckCircle, AlertCircle } from 'lucide-react';
import { DASHBOARD_USER } from '@/lib/dashboard-data';
import { cn } from '@/lib/utils';

const kycStatusStyles = {
  verified: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  pending: 'bg-amber-50 text-amber-700 border-amber-200',
  rejected: 'bg-red-50 text-red-700 border-red-200',
};

const kycStatusIcons = {
  verified: CheckCircle,
  pending: AlertCircle,
  rejected: AlertCircle,
};

export default function ProfilePage() {
  const KycIcon = kycStatusIcons[DASHBOARD_USER.kycStatus];

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
        <p className="text-sm text-gray-500 mt-1">Manage your account information and settings</p>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 px-6 py-8">
          <div className="flex items-center gap-4">
            <div className="h-20 w-20 rounded-2xl bg-white/20 flex items-center justify-center">
              <span className="text-2xl font-bold text-white">
                {DASHBOARD_USER.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <div className="text-white">
              <h2 className="text-xl font-bold">{DASHBOARD_USER.name}</h2>
              <p className="text-primary-100 text-sm">{DASHBOARD_USER.company}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className={cn(
                  "inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full border",
                  kycStatusStyles[DASHBOARD_USER.kycStatus]
                )}>
                  <KycIcon className="h-3 w-3" />
                  KYC {DASHBOARD_USER.kycStatus.charAt(0).toUpperCase() + DASHBOARD_USER.kycStatus.slice(1)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* User Details */}
        <div className="p-6">
          <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Personal Information</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
              <div className="h-10 w-10 rounded-lg bg-primary-50 flex items-center justify-center">
                <User className="h-5 w-5 text-primary-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Full Name</p>
                <p className="text-sm font-medium text-gray-900">{DASHBOARD_USER.name}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
              <div className="h-10 w-10 rounded-lg bg-primary-50 flex items-center justify-center">
                <Mail className="h-5 w-5 text-primary-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Email Address</p>
                <p className="text-sm font-medium text-gray-900">{DASHBOARD_USER.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
              <div className="h-10 w-10 rounded-lg bg-primary-50 flex items-center justify-center">
                <Phone className="h-5 w-5 text-primary-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Phone Number</p>
                <p className="text-sm font-medium text-gray-900">{DASHBOARD_USER.phone}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
              <div className="h-10 w-10 rounded-lg bg-primary-50 flex items-center justify-center">
                <Building2 className="h-5 w-5 text-primary-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Company</p>
                <p className="text-sm font-medium text-gray-900">{DASHBOARD_USER.company}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* GST / PAN Card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Tax Information</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
            <div className="h-10 w-10 rounded-lg bg-blue-50 flex items-center justify-center">
              <CreditCard className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">GST Number</p>
              <p className="text-sm font-medium text-gray-900 font-mono">{DASHBOARD_USER.gst}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
            <div className="h-10 w-10 rounded-lg bg-blue-50 flex items-center justify-center">
              <CreditCard className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">PAN Number</p>
              <p className="text-sm font-medium text-gray-900 font-mono">{DASHBOARD_USER.pan}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Address Card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Address</h3>
        <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
          <div className="h-10 w-10 rounded-lg bg-primary-50 flex items-center justify-center flex-shrink-0">
            <MapPin className="h-5 w-5 text-primary-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">{DASHBOARD_USER.address.street}</p>
            <p className="text-sm text-gray-600">
              {DASHBOARD_USER.address.city}, {DASHBOARD_USER.address.state}
            </p>
            <p className="text-sm text-gray-600">
              {DASHBOARD_USER.address.country} - {DASHBOARD_USER.address.pincode}
            </p>
          </div>
        </div>
      </div>

      {/* KYC Document Upload */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">KYC Documents</h3>
        <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center hover:border-primary-300 transition-colors cursor-pointer">
          <div className="h-12 w-12 rounded-xl bg-primary-50 flex items-center justify-center mx-auto mb-3">
            <Upload className="h-6 w-6 text-primary-600" />
          </div>
          <p className="text-sm font-medium text-gray-900 mb-1">Upload KYC Documents</p>
          <p className="text-xs text-gray-500 mb-3">Aadhaar, PAN card, or business registration certificate</p>
          <button className="px-4 py-2 bg-primary-600 text-white text-sm font-medium rounded-lg hover:bg-primary-700 transition-colors">
            Choose Files
          </button>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button className="px-6 py-2.5 bg-primary-600 text-white text-sm font-semibold rounded-xl hover:bg-primary-700 transition-colors shadow-sm">
          Save Changes
        </button>
      </div>
    </div>
  );
}
