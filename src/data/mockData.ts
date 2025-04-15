export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  avatar: string;
  level: number;
  xp: number;
  streak: number;
  university: string;
  major: string;
  year: string;
  bio: string;
  connectionsCount: number;
  achievementsCount: number;
  rank?: number;
}

export interface Achievement {
  id: string;
  userId: string;
  title: string;
  description: string;
  image: string;
  points: number;
  category: string;
  badge?: "gold" | "silver" | "bronze";
  date: string;
  likes: number;
  comments: number;
}

export interface FeedItem {
  id: string;
  userId: string;
  type: 'achievement' | 'connection' | 'milestone' | 'event';
  content: string;
  date: string;
  likes: number;
  comments: number;
  achievementId?: string;
  timestamp: string | number;
}

export interface LeaderboardItem {
  userId: string;
  category: string;
  rank: number;
  score: number;
  user: User | undefined;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  image: string;
  date: string;
  location: string;
}

export const users: User[] = [
  {
    id: "1",
    name: "Alex Johnson",
    username: "alexj",
    email: "alex.johnson@example.com",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop",
    level: 12,
    xp: 1250,
    streak: 7,
    university: "Rochester Institute of Technology",
    major: "Computer Science",
    year: "2023",
    bio: "Passionate about coding and making a difference.",
    connectionsCount: 45,
    achievementsCount: 18,
    rank: 4
  },
  {
    id: "2",
    name: "Jordan Smith",
    username: "jordans",
    email: "jordan.smith@example.com",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop",
    level: 8,
    xp: 890,
    streak: 3,
    university: "University of California, Berkeley",
    major: "Electrical Engineering",
    year: "2024",
    bio: "Exploring the world of electronics and robotics.",
    connectionsCount: 32,
    achievementsCount: 12,
    rank: 8
  },
  {
    id: "3",
    name: "Casey Williams",
    username: "caseyw",
    email: "casey.williams@example.com",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b2933e?w=150&h=150&fit=crop",
    level: 5,
    xp: 540,
    streak: 5,
    university: "Massachusetts Institute of Technology",
    major: "Mathematics",
    year: "2025",
    bio: "Solving complex problems with numbers and equations.",
    connectionsCount: 28,
    achievementsCount: 9,
    rank: 2
  },
  {
    id: "4",
    name: "Riley Brown",
    username: "rileyb",
    email: "riley.brown@example.com",
    avatar: "https://images.unsplash.com/photo-1500648767791-00d5a4ee9baa?w=150&h=150&fit=crop",
    level: 10,
    xp: 1020,
    streak: 2,
    university: "Stanford University",
    major: "Physics",
    year: "2023",
    bio: "Unraveling the mysteries of the universe.",
    connectionsCount: 38,
    achievementsCount: 15,
    rank: 12
  },
  {
    id: "5",
    name: "Taylor Davis",
    username: "taylord",
    email: "taylor.davis@example.com",
    avatar: "https://images.unsplash.com/photo-1544005313-9431e66e7677?w=150&h=150&fit=crop",
    level: 7,
    xp: 760,
    streak: 4,
    university: "Carnegie Mellon University",
    major: "Artificial Intelligence",
    year: "2024",
    bio: "Building intelligent machines for a better future.",
    connectionsCount: 25,
    achievementsCount: 11,
    rank: 9
  },
  {
    id: "6",
    name: "Morgan Wilson",
    username: "morganw",
    email: "morgan.wilson@example.com",
    avatar: "https://images.unsplash.com/photo-1488426862026-730f93caaa64?w=150&h=150&fit=crop",
    level: 9,
    xp: 940,
    streak: 6,
    university: "University of Michigan",
    major: "Data Science",
    year: "2025",
    bio: "Transforming data into actionable insights.",
    connectionsCount: 30,
    achievementsCount: 14,
    rank: 3
  },
  {
    id: "7",
    name: "Jamie Garcia",
    username: "jamieg",
    email: "jamie.garcia@example.com",
    avatar: "https://images.unsplash.com/photo-1529626455594-4ff0294463f1?w=150&h=150&fit=crop",
    level: 6,
    xp: 680,
    streak: 1,
    university: "Georgia Institute of Technology",
    major: "Aerospace Engineering",
    year: "2023",
    bio: "Designing and building the future of flight.",
    connectionsCount: 22,
    achievementsCount: 10,
    rank: 14
  },
  {
    id: "8",
    name: "Avery Rodriguez",
    username: "averyr",
    email: "avery.rodriguez@example.com",
    avatar: "https://images.unsplash.com/photo-1507038366474-4a8106028446?w=150&h=150&fit=crop",
    level: 11,
    xp: 1100,
    streak: 8,
    university: "Cornell University",
    major: "Biomedical Engineering",
    year: "2024",
    bio: "Improving healthcare through innovative engineering solutions.",
    connectionsCount: 40,
    achievementsCount: 17,
    rank: 6
  },
  {
    id: "9",
    name: "Cameron Martinez",
    username: "cameronm",
    email: "cameron.martinez@example.com",
    avatar: "https://images.unsplash.com/photo-1521119989659-a83eee1ca8d9?w=150&h=150&fit=crop",
    level: 4,
    xp: 420,
    streak: 9,
    university: "University of Texas at Austin",
    major: "Chemical Engineering",
    year: "2025",
    bio: "Creating sustainable solutions for a better planet.",
    connectionsCount: 18,
    achievementsCount: 7,
    rank: 1
  },
  {
    id: "10",
    name: "Jordan Garcia",
    username: "jordangarcia",
    email: "jordan.garcia@example.com",
    avatar: "https://images.unsplash.com/photo-1531427186534-f73496ba9cf3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cGVyc29ufGVufDB8fDB8fA%3D%3D&w=1000&q=80",
    level: 3,
    xp: 300,
    streak: 0,
    university: "Harvard University",
    major: "Law",
    year: "2022",
    bio: "Aspiring lawyer",
    connectionsCount: 67,
    achievementsCount: 3,
    rank: 11
  },
    {
    id: "11",
    name: "Skyler White",
    username: "skylerw",
    email: "skyler.white@example.com",
    avatar: "https://images.unsplash.com/photo-1531427186534-f73496ba9cf3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cGVyc29ufGVufDB8fDB8fA%3D%3D&w=1000&q=80",
    level: 3,
    xp: 300,
    streak: 0,
    university: "Harvard University",
    major: "Law",
    year: "2022",
    bio: "Aspiring lawyer",
    connectionsCount: 67,
    achievementsCount: 3,
    rank: 5
  },
  {
    id: "12",
    name: "Jesse Pinkman",
    username: "jessep",
    email: "jesse.pinkman@example.com",
    avatar: "https://images.unsplash.com/photo-1531427186534-f73496ba9cf3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cGVyc29ufGVufDB8fDB8fA%3D%3D&w=1000&q=80",
    level: 3,
    xp: 300,
    streak: 0,
    university: "Harvard University",
    major: "Law",
    year: "2022",
    bio: "Aspiring lawyer",
    connectionsCount: 67,
    achievementsCount: 3,
    rank: 7
  },
  {
    id: "13",
    name: "Walter White",
    username: "walterw",
    email: "walter.white@example.com",
    avatar: "https://images.unsplash.com/photo-1531427186534-f73496ba9cf3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cGVyc29ufGVufDB8fDB8fA%3D%3D&w=1000&q=80",
    level: 3,
    xp: 300,
    streak: 0,
    university: "Harvard University",
    major: "Law",
    year: "2022",
    bio: "Aspiring lawyer",
    connectionsCount: 67,
    achievementsCount: 3,
    rank: 10
  },
  {
    id: "14",
    name: "Saul Goodman",
    username: "saulg",
    email: "saul.goodman@example.com",
    avatar: "https://images.unsplash.com/photo-1531427186534-f73496ba9cf3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cGVyc29ufGVufDB8fDB8fA%3D%3D&w=1000&q=80",
    level: 3,
    xp: 300,
    streak: 0,
    university: "Harvard University",
    major: "Law",
    year: "2022",
    bio: "Aspiring lawyer",
    connectionsCount: 67,
    achievementsCount: 3,
    rank: 13
  },
  {
    id: "15",
    name: "Gus Fring",
    username: "gusf",
    email: "gus.fring@example.com",
    avatar: "https://images.unsplash.com/photo-1531427186534-f73496ba9cf3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cGVyc29ufGVufDB8fDB8fA%3D%3D&w=1000&q=80",
    level: 3,
    xp: 300,
    streak: 0,
    university: "Harvard University",
    major: "Law",
    year: "2022",
    bio: "Aspiring lawyer",
    connectionsCount: 67,
    achievementsCount: 3,
    rank: 15
  },
];

