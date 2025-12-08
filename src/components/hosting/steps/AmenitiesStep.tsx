import { 
  Wifi, Tv, UtensilsCrossed, Car, Snowflake, Laptop, 
  Waves, Bath, Flame, Dumbbell, Coffee, Cigarette, PawPrint, Fence
} from "lucide-react";
import { cn } from "@/lib/utils";

const icons = {
  Wifi,
  Tv,
  UtensilsCrossed,
  Car,
  Snowflake,
  Laptop,
  Waves,
  Bath,
  Flame,
  Dumbbell,
  Coffee,
  Cigarette,
  PawPrint,
  Fence,
};

const amenities = [
  { id: 'wifi', label: 'Wifi', icon: 'Wifi' },
  { id: 'tv', label: 'TV', icon: 'Tv' },
  { id: 'kitchen', label: 'Kitchen', icon: 'UtensilsCrossed' },
  { id: 'parking', label: 'Free parking', icon: 'Car' },
  { id: 'ac', label: 'Air conditioning', icon: 'Snowflake' },
  { id: 'workspace', label: 'Dedicated workspace', icon: 'Laptop' },
  { id: 'pool', label: 'Pool', icon: 'Waves' },
  { id: 'hottub', label: 'Hot tub', icon: 'Bath' },
  { id: 'patio', label: 'Patio', icon: 'Fence' },
  { id: 'bbq', label: 'BBQ grill', icon: 'Flame' },
  { id: 'gym', label: 'Gym', icon: 'Dumbbell' },
  { id: 'breakfast', label: 'Breakfast', icon: 'Coffee' },
  { id: 'smoking', label: 'Smoking allowed', icon: 'Cigarette' },
  { id: 'pets', label: 'Pets allowed', icon: 'PawPrint' },
];

interface AmenitiesStepProps {
  selectedAmenities: string[];
  onToggle: (amenityId: string) => void;
}

export const AmenitiesStep = ({ selectedAmenities, onToggle }: AmenitiesStepProps) => {
  return (
    <div className="animate-fade-in">
      <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
        Tell guests what your place has to offer
      </h1>
      <p className="text-muted-foreground text-lg mb-10">
        You can add more amenities after you publish
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-3xl">
        {amenities.map((amenity) => {
          const Icon = icons[amenity.icon as keyof typeof icons];
          const isSelected = selectedAmenities.includes(amenity.id);

          return (
            <button
              key={amenity.id}
              onClick={() => onToggle(amenity.id)}
              className={cn(
                "flex flex-col items-start gap-3 p-5 rounded-xl border-2 transition-all duration-200",
                "hover:border-foreground",
                isSelected
                  ? "border-foreground bg-secondary"
                  : "border-border bg-background"
              )}
            >
              <Icon className="w-7 h-7 text-foreground" strokeWidth={1.5} />
              <span className="font-medium text-foreground">{amenity.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
