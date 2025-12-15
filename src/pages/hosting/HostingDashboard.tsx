import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function HostingDashboard() {
  const [activeTab, setActiveTab] = useState<"today" | "upcoming">("today");

  return (
    <div className="max-w-4xl mx-auto w-full px-6 py-16">
      {/* Tab buttons */}
      <div className="flex justify-center gap-4 mb-20">
        <button
          onClick={() => setActiveTab("today")}
          className={`px-7 py-2.5 rounded-full font-semibold shadow-sm transition ${
            activeTab === "today"
              ? "bg-primary text-primary-foreground"
              : "bg-muted hover:bg-muted/80 text-muted-foreground"
          }`}
        >
          Aujourd'hui
        </button>
        <button
          onClick={() => setActiveTab("upcoming")}
          className={`px-7 py-2.5 rounded-full font-medium transition ${
            activeTab === "upcoming"
              ? "bg-primary text-primary-foreground"
              : "bg-muted hover:bg-muted/80 text-muted-foreground"
          }`}
        >
          À venir
        </button>
      </div>

      {/* Empty state */}
      <section className="text-center">
        <h2 className="text-2xl font-semibold text-foreground mb-3">
          Vous n'avez aucune réservation
        </h2>
        <p className="text-muted-foreground max-w-md mx-auto mb-8">
          To get booked, you'll need to complete and publish your listing.
        </p>
        <Button asChild variant="secondary" className="px-10 py-3 h-auto rounded-xl">
          <Link to="/become-a-host">Finaliser mon annonce</Link>
        </Button>
      </section>
    </div>
  );
}