export const achievements: Achievement[] = [
  {
    id: "1",
    userId: "1",
    title: "First Connection",
    description: "Made your first connection on the platform.",
    image: "/images/achievements/connection.svg",
    points: 50,
    category: "academic",
    date: "2023-12-01",
    likes: 12,
    comments: 3
  },
  {
    id: "2",
    userId: "2",
    title: "Rising Star",
    description: "Achieved a level 5 profile.",
    image: "/images/achievements/rising-star.svg",
    points: 100,
    category: "extracurricular",
    badge: "bronze",
    date: "2024-01-15",
    likes: 24,
    comments: 5
  },
  {
    id: "3",
    userId: "3",
    title: "Social Butterfly",
    description: "Connected with 20 users.",
    image: "/images/achievements/social-butterfly.svg",
    points: 150,
    category: "professional",
    date: "2024-02-05",
    likes: 18,
    comments: 7
  },
  {
    id: "4",
    userId: "1",
    title: "Academic Excellence",
    description: "Completed a course with honors.",
    image: "/images/achievements/academic-excellence.svg",
    points: 200,
    category: "academic",
    badge: "silver",
    date: "2024-02-20",
    likes: 32,
    comments: 9
  },
  {
    id: "5",
    userId: "2",
    title: "Innovation Award",
    description: "Won an innovation challenge.",
    image: "/images/achievements/innovation-award.svg",
    points: 250,
    category: "award",
    badge: "gold",
    date: "2024-03-01",
    likes: 45,
    comments: 11
  },
  {
    id: "6",
    userId: "4",
    title: "Perfect Attendance",
    description: "Maintained perfect attendance for a semester.",
    image: "/images/achievements/perfect-attendance.svg",
    points: 120,
    category: "academic",
    date: "2024-01-30",
    likes: 14,
    comments: 4
  },
  {
    id: "7",
    userId: "5",
    title: "Community Hero",
    description: "Volunteered for 50 hours in community service.",
    image: "/images/achievements/community-hero.svg",
    points: 180,
    category: "volunteer",
    date: "2024-02-12",
    likes: 29,
    comments: 8
  },
  {
    id: "8",
    userId: "6",
    title: "Tech Whiz",
    description: "Developed a successful software application.",
    image: "/images/achievements/tech-whiz.svg",
    points: 220,
    category: "professional",
    badge: "bronze",
    date: "2024-01-25",
    likes: 27,
    comments: 6
  },
  {
    id: "9",
    userId: "7",
    title: "Global Citizen",
    description: "Participated in an international exchange program.",
    image: "/images/achievements/global-citizen.svg",
    points: 280,
    category: "volunteer",
    date: "2024-02-28",
    likes: 21,
    comments: 5
  },
  {
    id: "10",
    userId: "8",
    title: "Leadership Role",
    description: "Served as a leader in a student organization.",
    image: "/images/achievements/leadership-role.svg",
    points: 300,
    category: "professional",
    badge: "silver",
    date: "2024-03-05",
    likes: 38,
    comments: 10
  },
];

