
import { Card, CardContent } from "@/components/ui/card";
import { User } from "@/data/mockData";

interface UserProgressCardProps {
  user: User | {
    level: number;
    xp: number;
    streak: number;
  };
}

const UserProgressCard = ({ user }: UserProgressCardProps) => {
  return (
    <Card className="overflow-hidden border-brand-purple/20 animate-fade-in">
      <div className="bg-gradient-to-r from-brand-purple to-brand-blue px-4 py-3">
        <h3 className="font-semibold text-white">Your Progress</h3>
      </div>
      <CardContent className="p-4">
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">Level {user.level}</span>
              <span className="text-sm text-muted-foreground">{user.xp}/2000 XP</span>
            </div>
            <div className="progress-bar">
              <div className="progress-value" style={{ width: `${Math.min((user.xp / 2000) * 100, 100)}%` }}></div>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Daily Streak</span>
            <div className="streak-badge">
              {user.streak} days
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Achievements</span>
            <span className="bg-secondary rounded-full px-2 py-0.5 text-xs font-semibold">
              12/50
            </span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Quests Complete</span>
            <span className="bg-secondary rounded-full px-2 py-0.5 text-xs font-semibold">
              8/20
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserProgressCard;
