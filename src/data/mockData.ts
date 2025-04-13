
export interface User {
  id: string;
  name: string;
  username: string;
  avatar: string;
  university: string;
  major: string;
  year: string;
  bio: string;
  connectionsCount: number;
  achievementsCount: number;
  rank: number;
}

export interface Achievement {
  id: string;
  userId: string;
  title: string;
  description: string;
  date: string;
  category: 'academic' | 'extracurricular' | 'professional' | 'volunteer' | 'award';
  likes: number;
  comments: number;
  badge?: 'gold' | 'silver' | 'bronze';
}

export interface FeedItem {
  id: string;
  userId: string;
  type: 'achievement' | 'connection' | 'milestone';
  content: string;
  date: string;
  likes: number;
  comments: number;
  achievementId?: string;
}

export interface LeaderboardItem {
  userId: string;
  rank: number;
  score: number;
  category: string;
}

// Mock Users
export const users: User[] = [
  {
    id: "1",
    name: "Alex Johnson",
    username: "alex_j",
    avatar: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=400&fit=crop",
    university: "Stanford University",
    major: "Computer Science",
    year: "Senior",
    bio: "Passionate about AI and machine learning. Always looking for new challenges!",
    connectionsCount: 234,
    achievementsCount: 18,
    rank: 1
  },
  {
    id: "2",
    name: "Taylor Smith",
    username: "taylor_s",
    avatar: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=400&fit=crop",
    university: "MIT",
    major: "Electrical Engineering",
    year: "Junior",
    bio: "Robotics enthusiast and hackathon winner. Let's build the future together!",
    connectionsCount: 198,
    achievementsCount: 15,
    rank: 2
  },
  {
    id: "3",
    name: "Jordan Lee",
    username: "jordan_l",
    avatar: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=400&h=400&fit=crop",
    university: "UC Berkeley",
    major: "Business Administration",
    year: "Sophomore",
    bio: "Entrepreneur and startup founder. Always looking to connect with like-minded individuals!",
    connectionsCount: 176,
    achievementsCount: 12,
    rank: 3
  },
  {
    id: "4",
    name: "Morgan Chen",
    username: "morgan_c",
    avatar: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=400&h=400&fit=crop",
    university: "Harvard University",
    major: "Psychology",
    year: "Freshman",
    bio: "Researcher and volunteer. Passionate about mental health awareness.",
    connectionsCount: 145,
    achievementsCount: 10,
    rank: 4
  },
];

// Mock Achievements
export const achievements: Achievement[] = [
  {
    id: "1",
    userId: "1",
    title: "First Place in Hackathon",
    description: "Won first place in the annual hackathon with our project on AI-driven accessibility tools",
    date: "2023-11-15",
    category: 'award',
    likes: 89,
    comments: 12,
    badge: 'gold'
  },
  {
    id: "2",
    userId: "1",
    title: "Research Paper Published",
    description: "Published research on machine learning applications in healthcare in a peer-reviewed journal",
    date: "2023-10-02",
    category: 'academic',
    likes: 76,
    comments: 8
  },
  {
    id: "3",
    userId: "2",
    title: "Internship at Google",
    description: "Secured a summer internship at Google as a Software Engineer",
    date: "2023-11-10",
    category: 'professional',
    likes: 124,
    comments: 19,
    badge: 'silver'
  },
  {
    id: "4",
    userId: "3",
    title: "Started New Startup",
    description: "Launched my tech startup focused on sustainable energy solutions",
    date: "2023-09-28",
    category: 'professional',
    likes: 67,
    comments: 14
  },
  {
    id: "5",
    userId: "4",
    title: "Volunteer Work Milestone",
    description: "Reached 500 hours of community service at local mental health awareness organization",
    date: "2023-10-20",
    category: 'volunteer',
    likes: 93,
    comments: 11,
    badge: 'bronze'
  },
  {
    id: "6",
    userId: "2",
    title: "Science Olympiad Winner",
    description: "Won first place in the National Science Olympiad in the Physics category",
    date: "2023-09-15",
    category: 'academic',
    likes: 112,
    comments: 16,
    badge: 'gold'
  },
];

// Mock Feed Items
export const feedItems: FeedItem[] = [
  {
    id: "1",
    userId: "1",
    type: "achievement",
    content: "Alex Johnson just earned a new achievement: First Place in Hackathon!",
    date: "2023-11-15T14:35:00",
    likes: 42,
    comments: 7,
    achievementId: "1"
  },
  {
    id: "2",
    userId: "2",
    type: "achievement",
    content: "Taylor Smith just earned a new achievement: Internship at Google!",
    date: "2023-11-10T10:22:00",
    likes: 38,
    comments: 5,
    achievementId: "3"
  },
  {
    id: "3",
    userId: "1",
    type: "connection",
    content: "Alex Johnson and Morgan Chen just connected!",
    date: "2023-11-08T16:15:00",
    likes: 12,
    comments: 2
  },
  {
    id: "4",
    userId: "3",
    type: "achievement",
    content: "Jordan Lee just earned a new achievement: Started New Startup!",
    date: "2023-09-28T09:45:00",
    likes: 29,
    comments: 8,
    achievementId: "4"
  },
  {
    id: "5",
    userId: "4",
    type: "milestone",
    content: "Morgan Chen reached a milestone: 500 hours of community service!",
    date: "2023-10-20T13:30:00",
    likes: 45,
    comments: 6,
    achievementId: "5"
  },
  {
    id: "6",
    userId: "2",
    type: "achievement",
    content: "Taylor Smith just earned a new achievement: Science Olympiad Winner!",
    date: "2023-09-15T11:20:00",
    likes: 56,
    comments: 9,
    achievementId: "6"
  },
];

// Mock Leaderboard Data
export const leaderboardItems: LeaderboardItem[] = [
  { userId: "1", rank: 1, score: 1250, category: "Overall" },
  { userId: "2", rank: 2, score: 1150, category: "Overall" },
  { userId: "3", rank: 3, score: 980, category: "Overall" },
  { userId: "4", rank: 4, score: 920, category: "Overall" },
  { userId: "2", rank: 1, score: 580, category: "Academic" },
  { userId: "1", rank: 2, score: 520, category: "Academic" },
  { userId: "1", rank: 1, score: 420, category: "Extracurricular" },
  { userId: "3", rank: 2, score: 380, category: "Extracurricular" },
  { userId: "4", rank: 1, score: 500, category: "Volunteer" },
  { userId: "3", rank: 1, score: 450, category: "Professional" },
];

// Helper function to get user by ID
export const getUserById = (id: string): User | undefined => {
  return users.find(user => user.id === id);
};

// Helper function to get achievements by user ID
export const getAchievementsByUserId = (userId: string): Achievement[] => {
  return achievements.filter(achievement => achievement.userId === userId);
};

// Helper function to get feed items by user ID
export const getFeedItemsByUserId = (userId: string): FeedItem[] => {
  return feedItems.filter(item => item.userId === userId);
};
