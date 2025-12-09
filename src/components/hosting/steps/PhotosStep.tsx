import { useState, useCallback, useRef } from "react";
import { ImagePlus, X, Upload, Crop } from "lucide-react";
import { cn } from "@/lib/utils";
import { ImageCropper } from "@/components/hosting/ImageCropper";
import { optimizeImage, readFileAsDataURL } from "@/lib/imageUtils";
import { toast } from "sonner";

interface PhotosStepProps {
  photos: string[];
  onUpdate: (photos: string[]) => void;
}

export const PhotosStep = ({ photos, onUpdate }: PhotosStepProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [cropperImage, setCropperImage] = useState<string | null>(null);
  const [cropperIndex, setCropperIndex] = useState<number | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFiles = useCallback(
    async (files: FileList | File[]) => {
      const validFiles = Array.from(files).filter((file) => {
        if (!file.type.startsWith("image/")) {
          toast.error(`${file.name} is not an image`);
          return false;
        }
        if (file.size > 10 * 1024 * 1024) {
          toast.error(`${file.name} is too large (max 10MB)`);
          return false;
        }
        return true;
      });

      if (validFiles.length === 0) return;

      const remainingSlots = 10 - photos.length;
      const filesToProcess = validFiles.slice(0, remainingSlots);

      if (validFiles.length > remainingSlots) {
        toast.warning(`Only ${remainingSlots} more photos can be added`);
      }

      setIsProcessing(true);
      try {
        const processedImages = await Promise.all(
          filesToProcess.map((file) => optimizeImage(file, 1200, 0.85))
        );
        onUpdate([...photos, ...processedImages]);
        toast.success(`${processedImages.length} photo(s) added`);
      } catch (error) {
        console.error("Error processing images:", error);
        toast.error("Failed to process some images");
      } finally {
        setIsProcessing(false);
      }
    },
    [photos, onUpdate]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      processFiles(e.dataTransfer.files);
    },
    [processFiles]
  );

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        processFiles(e.target.files);
        e.target.value = "";
      }
    },
    [processFiles]
  );

  const removePhoto = (index: number) => {
    onUpdate(photos.filter((_, i) => i !== index));
    toast.success("Photo removed");
  };

  const openCropper = async (index: number) => {
    setCropperImage(photos[index]);
    setCropperIndex(index);
  };

  const handleCropComplete = (croppedImage: string) => {
    if (cropperIndex !== null) {
      const newPhotos = [...photos];
      newPhotos[cropperIndex] = croppedImage;
      onUpdate(newPhotos);
      toast.success("Photo cropped");
    }
    setCropperImage(null);
    setCropperIndex(null);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="animate-fade-in">
      <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
        Add some photos of your place
      </h1>
      <p className="text-muted-foreground text-lg mb-10">
        You'll need 5 photos to get started. You can add more or make changes later.
      </p>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileSelect}
        className="hidden"
      />

      <div className="max-w-4xl">
        {photos.length === 0 ? (
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={triggerFileInput}
            className={cn(
              "w-full aspect-[16/9] rounded-2xl border-2 border-dashed transition-all cursor-pointer flex flex-col items-center justify-center gap-4",
              isDragging
                ? "border-primary bg-primary/5 scale-[1.02]"
                : "border-border hover:border-foreground bg-secondary/50"
            )}
          >
            <div
              className={cn(
                "w-16 h-16 rounded-full flex items-center justify-center transition-colors",
                isDragging ? "bg-primary/20" : "bg-secondary"
              )}
            >
              {isProcessing ? (
                <div className="w-8 h-8 border-2 border-foreground/30 border-t-foreground rounded-full animate-spin" />
              ) : (
                <Upload className={cn("w-8 h-8", isDragging ? "text-primary" : "text-foreground")} />
              )}
            </div>
            <div className="text-center">
              <p className="font-semibold text-foreground">
                {isProcessing ? "Processing..." : "Drag your photos here"}
              </p>
              <p className="text-sm text-muted-foreground">
                or click to browse (JPG, PNG, WebP up to 10MB)
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Main photo */}
            <div
              className="relative aspect-[16/9] rounded-2xl overflow-hidden group"
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <img
                src={photos[0]}
                alt="Cover photo"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors" />
              <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => openCropper(0)}
                  className="w-8 h-8 rounded-full bg-background/90 flex items-center justify-center hover:bg-background transition-colors"
                >
                  <Crop className="w-4 h-4" />
                </button>
                <button
                  onClick={() => removePhoto(0)}
                  className="w-8 h-8 rounded-full bg-background/90 flex items-center justify-center hover:bg-background transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
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
                  <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => openCropper(index + 1)}
                      className="w-7 h-7 rounded-full bg-background/90 flex items-center justify-center hover:bg-background transition-colors"
                    >
                      <Crop className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() => removePhoto(index + 1)}
                      className="w-7 h-7 rounded-full bg-background/90 flex items-center justify-center hover:bg-background transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}

              {photos.length < 10 && (
                <button
                  onClick={triggerFileInput}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  disabled={isProcessing}
                  className={cn(
                    "aspect-square rounded-xl border-2 border-dashed transition-all flex flex-col items-center justify-center gap-2",
                    isDragging
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-foreground",
                    isProcessing && "opacity-50 cursor-not-allowed"
                  )}
                >
                  {isProcessing ? (
                    <div className="w-6 h-6 border-2 border-muted-foreground/30 border-t-muted-foreground rounded-full animate-spin" />
                  ) : (
                    <ImagePlus className="w-6 h-6 text-muted-foreground" />
                  )}
                  <span className="text-sm text-muted-foreground">
                    {isProcessing ? "Processing..." : "Add more"}
                  </span>
                </button>
              )}
            </div>
          </div>
        )}

        <p className="mt-6 text-sm text-muted-foreground">
          {photos.length}/5 photos added {photos.length >= 5 && "✓"}
        </p>
      </div>

      {cropperImage && (
        <ImageCropper
          image={cropperImage}
          open={!!cropperImage}
          onClose={() => {
            setCropperImage(null);
            setCropperIndex(null);
          }}
          onCropComplete={handleCropComplete}
          aspectRatio={cropperIndex === 0 ? 16 / 9 : 1}
        />
      )}
    </div>
  );
};
