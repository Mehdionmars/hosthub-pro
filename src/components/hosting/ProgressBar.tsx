import { cn } from "@/lib/utils";

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

const stepLabels = [
  "Property",
  "Place type",
  "Location",
  "Basics",
  "Amenities",
  "Photos",
  "Title",
  "Description",
  "Pricing",
  "Review",
];

export const ProgressBar = ({ currentStep, totalSteps }: ProgressBarProps) => {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="sticky top-0 z-50 bg-background border-b border-border">
      {/* Step indicator header */}
      <div className="max-w-screen-lg mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-muted-foreground">
              Step {currentStep} of {totalSteps}
            </span>
            <span className="text-sm font-semibold text-foreground">
              {stepLabels[currentStep - 1]}
            </span>
          </div>
          
          {/* Step dots */}
          <div className="hidden md:flex items-center gap-1.5">
            {stepLabels.map((label, index) => (
              <div
                key={label}
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-300",
                  index + 1 < currentStep && "bg-primary",
                  index + 1 === currentStep && "bg-primary w-6",
                  index + 1 > currentStep && "bg-muted"
                )}
                title={label}
              />
            ))}
          </div>
        </div>
      </div>
      
      {/* Progress bar */}
      <div className="h-1 bg-muted">
        <div
          className="h-full bg-primary transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};
