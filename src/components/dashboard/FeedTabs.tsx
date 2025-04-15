
import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { TrendingUp } from "lucide-react";
import FeedCard from "@/components/FeedCard";
import { FeedItem } from "@/data/mockData";
import { supabase } from '@/integrations/supabase/client';

interface FeedTabsProps {
  feedItems: FeedItem[];
}

const FeedTabs = ({ feedItems: initialFeedItems }: FeedTabsProps) => {
  const [feedTab, setFeedTab] = useState('all');
  const [feedItems, setFeedItems] = useState<FeedItem[]>(initialFeedItems);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchRecentAchievements = async () => {
      try {
        setLoading(true);
        
        const { data, error } = await supabase
          .from('achievements')
          .select('*, profiles:user_id(username, avatar_url)')
          .order('created_at', { ascending: false })
          .limit(10);
          
        if (error) {
          console.error("Error fetching achievements:", error);
          return;
        }
        
        if (data) {
          // Convert Supabase achievements to FeedItems
          const newFeedItems: FeedItem[] = data.map(item => ({
            id: item.id,
            userId: item.user_id,
            type: 'achievement',
            achievementId: item.id,
            content: `Just earned the "${item.title}" achievement!`,
            date: item.created_at,
            likes: item.likes || 0,
            comments: item.comments || 0,
            timestamp: new Date(item.created_at).getTime() // Add the missing timestamp property
          }));
          
          // Combine with initial feed items, but prioritize real database items
          const combinedItems = [...newFeedItems, ...initialFeedItems.filter(item => 
            !newFeedItems.some(newItem => 
              (newItem.achievementId && newItem.achievementId === item.achievementId) ||
              (newItem.id === item.id)
            )
          )];
          
          setFeedItems(combinedItems);
        }
      } catch (error) {
        console.error("Error in fetching achievements:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchRecentAchievements();
    
    // Set up a real-time subscription for new achievements
    const channel = supabase
      .channel('public:achievements')
      .on('postgres_changes', { 
        event: 'INSERT', 
        schema: 'public', 
        table: 'achievements' 
      }, (payload) => {
        const newAchievement = payload.new;
        
        // Add the new achievement to the feed
        setFeedItems(prev => [{
          id: newAchievement.id,
          userId: newAchievement.user_id,
          type: 'achievement',
          achievementId: newAchievement.id,
          content: `Just earned the "${newAchievement.title}" achievement!`,
          date: newAchievement.created_at,
          likes: newAchievement.likes || 0,
          comments: newAchievement.comments || 0,
          timestamp: new Date(newAchievement.created_at).getTime() // Add the missing timestamp property
        }, ...prev]);
      })
      .subscribe();
      
    return () => {
      supabase.removeChannel(channel);
    };
  }, [initialFeedItems]);

  return (
    <Tabs defaultValue="all" value={feedTab} onValueChange={setFeedTab}>
      <div className="flex justify-between items-center mb-4">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="connections">Connections</TabsTrigger>
        </TabsList>
        <Button variant="ghost" size="sm" className="flex items-center gap-1 text-sm">
          <TrendingUp size={16} />
          Trending
        </Button>
      </div>
      
      <TabsContent value="all" className="space-y-4 mt-0">
        {loading ? (
          <div className="text-center py-4">Loading feed items...</div>
        ) : feedItems.length > 0 ? (
          feedItems.map(item => <FeedCard key={item.id} feedItem={item} />)
        ) : (
          <div className="text-center py-8 text-gray-500">No feed items to display</div>
        )}
      </TabsContent>
      
      <TabsContent value="achievements" className="space-y-4 mt-0">
        {loading ? (
          <div className="text-center py-4">Loading achievements...</div>
        ) : feedItems
          .filter(item => item.type === 'achievement' || item.type === 'milestone')
          .length > 0 ? (
            feedItems
              .filter(item => item.type === 'achievement' || item.type === 'milestone')
              .map(item => <FeedCard key={item.id} feedItem={item} />)
          ) : (
            <div className="text-center py-8 text-gray-500">No achievements to display</div>
          )
        }
      </TabsContent>
      
      <TabsContent value="connections" className="space-y-4 mt-0">
        {feedItems
          .filter(item => item.type === 'connection')
          .map(item => (
            <FeedCard key={item.id} feedItem={item} />
          ))}
      </TabsContent>
    </Tabs>
  );
};

export default FeedTabs;
