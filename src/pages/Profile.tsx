
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProfileCard from '@/components/ProfileCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AchievementsList from '@/components/achievements/AchievementsList';
import { Button } from '@/components/ui/button';
import { Pencil } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import ProfileEditDialog from '@/components/profile/ProfileEditDialog';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';

export type Profile = {
  id: string;
  username: string;
  university: string;
  major: string;
  year?: string;
  bio?: string;
  avatar_url: string;
  updated_at: string;
};

export type DatabaseAchievement = {
  id: string;
  user_id: string;
  title: string;
  description: string;
  category: string;
  image?: string;
  points: number;
  date: string;
  likes: number;
  comments: number;
  created_at: string;
};

const ProfilePage = () => {
  const { username } = useParams<{ username?: string }>();
  const { user: authUser } = useAuth();
  const { toast } = useToast();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [achievements, setAchievements] = useState<DatabaseAchievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isCurrentUser, setIsCurrentUser] = useState(false);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setLoading(true);
        
        // If no username provided, fetch current user's profile
        let userId = null;
        
        if (!username && authUser) {
          // Load the current user's profile
          userId = authUser.id;
          setIsCurrentUser(true);
        } else if (username) {
          // Find user by username
          const { data: userByUsername } = await supabase
            .from('profiles')
            .select('id')
            .eq('username', username)
            .single();
            
          if (userByUsername) {
            userId = userByUsername.id;
            setIsCurrentUser(userId === authUser?.id);
          }
        }
        
        if (!userId) {
          toast({ title: "Error", description: "User not found", variant: "destructive" });
          setLoading(false);
          return;
        }
        
        // Fetch profile data
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', userId)
          .single();
        
        if (profileError) {
          console.error("Error fetching profile:", profileError);
          toast({ title: "Error", description: "Failed to load profile data", variant: "destructive" });
        } else if (profileData) {
          setProfile(profileData);
        }
        
        // Fetch user's achievements
        const { data: achievementsData, error: achievementsError } = await supabase
          .from('achievements')
          .select('*')
          .eq('user_id', userId)
          .order('created_at', { ascending: false });
        
        if (achievementsError) {
          console.error("Error fetching achievements:", achievementsError);
        } else {
          setAchievements(achievementsData || []);
        }
      } catch (error) {
        console.error("Error in profile data fetching:", error);
        toast({ title: "Error", description: "Something went wrong", variant: "destructive" });
      } finally {
        setLoading(false);
      }
    };
    
    fetchProfileData();
  }, [username, authUser, toast]);
  
  const handleProfileUpdate = async (updatedProfile: Partial<Profile>) => {
    try {
      if (!authUser || !profile) return;
      
      const { data, error } = await supabase
        .from('profiles')
        .update(updatedProfile)
        .eq('id', authUser.id)
        .select()
        .single();
      
      if (error) {
        toast({ title: "Error", description: "Failed to update profile", variant: "destructive" });
        return;
      }
      
      setProfile({ ...profile, ...data });
      toast({ title: "Success", description: "Profile updated successfully" });
      setIsEditDialogOpen(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({ title: "Error", description: "Something went wrong", variant: "destructive" });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 py-8">
          <div className="w-full max-w-3xl mx-auto">
            <Skeleton className="h-[300px] w-full mb-4" />
            <Skeleton className="h-12 w-full mb-8" />
            <div className="space-y-4">
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-24 w-full" />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold mb-4">User Not Found</h1>
          <p>The requested profile could not be found.</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="w-full max-w-4xl mx-auto">
          <div className="flex justify-between items-start mb-6">
            <h1 className="text-3xl font-bold">{profile.username}'s Profile</h1>
            {isCurrentUser && (
              <Button 
                variant="outline" 
                size="sm"
                className="flex items-center gap-1"
                onClick={() => setIsEditDialogOpen(true)}
              >
                <Pencil size={16} />
                Edit Profile
              </Button>
            )}
          </div>
          
          <div className="mb-8">
            <ProfileCard 
              user={{
                id: profile.id,
                name: profile.username || 'User',
                avatar: profile.avatar_url,
                university: profile.university || 'Not specified',
                major: profile.major || 'Not specified',
                year: profile.year,
                bio: profile.bio,
                achievementsCount: achievements.length
              }} 
              isCurrentUser={isCurrentUser}
            />
          </div>
          
          <Tabs defaultValue="achievements" className="mb-8">
            <TabsList className="mb-4">
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
              <TabsTrigger value="stats">Stats</TabsTrigger>
            </TabsList>
            
            <TabsContent value="achievements">
              <div className="bg-white rounded-lg shadow p-4">
                <h2 className="text-xl font-semibold mb-4">Achievements ({achievements.length})</h2>
                {achievements.length > 0 ? (
                  <AchievementsList achievements={achievements.map(a => ({
                    id: a.id,
                    userId: a.user_id,
                    title: a.title,
                    description: a.description,
                    category: a.category,
                    image: a.image || `/images/achievements/${a.category}.svg`,
                    points: a.points,
                    date: a.date,
                    likes: a.likes,
                    comments: a.comments,
                    badge: a.points >= 200 ? 'gold' : a.points >= 150 ? 'silver' : a.points >= 100 ? 'bronze' : undefined
                  }))} />
                ) : (
                  <p className="text-center text-gray-500 py-8">No achievements yet</p>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="stats">
              <div className="bg-white rounded-lg shadow p-4">
                <h2 className="text-xl font-semibold mb-4">User Stats</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4 text-center">
                    <p className="text-sm text-gray-500">Total Achievements</p>
                    <p className="text-3xl font-bold text-brand-purple">{achievements.length}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 text-center">
                    <p className="text-sm text-gray-500">Total Points</p>
                    <p className="text-3xl font-bold text-brand-blue">
                      {achievements.reduce((sum, a) => sum + a.points, 0)}
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 text-center">
                    <p className="text-sm text-gray-500">Member Since</p>
                    <p className="text-xl font-bold">
                      {new Date(profile.updated_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      {isCurrentUser && (
        <ProfileEditDialog 
          open={isEditDialogOpen} 
          onOpenChange={setIsEditDialogOpen}
          profile={profile}
          onSave={handleProfileUpdate}
        />
      )}
      
      <Footer />
    </div>
  );
};

export default ProfilePage;
