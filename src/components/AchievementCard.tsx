
import { Award, Calendar, Heart, MessageCircle, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Achievement, getUserById } from "@/data/mockData";
import { cn } from "@/lib/utils";

interface AchievementCardProps {
  achievement: Achievement;
}

const AchievementCard = ({ achievement }: AchievementCardProps) => {
  const user = getUserById(achievement.userId);
  
  const categoryColors = {
    academic: "bg-blue-100 text-blue-700",
    extracurricular: "bg-green-100 text-green-700",
    professional: "bg-purple-100 text-purple-700",
    volunteer: "bg-orange-100 text-orange-700",
    award: "bg-yellow-100 text-yellow-700",
  };
  
  const getBadgeIcon = () => {
    if (!achievement.badge) return null;
    
    const badgeColors = {
      gold: "text-achievement-gold",
      silver: "text-achievement-silver",
      bronze: "text-achievement-bronze",
    };
    
    return (
      <div className="absolute -top-2 -right-2">
        <Award 
          className={cn("w-8 h-8 drop-shadow-md", badgeColors[achievement.badge])} 
          fill="currentColor" 
          strokeWidth={1.5} 
        />
      </div>
    );
  };

  return (
    <Card className="overflow-hidden card-hover relative">
      {getBadgeIcon()}
      <CardHeader className="pb-2 flex flex-row gap-4 items-center">
        <img
          src={user?.avatar}
          alt={user?.name}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <h3 className="font-semibold">{user?.name}</h3>
          <p className="text-sm text-muted-foreground">@{user?.username}</p>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex justify-between mb-2">
          <Badge className={cn("font-medium", categoryColors[achievement.category])}>
            {achievement.category.charAt(0).toUpperCase() + achievement.category.slice(1)}
          </Badge>
          <span className="text-sm text-muted-foreground flex items-center">
            <Calendar size={14} className="mr-1" />
            {new Date(achievement.date).toLocaleDateString()}
          </span>
        </div>
        
        <h4 className="text-lg font-bold mb-1">{achievement.title}</h4>
        <p className="text-sm text-muted-foreground">{achievement.description}</p>
      </CardContent>
      <CardFooter className="border-t pt-3 flex justify-between">
        <div className="flex gap-3">
          <Button variant="ghost" size="sm" className="flex items-center gap-1 text-sm">
            <Heart size={16} />
            <span>{achievement.likes}</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex items-center gap-1 text-sm">
            <MessageCircle size={16} />
            <span>{achievement.comments}</span>
          </Button>
        </div>
        <Button variant="ghost" size="sm">
          <Share2 size={16} />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AchievementCard;
