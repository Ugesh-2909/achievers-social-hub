
import { useAuth, User as AuthUser } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import ProfileCard from '@/components/ProfileCard';
import Footer from '@/components/Footer';
import { users, achievements, feedItems, leaderboardItems } from '@/data/mockData';
import { User as MockUser } from '@/data/mockData';

// Import refactored components
import WelcomeSection from '@/components/dashboard/WelcomeSection';
import UserProgressCard from '@/components/dashboard/UserProgressCard';
import QuickLinks from '@/components/dashboard/QuickLinks';
import DailyQuests from '@/components/dashboard/DailyQuests';
import ShareAchievement from '@/components/dashboard/ShareAchievement';
import FeedTabs from '@/components/dashboard/FeedTabs';
import LeaderboardCard from '@/components/LeaderboardCard';
import FeaturedAchievements from '@/components/dashboard/FeaturedAchievements';
import UpcomingEvents from '@/components/dashboard/UpcomingEvents';
import PeopleYouMayKnow from '@/components/dashboard/PeopleYouMayKnow';

const Index = () => {
  const { user } = useAuth();
  
  // Create a compatible user object that has all required properties from both types
  const currentUser: AuthUser = user || {
    id: users[0].id,
    name: users[0].name,
    email: 'mock@example.com', // Add required AuthUser properties
    avatar: users[0].avatar,
    level: 1,
    xp: 0,
    streak: 0,
    university: users[0].university,
    major: users[0].major
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <WelcomeSection />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-3 space-y-6">
            <ProfileCard user={currentUser} isCurrentUser={true} />
            <UserProgressCard user={currentUser} />
            <QuickLinks />
          </div>

          <div className="lg:col-span-6 space-y-6">
            <DailyQuests />
            <ShareAchievement user={currentUser} />
            <FeedTabs feedItems={feedItems} />
          </div>

          <div className="lg:col-span-3 space-y-6">
            <LeaderboardCard items={leaderboardItems} category="Overall" limit={5} />
            <FeaturedAchievements achievements={achievements} />
            <UpcomingEvents />
            <PeopleYouMayKnow users={users} />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
