
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";

const UpcomingEvents = () => {
  return (
    <Card className="overflow-hidden border-brand-purple/20 animate-fade-in">
      <div className="bg-gradient-to-r from-brand-blue to-blue-400 px-4 py-3">
        <h3 className="font-semibold text-white flex items-center">
          <Calendar className="h-5 w-5 mr-2" />
          Upcoming Events
        </h3>
      </div>
      <CardContent className="p-4">
        <div className="space-y-3">
          <div className="game-card p-3">
            <p className="font-medium text-sm">Hackathon 2025</p>
            <p className="text-xs text-muted-foreground">Apr 15 - Apr 17</p>
            <div className="mt-2">
              <span className="text-xs bg-brand-purple/10 text-brand-purple px-2 py-0.5 rounded">+100 XP</span>
            </div>
          </div>
          
          <div className="game-card p-3">
            <p className="font-medium text-sm">Career Fair</p>
            <p className="text-xs text-muted-foreground">Apr 20</p>
            <div className="mt-2">
              <span className="text-xs bg-brand-purple/10 text-brand-purple px-2 py-0.5 rounded">+75 XP</span>
            </div>
          </div>
          
          <div className="game-card p-3">
            <p className="font-medium text-sm">Workshop: AI Ethics</p>
            <p className="text-xs text-muted-foreground">Apr 25</p>
            <div className="mt-2">
              <span className="text-xs bg-brand-purple/10 text-brand-purple px-2 py-0.5 rounded">+50 XP</span>
            </div>
          </div>
        </div>
        <Button variant="outline" className="w-full mt-3 text-sm">View All Events</Button>
      </CardContent>
    </Card>
  );
};

export default UpcomingEvents;
