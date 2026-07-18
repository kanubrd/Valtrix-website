export interface DocumentItem {
  id: string;
  title: string;
  productName: string;
  productId: string;
  type: 'SDS' | 'TDS';
  fileSize: string;
  filePath: string; // Placeholder links
}

export const documentsList: DocumentItem[] = [
  // Metals & Alloys Sourcing
  {
    id: 'metals-alloys-sds',
    title: 'Safety Data Sheet (SDS) - Metals & Alloys',
    productName: 'Metals & Alloys Sourcing',
    productId: 'metals-alloys',
    type: 'SDS',
    fileSize: '245 KB',
    filePath: '#',
  },
  {
    id: 'metals-alloys-tds',
    title: 'Technical Data Sheet (TDS) - Metals & Alloys',
    productName: 'Metals & Alloys Sourcing',
    productId: 'metals-alloys',
    type: 'TDS',
    fileSize: '312 KB',
    filePath: '#',
  },
  // Polymers & Composites
  {
    id: 'polymers-composites-sds',
    title: 'Safety Data Sheet (SDS) - Polymers & Composites',
    productName: 'Polymers & Composites',
    productId: 'polymers-composites',
    type: 'SDS',
    fileSize: '280 KB',
    filePath: '#',
  },
  {
    id: 'polymers-composites-tds',
    title: 'Technical Data Sheet (TDS) - Polymers & Composites',
    productName: 'Polymers & Composites',
    productId: 'polymers-composites',
    type: 'TDS',
    fileSize: '385 KB',
    filePath: '#',
  },
  // Coatings & Surface Chemicals
  {
    id: 'coatings-chemicals-sds',
    title: 'Safety Data Sheet (SDS) - Coatings & Surface Chemicals',
    productName: 'Coatings & Surface Chemicals',
    productId: 'coatings-surface-chemicals',
    type: 'SDS',
    fileSize: '412 KB',
    filePath: '#',
  },
  {
    id: 'coatings-chemicals-tds',
    title: 'Technical Data Sheet (TDS) - Coatings & Surface Chemicals',
    productName: 'Coatings & Surface Chemicals',
    productId: 'coatings-surface-chemicals',
    type: 'TDS',
    fileSize: '512 KB',
    filePath: '#',
  },
  // Compliance & Certification
  {
    id: 'compliance-certs-sds',
    title: 'Safety Data Sheet (SDS) - Compliance Guidelines',
    productName: 'Compliance & Certification Management',
    productId: 'compliance-certification',
    type: 'SDS',
    fileSize: '198 KB',
    filePath: '#',
  },
  {
    id: 'compliance-certs-tds',
    title: 'Technical Data Sheet (TDS) - Material Auditing Standards',
    productName: 'Compliance & Certification Management',
    productId: 'compliance-certification',
    type: 'TDS',
    fileSize: '284 KB',
    filePath: '#',
  },
  // Multi-Site Fulfillment
  {
    id: 'multi-site-fulfillment-sds',
    title: 'Safety Data Sheet (SDS) - Split Shipping Standards',
    productName: 'Multi-Site Fulfillment Coordination',
    productId: 'multi-site-fulfillment',
    type: 'SDS',
    fileSize: '185 KB',
    filePath: '#',
  },
  {
    id: 'multi-site-fulfillment-tds',
    title: 'Technical Data Sheet (TDS) - Multi-Location Logistics Rules',
    productName: 'Multi-Site Fulfillment Coordination',
    productId: 'multi-site-fulfillment',
    type: 'TDS',
    fileSize: '422 KB',
    filePath: '#',
  },
  // Inventory Intelligence
  {
    id: 'inventory-intelligence-sds',
    title: 'Safety Data Sheet (SDS) - Predictive Reorder Cadences',
    productName: 'Predictive Reorder & Inventory Intelligence',
    productId: 'inventory-intelligence',
    type: 'SDS',
    fileSize: '210 KB',
    filePath: '#',
  },
  {
    id: 'inventory-intelligence-tds',
    title: 'Technical Data Sheet (TDS) - Production Sync System API',
    productName: 'Predictive Reorder & Inventory Intelligence',
    productId: 'inventory-intelligence',
    type: 'TDS',
    fileSize: '394 KB',
    filePath: '#',
  },
];
