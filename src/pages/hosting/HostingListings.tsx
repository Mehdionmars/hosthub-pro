import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Home, Plus } from "lucide-react";

export default function HostingListings() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Your Listings</h1>
          <p className="text-muted-foreground">
            Manage and edit your properties
          </p>
        </div>
        <Button asChild>
          <Link to="/become-a-host" className="gap-2">
            <Plus className="h-4 w-4" />
            Add listing
          </Link>
        </Button>
      </div>

      <Card className="border-dashed">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
            <Home className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold mb-2">No listings yet</h3>
          <p className="text-muted-foreground text-center mb-4 max-w-sm">
            Start by creating your first listing to share your space with guests.
          </p>
          <Button asChild>
            <Link to="/become-a-host">Create listing</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}