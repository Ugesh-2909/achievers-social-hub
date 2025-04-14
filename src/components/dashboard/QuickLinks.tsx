
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Award, BookOpen, Globe } from "lucide-react";

const QuickLinks = () => {
  return (
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
  );
};

export default QuickLinks;
