
import React from 'react';
import { Achievement, getUserById } from '@/data/mockData';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Award, Calendar, Heart, MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AchievementsListProps {
  achievements: Achievement[];
}

const AchievementsList = ({ achievements }: AchievementsListProps) => {
  if (achievements.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-500">No achievements found</h3>
        <p className="mt-2 text-gray-400">Try adjusting your search or filter settings</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {achievements.map((achievement) => {
        const user = getUserById(achievement.userId);
        
        const categoryColors = {
          academic: "bg-blue-100 text-blue-700",
          extracurricular: "bg-green-100 text-green-700",
          professional: "bg-purple-100 text-purple-700",
          volunteer: "bg-orange-100 text-orange-700",
          award: "bg-yellow-100 text-yellow-700",
        };
        
        const badgeColors = {
          gold: "text-achievement-gold",
          silver: "text-achievement-silver",
          bronze: "text-achievement-bronze",
        };

        return (
          <Card key={achievement.id} className="overflow-hidden card-hover">
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0">
                  <img
                    src={user?.avatar}
                    alt={user?.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                </div>
                
                <div className="flex-grow">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{achievement.title}</h3>
                      <p className="text-sm text-muted-foreground">by {user?.name}</p>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Badge className={cn("font-medium", categoryColors[achievement.category])}>
                        {achievement.category.charAt(0).toUpperCase() + achievement.category.slice(1)}
                      </Badge>
                      
                      {achievement.badge && (
                        <Award 
                          className={cn("w-6 h-6 drop-shadow-sm", badgeColors[achievement.badge])} 
                          fill="currentColor" 
                          strokeWidth={1.5} 
                        />
                      )}
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mt-1">{achievement.description}</p>
                  
                  <div className="flex justify-between items-center mt-3">
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-muted-foreground flex items-center">
                        <Calendar size={14} className="mr-1" />
                        {new Date(achievement.date).toLocaleDateString()}
                      </span>
                      <span className="text-sm text-muted-foreground flex items-center">
                        <Heart size={14} className="mr-1" />
                        {achievement.likes}
                      </span>
                      <span className="text-sm text-muted-foreground flex items-center">
                        <MessageCircle size={14} className="mr-1" />
                        {achievement.comments}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default AchievementsList;
