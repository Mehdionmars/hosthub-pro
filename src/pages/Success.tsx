import { useNavigate } from "react-router-dom";
import { PartyPopper, Home, Calendar, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

const Success = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="max-w-lg text-center animate-fade-in">
        <div className="w-24 h-24 rounded-full bg-accent flex items-center justify-center mx-auto mb-8">
          <PartyPopper className="w-12 h-12 text-primary" />
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
          You're all set!
        </h1>
        <p className="text-xl text-muted-foreground mb-12">
          Your listing is now live and ready to welcome guests.
        </p>

        <div className="space-y-4 mb-12">
          <div className="flex items-center gap-4 p-5 bg-secondary rounded-xl text-left">
            <div className="w-12 h-12 rounded-full bg-background flex items-center justify-center">
              <Home className="w-6 h-6 text-foreground" />
            </div>
            <div>
              <p className="font-semibold text-foreground">Manage your listing</p>
              <p className="text-sm text-muted-foreground">Update photos, pricing, and details anytime</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-5 bg-secondary rounded-xl text-left">
            <div className="w-12 h-12 rounded-full bg-background flex items-center justify-center">
              <Calendar className="w-6 h-6 text-foreground" />
            </div>
            <div>
              <p className="font-semibold text-foreground">Set your availability</p>
              <p className="text-sm text-muted-foreground">Control when guests can book your place</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-5 bg-secondary rounded-xl text-left">
            <div className="w-12 h-12 rounded-full bg-background flex items-center justify-center">
              <Settings className="w-6 h-6 text-foreground" />
            </div>
            <div>
              <p className="font-semibold text-foreground">Fine-tune your settings</p>
              <p className="text-sm text-muted-foreground">Set house rules and cancellation policies</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            variant="outline"
            size="lg"
            onClick={() => navigate("/")}
          >
            Back to home
          </Button>
          <Button
            variant="hero"
            size="lg"
            onClick={() => navigate("/become-a-host")}
          >
            Create another listing
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Success;
