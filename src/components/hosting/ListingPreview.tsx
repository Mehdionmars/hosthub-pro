import { X, Star, Heart, Share, MapPin, Users, Bed, Bath, Wifi, Car, Utensils, Tv, Wind, Waves, Mountain, Trees, Dumbbell, Coffee, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { ListingData, PROPERTY_TYPES, PLACE_TYPES, AMENITIES } from "@/types/listing";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface ListingPreviewProps {
  listing: ListingData;
  isOpen: boolean;
  onClose: () => void;
}

const amenityIcons: Record<string, React.ElementType> = {
  wifi: Wifi,
  parking: Car,
  kitchen: Utensils,
  tv: Tv,
  ac: Wind,
  pool: Waves,
  view: Mountain,
  garden: Trees,
  gym: Dumbbell,
  coffee: Coffee,
};

export const ListingPreview = ({ listing, isOpen, onClose }: ListingPreviewProps) => {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  
  const propertyLabel = PROPERTY_TYPES.find(p => p.id === listing.propertyType)?.label || "Property";
  const placeLabel = PLACE_TYPES.find(p => p.id === listing.placeType)?.label || "Place";
  
  const selectedAmenities = AMENITIES.filter(a => listing.amenities.includes(a.id));

  const nextPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev + 1) % listing.photos.length);
  };

  const prevPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev - 1 + listing.photos.length) % listing.photos.length);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0 gap-0">
        <DialogTitle className="sr-only">Listing Preview</DialogTitle>
        
        {/* Header */}
        <div className="sticky top-0 z-10 bg-background border-b border-border px-6 py-4 flex items-center justify-between">
          <span className="text-sm font-medium text-muted-foreground">Preview Mode</span>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="px-6 pb-8">
          {/* Photo Gallery */}
          {listing.photos.length > 0 ? (
            <div className="relative mt-6 rounded-xl overflow-hidden aspect-[16/10] bg-muted">
              <img
                src={listing.photos[currentPhotoIndex]}
                alt={`Photo ${currentPhotoIndex + 1}`}
                className="w-full h-full object-cover"
              />
              
              {listing.photos.length > 1 && (
                <>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-background/90 hover:bg-background"
                    onClick={prevPhoto}
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-background/90 hover:bg-background"
                    onClick={nextPhoto}
                  >
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                  
                  {/* Photo indicators */}
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                    {listing.photos.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentPhotoIndex(idx)}
                        className={cn(
                          "w-2 h-2 rounded-full transition-all",
                          idx === currentPhotoIndex ? "bg-background w-4" : "bg-background/60"
                        )}
                      />
                    ))}
                  </div>
                </>
              )}
              
              {/* Action buttons */}
              <div className="absolute top-3 right-3 flex gap-2">
                <Button variant="secondary" size="icon" className="rounded-full bg-background/90 hover:bg-background">
                  <Share className="h-4 w-4" />
                </Button>
                <Button variant="secondary" size="icon" className="rounded-full bg-background/90 hover:bg-background">
                  <Heart className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ) : (
            <div className="mt-6 rounded-xl aspect-[16/10] bg-muted flex items-center justify-center">
              <p className="text-muted-foreground">No photos added yet</p>
            </div>
          )}

          {/* Title and Location */}
          <div className="mt-6">
            <h1 className="text-2xl font-semibold text-foreground">
              {listing.title || "Your listing title"}
            </h1>
            <div className="flex items-center gap-2 mt-2 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>
                {listing.location.city && listing.location.country
                  ? `${listing.location.city}, ${listing.location.country}`
                  : "Location not set"}
              </span>
            </div>
          </div>

          {/* Rating and Type */}
          <div className="flex items-center gap-3 mt-4 pb-6 border-b border-border">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-foreground" />
              <span className="font-medium">New</span>
            </div>
            <span className="text-muted-foreground">·</span>
            <span className="text-muted-foreground">{placeLabel} in {propertyLabel.toLowerCase()}</span>
          </div>

          {/* Basics */}
          <div className="flex items-center gap-4 py-6 border-b border-border text-muted-foreground">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              <span>{listing.basics.guests} guests</span>
            </div>
            <span>·</span>
            <div className="flex items-center gap-2">
              <Bed className="h-5 w-5" />
              <span>{listing.basics.bedrooms} bedroom{listing.basics.bedrooms !== 1 ? 's' : ''}</span>
            </div>
            <span>·</span>
            <div className="flex items-center gap-2">
              <Bed className="h-5 w-5" />
              <span>{listing.basics.beds} bed{listing.basics.beds !== 1 ? 's' : ''}</span>
            </div>
            <span>·</span>
            <div className="flex items-center gap-2">
              <Bath className="h-5 w-5" />
              <span>{listing.basics.bathrooms} bath{listing.basics.bathrooms !== 1 ? 's' : ''}</span>
            </div>
          </div>

          {/* Description */}
          <div className="py-6 border-b border-border">
            <h2 className="text-lg font-semibold mb-3">About this place</h2>
            <p className="text-muted-foreground whitespace-pre-wrap">
              {listing.description || "No description added yet"}
            </p>
          </div>

          {/* Amenities */}
          {selectedAmenities.length > 0 && (
            <div className="py-6 border-b border-border">
              <h2 className="text-lg font-semibold mb-4">What this place offers</h2>
              <div className="grid grid-cols-2 gap-4">
                {selectedAmenities.map((amenity) => {
                  const IconComponent = amenityIcons[amenity.id] || Wifi;
                  return (
                    <div key={amenity.id} className="flex items-center gap-3 text-foreground">
                      <IconComponent className="h-5 w-5" />
                      <span>{amenity.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Pricing Card */}
          <div className="mt-6 p-6 border border-border rounded-xl bg-card">
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-semibold">${listing.pricing.basePrice}</span>
              <span className="text-muted-foreground">/ night</span>
            </div>
            <Button className="w-full mt-4" size="lg">
              Reserve
            </Button>
            <p className="text-center text-sm text-muted-foreground mt-3">
              You won't be charged yet
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
