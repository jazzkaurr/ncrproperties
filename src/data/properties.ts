import {
  Property,
  LocationOption,
  PropertyTypeOption,
  LocationCardItem,
  CategoryCardItem,
  FeatureCardItem,
  StepItem,
  FAQItem,
} from '../types/property';

import heroFarmhouseImg from '../assets/images/hero_ncr_farmhouse_1791387734889.jpg';
import sohnaEstateImg from '../assets/images/property_sohna_estate_1791387751793.jpg';
import faridabadRetreatImg from '../assets/images/property_faridabad_retreat_1791387769183.jpg';
import gurgaonVillaImg from '../assets/images/property_gurgaon_villa_1791387782489.jpg';
import palwalFarmlandImg from '../assets/images/property_palwal_farmland_1791387793359.jpg';

export const HERO_IMAGE_URL = heroFarmhouseImg;

export const BUSINESS_NAME = 'NCR Properties';
export const DISPLAY_PHONE = '+91 98999 90140';
export const WHATSAPP_NUMBER = '919899990140';
export const TEL_LINK = 'tel:+919899990140';

export const DEFAULT_WHATSAPP_MESSAGE =
  'Hello, I am interested in farmhouse properties in NCR. Please share the available options.';

export const CTA_WHATSAPP_MESSAGE =
  'Hello, I am looking for a farmhouse in NCR. Please share the available options.';

export function getWhatsAppUrl(message: string = DEFAULT_WHATSAPP_MESSAGE): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const LOCATION_OPTIONS: LocationOption[] = [
  'Faridabad',
  'Gurgaon / Gurugram',
  'Delhi NCR',
  'Palwal',
  'Sohna',
  'Other',
];

export const PROPERTY_TYPE_OPTIONS: PropertyTypeOption[] = [
  'Farmhouse',
  'Luxury Farmhouse',
  'Farm Land',
  'Weekend Home',
  'Other',
];

export const BUDGET_OPTIONS: string[] = [
  'Under ₹1 Crore',
  '₹1 Crore – ₹2.5 Crore',
  '₹2.5 Crore – ₹5 Crore',
  '₹5 Crore – ₹10 Crore',
  'Above ₹10 Crore',
  'Flexible / Discuss with Team',
];

export const FEATURED_PROPERTIES: Property[] = [
  {
    id: 'prop-sohna-01',
    title: 'Aravalli View Farmhouse',
    location: 'Sohna',
    area: '1 Acre',
    propertyType: 'Luxury Farmhouse',
    price: 'Price on Request',
    bedrooms: '4 Bedrooms',
    bathrooms: '4 Bathrooms',
    features: ['Landscaped Lawn', 'Gated Entry', 'Aravalli Surroundings', 'Private Driveway'],
    description:
      'Luxury farmhouse option in the Sohna belt with open lawn areas and peaceful green surroundings. Contact our team to check available options matching this profile.',
    image: sohnaEstateImg,
    status: 'On Request',
  },
  {
    id: 'prop-faridabad-02',
    title: 'Green Belt Weekend Farmhouse',
    location: 'Faridabad',
    area: '0.5 – 1 Acre',
    propertyType: 'Weekend Home',
    price: 'Price on Request',
    bedrooms: '3 Bedrooms',
    bathrooms: '3 Bathrooms',
    features: ['Wide Veranda', 'Mature Trees', 'Boundary Wall', 'Road Connectivity'],
    description:
      'Weekend farmhouse and private retreat options around Faridabad suitable for family gatherings and quiet weekends away from the city.',
    image: faridabadRetreatImg,
    status: 'On Request',
  },
  {
    id: 'prop-gurgaon-03',
    title: 'Contemporary Estate Farmhouse',
    location: 'Gurgaon / Gurugram',
    area: '1 – 2 Acres',
    propertyType: 'Farmhouse',
    price: 'Price on Request',
    bedrooms: '4–5 Bedrooms',
    bathrooms: '5 Bathrooms',
    features: ['Modern Architecture', 'Private Courtyard', 'Spacious Lawn', 'Staff Quarter Provision'],
    description:
      'Modern farmhouse configurations around Gurgaon and nearby sectors. Share your requirement to receive options available in this corridor.',
    image: gurgaonVillaImg,
    status: 'On Request',
  },
  {
    id: 'prop-palwal-04',
    title: 'Open Acreage & Country Farm Land',
    location: 'Palwal',
    area: '1 – 3 Acres',
    propertyType: 'Farm Land',
    price: 'Price on Request',
    features: ['Expansive Land Parcel', 'Peaceful Environment', 'Custom Development Scope', 'Approach Road'],
    description:
      'Larger farm land and open acreage opportunities around Palwal for buyers seeking generous outdoor space or custom farmhouse development.',
    image: palwalFarmlandImg,
    status: 'On Request',
  },
];

