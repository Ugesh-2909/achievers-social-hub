
import { useState } from 'react';
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
import { Award, BookOpen, Globe, PlusCircle, TrendingUp, Users } from 'lucide-react';

const Index = () => {
  const [feedTab, setFeedTab] = useState('all');
  const currentUser = users[0]; // Alex Johnson is the current user

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <section className="mb-10 text-center">
          <h1 className="text-4xl font-bold mb-3 text-brand-purple">Welcome to Achievers Hub</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Showcase your achievements, connect with like-minded peers, and build your academic presence on campus.
          </p>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Sidebar */}
          <div className="lg:col-span-3 space-y-6">
            <ProfileCard user={currentUser} isCurrentUser={true} />

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
            {/* Add Achievement Card */}
            <Card className="bg-white">
              <CardContent className="p-4">
                <div className="flex items-center space-x-4">
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <Button variant="outline" className="flex-1 justify-start text-muted-foreground">
                    Share a new achievement...
                  </Button>
                  <Button size="icon" className="bg-brand-purple hover:bg-brand-darkPurple">
                    <PlusCircle size={18} />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Feed Tabs */}
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
            
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-3">Featured Achievements</h3>
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