export const feedItems: FeedItem[] = [
  {
    id: "1",
    userId: "1",
    type: "achievement",
    content: "Alex Johnson earned the 'First Connection' achievement.",
    achievementId: "1",
    date: "2024-03-10",
    likes: 15,
    comments: 3,
    timestamp: "2024-03-10T14:30:00Z"
  },
  {
    id: "2",
    userId: "2",
    type: "connection",
    content: "Jordan Smith connected with Casey Williams.",
    date: "2024-03-09",
    likes: 8,
    comments: 1,
    timestamp: "2024-03-09T20:00:00Z"
  },
  {
    id: "3",
    userId: "3",
    type: "event",
    content: "Casey Williams is attending the 'AI Innovation Summit'.",
    date: "2024-03-08",
    likes: 12,
    comments: 4,
    timestamp: "2024-03-08T10:00:00Z"
  },
  {
    id: "4",
    userId: "4",
    type: "achievement",
    content: "Riley Brown achieved a level 5 profile and earned the 'Rising Star' achievement.",
    achievementId: "2",
    date: "2024-03-07",
    likes: 24,
    comments: 7,
    timestamp: "2024-03-07T18:45:00Z"
  },
  {
    id: "5",
    userId: "5",
    type: "connection",
    content: "Taylor Davis connected with 10 new users this week.",
    date: "2024-03-06",
    likes: 9,
    comments: 2,
    timestamp: "2024-03-06T12:00:00Z"
  },
  {
    id: "6",
    userId: "6",
    type: "milestone",
    content: "Morgan Wilson earned the 'Social Butterfly' achievement for connecting with 20 users.",
    achievementId: "3",
    date: "2024-03-05",
    likes: 18,
    comments: 5,
    timestamp: "2024-03-05T09:15:00Z"
  },
  {
    id: "7",
    userId: "7",
    type: "event",
    content: "Jamie Garcia is speaking at the 'Future of Aerospace' conference.",
    date: "2024-03-04",
    likes: 14,
    comments: 3,
    timestamp: "2024-03-04T16:30:00Z"
  },
  {
    id: "8",
    userId: "8",
    type: "milestone",
    content: "Avery Rodriguez completed a course with honors and earned the 'Academic Excellence' achievement.",
    achievementId: "4",
    date: "2024-03-03",
    likes: 32,
    comments: 8,
    timestamp: "2024-03-03T22:00:00Z"
  },
  {
    id: "9",
    userId: "9",
    type: "connection",
    content: "Cameron Martinez expanded their network by connecting with industry professionals.",
    date: "2024-03-02",
    likes: 7,
    comments: 1,
    timestamp: "2024-03-02T14:00:00Z"
  },
  {
    id: "10",
    userId: "10",
    type: "achievement",
    content: "Jordan Garcia won an innovation challenge and earned the 'Innovation Award' achievement.",
    achievementId: "5",
    date: "2024-03-01",
    likes: 27,
    comments: 9,
    timestamp: "2024-03-01T08:00:00Z"
  },
];

