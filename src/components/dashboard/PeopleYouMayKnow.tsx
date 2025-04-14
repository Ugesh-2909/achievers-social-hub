
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User } from "@/data/mockData";

interface PeopleYouMayKnowProps {
  users: User[];
}

const PeopleYouMayKnow = ({ users }: PeopleYouMayKnowProps) => {
  return (
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
  );
};

export default PeopleYouMayKnow;
