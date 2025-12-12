import { Card, CardContent } from "@/components/ui/card";
import { MessageSquare } from "lucide-react";

export default function HostingInbox() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Inbox</h1>
        <p className="text-muted-foreground">
          Messages from guests and support
        </p>
      </div>

      <Card className="border-dashed">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
            <MessageSquare className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold mb-2">No messages yet</h3>
          <p className="text-muted-foreground text-center max-w-sm">
            When guests send you messages, they'll appear here.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}