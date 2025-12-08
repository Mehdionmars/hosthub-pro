import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { ProgressBar } from "./ProgressBar";
import { NavigationFooter } from "./NavigationFooter";
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
import { ListingData } from "@/types/listing";

const TOTAL_STEPS = 10;

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

export const HostingWizard = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [listing, setListing] = useState<ListingData>(initialListingData);
  const [isPublishing, setIsPublishing] = useState(false);
  const navigate = useNavigate();

  const canProceed = (): boolean => {
    switch (currentStep) {
      case 1:
        return !!listing.propertyType;
      case 2:
        return !!listing.placeType;
      case 3:
        return !!listing.location.address && !!listing.location.city && !!listing.location.country;
      case 4:
        return listing.basics.guests > 0;
      case 5:
        return true; // Amenities are optional
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
  };

  const handleNext = async () => {
    if (currentStep === TOTAL_STEPS) {
      setIsPublishing(true);
      // Simulate publishing
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setIsPublishing(false);
      toast.success("Congratulations! Your listing is now live!", {
        description: "Guests can now discover and book your place.",
      });
      navigate("/success");
      return;
    }
    setCurrentStep((prev) => Math.min(prev + 1, TOTAL_STEPS));
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const toggleAmenity = (amenityId: string) => {
    setListing((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenityId)
        ? prev.amenities.filter((id) => id !== amenityId)
        : [...prev.amenities, amenityId],
    }));
  };

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
    <div className="min-h-screen bg-background">
      <ProgressBar currentStep={currentStep} totalSteps={TOTAL_STEPS} />
      
      <main className="pt-8 pb-28 px-6 md:px-12 lg:px-24">
        <div className="max-w-screen-lg mx-auto">
          {renderStep()}
        </div>
      </main>

      <NavigationFooter
        onBack={handleBack}
        onNext={handleNext}
        canGoBack={currentStep > 1}
        canGoNext={canProceed()}
        isLastStep={currentStep === TOTAL_STEPS}
        isLoading={isPublishing}
      />
    </div>
  );
};
