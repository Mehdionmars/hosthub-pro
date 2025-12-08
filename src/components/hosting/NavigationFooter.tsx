import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface NavigationFooterProps {
  onBack: () => void;
  onNext: () => void;
  canGoBack: boolean;
  canGoNext: boolean;
  isLastStep?: boolean;
  isLoading?: boolean;
}

export const NavigationFooter = ({
  onBack,
  onNext,
  canGoBack,
  canGoNext,
  isLastStep = false,
  isLoading = false,
}: NavigationFooterProps) => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 z-40 bg-background border-t border-border">
      <div className="max-w-screen-xl mx-auto px-6 py-4 flex items-center justify-between">
        <Button
          variant="ghost"
          onClick={onBack}
          disabled={!canGoBack}
          className={cn(
            "text-foreground underline underline-offset-4 font-semibold",
            !canGoBack && "opacity-0 pointer-events-none"
          )}
        >
          Back
        </Button>
        <Button
          variant={isLastStep ? "hero" : "default"}
          onClick={onNext}
          disabled={!canGoNext || isLoading}
          size="lg"
          className="min-w-[140px]"
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Publishing...
            </span>
          ) : isLastStep ? (
            "Publish listing"
          ) : (
            "Next"
          )}
        </Button>
      </div>
    </footer>
  );
};
