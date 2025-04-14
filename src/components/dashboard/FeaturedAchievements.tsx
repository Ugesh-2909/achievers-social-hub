
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import AchievementCard from "@/components/AchievementCard";
import { Achievement } from "@/data/mockData";

interface FeaturedAchievementsProps {
  achievements: Achievement[];
}

const FeaturedAchievements = ({ achievements }: FeaturedAchievementsProps) => {
  return (
    <Card className="overflow-hidden border-brand-purple/20 animate-fade-in">
      <div className="bg-gradient-to-r from-brand-orange to-orange-400 px-4 py-3">
        <h3 className="font-semibold text-white flex items-center">
          <Star className="h-5 w-5 mr-2" />
          Featured Achievements
        </h3>
      </div>
      <CardContent className="p-4">
        <div className="space-y-3">
          {achievements
            .filter(achievement => achievement.badge)
            .slice(0, 3)
            .map(achievement => (
              <AchievementCard key={achievement.id} achievement={achievement} />
            ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default FeaturedAchievements;
