
import { User as UserIcon, Users, Award, Star, MapPin, BookOpen, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Updated interface to make properties that aren't available in AuthContext User optional
interface ProfileCardProps {
  user: {
    id: string;
    name: string;
    avatar: string;
    username?: string;
    university: string;
    major: string;
    year?: string;
    bio?: string;
    connectionsCount?: number;
    achievementsCount?: number;
    rank?: number;
    level?: number;
    xp?: number;
    streak?: number;
  };
  isCurrentUser?: boolean;
}

const ProfileCard = ({ user, isCurrentUser = false }: ProfileCardProps) => {
  return (
    <Card className="w-full overflow-hidden bg-white shadow-sm card-hover">
      <div className="h-24 bg-gradient-to-r from-brand-purple to-brand-blue"></div>
      <CardHeader className="pb-2 pt-0 relative">
        <div className="absolute -top-12 left-4 ring-4 ring-white rounded-full">
          <img 
            src={user.avatar} 
            alt={user.name}
            className="rounded-full w-24 h-24 object-cover border-4 border-white"
          />
        </div>
        <div className="ml-28 flex items-start justify-between">
          <div>
            <h3 className="text-xl font-bold">{user.name}</h3>
            <p className="text-sm text-muted-foreground">@{user.username || 'username'}</p>
          </div>
          {isCurrentUser ? (
            <Button size="sm" variant="outline">Edit Profile</Button>
          ) : (
            <Button size="sm" className="bg-brand-purple hover:bg-brand-darkPurple">Connect</Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-3">
          <p className="text-sm leading-relaxed">{user.bio || 'No bio available'}</p>
          
          <div className="flex flex-wrap gap-2">
            <div className="flex items-center gap-1 text-sm">
              <MapPin size={16} className="text-muted-foreground" />
              <span>{user.university}</span>
            </div>
            <div className="flex items-center gap-1 text-sm">
              <BookOpen size={16} className="text-muted-foreground" />
              <span>{user.major}</span>
            </div>
            {user.year && (
              <div className="flex items-center gap-1 text-sm">
                <Calendar size={16} className="text-muted-foreground" />
                <span>{user.year}</span>
              </div>
            )}
          </div>
          
          <div className="flex flex-wrap gap-4 pt-2">
            {user.achievementsCount !== undefined && (
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Award size={14} />
                  <span>{user.achievementsCount} Achievements</span>
                </Badge>
              </div>
            )}
            {user.connectionsCount !== undefined && (
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Users size={14} />
                  <span>{user.connectionsCount} Connections</span>
                </Badge>
              </div>
            )}
            {user.rank !== undefined && (
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Star size={14} />
                  <span>#{user.rank} Rank</span>
                </Badge>
              </div>
            )}
          </div>
          
          <div className="flex flex-wrap gap-2 pt-2">
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <UserIcon size={16} />
              View Full Profile
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Award size={16} />
              Achievements
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
