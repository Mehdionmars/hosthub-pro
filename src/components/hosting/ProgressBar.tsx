import { cn } from "@/lib/utils";
import { AlertCircle, Check } from "lucide-react";

export type StepStatus = "complete" | "incomplete" | "current" | "upcoming";

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  stepStatuses?: StepStatus[];
  onStepClick?: (step: number) => void;
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

export const ProgressBar = ({ currentStep, totalSteps, stepStatuses, onStepClick }: ProgressBarProps) => {
  const progress = (currentStep / totalSteps) * 100;

  const handleStepClick = (stepIndex: number) => {
    const step = stepIndex + 1;
    // Only allow clicking on completed steps or the current step
    if (step <= currentStep && onStepClick) {
      onStepClick(step);
    }
  };

  const getStepStatus = (index: number): StepStatus => {
    if (stepStatuses && stepStatuses[index]) {
      return stepStatuses[index];
    }
    if (index + 1 < currentStep) return "complete";
    if (index + 1 === currentStep) return "current";
    return "upcoming";
  };

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
            {stepLabels.map((label, index) => {
              const status = getStepStatus(index);
              return (
                <button
                  key={label}
                  onClick={() => handleStepClick(index)}
                  disabled={index + 1 > currentStep}
                  className={cn(
                    "h-2 rounded-full transition-all duration-300 flex items-center justify-center",
                    status === "complete" && "bg-primary w-2 cursor-pointer hover:scale-125",
                    status === "incomplete" && "bg-destructive w-2 cursor-pointer hover:scale-125",
                    status === "current" && "bg-primary w-6 cursor-default",
                    status === "upcoming" && "bg-muted w-2 cursor-not-allowed opacity-50"
                  )}
                  title={
                    status === "incomplete" 
                      ? `${label} - Incomplete` 
                      : index + 1 <= currentStep 
                        ? `Go to ${label}` 
                        : label
                  }
                />
              );
            })}
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
