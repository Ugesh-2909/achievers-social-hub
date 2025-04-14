
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { toast } from "sonner";
import { User } from "@/data/mockData";

interface ShareAchievementProps {
  user: User | {
    avatar: string;
    name: string;
  };
}

const ShareAchievement = ({ user }: ShareAchievementProps) => {
  const handleAddAchievement = () => {
    toast("Coming soon!", {
      description: "Achievement creation will be available soon!",
      action: {
        label: "Dismiss",
        onClick: () => console.log("Dismissed"),
      },
    });
  };

  return (
    <Card className="bg-white">
      <CardContent className="p-4">
        <div className="flex items-center space-x-4">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-10 h-10 rounded-full"
          />
          <Button variant="outline" className="flex-1 justify-start text-muted-foreground" onClick={handleAddAchievement}>
            Share a new achievement...
          </Button>
          <Button size="icon" className="bg-brand-purple hover:bg-brand-darkPurple" onClick={handleAddAchievement}>
            <PlusCircle size={18} />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ShareAchievement;
