import { Home, Building, Warehouse, Hotel } from "lucide-react";
import { cn } from "@/lib/utils";

const icons = {
  Home,
  Building,
  Warehouse,
  Hotel,
};

interface PropertyTypeStepProps {
  selectedType: string;
  onSelect: (type: string) => void;
}

const propertyTypes = [
  { id: 'house', label: 'House', icon: 'Home' },
  { id: 'apartment', label: 'Apartment', icon: 'Building' },
  { id: 'guesthouse', label: 'Guesthouse', icon: 'Warehouse' },
  { id: 'hotel', label: 'Hotel', icon: 'Hotel' },
];

export const PropertyTypeStep = ({ selectedType, onSelect }: PropertyTypeStepProps) => {
  return (
    <div className="animate-fade-in">
      <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
        What type of place will guests have?
      </h1>
      <p className="text-muted-foreground text-lg mb-10">
        Choose the option that best describes your place
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
        {propertyTypes.map((type) => {
          const Icon = icons[type.icon as keyof typeof icons];
          const isSelected = selectedType === type.id;

          return (
            <button
              key={type.id}
              onClick={() => onSelect(type.id)}
              className={cn(
                "flex items-center gap-4 p-6 rounded-2xl border-2 transition-all duration-200 text-left",
                "hover:border-foreground hover:shadow-card",
                isSelected
                  ? "border-foreground bg-secondary shadow-card"
                  : "border-border bg-background"
              )}
            >
              <Icon className="w-8 h-8 text-foreground" strokeWidth={1.5} />
              <span className="text-lg font-semibold text-foreground">{type.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
