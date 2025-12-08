import { Textarea } from "@/components/ui/textarea";

interface TitleStepProps {
  title: string;
  onUpdate: (title: string) => void;
}

export const TitleStep = ({ title, onUpdate }: TitleStepProps) => {
  const maxLength = 50;

  return (
    <div className="animate-fade-in">
      <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
        Now, let's give your place a title
      </h1>
      <p className="text-muted-foreground text-lg mb-10">
        Short titles work best. Have fun with it—you can always change it later.
      </p>

      <div className="max-w-xl">
        <Textarea
          value={title}
          onChange={(e) => {
            if (e.target.value.length <= maxLength) {
              onUpdate(e.target.value);
            }
          }}
          placeholder="Charming cottage near downtown"
          className="min-h-[160px] text-2xl font-medium border-2 rounded-xl resize-none focus:border-foreground p-4"
        />
        <p className="mt-3 text-sm text-muted-foreground">
          {title.length}/{maxLength}
        </p>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            "Cozy retreat with mountain views",
            "Modern loft in the heart of the city",
            "Peaceful cabin by the lake",
            "Stylish apartment with rooftop terrace",
          ].map((suggestion) => (
            <button
              key={suggestion}
              onClick={() => onUpdate(suggestion)}
              className="p-4 text-left rounded-xl border border-border hover:border-foreground transition-colors text-sm text-muted-foreground hover:text-foreground"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
