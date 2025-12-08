import { MapPin, Users, Bed, Bath, Star, CheckCircle } from "lucide-react";
import { ListingData } from "@/types/listing";

interface ReviewStepProps {
  listing: ListingData;
}

export const ReviewStep = ({ listing }: ReviewStepProps) => {
  return (
    <div className="animate-fade-in">
      <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
        Review your listing
      </h1>
      <p className="text-muted-foreground text-lg mb-10">
        Here's what we'll show to guests. Make sure everything looks good.
      </p>

      <div className="max-w-4xl grid md:grid-cols-2 gap-8">
        {/* Preview Card */}
        <div className="bg-background rounded-2xl border border-border overflow-hidden shadow-card">
          {listing.photos[0] && (
            <div className="aspect-[4/3] relative">
              <img
                src={listing.photos[0]}
                alt={listing.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 bg-background px-3 py-1 rounded-full text-sm font-medium shadow-soft">
                New listing
              </div>
            </div>
          )}
          <div className="p-5">
            <div className="flex items-start justify-between gap-4 mb-2">
              <h3 className="font-semibold text-foreground line-clamp-1">
                {listing.title || "Your listing title"}
              </h3>
              <div className="flex items-center gap-1 text-sm">
                <Star className="w-4 h-4" />
                <span>New</span>
              </div>
            </div>
            <p className="text-muted-foreground text-sm mb-2">
              {listing.location.city}, {listing.location.country}
            </p>
            <p className="font-semibold">
              ${listing.pricing.basePrice} <span className="font-normal text-muted-foreground">night</span>
            </p>
          </div>
        </div>

        {/* Details */}
        <div className="space-y-6">
          <div className="p-6 bg-secondary rounded-2xl">
            <h3 className="font-semibold text-foreground mb-4">What's next?</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium text-foreground">Confirm a few details and publish</p>
                  <p className="text-sm text-muted-foreground">We'll let you know if you need to verify your identity or register with the local government.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium text-foreground">Set up your calendar</p>
                  <p className="text-sm text-muted-foreground">Choose which dates your listing is available. It will be visible 24 hours after you publish.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium text-foreground">Adjust your settings</p>
                  <p className="text-sm text-muted-foreground">Set house rules, select a cancellation policy, choose how guests book, and more.</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="p-6 bg-background border border-border rounded-2xl">
            <h3 className="font-semibold text-foreground mb-4">Listing details</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-muted-foreground" />
                <span>{listing.basics.guests} guests</span>
              </div>
              <div className="flex items-center gap-2">
                <Bed className="w-4 h-4 text-muted-foreground" />
                <span>{listing.basics.beds} beds</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <span>{listing.basics.bedrooms} bedrooms</span>
              </div>
              <div className="flex items-center gap-2">
                <Bath className="w-4 h-4 text-muted-foreground" />
                <span>{listing.basics.bathrooms} baths</span>
              </div>
            </div>
            {listing.amenities.length > 0 && (
              <div className="mt-4 pt-4 border-t border-border">
                <p className="text-muted-foreground text-sm">
                  {listing.amenities.length} amenities
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
