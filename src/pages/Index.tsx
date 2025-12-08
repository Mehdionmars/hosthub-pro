import { useNavigate } from "react-router-dom";
import { Home, DollarSign, Shield, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-screen-xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Home className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">hostify</span>
          </div>
          <Button variant="nav" size="sm" onClick={() => navigate("/become-a-host")}>
            Become a Host
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-screen-xl mx-auto">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight">
              Turn your space into <span className="text-primary">income</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-10 max-w-xl">
              Join thousands of hosts earning extra income by sharing their homes with travelers from around the world.
            </p>
            <Button
              variant="hero"
              size="lg"
              onClick={() => navigate("/become-a-host")}
              className="text-lg"
            >
              Start hosting
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-6 bg-secondary">
        <div className="max-w-screen-xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <p className="text-5xl font-bold text-foreground mb-2">$1,200</p>
              <p className="text-muted-foreground">Average monthly earnings*</p>
            </div>
            <div className="text-center">
              <p className="text-5xl font-bold text-foreground mb-2">4M+</p>
              <p className="text-muted-foreground">Active hosts worldwide</p>
            </div>
            <div className="text-center">
              <p className="text-5xl font-bold text-foreground mb-2">1B+</p>
              <p className="text-muted-foreground">Guest arrivals all time</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="max-w-screen-xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
            Why host with us?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 bg-background rounded-2xl border border-border hover:shadow-card transition-shadow">
              <div className="w-14 h-14 rounded-xl bg-accent flex items-center justify-center mb-6">
                <DollarSign className="w-7 h-7 text-accent-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                Earn extra income
              </h3>
              <p className="text-muted-foreground">
                Set your own prices, availability, and house rules. You're in control of how you host.
              </p>
            </div>

            <div className="p-8 bg-background rounded-2xl border border-border hover:shadow-card transition-shadow">
              <div className="w-14 h-14 rounded-xl bg-accent flex items-center justify-center mb-6">
                <Shield className="w-7 h-7 text-accent-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                Host with confidence
              </h3>
              <p className="text-muted-foreground">
                Our comprehensive protection program covers your home and belongings with up to $1M in coverage.
              </p>
            </div>

            <div className="p-8 bg-background rounded-2xl border border-border hover:shadow-card transition-shadow">
              <div className="w-14 h-14 rounded-xl bg-accent flex items-center justify-center mb-6">
                <Users className="w-7 h-7 text-accent-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                Join a community
              </h3>
              <p className="text-muted-foreground">
                Connect with hosts in your area, get tips from Superhosts, and access exclusive resources.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-foreground">
        <div className="max-w-screen-xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-background mb-6">
            Ready to start your hosting journey?
          </h2>
          <p className="text-background/70 text-lg mb-10 max-w-xl mx-auto">
            It only takes 10 minutes to set up your listing. We'll guide you every step of the way.
          </p>
          <Button
            variant="secondary"
            size="lg"
            onClick={() => navigate("/become-a-host")}
            className="text-lg"
          >
            Get started
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-border">
        <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-primary flex items-center justify-center">
              <Home className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-semibold text-foreground">hostify</span>
          </div>
          <p className="text-sm text-muted-foreground">
            *Average based on bookings data from hosts in select markets.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
