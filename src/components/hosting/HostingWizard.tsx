import { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Eye } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { ProgressBar, StepStatus } from "./ProgressBar";
import { NavigationFooter } from "./NavigationFooter";
import { ListingPreview } from "./ListingPreview";
import { PropertyTypeStep } from "./steps/PropertyTypeStep";
import { PlaceTypeStep } from "./steps/PlaceTypeStep";
import { LocationStep } from "./steps/LocationStep";
import { BasicsStep } from "./steps/BasicsStep";
import { AmenitiesStep } from "./steps/AmenitiesStep";
import { PhotosStep } from "./steps/PhotosStep";
import { TitleStep } from "./steps/TitleStep";
import { DescriptionStep } from "./steps/DescriptionStep";
import { PricingStep } from "./steps/PricingStep";
import { ReviewStep } from "./steps/ReviewStep";
import { IntroStep } from "./steps/IntroStep";
import { ListingData } from "@/types/listing";

const TOTAL_STEPS = 10;
const STORAGE_KEY = "hosting-wizard-progress";

const initialListingData: ListingData = {
  propertyType: "",
  placeType: "",
  location: {
    address: "",
    city: "",
    country: "",
  },
  basics: {
    guests: 4,
    bedrooms: 1,
    beds: 1,
    bathrooms: 1,
  },
  amenities: [],
  photos: [],
  title: "",
  description: "",
  pricing: {
    basePrice: 100,
    currency: "USD",
  },
};

const loadSavedProgress = (): { step: number; listing: ListingData } | null => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        step: parsed.step || 1,
        listing: { ...initialListingData, ...parsed.listing },
      };
    }
  } catch (e) {
    console.error("Failed to load saved progress:", e);
  }
  return null;
};

