import { DollarSign, Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface PricingStepProps {
  pricing: {
    basePrice: number;
    currency: string;
  };
  onUpdate: (pricing: { basePrice: number; currency: string }) => void;
}

export const PricingStep = ({ pricing, onUpdate }: PricingStepProps) => {
  const adjustPrice = (amount: number) => {
    const newPrice = Math.max(10, Math.min(10000, pricing.basePrice + amount));
    onUpdate({ ...pricing, basePrice: newPrice });
  };

  const guestServiceFee = Math.round(pricing.basePrice * 0.14);
  const hostServiceFee = Math.round(pricing.basePrice * 0.03);
  const guestTotal = pricing.basePrice + guestServiceFee;
  const youEarn = pricing.basePrice - hostServiceFee;

  return (
    <div className="animate-fade-in">
      <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
        Now, set your price
      </h1>
      <p className="text-muted-foreground text-lg mb-10">
        You can change it anytime.
      </p>

      <div className="max-w-xl">
        <div className="flex items-center justify-center gap-6 py-12">
          <button
            onClick={() => adjustPrice(-5)}
            className="w-14 h-14 rounded-full border-2 border-border hover:border-foreground flex items-center justify-center transition-colors"
          >
            <Minus className="w-5 h-5" />
          </button>

          <div className="flex items-center">
            <span className="text-6xl md:text-7xl font-bold text-foreground">
              ${pricing.basePrice}
            </span>
          </div>

          <button
            onClick={() => adjustPrice(5)}
            className="w-14 h-14 rounded-full border-2 border-border hover:border-foreground flex items-center justify-center transition-colors"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>

        <p className="text-center text-muted-foreground mb-8">per night</p>

        <div className="space-y-4 p-6 bg-secondary rounded-2xl">
          <div className="flex justify-between items-center pb-4 border-b border-border">
            <span className="text-muted-foreground">Base price</span>
            <span className="font-medium">${pricing.basePrice}</span>
          </div>
          <div className="flex justify-between items-center pb-4 border-b border-border">
            <span className="text-muted-foreground">Guest service fee</span>
            <span className="font-medium">${guestServiceFee}</span>
          </div>
          <div className="flex justify-between items-center pb-4 border-b border-border">
            <span className="text-muted-foreground">Guest price before taxes</span>
            <span className="font-semibold">${guestTotal}</span>
          </div>
          <div className="flex justify-between items-center pt-2">
            <span className="text-foreground font-semibold">You earn</span>
            <span className="text-xl font-bold text-primary">${youEarn}</span>
          </div>
        </div>

        <div className="mt-6 flex gap-2 justify-center">
          {[50, 75, 100, 150, 200].map((price) => (
            <button
              key={price}
              onClick={() => onUpdate({ ...pricing, basePrice: price })}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-colors",
                pricing.basePrice === price
                  ? "bg-foreground text-background"
                  : "bg-secondary hover:bg-border text-foreground"
              )}
            >
              ${price}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
