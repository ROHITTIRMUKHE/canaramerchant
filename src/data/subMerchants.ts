// Shared Sub-Merchant Data
export const subMerchantData = [
  {
    id: 'SM001',
    name: 'ABC Electronics Store',
    tradeName: 'ABC Electronics',
    mobile: '9876543210',
    email: 'abc@electronics.com',
    vpa: 'abcelectronics@canarabank',
    status: 'Active',
    createdDate: '2024-01-15',
    lastActive: '2024-12-26',
    dailyLimit: 100000,
    monthlyLimit: 2500000,
    address: '123 MG Road, Bangalore',
    city: 'Bangalore',
    state: 'Karnataka',
    pincode: '560001',
    totalTransactions: 1245,
    totalVolume: 1856000
  },
  {
    id: 'SM002',
    name: 'Quick Mart Groceries',
    tradeName: 'Quick Mart',
    mobile: '9876543211',
    email: 'quickmart@gmail.com',
    vpa: 'quickmart@canarabank',
    status: 'Active',
    createdDate: '2024-02-20',
    lastActive: '2024-12-25',
    dailyLimit: 75000,
    monthlyLimit: 1500000,
    address: '456 HSR Layout',
    city: 'Bangalore',
    state: 'Karnataka',
    pincode: '560102',
    totalTransactions: 856,
    totalVolume: 945000
  },
  {
    id: 'SM003',
    name: 'Fashion Hub Boutique',
    tradeName: 'Fashion Hub',
    mobile: '9876543212',
    email: 'fashionhub@store.com',
    vpa: 'fashionhub@canarabank',
    status: 'Suspended',
    createdDate: '2024-03-10',
    lastActive: '2024-11-15',
    dailyLimit: 50000,
    monthlyLimit: 1000000,
    address: '789 Indiranagar',
    city: 'Bangalore',
    state: 'Karnataka',
    pincode: '560038',
    totalTransactions: 423,
    totalVolume: 567000
  },
  {
    id: 'SM004',
    name: 'Tech Solutions Pvt Ltd',
    tradeName: 'Tech Solutions',
    mobile: '9876543213',
    email: 'tech@solutions.com',
    vpa: 'techsolutions@canarabank',
    status: 'Active',
    createdDate: '2024-04-05',
    lastActive: '2024-12-26',
    dailyLimit: 200000,
    monthlyLimit: 5000000,
    address: '321 Whitefield',
    city: 'Bangalore',
    state: 'Karnataka',
    pincode: '560066',
    totalTransactions: 2156,
    totalVolume: 4560000
  },
  {
    id: 'SM005',
    name: 'Fresh Foods Market',
    tradeName: 'Fresh Foods',
    mobile: '9876543214',
    email: 'freshfoods@market.com',
    vpa: 'freshfoods@canarabank',
    status: 'Revoked',
    createdDate: '2024-01-25',
    lastActive: '2024-08-10',
    dailyLimit: 0,
    monthlyLimit: 0,
    address: '654 Jayanagar',
    city: 'Bangalore',
    state: 'Karnataka',
    pincode: '560041',
    totalTransactions: 189,
    totalVolume: 234000
  }
];

export type SubMerchant = typeof subMerchantData[0];

// Helper function to get active sub-merchants count
export const getActiveSubMerchantsCount = () => {
  return subMerchantData.filter(m => m.status === 'Active').length;
};

// Helper function to get active sub-merchants
export const getActiveSubMerchants = () => {
  return subMerchantData.filter(m => m.status === 'Active');
};
