import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { X, Crop, GripVertical } from "lucide-react";
import { cn } from "@/lib/utils";

interface SortablePhotoProps {
  id: string;
  photo: string;
  index: number;
  onRemove: () => void;
  onCrop: () => void;
  isCover?: boolean;
}

export const SortablePhoto = ({
  id,
  photo,
  index,
  onRemove,
  onCrop,
  isCover = false,
}: SortablePhotoProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  if (isCover) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className={cn(
          "relative aspect-[16/9] rounded-2xl overflow-hidden group",
          isDragging && "opacity-50 z-50"
        )}
      >
        <img
          src={photo}
          alt="Cover photo"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors" />
        
        {/* Drag handle */}
        <button
          {...attributes}
          {...listeners}
          className="absolute top-4 left-4 w-8 h-8 rounded-full bg-background/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing"
        >
          <GripVertical className="w-4 h-4" />
        </button>

        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={onCrop}
            className="w-8 h-8 rounded-full bg-background/90 flex items-center justify-center hover:bg-background transition-colors"
          >
            <Crop className="w-4 h-4" />
          </button>
          <button
            onClick={onRemove}
            className="w-8 h-8 rounded-full bg-background/90 flex items-center justify-center hover:bg-background transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <span className="absolute bottom-4 left-4 bg-background/90 px-3 py-1 rounded-full text-sm font-medium">
          Cover photo
        </span>
      </div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "relative aspect-square rounded-xl overflow-hidden group",
        isDragging && "opacity-50 z-50"
      )}
    >
      <img
        src={photo}
        alt={`Photo ${index + 1}`}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors" />
      
      {/* Drag handle */}
      <button
        {...attributes}
        {...listeners}
        className="absolute top-2 left-2 w-7 h-7 rounded-full bg-background/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing"
      >
        <GripVertical className="w-3 h-3" />
      </button>

      <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={onCrop}
          className="w-7 h-7 rounded-full bg-background/90 flex items-center justify-center hover:bg-background transition-colors"
        >
          <Crop className="w-3 h-3" />
        </button>
        <button
          onClick={onRemove}
          className="w-7 h-7 rounded-full bg-background/90 flex items-center justify-center hover:bg-background transition-colors"
        >
          <X className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};
