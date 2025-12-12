import { useEffect } from "react";

interface IntroStepProps {
  onStart: () => void;
}

export const IntroStep = ({ onStart }: IntroStepProps) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="h-screen flex flex-col pb-24">
      <div className="flex-1 w-full max-w-7xl mx-auto flex flex-col lg:flex-row gap-10 lg:gap-20 px-6 pt-4">
        {/* Text */}
        <div className="lg:w-1/2 flex flex-col justify-center">
          <span className="text-3xl font-bold mb-4 text-muted-foreground">Step 1</span>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight mb-6">
            Tell us about your place
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            We'll ask you about the type of property, its location, and how many guests it can accommodate.
          </p>
        </div>

        {/* Image/Animation placeholder */}
        <div className="lg:w-1/2 flex items-center justify-center">
          <div className="relative w-full h-[320px] md:h-[440px] rounded-xl overflow-hidden bg-muted">
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center p-8">
                <div className="w-32 h-32 mx-auto mb-6 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <svg
                    className="w-16 h-16 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                </div>
                <p className="text-muted-foreground text-sm">
                  Share your space with guests from around the world
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom button */}
      <div className="fixed bottom-0 left-0 w-full bg-background border-t border-border z-50">
        <div className="max-w-7xl mx-auto flex justify-end py-4 px-6">
          <button
            onClick={onStart}
            className="px-8 py-3 rounded-lg bg-primary text-primary-foreground font-semibold shadow-md hover:opacity-90 transition"
          >
            Get started
          </button>
        </div>
      </div>
    </div>
  );
};