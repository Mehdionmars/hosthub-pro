import { Textarea } from "@/components/ui/textarea";

interface DescriptionStepProps {
  description: string;
  onUpdate: (description: string) => void;
}

export const DescriptionStep = ({ description, onUpdate }: DescriptionStepProps) => {
  const maxLength = 500;

  return (
    <div className="animate-fade-in">
      <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
        Create your description
      </h1>
      <p className="text-muted-foreground text-lg mb-10">
        Share what makes your place special.
      </p>

      <div className="max-w-xl">
        <Textarea
          value={description}
          onChange={(e) => {
            if (e.target.value.length <= maxLength) {
              onUpdate(e.target.value);
            }
          }}
          placeholder="Tell guests what you love about the space, the neighborhood, and what makes it unique..."
          className="min-h-[240px] text-lg border-2 rounded-xl resize-none focus:border-foreground p-4"
        />
        <p className="mt-3 text-sm text-muted-foreground">
          {description.length}/{maxLength}
        </p>

        <div className="mt-8 p-6 bg-secondary rounded-2xl">
          <h3 className="font-semibold text-foreground mb-3">Tips for a great description</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
              Highlight what makes your space unique
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
              Mention nearby attractions or conveniences
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
              Describe the vibe and atmosphere
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
              Be honest and accurate
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
