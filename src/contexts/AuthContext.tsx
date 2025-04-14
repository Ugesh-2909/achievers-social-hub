import { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Session, User as SupabaseUser } from '@supabase/supabase-js';

// Export the User interface so it can be imported by other components
export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  level: number;
  xp: number;
  streak: number;
  university: string;
  major: string;
  username?: string;
  year?: string;
  bio?: string;
  connectionsCount?: number;
  achievementsCount?: number;
  rank?: number;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string, university: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  // Function to get user profile data from Supabase
  const getUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
        
      if (error) {
        console.error("Error fetching user profile:", error);
        return null;
      }
      
      return data;
    } catch (error) {
      console.error("Error in getUserProfile:", error);
      return null;
    }
  };
  
  // Function to convert Supabase user to our app's User type
  const mapSupabaseUser = async (supaUser: SupabaseUser, currentSession: Session | null): Promise<User> => {
    // Get additional profile data
    const profile = await getUserProfile(supaUser.id);
    
    // Calculate user stats (could be fetched from a separate table in a real app)
    const { data: achievements } = await supabase
      .from('achievements')
      .select('id, points')
      .eq('user_id', supaUser.id);
      
    const totalAchievements = achievements?.length || 0;
    const totalPoints = achievements?.reduce((sum, a) => sum + (a.points || 0), 0) || 0;
    
    // Level calculation (simplified)
    const level = Math.max(1, Math.floor(totalPoints / 1000) + 1);
    
    return {
      id: supaUser.id,
      name: profile?.username || supaUser.email?.split('@')[0] || 'User',
      email: supaUser.email || '',
      avatar: profile?.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(profile?.username || 'User')}`,
      level,
      xp: totalPoints,
      streak: 0, // This could be calculated from a separate table
      university: profile?.university || 'Not specified',
      major: profile?.major || 'Not specified',
      username: profile?.username,
      year: profile?.year,
      bio: profile?.bio,
      achievementsCount: totalAchievements,
    };
  };

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        setIsLoading(true);
        
        // First set up the auth listener
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
          async (_event, newSession) => {
            setSession(newSession);
            
            if (newSession?.user) {
              const mappedUser = await mapSupabaseUser(newSession.user, newSession);
              setUser(mappedUser);
            } else {
              setUser(null);
            }
          }
        );

        // Then check for existing session
        const { data: { session: currentSession } } = await supabase.auth.getSession();
        setSession(currentSession);
        
        if (currentSession?.user) {
          const mappedUser = await mapSupabaseUser(currentSession.user, currentSession);
          setUser(mappedUser);
        }
        
        setIsLoading(false);
        
        return () => {
          subscription.unsubscribe();
        };
      } catch (error) {
        console.error("Error initializing auth:", error);
        setIsLoading(false);
      }
    };
    
    initializeAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // For demo purposes keep the mock login logic
      if (email === 'demo@uprit.edu' && password === 'password') {
        const mockUser: User = {
          id: '1',
          name: 'Alex Johnson',
          email: 'demo@uprit.edu',
          avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop',
          level: 12,
          xp: 1250,
          streak: 7,
          university: 'Rochester Institute of Technology',
          major: 'Computer Science'
        };
        
        setUser(mockUser);
        localStorage.setItem('uprit_user', JSON.stringify(mockUser));
        return;
      }
      
      // Real Supabase login
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) throw error;

    } catch (error: any) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (name: string, email: string, password: string, university: string) => {
    setIsLoading(true);
    try {
      // Sign up with Supabase
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            university,
            avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`
          }
        }
      });
      
      if (error) throw error;

      // Note: Profile creation is handled by the database trigger we set up
      
    } catch (error: any) {
      console.error('Signup failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      setSession(null);
      localStorage.removeItem('uprit_user');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const updateUser = async (userData: Partial<User>) => {
    if (!user) return;
    
    try {
      // Update the profile in Supabase
      if (user.id) {
        const { error } = await supabase
          .from('profiles')
          .update({
            username: userData.username,
            university: userData.university,
            major: userData.major,
            year: userData.year,
            bio: userData.bio,
            avatar_url: userData.avatar
          })
          .eq('id', user.id);
          
        if (error) {
          console.error("Error updating profile:", error);
          return;
        }
      }
      
      // Update local state
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      
      // Also update local storage for compatibility
      localStorage.setItem('uprit_user', JSON.stringify(updatedUser));
      
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        session,
        isLoading, 
        isAuthenticated: !!user, 
        login, 
        signup, 
        logout, 
        updateUser 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