export const HostingWizard = () => {
  const savedProgress = loadSavedProgress();
  const [showIntro, setShowIntro] = useState(!savedProgress);
  const [currentStep, setCurrentStep] = useState(savedProgress?.step || 1);
  const [listing, setListing] = useState<ListingData>(savedProgress?.listing || initialListingData);
  const [isPublishing, setIsPublishing] = useState(false);
  const [direction, setDirection] = useState<"forward" | "backward">("forward");
  const [isAnimating, setIsAnimating] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const navigate = useNavigate();

  const handleStartWizard = () => {
    setShowIntro(false);
  };

  if (showIntro) {
    return <IntroStep onStart={handleStartWizard} />;
  }

  // Save progress to localStorage
  useEffect(() => {
    const saveProgress = () => {
      try {
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({ step: currentStep, listing })
        );
      } catch (e) {
        console.error("Failed to save progress:", e);
      }
    };
    saveProgress();
  }, [currentStep, listing]);

  // Show resume notification on mount
  useEffect(() => {
    if (savedProgress && savedProgress.step > 1) {
      toast.info("Welcome back!", {
        description: `Resuming from step ${savedProgress.step} of ${TOTAL_STEPS}`,
        action: {
          label: "Start over",
          onClick: () => {
            localStorage.removeItem(STORAGE_KEY);
            setCurrentStep(1);
            setListing(initialListingData);
          },
        },
      });
    }
  }, []);

  const isStepValid = useCallback((step: number): boolean => {
    switch (step) {
      case 1:
        return !!listing.propertyType;
      case 2:
        return !!listing.placeType;
      case 3:
        return !!listing.location.address && !!listing.location.city && !!listing.location.country;
      case 4:
        return listing.basics.guests > 0;
      case 5:
        return true;
      case 6:
        return listing.photos.length >= 1;
      case 7:
        return listing.title.length >= 5;
      case 8:
        return listing.description.length >= 20;
      case 9:
        return listing.pricing.basePrice >= 10;
      case 10:
        return true;
      default:
        return false;
    }
  }, [listing]);

  const canProceed = (): boolean => isStepValid(currentStep);

  const stepStatuses = useMemo((): StepStatus[] => {
    return Array.from({ length: TOTAL_STEPS }, (_, index) => {
      const step = index + 1;
      if (step === currentStep) return "current";
      if (step > currentStep) return "upcoming";
      // For visited steps, check if they're valid
      return isStepValid(step) ? "complete" : "incomplete";
    });
  }, [currentStep, isStepValid]);

  const handleNext = async () => {
    if (currentStep === TOTAL_STEPS) {
      setIsPublishing(true);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setIsPublishing(false);
      localStorage.removeItem(STORAGE_KEY);
      toast.success("Congratulations! Your listing is now live!", {
        description: "Guests can now discover and book your place.",
      });
      navigate("/success");
      return;
    }
    setDirection("forward");
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentStep((prev) => Math.min(prev + 1, TOTAL_STEPS));
      setIsAnimating(false);
    }, 150);
  };

  const handleBack = () => {
    setDirection("backward");
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentStep((prev) => Math.max(prev - 1, 1));
      setIsAnimating(false);
    }, 150);
  };

  const handleStepClick = (step: number) => {
    if (step < currentStep) {
      setDirection("backward");
    } else if (step > currentStep) {
      setDirection("forward");
    }
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentStep(step);
      setIsAnimating(false);
    }, 150);
  };

  const handleSaveDraft = () => {
    setShowSaveDialog(true);
  };

  const confirmSaveDraft = () => {
    setShowSaveDialog(false);
    toast.success("Draft saved!", {
      description: "You can resume your listing anytime.",
    });
    navigate("/");
  };

  const toggleAmenity = useCallback((amenityId: string) => {
    setListing((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenityId)
        ? prev.amenities.filter((id) => id !== amenityId)
        : [...prev.amenities, amenityId],
    }));
  }, []);

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <PropertyTypeStep
            selectedType={listing.propertyType}
            onSelect={(type) => setListing((prev) => ({ ...prev, propertyType: type }))}
          />
        );
      case 2:
        return (
          <PlaceTypeStep
            selectedType={listing.placeType}
            onSelect={(type) => setListing((prev) => ({ ...prev, placeType: type }))}
          />
        );
      case 3:
        return (
          <LocationStep
            location={listing.location}
            onUpdate={(location) => setListing((prev) => ({ ...prev, location }))}
          />
        );
      case 4:
        return (
          <BasicsStep
            basics={listing.basics}
            onUpdate={(basics) => setListing((prev) => ({ ...prev, basics }))}
          />
        );
      case 5:
        return (
          <AmenitiesStep
            selectedAmenities={listing.amenities}
            onToggle={toggleAmenity}
          />
        );
      case 6:
        return (
          <PhotosStep
            photos={listing.photos}
            onUpdate={(photos) => setListing((prev) => ({ ...prev, photos }))}
          />
        );
      case 7:
        return (
          <TitleStep
            title={listing.title}
            onUpdate={(title) => setListing((prev) => ({ ...prev, title }))}
          />
        );
      case 8:
        return (
          <DescriptionStep
            description={listing.description}
            onUpdate={(description) => setListing((prev) => ({ ...prev, description }))}
          />
        );
      case 9:
        return (
          <PricingStep
            pricing={listing.pricing}
            onUpdate={(pricing) => setListing((prev) => ({ ...prev, pricing }))}
          />
        );
      case 10:
        return <ReviewStep listing={listing} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <ProgressBar 
        currentStep={currentStep} 
        totalSteps={TOTAL_STEPS} 
        stepStatuses={stepStatuses}
        onStepClick={handleStepClick} 
      />
      
      {/* Preview Button */}
      {currentStep >= 6 && (
        <div className="fixed top-20 right-6 z-40">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowPreview(true)}
            className="gap-2 shadow-md"
          >
            <Eye className="h-4 w-4" />
            Preview
          </Button>
        </div>
      )}
      
      <main className="flex-1 flex items-center justify-center py-12 pb-32 px-6 overflow-hidden">
        <div
          className={cn(
            "w-full max-w-2xl transition-all duration-300 ease-out",
            isAnimating && direction === "forward" && "opacity-0 translate-x-8",
            isAnimating && direction === "backward" && "opacity-0 -translate-x-8",
            !isAnimating && "opacity-100 translate-x-0"
          )}
        >
          {renderStep()}
        </div>
      </main>

      <NavigationFooter
        onBack={handleBack}
        onNext={handleNext}
        onSaveDraft={handleSaveDraft}
        canGoBack={currentStep > 1}
        canGoNext={canProceed()}
        isLastStep={currentStep === TOTAL_STEPS}
        isLoading={isPublishing}
      />

      <ListingPreview
        listing={listing}
        isOpen={showPreview}
        onClose={() => setShowPreview(false)}
      />

      <AlertDialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Save as draft?</AlertDialogTitle>
            <AlertDialogDescription>
              Your progress will be saved and you can continue editing your listing anytime. 
              Are you sure you want to exit?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Continue editing</AlertDialogCancel>
            <AlertDialogAction onClick={confirmSaveDraft}>
              Save and exit
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
