import { MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";

interface LocationStepProps {
  location: {
    address: string;
    city: string;
    country: string;
  };
  onUpdate: (location: { address: string; city: string; country: string }) => void;
}

export const LocationStep = ({ location, onUpdate }: LocationStepProps) => {
  return (
    <div className="animate-fade-in">
      <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
        Where's your place located?
      </h1>
      <p className="text-muted-foreground text-lg mb-10">
        Your address is only shared with guests after they've made a reservation
      </p>

      <div className="max-w-xl space-y-6">
        <div className="relative">
          <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Street address"
            value={location.address}
            onChange={(e) => onUpdate({ ...location, address: e.target.value })}
            className="pl-12 h-14 text-lg rounded-xl border-2 focus:border-foreground"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Input
            type="text"
            placeholder="City"
            value={location.city}
            onChange={(e) => onUpdate({ ...location, city: e.target.value })}
            className="h-14 text-lg rounded-xl border-2 focus:border-foreground"
          />
          <Input
            type="text"
            placeholder="Country"
            value={location.country}
            onChange={(e) => onUpdate({ ...location, country: e.target.value })}
            className="h-14 text-lg rounded-xl border-2 focus:border-foreground"
          />
        </div>

        <div className="mt-8 p-6 bg-secondary rounded-2xl">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center">
              <MapPin className="w-6 h-6 text-accent-foreground" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-1">Your location matters</h3>
              <p className="text-muted-foreground text-sm">
                A great location can make your listing stand out and attract more guests.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
