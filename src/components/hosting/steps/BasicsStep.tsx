import { Minus, Plus, Users, Bed, Bath, DoorOpen } from "lucide-react";
import { cn } from "@/lib/utils";

interface BasicsStepProps {
  basics: {
    guests: number;
    bedrooms: number;
    beds: number;
    bathrooms: number;
  };
  onUpdate: (basics: { guests: number; bedrooms: number; beds: number; bathrooms: number }) => void;
}

const CounterItem = ({
  icon: Icon,
  label,
  value,
  onIncrement,
  onDecrement,
  min = 1,
  max = 16,
}: {
  icon: typeof Users;
  label: string;
  value: number;
  onIncrement: () => void;
  onDecrement: () => void;
  min?: number;
  max?: number;
}) => (
  <div className="flex items-center justify-between py-6 border-b border-border last:border-b-0">
    <div className="flex items-center gap-4">
      <Icon className="w-6 h-6 text-muted-foreground" strokeWidth={1.5} />
      <span className="text-lg font-medium text-foreground">{label}</span>
    </div>
    <div className="flex items-center gap-4">
      <button
        onClick={onDecrement}
        disabled={value <= min}
        className={cn(
          "w-10 h-10 rounded-full border border-border flex items-center justify-center transition-all",
          value <= min
            ? "opacity-30 cursor-not-allowed"
            : "hover:border-foreground"
        )}
      >
        <Minus className="w-4 h-4" />
      </button>
      <span className="w-8 text-center text-lg font-medium">{value}</span>
      <button
        onClick={onIncrement}
        disabled={value >= max}
        className={cn(
          "w-10 h-10 rounded-full border border-border flex items-center justify-center transition-all",
          value >= max
            ? "opacity-30 cursor-not-allowed"
            : "hover:border-foreground"
        )}
      >
        <Plus className="w-4 h-4" />
      </button>
    </div>
  </div>
);

export const BasicsStep = ({ basics, onUpdate }: BasicsStepProps) => {
  return (
    <div className="animate-fade-in">
      <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
        Share some basics about your place
      </h1>
      <p className="text-muted-foreground text-lg mb-10">
        You'll add more details later, like bed types
      </p>

      <div className="max-w-xl">
        <CounterItem
          icon={Users}
          label="Guests"
          value={basics.guests}
          onIncrement={() => onUpdate({ ...basics, guests: basics.guests + 1 })}
          onDecrement={() => onUpdate({ ...basics, guests: basics.guests - 1 })}
        />
        <CounterItem
          icon={DoorOpen}
          label="Bedrooms"
          value={basics.bedrooms}
          onIncrement={() => onUpdate({ ...basics, bedrooms: basics.bedrooms + 1 })}
          onDecrement={() => onUpdate({ ...basics, bedrooms: basics.bedrooms - 1 })}
          min={0}
        />
        <CounterItem
          icon={Bed}
          label="Beds"
          value={basics.beds}
          onIncrement={() => onUpdate({ ...basics, beds: basics.beds + 1 })}
          onDecrement={() => onUpdate({ ...basics, beds: basics.beds - 1 })}
        />
        <CounterItem
          icon={Bath}
          label="Bathrooms"
          value={basics.bathrooms}
          onIncrement={() => onUpdate({ ...basics, bathrooms: basics.bathrooms + 1 })}
          onDecrement={() => onUpdate({ ...basics, bathrooms: basics.bathrooms - 1 })}
          min={0}
        />
      </div>
    </div>
  );
};
