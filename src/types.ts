export type Language = 'en' | 'so' | 'ar';

export type ServiceType =
  | 'flight'
  | 'visa'
  | 'hotel'
  | 'umrah-hajj'
  | 'tour'
  | 'airport-transfer'
  | 'documentation'
  | 'international'
  | 'regional'
  | 'other';

export type OrderStatusType =
  | 'New'
  | 'Pending'
  | 'In Review'
  | 'Assigned'
  | 'Processing'
  | 'Available'
  | 'Confirmed'
  | 'Completed'
  | 'Rejected'
  | 'Cancelled'
  | 'Expired';

export interface ServiceItem {
  id: ServiceType;
  titleKey: string;
  descKey: string;
  iconName: string;
  image: string;
  badge?: string;
  pageRoute?: string;
}

export interface DestinationItem {
  id: string;
  nameKey: string;
  countryKey: string;
  descKey: string;
  image: string;
  highlights: string[];
  region?: string;
}

export interface TourPackage {
  id: string;
  title: string;
  destination: string;
  duration: string;
  image: string;
  description: string;
  highlights: string[];
}

export interface CustomerOrder {
  id: string; // e.g. BT-000125
  serviceType: ServiceType;
  serviceName: string;
  customerName: string;
  phone: string;
  email: string;
  status: OrderStatusType;
  createdAt: string;
  lastUpdated: string;
  destinationSummary?: string;
  travelDateSummary?: string;
  notesToCustomer?: string;
  customerNotes?: string;
  documentType?: string;
  documentNumber?: string;
  documentExpiry?: string;
  documentNationality?: string;
  documentImageName?: string;
  documentImageData?: string;
  expiresAt?: string;
  isExpired?: boolean;
}

export interface FlightRequestData {
  fullName: string;
  phone: string;
  email: string;
  from: string;
  to: string;
  departureDate: string;
  returnDate?: string;
  tripType: 'round-trip' | 'one-way' | 'multi-city';
  passengers: number;
  travelClass: 'Economy' | 'Premium Economy' | 'Business' | 'First Class';
  additionalRequirements?: string;
  passportNumber?: string;
  passportExpiry?: string;
  documentNationality?: string;
  documentImageData?: string;
  documentImageName?: string;
}

export interface VisaRequestData {
  fullName: string;
  phone: string;
  email: string;
  destinationCountry: string;
  visaType: string;
  intendedTravelDate: string;
  nationality: string;
  passportAvailability: 'valid' | 'in-progress' | 'needs-renewal';
  additionalInfo?: string;
  passportNumber?: string;
  passportExpiry?: string;
  documentImageData?: string;
  documentImageName?: string;
}

export interface HotelRequestData {
  fullName: string;
  phone: string;
  email: string;
  destination: string;
  checkInDate: string;
  checkOutDate: string;
  guests: number;
  rooms: number;
  hotelPreference: '3-star' | '4-star' | '5-star' | 'resort' | 'flexible';
  additionalRequirements?: string;
}

export interface UmrahHajjRequestData {
  fullName: string;
  phone: string;
  email: string;
  service: 'umrah' | 'hajj' | 'both';
  travelers: number;
  preferredTravelDate: string;
  additionalRequirements?: string;
}

export interface UniversalRequestData {
  fullName: string;
  phone: string;
  email: string;
  serviceType: ServiceType;
  destination: string;
  travelDate: string;
  returnDate?: string;
  message: string;
}

export interface ContactMessageData {
  fullName: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
}

export type ViewRoute =
  | 'home'
  | 'about'
  | 'services'
  | 'flight-tickets'
  | 'visa-services'
  | 'hotel-booking'
  | 'umrah-hajj'
  | 'tour-packages'
  | 'destinations'
  | 'request-service'
  | 'check-order'
  | 'contact'
  | 'faq';