export const NCR_LOCATIONS: LocationCardItem[] = [
  {
    id: 'loc-faridabad',
    name: 'Faridabad',
    description: 'Farmhouse and private property options around Faridabad.',
    highlights: 'Accessible weekend retreats & green pockets',
  },
  {
    id: 'loc-gurgaon',
    name: 'Gurgaon / Gurugram',
    description: 'Explore farmhouse opportunities around Gurgaon and nearby areas.',
    highlights: 'Private estates & established farmhouse belts',
  },
  {
    id: 'loc-delhi-ncr',
    name: 'Delhi NCR',
    description: 'Discover property options across the wider NCR region.',
    highlights: 'Connected corridors across the National Capital Region',
  },
  {
    id: 'loc-palwal',
    name: 'Palwal',
    description: 'Explore spacious farmhouse and land options around Palwal.',
    highlights: 'Larger land parcels & open countryside settings',
  },
  {
    id: 'loc-sohna',
    name: 'Sohna',
    description: 'Find farmhouse properties surrounded by greenery and peaceful surroundings.',
    highlights: 'Scenic backdrops & tranquil weekend homes',
  },
];

export const PROPERTY_CATEGORIES: CategoryCardItem[] = [
  {
    id: 'cat-farmhouses',
    title: 'Farmhouses',
    propertyType: 'Farmhouse',
    description: 'Spacious properties for weekends, family time and private gatherings.',
    iconName: 'home',
  },
  {
    id: 'cat-luxury-farmhouses',
    title: 'Luxury Farmhouses',
    propertyType: 'Luxury Farmhouse',
    description: 'Premium properties with modern construction and comfortable amenities.',
    iconName: 'sparkles',
  },
  {
    id: 'cat-farm-land',
    title: 'Farm Land',
    propertyType: 'Farm Land',
    description: 'Larger land options for buyers looking for more space.',
    iconName: 'trees',
  },
  {
    id: 'cat-weekend-homes',
    title: 'Weekend Homes',
    propertyType: 'Weekend Home',
    description: "Comfortable properties away from the city's daily rush.",
    iconName: 'sun',
  },
];

export const WHY_CHOOSE_US_FEATURES: FeatureCardItem[] = [
  {
    id: 'feat-locations',
    index: '01',
    title: 'Multiple NCR Locations',
    description: 'Explore property options across key NCR locations.',
  },
  {
    id: 'feat-search',
    index: '02',
    title: 'Simple Property Search',
    description: 'Share your preferred location, budget and requirements.',
  },
  {
    id: 'feat-assistance',
    index: '03',
    title: 'Direct Assistance',
    description: 'Speak directly with our property team.',
  },
  {
    id: 'feat-information',
    index: '04',
    title: 'Clear Information',
    description: 'Get straightforward property information before making a decision.',
  },
  {
    id: 'feat-support',
    index: '05',
    title: 'Personalised Support',
    description: 'We help you explore options according to your requirements.',
  },
];

export const HOW_IT_WORKS_STEPS: StepItem[] = [
  {
    number: '01',
    title: 'Tell Us Your Requirement',
    description: 'Share your preferred location, budget and property requirements.',
  },
  {
    number: '02',
    title: 'Explore Suitable Options',
    description: 'Our team contacts you with relevant available options.',
  },
  {
    number: '03',
    title: 'Schedule a Visit',
    description: 'Arrange a property visit when suitable.',
  },
  {
    number: '04',
    title: 'Make Your Decision',
    description: 'Choose the property that fits your requirements.',
  },
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'Which locations do you cover?',
    answer:
      'We deal in farmhouse and property options across Faridabad, Gurgaon, Delhi NCR, Palwal and Sohna.',
  },
  {
    id: 'faq-2',
    question: 'Can I schedule a property visit?',
    answer:
      'Yes. Contact us through phone or WhatsApp and our team can assist you with available property visits.',
  },
  {
    id: 'faq-3',
    question: 'Do you have properties for different budgets?',
    answer:
      'Available properties can vary by location, size, features and budget. Share your requirements and we can help you explore suitable options.',
  },
  {
    id: 'faq-4',
    question: 'Can I enquire through WhatsApp?',
    answer:
      'Yes. You can directly WhatsApp our property team at +91 98999 90140.',
  },
  {
    id: 'faq-5',
    question: 'Can I get property details before visiting?',
    answer:
      'Yes. Share your requirements and we can provide available information before arranging a visit.',
  },
  {
    id: 'faq-6',
    question: 'Are all properties legally verified?',
    answer:
      'Property documentation and legal status should always be independently verified before making a purchase. Do not rely on the website as a substitute for legal or professional property verification.',
  },
];
