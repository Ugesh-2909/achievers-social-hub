
import { useState, useEffect } from 'react';
import { achievement } from '@/data/mockData';
import AchievementsList from '@/components/achievements/AchievementsList';
import AchievementsFilters from '@/components/achievements/AchievementsFilters';
import AchievementsHeader from '@/components/achievements/AchievementsHeader';
import { supabase } from '@/integrations/supabase/client';

export interface AchievementSearchParams {
  category?: string;
  sort?: string;
  period?: string;
  search?: string;
}

const AchievementsPage = () => {
  const [achievements, setAchievements] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchParams, setSearchParams] = useState<AchievementSearchParams>({});

  useEffect(() => {
    const fetchAchievements = async () => {
      setLoading(true);
      
      try {
        let query = supabase
          .from('achievements')
          .select('*, profiles:user_id(username, avatar_url)')
          .order('created_at', { ascending: false });
          
        if (searchParams.category) {
          query = query.eq('category', searchParams.category);
        }
        
        if (searchParams.search) {
          query = query.or(`title.ilike.%${searchParams.search}%,description.ilike.%${searchParams.search}%`);
        }
        
        const { data, error } = await query;
        
        if (error) {
          console.error("Error fetching achievements:", error);
          return;
        }
        
        if (data) {
          // Convert to format expected by AchievementsList component
          const formattedAchievements = data.map(item => ({
            id: item.id,
            userId: item.user_id,
            title: item.title,
            description: item.description,
            category: item.category,
            image: item.image,
            points: item.points,
            date: item.created_at,
            likes: item.likes || 0,
            comments: item.comments || 0,
            badge: item.badge || null,
          }));
          
          setAchievements(formattedAchievements);
        }
      } catch (error) {
        console.error("Error in fetchAchievements:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchAchievements();
  }, [searchParams]);

  const handleFilter = (params: AchievementSearchParams) => {
    setSearchParams(params);
  };

  return (
    <div className="container py-8 max-w-screen-xl mx-auto">
      <AchievementsHeader />
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-6">
        <div className="lg:col-span-1">
          <AchievementsFilters onFilter={handleFilter} />
        </div>
        
        <div className="lg:col-span-3">
          {loading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Loading achievements...</p>
            </div>
          ) : achievements.length > 0 ? (
            <AchievementsList achievements={achievements} />
          ) : (
            <div className="text-center py-12 border rounded-lg">
              <h3 className="text-lg font-medium text-muted-foreground">No achievements found</h3>
              <p className="mt-2 text-sm text-muted-foreground">Try adjusting your filters or search criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AchievementsPage;
