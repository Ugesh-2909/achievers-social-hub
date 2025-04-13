
import { FeedItem, getUserById, achievements } from "@/data/mockData";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, Share2, Award, Users, Trophy } from "lucide-react";
import { useMemo } from "react";

interface FeedCardProps {
  feedItem: FeedItem;
}

const FeedCard = ({ feedItem }: FeedCardProps) => {
  const user = getUserById(feedItem.userId);
  
  const achievement = useMemo(() => {
    if (feedItem.achievementId) {
      return achievements.find(a => a.id === feedItem.achievementId);
    }
    return null;
  }, [feedItem.achievementId]);
  
  // Format date to show how long ago the post was created
  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;
    return date.toLocaleDateString();
  };
  
  // Get an icon based on the feed item type
  const getFeedIcon = () => {
    switch (feedItem.type) {
      case "achievement":
        return <Award size={18} className="text-brand-purple" />;
      case "connection":
        return <Users size={18} className="text-brand-blue" />;
      case "milestone":
        return <Trophy size={18} className="text-amber-500" />;
      default:
        return null;
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow duration-200">
      <CardContent className="p-4">
        <div className="flex items-start space-x-3">
          <img 
            src={user?.avatar} 
            alt={user?.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="flex-1">
            <div className="flex items-center space-x-2">
              <span className="font-semibold">{user?.name}</span>
              <span className="text-xs text-muted-foreground">@{user?.username}</span>
              <span className="text-xs text-muted-foreground">•</span>
              <span className="text-xs text-muted-foreground">{formatTimeAgo(feedItem.date)}</span>
            </div>
            <div className="flex items-center space-x-2 mt-1">
              {getFeedIcon()}
              <p className="text-sm">{feedItem.content}</p>
            </div>
            
            {achievement && (
              <div className="mt-3 bg-secondary/50 rounded-lg p-3">
                <div className="flex justify-between">
                  <h4 className="text-sm font-semibold">{achievement.title}</h4>
                  <span className="text-xs bg-secondary px-2 py-0.5 rounded-full capitalize">
                    {achievement.category}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">{achievement.description}</p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="px-4 py-2 border-t flex justify-between">
        <div className="flex space-x-4">
          <Button variant="ghost" size="sm" className="flex items-center gap-1 text-sm">
            <Heart size={16} />
            <span>{feedItem.likes}</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex items-center gap-1 text-sm">
            <MessageCircle size={16} />
            <span>{feedItem.comments}</span>
          </Button>
        </div>
        <Button variant="ghost" size="sm">
          <Share2 size={16} />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default FeedCard;
