import { useState, useCallback, useRef } from "react";
import { ImagePlus, Upload } from "lucide-react";
import { cn } from "@/lib/utils";
import { ImageCropper } from "@/components/hosting/ImageCropper";
import { SortablePhoto } from "@/components/hosting/SortablePhoto";
import { optimizeImage } from "@/lib/imageUtils";
import { toast } from "sonner";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
} from "@dnd-kit/sortable";

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

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = photos.findIndex((_, i) => `photo-${i}` === active.id);
      const newIndex = photos.findIndex((_, i) => `photo-${i}` === over.id);
      const newPhotos = arrayMove(photos, oldIndex, newIndex);
      onUpdate(newPhotos);
      toast.success("Photos reordered");
    }
  };

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

  const openCropper = (index: number) => {
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

  const photoIds = photos.map((_, i) => `photo-${i}`);

  return (
    <div className="animate-fade-in">
      <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
        Add some photos of your place
      </h1>
      <p className="text-muted-foreground text-lg mb-10">
        You'll need 5 photos to get started. Drag to reorder—first photo becomes the cover.
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
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext items={photoIds} strategy={rectSortingStrategy}>
              <div className="space-y-4">
                {/* Main photo */}
                <SortablePhoto
                  id="photo-0"
                  photo={photos[0]}
                  index={0}
                  onRemove={() => removePhoto(0)}
                  onCrop={() => openCropper(0)}
                  isCover
                />

                {/* Photo grid */}
                <div
                  className="grid grid-cols-2 sm:grid-cols-4 gap-4"
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  {photos.slice(1).map((photo, index) => (
                    <SortablePhoto
                      key={`photo-${index + 1}`}
                      id={`photo-${index + 1}`}
                      photo={photo}
                      index={index + 1}
                      onRemove={() => removePhoto(index + 1)}
                      onCrop={() => openCropper(index + 1)}
                    />
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
            </SortableContext>
          </DndContext>
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