export const leaderboardItems: LeaderboardItem[] = [
  { userId: "1", category: "Overall", rank: 1, score: 4750, user: undefined },
  { userId: "2", category: "Overall", rank: 2, score: 4580, user: undefined },
  { userId: "3", category: "Overall", rank: 3, score: 4320, user: undefined },
  { userId: "4", category: "Overall", rank: 4, score: 4150, user: undefined },
  { userId: "5", category: "Overall", rank: 5, score: 3980, user: undefined },
  { userId: "6", category: "Overall", rank: 6, score: 3850, user: undefined },
  { userId: "7", category: "Overall", rank: 7, score: 3790, user: undefined },
  { userId: "8", category: "Overall", rank: 8, score: 3640, user: undefined },
  { userId: "9", category: "Overall", rank: 9, score: 3520, user: undefined },
  { userId: "10", category: "Overall", rank: 10, score: 3490, user: undefined },
  { userId: "11", category: "Overall", rank: 11, score: 3450, user: undefined },
  { userId: "12", category: "Overall", rank: 12, score: 3380, user: undefined },
  { userId: "13", category: "Overall", rank: 13, score: 3290, user: undefined },
  { userId: "14", category: "Overall", rank: 14, score: 3140, user: undefined },
  { userId: "15", category: "Overall", rank: 15, score: 3050, user: undefined },
  
  { userId: "1", category: "Research", rank: 3, score: 1250, user: undefined },
  { userId: "2", category: "Research", rank: 1, score: 1680, user: undefined },
  { userId: "3", category: "Research", rank: 2, score: 1520, user: undefined },
  { userId: "7", category: "Research", rank: 4, score: 1150, user: undefined },
  { userId: "9", category: "Research", rank: 5, score: 1090, user: undefined },
  { userId: "11", category: "Research", rank: 6, score: 980, user: undefined },
  { userId: "14", category: "Research", rank: 7, score: 890, user: undefined },
  
  { userId: "1", category: "Projects", rank: 2, score: 1850, user: undefined },
  { userId: "4", category: "Projects", rank: 1, score: 1920, user: undefined },
  { userId: "5", category: "Projects", rank: 3, score: 1780, user: undefined },
  { userId: "8", category: "Projects", rank: 4, score: 1650, user: undefined },
  { userId: "10", category: "Projects", rank: 5, score: 1530, user: undefined },
  { userId: "12", category: "Projects", rank: 6, score: 1450, user: undefined },
  { userId: "15", category: "Projects", rank: 7, score: 1320, user: undefined },
  
  { userId: "1", category: "Activities", rank: 1, score: 1650, user: undefined },
  { userId: "3", category: "Activities", rank: 2, score: 1580, user: undefined },
  { userId: "6", category: "Activities", rank: 3, score: 1510, user: undefined },
  { userId: "13", category: "Activities", rank: 4, score: 1480, user: undefined },
];

export const events: Event[] = [
  {
    id: "1",
    title: "AI Innovation Summit",
    description: "Join us for a deep dive into the world of artificial intelligence and innovation.",
    image: "/images/events/ai-summit.jpg",
    date: "2024-04-05",
    location: "San Francisco, CA"
  },
  {
    id: "2",
    title: "Future of Aerospace",
    description: "Explore the latest advancements and trends in aerospace engineering.",
    image: "/images/events/aerospace-expo.jpg",
    date: "2024-05-15",
    location: "Los Angeles, CA"
  },
  {
    id: "3",
    title: "Sustainable Solutions Conference",
    description: "Discover sustainable solutions for a better planet.",
    image: "/images/events/sustainability-conference.jpg",
    date: "2024-06-20",
    location: "New York, NY"
  },
];

export function getUserById(id: string): User | undefined {
  return users.find(user => user.id === id);
}
