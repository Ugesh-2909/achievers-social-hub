
import { FeedItem, getUserById, achievements } from "@/data/mockData";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, Share2, Award, Users, Trophy } from "lucide-react";
import { useMemo, useState, useEffect } from "react";
import { supabase } from '@/integrations/supabase/client';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";

interface FeedCardProps {
  feedItem: FeedItem;
}

type ProfileData = {
  username: string;
  avatar_url: string;
};

const FeedCard = ({ feedItem }: FeedCardProps) => {
  const [userData, setUserData] = useState<ProfileData | null>(null);
  const [achievementData, setAchievementData] = useState<any | null>(null);
  const mockUser = getUserById(feedItem.userId);
  
  useEffect(() => {
    // Fetch real user data from Supabase
    const fetchUserProfile = async () => {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('username, avatar_url')
          .eq('id', feedItem.userId)
          .single();
          
        if (error) {
          console.error("Error fetching user profile:", error);
          return;
        }
        
        if (data) {
          setUserData(data);
        }
      } catch (error) {
        console.error("Error in fetchUserProfile:", error);
      }
    };
    
    // Fetch real achievement data if this feed item is related to an achievement
    const fetchAchievementData = async () => {
      if (!feedItem.achievementId) return;
      
      try {
        const { data, error } = await supabase
          .from('achievements')
          .select('*')
          .eq('id', feedItem.achievementId)
          .single();
          
        if (error) {
          console.error("Error fetching achievement:", error);
          return;
        }
        
        if (data) {
          setAchievementData(data);
        }
      } catch (error) {
        console.error("Error in fetchAchievementData:", error);
      }
    };
    
    fetchUserProfile();
    if (feedItem.achievementId) {
      fetchAchievementData();
    }
  }, [feedItem.userId, feedItem.achievementId]);
  
  const achievement = useMemo(() => {
    if (achievementData) {
      return achievementData;
    }
    
    if (feedItem.achievementId) {
      return achievements.find(a => a.id === feedItem.achievementId);
    }
    
    return null;
  }, [feedItem.achievementId, achievementData]);
  
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

  // Use real user data if available, fallback to mock data
  const user = userData ? {
    name: userData.username,
    avatar: userData.avatar_url,
    username: userData.username
  } : mockUser;

  if (!user) return null;

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow duration-200">
      <CardContent className="p-4">
        <div className="flex items-start space-x-3">
          <Link to={`/profile/${user.username}`} className="flex-shrink-0">
            <Avatar className="h-10 w-10">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>{user.name?.[0]?.toUpperCase() || 'U'}</AvatarFallback>
            </Avatar>
          </Link>
          <div className="flex-1">
            <div className="flex items-center space-x-2">
              <Link to={`/profile/${user.username}`} className="font-semibold hover:underline">{user.name}</Link>
              <span className="text-xs text-muted-foreground">@{user.username}</span>
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
