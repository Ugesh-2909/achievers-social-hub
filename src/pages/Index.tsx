import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import ProfileCard from '@/components/ProfileCard';
import AchievementCard from '@/components/AchievementCard';
import FeedCard from '@/components/FeedCard';
import LeaderboardCard from '@/components/LeaderboardCard';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { users, achievements, feedItems, leaderboardItems } from '@/data/mockData';
import { Award, BookOpen, Globe, PlusCircle, TrendingUp, Users, Target, Star, Calendar } from 'lucide-react';
import { toast } from 'sonner';

const Index = () => {
  const [feedTab, setFeedTab] = useState('all');
  const { user } = useAuth();
  
  // Create a properly merged user object with both auth context and mock data properties
  // Force type assertion since we've ensured these properties exist on User type
  const currentUser = user || users[0];

  const handleAddAchievement = () => {
    toast("Coming soon!", {
      description: "Achievement creation will be available soon!",
      action: {
        label: "Dismiss",
        onClick: () => console.log("Dismissed"),
      },
    });
  };

  const completeQuest = () => {
    toast.success("Quest completed!", {
      description: "You earned 50 XP and unlocked a new badge!",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <section className="mb-10 text-center">
          <h1 className="text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-brand-purple to-brand-blue">Welcome to UpRIT</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Level up your academic journey, showcase achievements, and connect with peers in a gamified campus experience.
          </p>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Sidebar */}
          <div className="lg:col-span-3 space-y-6">
            <ProfileCard user={currentUser} isCurrentUser={true} />

            {/* Gamification Stats */}
            <Card className="overflow-hidden border-brand-purple/20 animate-fade-in">
              <div className="bg-gradient-to-r from-brand-purple to-brand-blue px-4 py-3">
                <h3 className="font-semibold text-white">Your Progress</h3>
              </div>
              <CardContent className="p-4">
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Level {currentUser.level}</span>
                      <span className="text-sm text-muted-foreground">{currentUser.xp}/2000 XP</span>
                    </div>
                    <div className="progress-bar">
                      <div className="progress-value" style={{ width: `${Math.min((currentUser.xp / 2000) * 100, 100)}%` }}></div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Daily Streak</span>
                    <div className="streak-badge">
                      {currentUser.streak} days
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Achievements</span>
                    <span className="bg-secondary rounded-full px-2 py-0.5 text-xs font-semibold">
                      12/50
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Quests Complete</span>
                    <span className="bg-secondary rounded-full px-2 py-0.5 text-xs font-semibold">
                      8/20
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-3">Quick Links</h3>
                <div className="space-y-2">
                  <Button variant="ghost" className="w-full justify-start">
                    <Users className="mr-2 h-4 w-4" />
                    <span>My Connections</span>
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <Award className="mr-2 h-4 w-4" />
                    <span>My Achievements</span>
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <BookOpen className="mr-2 h-4 w-4" />
                    <span>Learning Resources</span>
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <Globe className="mr-2 h-4 w-4" />
                    <span>Campus Events</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-6 space-y-6">
            <Card className="bg-white border-brand-purple/20">
              <div className="bg-gradient-to-r from-game-quest to-purple-400 px-4 py-3">
                <h3 className="font-semibold text-white flex items-center">
                  <Target className="h-5 w-5 mr-2" />
                  Daily Quests
                </h3>
              </div>
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="quest-card flex justify-between items-center">
                    <div>
                      <h4 className="font-medium text-sm">Share an achievement</h4>
                      <p className="text-xs text-muted-foreground">Post about a recent accomplishment</p>
                    </div>
                    <Button size="sm" onClick={completeQuest}>
                      Complete
                    </Button>
                  </div>
                  
                  <div className="quest-card flex justify-between items-center">
                    <div>
                      <h4 className="font-medium text-sm">Connect with 2 peers</h4>
                      <div className="flex items-center">
                        <p className="text-xs text-muted-foreground">1/2 completed</p>
                        <span className="ml-2 text-xs px-1.5 py-0.5 bg-brand-purple/10 text-brand-purple rounded">+30 XP</span>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      In Progress
                    </Button>
                  </div>
                  
                  <div className="quest-card flex justify-between items-center">
                    <div>
                      <h4 className="font-medium text-sm">Comment on 3 posts</h4>
                      <div className="flex items-center">
                        <p className="text-xs text-muted-foreground">0/3 completed</p>
                        <span className="ml-2 text-xs px-1.5 py-0.5 bg-brand-purple/10 text-brand-purple rounded">+25 XP</span>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      Start
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white">
              <CardContent className="p-4">
                <div className="flex items-center space-x-4">
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <Button variant="outline" className="flex-1 justify-start text-muted-foreground" onClick={handleAddAchievement}>
                    Share a new achievement...
                  </Button>
                  <Button size="icon" className="bg-brand-purple hover:bg-brand-darkPurple" onClick={handleAddAchievement}>
                    <PlusCircle size={18} />
                  </Button>
                </div>
              </CardContent>
            </Card>

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
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-3 space-y-6">
            <LeaderboardCard items={leaderboardItems} category="Overall" limit={5} />
            
            <Card className="overflow-hidden border-brand-purple/20 animate-fade-in">
              <div className="bg-gradient-to-r from-brand-orange to-orange-400 px-4 py-3">
                <h3 className="font-semibold text-white flex items-center">
                  <Star className="h-5 w-5 mr-2" />
                  Featured Achievements
                </h3>
              </div>
              <CardContent className="p-4">
                <div className="space-y-3">
                  {achievements
                    .filter(achievement => achievement.badge)
                    .slice(0, 3)
                    .map(achievement => (
                      <AchievementCard key={achievement.id} achievement={achievement} />
                    ))}
                </div>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden border-brand-purple/20 animate-fade-in">
              <div className="bg-gradient-to-r from-brand-blue to-blue-400 px-4 py-3">
                <h3 className="font-semibold text-white flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  Upcoming Events
                </h3>
              </div>
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="game-card p-3">
                    <p className="font-medium text-sm">Hackathon 2025</p>
                    <p className="text-xs text-muted-foreground">Apr 15 - Apr 17</p>
                    <div className="mt-2">
                      <span className="text-xs bg-brand-purple/10 text-brand-purple px-2 py-0.5 rounded">+100 XP</span>
                    </div>
                  </div>
                  
                  <div className="game-card p-3">
                    <p className="font-medium text-sm">Career Fair</p>
                    <p className="text-xs text-muted-foreground">Apr 20</p>
                    <div className="mt-2">
                      <span className="text-xs bg-brand-purple/10 text-brand-purple px-2 py-0.5 rounded">+75 XP</span>
                    </div>
                  </div>
                  
                  <div className="game-card p-3">
                    <p className="font-medium text-sm">Workshop: AI Ethics</p>
                    <p className="text-xs text-muted-foreground">Apr 25</p>
                    <div className="mt-2">
                      <span className="text-xs bg-brand-purple/10 text-brand-purple px-2 py-0.5 rounded">+50 XP</span>
                    </div>
                  </div>
                </div>
                <Button variant="outline" className="w-full mt-3 text-sm">View All Events</Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-3">People You May Know</h3>
                <div className="space-y-3">
                  {users.slice(1, 4).map(user => (
                    <div key={user.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-10 h-10 rounded-full"
                        />
                        <div>
                          <p className="font-medium text-sm">{user.name}</p>
                          <p className="text-xs text-muted-foreground">{user.university}</p>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">Connect</Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
