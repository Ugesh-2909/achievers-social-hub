
import React from 'react';
import AchievementCard from '@/components/AchievementCard';
import { Achievement } from '@/data/mockData';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Info } from 'lucide-react';

interface AchievementsGridProps {
  achievements: Achievement[];
}

const AchievementsGrid = ({ achievements }: AchievementsGridProps) => {
  if (achievements.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-500">No achievements found</h3>
        <p className="mt-2 text-gray-400">Try adjusting your search or filter settings</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {achievements.map((achievement) => (
        <div key={achievement.id} className="relative">
          <AchievementCard achievement={achievement} />
          <Tooltip>
            <TooltipTrigger asChild>
              <button className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 bg-white rounded-full p-1">
                <Info size={18} />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p className="w-[200px]">
                {achievement.badge ? 
                  `This achievement earned a ${achievement.badge} badge!` : 
                  'Earn badges by completing exceptional achievements'}
              </p>
            </TooltipContent>
          </Tooltip>
        </div>
      ))}
    </div>
  );
};

export default AchievementsGrid;
