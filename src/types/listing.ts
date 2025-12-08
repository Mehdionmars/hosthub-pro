export interface ListingData {
  propertyType: string;
  placeType: string;
  location: {
    address: string;
    city: string;
    country: string;
  };
  basics: {
    guests: number;
    bedrooms: number;
    beds: number;
    bathrooms: number;
  };
  amenities: string[];
  photos: string[];
  title: string;
  description: string;
  pricing: {
    basePrice: number;
    currency: string;
  };
}

export const PROPERTY_TYPES = [
  { id: 'house', label: 'House', icon: 'Home' },
  { id: 'apartment', label: 'Apartment', icon: 'Building' },
  { id: 'guesthouse', label: 'Guesthouse', icon: 'Warehouse' },
  { id: 'hotel', label: 'Hotel', icon: 'Hotel' },
] as const;

export const PLACE_TYPES = [
  { id: 'entire', label: 'An entire place', description: 'Guests have the whole place to themselves' },
  { id: 'room', label: 'A room', description: 'Guests have their own room in a home, plus access to shared spaces' },
  { id: 'shared', label: 'A shared room', description: 'Guests sleep in a room or common area that may be shared with you or others' },
] as const;

export const AMENITIES = [
  { id: 'wifi', label: 'Wifi', icon: 'Wifi' },
  { id: 'tv', label: 'TV', icon: 'Tv' },
  { id: 'kitchen', label: 'Kitchen', icon: 'UtensilsCrossed' },
  { id: 'washer', label: 'Washer', icon: 'WashingMachine' },
  { id: 'parking', label: 'Free parking', icon: 'Car' },
  { id: 'ac', label: 'Air conditioning', icon: 'Snowflake' },
  { id: 'workspace', label: 'Dedicated workspace', icon: 'Laptop' },
  { id: 'pool', label: 'Pool', icon: 'Waves' },
  { id: 'hottub', label: 'Hot tub', icon: 'Bath' },
  { id: 'patio', label: 'Patio', icon: 'Fence' },
  { id: 'bbq', label: 'BBQ grill', icon: 'Flame' },
  { id: 'firepit', label: 'Fire pit', icon: 'Flame' },
  { id: 'gym', label: 'Gym', icon: 'Dumbbell' },
  { id: 'breakfast', label: 'Breakfast', icon: 'Coffee' },
  { id: 'smoking', label: 'Smoking allowed', icon: 'Cigarette' },
  { id: 'pets', label: 'Pets allowed', icon: 'PawPrint' },
] as const;
