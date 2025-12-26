
export interface Location {
  country: string;
  state: string;
  city: string;
}

export interface Currency {
  code: string;
  symbol: string;
  name: string;
}

export interface TravelPreferences {
  origin: Location;
  destination: Location;
  passportCountry: string;
  budget: number;
  currency: string;
  durationDays: number;
  themes: string[];
  startDate?: string;
  travelers: {
    adults: number;
    children: number;
    seniors: number;
  };
}

export interface ItineraryDay {
  day: number;
  date?: string;
  theme: string;
  activities: {
    time: string;
    title: string;
    description: string;
    cost: number;
    location: string;
    tips?: string;
    travelTimeBuffer?: string;
  }[];
}

export interface PackingItem {
  category: string;
  item: string;
  quantity: string;
  essential: boolean;
}

export interface TranslationPair {
  phrase: string;
  translation: string;
}

export interface TransportationMeans {
  type: string;
  description: string;
  costEstimate: string;
}

export interface RealTimePrice {
  service: string;
  price: string;
  sourceUrl: string;
  lastUpdated: string;
}

export interface TripItinerary {
  id?: string;
  title: string;
  overview: string;
  days: ItineraryDay[];
  packingList: PackingItem[];
  budgetBreakdown: {
    accommodation: number;
    food: number;
    transport: number;
    activities: number;
    misc: number;
  };
  localTips: string[];
  weather: {
    averageTemp: string;
    conditions: string;
    advice: string;
  };
  realTimePricing: {
    flights: RealTimePrice[];
    trains: RealTimePrice[];
    hotels: RealTimePrice[];
  };
  visaInfo: {
    requirement: string;
    cost: string;
    processingTime: string;
    documents: string[];
  };
  paymentAdvice: {
    method: string;
    tipping: string;
    currencyTips: string;
  };
  connectivity: {
    simOptions: string[];
    wifiRating: string;
  };
  transportationAdvice: {
    overall: string;
    bestMeans: TransportationMeans[];
  };
  mapInformation: {
    summary: string;
    navTips: string[];
  };
  insiderKnowledge: {
    secretSpots: string[];
    touristTraps: string[];
    localSecrets: string[];
    bestTimeForPhotos: string;
    instagrammableSpots: string[];
  };
  emergencyContacts: {
    police: string;
    medical: string;
    embassy: string;
  };
  etiquette: {
    dos: string[];
    donts: string[];
    dressCode: string;
  };
  dietaryAdvice: {
    translator: TranslationPair[];
    warnings: string[];
    safeStreetFoodProtocols: string[];
  };
  availabilityAlerts: {
    type: 'Flight' | 'Hotel' | 'Train';
    message: string;
    provider: 'MakeMyTrip';
    link: string;
  }[];
  groundingSources?: { title: string; uri: string }[];
  savedAt?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  savedTrips: TripItinerary[];
}
