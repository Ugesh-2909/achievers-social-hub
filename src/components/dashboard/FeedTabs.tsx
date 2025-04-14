
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { TrendingUp } from "lucide-react";
import FeedCard from "@/components/FeedCard";
import { FeedItem } from "@/data/mockData";

interface FeedTabsProps {
  feedItems: FeedItem[];
}

const FeedTabs = ({ feedItems }: FeedTabsProps) => {
  const [feedTab, setFeedTab] = useState('all');

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
        {feedItems.map(item => (
          <FeedCard key={item.id} feedItem={item} />
        ))}
      </TabsContent>
      
      <TabsContent value="achievements" className="space-y-4 mt-0">
        {feedItems
          .filter(item => item.type === 'achievement' || item.type === 'milestone')
          .map(item => (
            <FeedCard key={item.id} feedItem={item} />
          ))}
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
