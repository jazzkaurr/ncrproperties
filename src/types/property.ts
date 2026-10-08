export type LocationOption =
  | 'Faridabad'
  | 'Gurgaon / Gurugram'
  | 'Delhi NCR'
  | 'Palwal'
  | 'Sohna'
  | 'Other';

export type PropertyTypeOption =
  | 'Farmhouse'
  | 'Luxury Farmhouse'
  | 'Farm Land'
  | 'Weekend Home'
  | 'Other';

export interface Property {
  id: string;
  title: string;
  location: LocationOption;
  area: string;
  propertyType: PropertyTypeOption;
  price: string;
  bedrooms?: string;
  bathrooms?: string;
  features: string[];
  description: string;
  image: string;
  status: 'Available on Request' | 'Available' | 'On Request';
}

export interface InquiryFormData {
  fullName: string;
  mobileNumber: string;
  preferredLocation: LocationOption | '';
  propertyType: PropertyTypeOption | '';
  budget: string;
  requirement: string;
  consentAccepted: boolean;
  companyWebsite?: string; // Honeypot field for spam protection
  selectedPropertyTitle?: string;
}

export interface LocationCardItem {
  id: string;
  name: LocationOption;
  description: string;
  highlights: string;
}

export interface CategoryCardItem {
  id: string;
  title: string;
  propertyType: PropertyTypeOption;
  description: string;
  iconName: 'home' | 'sparkles' | 'trees' | 'sun';
}

export interface FeatureCardItem {
  id: string;
  index: string;
  title: string;
  description: string;
}

export interface StepItem {
  number: string;
  title: string;
  description: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}
