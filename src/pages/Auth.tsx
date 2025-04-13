
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import LoginForm from '@/components/auth/LoginForm';
import SignupForm from '@/components/auth/SignupForm';
import { Trophy, Award, Users, Sparkles } from 'lucide-react';
import { useEffect } from 'react';

const AuthPage = () => {
  const [isLoginView, setIsLoginView] = useState(true);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-brand-purple mb-2">UpRIT</h1>
          <p className="text-lg text-gray-600">Level Up Your Academic Journey</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center max-w-6xl mx-auto">
          <div className="flex flex-col space-y-8 order-2 md:order-1">
            <div className="bg-white p-5 rounded-xl shadow-md border border-purple-100 transition-all hover:shadow-lg">
              <div className="flex items-start space-x-4">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Trophy className="h-6 w-6 text-brand-purple" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Showcase Achievements</h3>
                  <p className="text-gray-600">Display your academic accomplishments and get recognized by peers and faculty.</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-5 rounded-xl shadow-md border border-purple-100 transition-all hover:shadow-lg">
              <div className="flex items-start space-x-4">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Award className="h-6 w-6 text-brand-purple" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Earn Rewards</h3>
                  <p className="text-gray-600">Complete challenges, gain XP, and level up to unlock special badges and rewards.</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-5 rounded-xl shadow-md border border-purple-100 transition-all hover:shadow-lg">
              <div className="flex items-start space-x-4">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Users className="h-6 w-6 text-brand-purple" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Connect with Peers</h3>
                  <p className="text-gray-600">Build your network with like-minded students and collaborate on projects.</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-5 rounded-xl shadow-md border border-purple-100 transition-all hover:shadow-lg">
              <div className="flex items-start space-x-4">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Sparkles className="h-6 w-6 text-brand-purple" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Climb the Leaderboard</h3>
                  <p className="text-gray-600">Compete with others and see where you stand among the top achievers on campus.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="order-1 md:order-2">
            {isLoginView ? (
              <LoginForm onSwitchToSignup={() => setIsLoginView(false)} />
            ) : (
              <SignupForm onSwitchToLogin={() => setIsLoginView(true)} />
            )}
            
            {/* Demo Credentials */}
            {isLoginView && (
              <div className="mt-4 bg-purple-50 p-3 rounded-lg border border-purple-100 text-center">
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Demo credentials:</span><br />
                  Email: demo@uprit.edu<br />
                  Password: password
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <footer className="py-6 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} UpRIT. All rights reserved.
      </footer>
    </div>
  );
};

export default AuthPage;
