import { cn } from "@/lib/utils";

interface PlaceTypeStepProps {
  selectedType: string;
  onSelect: (type: string) => void;
}

const placeTypes = [
  { 
    id: 'entire', 
    label: 'An entire place', 
    description: 'Guests have the whole place to themselves' 
  },
  { 
    id: 'room', 
    label: 'A room', 
    description: 'Guests have their own room in a home, plus access to shared spaces' 
  },
  { 
    id: 'shared', 
    label: 'A shared room', 
    description: 'Guests sleep in a room or common area that may be shared with you or others' 
  },
];

export const PlaceTypeStep = ({ selectedType, onSelect }: PlaceTypeStepProps) => {
  return (
    <div className="animate-fade-in">
      <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
        What type of place will guests have?
      </h1>
      <p className="text-muted-foreground text-lg mb-10">
        Choose the type of space guests will stay in
      </p>

      <div className="flex flex-col gap-4 max-w-2xl">
        {placeTypes.map((type) => {
          const isSelected = selectedType === type.id;

          return (
            <button
              key={type.id}
              onClick={() => onSelect(type.id)}
              className={cn(
                "flex flex-col items-start p-6 rounded-2xl border-2 transition-all duration-200 text-left",
                "hover:border-foreground hover:shadow-card",
                isSelected
                  ? "border-foreground bg-secondary shadow-card"
                  : "border-border bg-background"
              )}
            >
              <span className="text-lg font-semibold text-foreground mb-1">{type.label}</span>
              <span className="text-muted-foreground">{type.description}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
