
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Target } from "lucide-react";
import { toast } from "sonner";

const DailyQuests = () => {
  const completeQuest = () => {
    toast.success("Quest completed!", {
      description: "You earned 50 XP and unlocked a new badge!",
    });
  };

  return (
    <Card className="bg-white border-brand-purple/20">
      <div className="bg-gradient-to-r from-game-quest to-purple-400 px-4 py-3">
        <h3 className="font-semibold text-white flex items-center">
          <Target className="h-5 w-5 mr-2" />
          Daily Quests
        </h3>
      </div>
      <CardContent className="p-4">
        <div className="space-y-3">
          <div className="quest-card flex justify-between items-center">
            <div>
              <h4 className="font-medium text-sm">Share an achievement</h4>
              <p className="text-xs text-muted-foreground">Post about a recent accomplishment</p>
            </div>
            <Button size="sm" onClick={completeQuest}>
              Complete
            </Button>
          </div>
          
          <div className="quest-card flex justify-between items-center">
            <div>
              <h4 className="font-medium text-sm">Connect with 2 peers</h4>
              <div className="flex items-center">
                <p className="text-xs text-muted-foreground">1/2 completed</p>
                <span className="ml-2 text-xs px-1.5 py-0.5 bg-brand-purple/10 text-brand-purple rounded">+30 XP</span>
              </div>
            </div>
            <Button size="sm" variant="outline">
              In Progress
            </Button>
          </div>
          
          <div className="quest-card flex justify-between items-center">
            <div>
              <h4 className="font-medium text-sm">Comment on 3 posts</h4>
              <div className="flex items-center">
                <p className="text-xs text-muted-foreground">0/3 completed</p>
                <span className="ml-2 text-xs px-1.5 py-0.5 bg-brand-purple/10 text-brand-purple rounded">+25 XP</span>
              </div>
            </div>
            <Button size="sm" variant="outline">
              Start
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DailyQuests;
