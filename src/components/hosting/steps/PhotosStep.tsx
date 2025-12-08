import { useState } from "react";
import { ImagePlus, X, GripVertical } from "lucide-react";
import { cn } from "@/lib/utils";

interface PhotosStepProps {
  photos: string[];
  onUpdate: (photos: string[]) => void;
}

const samplePhotos = [
  "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop",
];

export const PhotosStep = ({ photos, onUpdate }: PhotosStepProps) => {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const addSamplePhoto = () => {
    const availablePhotos = samplePhotos.filter(p => !photos.includes(p));
    if (availablePhotos.length > 0) {
      onUpdate([...photos, availablePhotos[0]]);
    }
  };

  const removePhoto = (index: number) => {
    onUpdate(photos.filter((_, i) => i !== index));
  };

  return (
    <div className="animate-fade-in">
      <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
        Add some photos of your place
      </h1>
      <p className="text-muted-foreground text-lg mb-10">
        You'll need 5 photos to get started. You can add more or make changes later.
      </p>

      <div className="max-w-4xl">
        {photos.length === 0 ? (
          <button
            onClick={addSamplePhoto}
            className="w-full aspect-[16/9] rounded-2xl border-2 border-dashed border-border hover:border-foreground transition-colors flex flex-col items-center justify-center gap-4 bg-secondary/50"
          >
            <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center">
              <ImagePlus className="w-8 h-8 text-foreground" />
            </div>
            <div className="text-center">
              <p className="font-semibold text-foreground">Add photos</p>
              <p className="text-sm text-muted-foreground">Click to add sample photos</p>
            </div>
          </button>
        ) : (
          <div className="space-y-4">
            {/* Main photo */}
            <div className="relative aspect-[16/9] rounded-2xl overflow-hidden group">
              <img
                src={photos[0]}
                alt="Cover photo"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors" />
              <button
                onClick={() => removePhoto(0)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-background/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-4 h-4" />
              </button>
              <span className="absolute bottom-4 left-4 bg-background/90 px-3 py-1 rounded-full text-sm font-medium">
                Cover photo
              </span>
            </div>

            {/* Photo grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {photos.slice(1).map((photo, index) => (
                <div
                  key={index}
                  className="relative aspect-square rounded-xl overflow-hidden group"
                >
                  <img
                    src={photo}
                    alt={`Photo ${index + 2}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors" />
                  <button
                    onClick={() => removePhoto(index + 1)}
                    className="absolute top-2 right-2 w-7 h-7 rounded-full bg-background/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}

              {photos.length < 5 && (
                <button
                  onClick={addSamplePhoto}
                  className="aspect-square rounded-xl border-2 border-dashed border-border hover:border-foreground transition-colors flex flex-col items-center justify-center gap-2"
                >
                  <ImagePlus className="w-6 h-6 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Add more</span>
                </button>
              )}
            </div>
          </div>
        )}

        <p className="mt-6 text-sm text-muted-foreground">
          {photos.length}/5 photos added
        </p>
      </div>
    </div>
  );
};
