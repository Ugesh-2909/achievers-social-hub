
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LeaderboardItem, getUserById } from "@/data/mockData";
import { Trophy } from "lucide-react";
import { cn } from "@/lib/utils";

interface LeaderboardCardProps {
  items: LeaderboardItem[];
  category: string;
  limit?: number;
}

const LeaderboardCard = ({ items, category, limit = 5 }: LeaderboardCardProps) => {
  const displayItems = items
    .filter((item) => item.category === category)
    .slice(0, limit);

  // Define badge styles based on rank
  const getBadgeStyle = (rank: number) => {
    switch (rank) {
      case 1:
        return "bg-achievement-gold text-white";
      case 2:
        return "bg-achievement-silver text-gray-800";
      case 3:
        return "bg-achievement-bronze text-white";
      default:
        return "bg-gray-200 text-gray-600";
    }
  };
  
  // Get trophy icon based on rank
  const getTrophyIcon = (rank: number) => {
    if (rank > 3) return null;
    
    const trophyColors = {
      1: "text-achievement-gold",
      2: "text-achievement-silver",
      3: "text-achievement-bronze",
    };
    
    return (
      <Trophy 
        className={cn("w-6 h-6", trophyColors[rank as keyof typeof trophyColors])} 
        fill="currentColor" 
        strokeWidth={1}
      />
    );
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <Trophy size={20} />
          {category} Leaderboard
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {displayItems.map((item) => {
            const user = getUserById(item.userId);
            return (
              <div
                key={`${item.userId}-${category}`}
                className="flex items-center justify-between p-2 rounded-lg hover:bg-secondary/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className={cn("flex items-center justify-center w-8 h-8 rounded-full font-bold", getBadgeStyle(item.rank))}>
                    {item.rank}
                  </div>
                  <img
                    src={user?.avatar}
                    alt={user?.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium">{user?.name}</p>
                    <p className="text-xs text-muted-foreground">{user?.university}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {getTrophyIcon(item.rank)}
                  <span className="font-bold text-brand-purple">{item.score}</span>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default LeaderboardCard;
