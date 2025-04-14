import { User } from '@/contexts/AuthContext';
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { User as LucideUser, Trophy } from "lucide-react";

interface UserProgressCardProps {
  user: User;
}

const UserProgressCard = ({ user }: UserProgressCardProps) => {
  const level = user.level || 1;
  const xp = user.xp || 0;
  const nextLevelXp = level * 1000;
  const xpProgress = Math.min((xp / nextLevelXp) * 100, 100);
  const streak = user.streak || 0;

  return (
    <Card className="overflow-hidden border-brand-purple/20">
      <div className="bg-gradient-to-r from-brand-purple to-brand-blue px-4 py-3">
        <h3 className="font-semibold text-white flex items-center">
          <LucideUser className="h-5 w-5 mr-2" />
          My Progress
        </h3>
      </div>
      <CardContent className="p-4">
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Level {level}</span>
              <span className="text-sm text-muted-foreground">{xp}/{nextLevelXp} XP</span>
            </div>
            <Progress value={xpProgress} className="h-2" />
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm">Daily Streak</span>
            <div className="flex items-center">
              <Trophy className="h-4 w-4 mr-1 text-yellow-500" />
              <span className="font-bold">{streak} days</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserProgressCard;
