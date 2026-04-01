export interface DashboardUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  gst: string;
  pan: string;
  address: {
    street: string;
    city: string;
    state: string;
    country: string;
    pincode: string;
  };
  kycStatus: 'pending' | 'verified' | 'rejected';
  avatar: string;
}

export interface Enquiry {
  id: string;
  type: 'buy' | 'sell';
  material: string;
  quantity: string;
  status: 'pending' | 'approved' | 'rejected';
  date: string;
  price: string;
}

export interface Notification {
  id: string;
  type: 'enquiry_update' | 'price_update' | 'system';
  title: string;
  message: string;
  date: string;
  read: boolean;
}

export interface DashboardStats {
  totalEnquiries: number;
  activeEnquiries: number;
  completedEnquiries: number;
  pendingApprovals: number;
}

export const DASHBOARD_USER: DashboardUser = {
  id: 'u1',
  name: 'Rajesh Kumar',
  email: 'rajesh.kumar@globalmetals.in',
  phone: '+91 98765 43210',
  company: 'Global Metal Recyclers Pvt Ltd',
  gst: '27AABCU9603R1ZM',
  pan: 'AABCU9603R',
  address: {
    street: '42, Industrial Area Phase II',
    city: 'Mumbai',
    state: 'Maharashtra',
    country: 'India',
    pincode: '400001',
  },
  kycStatus: 'verified',
  avatar: '',
};

export const DASHBOARD_STATS: DashboardStats = {
  totalEnquiries: 156,
  activeEnquiries: 23,
  completedEnquiries: 118,
  pendingApprovals: 15,
};

export const RECENT_ENQUIRIES: Enquiry[] = [
  {
    id: 'EQ-2024-001',
    type: 'buy',
    material: 'Aluminum Scrap 6063',
    quantity: '5,000 kg',
    status: 'approved',
    date: '2024-01-15',
    price: '$1.25/kg',
  },
  {
    id: 'EQ-2024-002',
    type: 'sell',
    material: 'Copper Wire Scrap (Millberry)',
    quantity: '1,500 kg',
    status: 'pending',
    date: '2024-01-14',
    price: '$6.80/kg',
  },
  {
    id: 'EQ-2024-003',
    type: 'buy',
    material: 'HDPE Blue Drums',
    quantity: '2,500 kg',
    status: 'rejected',
    date: '2024-01-13',
    price: '$0.45/kg',
  },
  {
    id: 'EQ-2024-004',
    type: 'sell',
    material: 'Mixed Office Paper',
    quantity: '10,000 kg',
    status: 'approved',
    date: '2024-01-12',
    price: '$0.15/kg',
  },
  {
    id: 'EQ-2024-005',
    type: 'buy',
    material: 'E-Waste Motherboards',
    quantity: '200 kg',
    status: 'pending',
    date: '2024-01-11',
    price: '$4.50/kg',
  },
];

export const ALL_ENQUIRIES: Enquiry[] = [
  ...RECENT_ENQUIRIES,
  {
    id: 'EQ-2024-006',
    type: 'buy',
    material: 'Steel Scrap HMS 1&2',
    quantity: '8,000 kg',
    status: 'approved',
    date: '2024-01-10',
    price: '$0.38/kg',
  },
  {
    id: 'EQ-2024-007',
    type: 'sell',
    material: 'Brass Scrap',
    quantity: '500 kg',
    status: 'rejected',
    date: '2024-01-09',
    price: '$3.20/kg',
  },
  {
    id: 'EQ-2024-008',
    type: 'buy',
    material: 'PET Bottle Scrap',
    quantity: '3,000 kg',
    status: 'approved',
    date: '2024-01-08',
    price: '$0.52/kg',
  },
  {
    id: 'EQ-2024-009',
    type: 'sell',
    material: 'Aluminum Extrusions',
    quantity: '1,200 kg',
    status: 'pending',
    date: '2024-01-07',
    price: '$1.10/kg',
  },
  {
    id: 'EQ-2024-010',
    type: 'buy',
    material: 'Stainless Steel 304',
    quantity: '2,000 kg',
    status: 'approved',
    date: '2024-01-06',
    price: '$1.85/kg',
  },
  {
    id: 'EQ-2024-011',
    type: 'sell',
    material: 'Lead Acid Batteries',
    quantity: '800 kg',
    status: 'rejected',
    date: '2024-01-05',
    price: '$0.65/kg',
  },
  {
    id: 'EQ-2024-012',
    type: 'buy',
    material: 'Zinc Die Cast Scrap',
    quantity: '1,500 kg',
    status: 'pending',
    date: '2024-01-04',
    price: '$1.45/kg',
  },
];

export const NOTIFICATIONS: Notification[] = [
  {
    id: 'n1',
    type: 'enquiry_update',
    title: 'Enquiry Approved',
    message: 'Your enquiry for Aluminum Scrap 6063 (EQ-2024-001) has been approved by Global Metal Recyclers.',
    date: '2024-01-15T10:30:00',
    read: false,
  },
  {
    id: 'n2',
    type: 'price_update',
    title: 'Price Alert: Copper',
    message: 'Copper wire scrap prices have increased by 2.5% in the last 24 hours. Current market rate: $6.95/kg.',
    date: '2024-01-15T09:15:00',
    read: false,
  },
  {
    id: 'n3',
    type: 'enquiry_update',
    title: 'Enquiry Rejected',
    message: 'Your enquiry for HDPE Blue Drums (EQ-2024-003) was rejected. Reason: Minimum quantity not met.',
    date: '2024-01-14T16:45:00',
    read: true,
  },
  {
    id: 'n4',
    type: 'system',
    title: 'KYC Verified',
    message: 'Your KYC documents have been successfully verified. You can now access all platform features.',
    date: '2024-01-14T11:00:00',
    read: true,
  },
  {
    id: 'n5',
    type: 'price_update',
    title: 'Price Alert: Aluminum',
    message: 'Aluminum scrap prices have dropped by 1.2%. Current market rate: $1.22/kg.',
    date: '2024-01-13T14:20:00',
    read: true,
  },
  {
    id: 'n6',
    type: 'enquiry_update',
    title: 'New Quote Received',
    message: 'You have received a new quote for your Steel Scrap enquiry from EcoPlastic Solutions.',
    date: '2024-01-13T10:00:00',
    read: true,
  },
  {
    id: 'n7',
    type: 'system',
    title: 'Profile Update',
    message: 'Your company profile has been updated successfully.',
    date: '2024-01-12T15:30:00',
    read: true,
  },
];
