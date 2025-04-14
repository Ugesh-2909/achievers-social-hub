
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { PlusCircle, X } from "lucide-react";
import AchievementForm from "../achievements/AchievementForm";
import { User } from "@/data/mockData";

interface ShareAchievementProps {
  user: User | {
    avatar: string;
    name: string;
  };
}

const ShareAchievement = ({ user }: ShareAchievementProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleSuccess = () => {
    setDialogOpen(false);
  };

  return (
    <>
      <Card className="bg-white">
        <CardContent className="p-4">
          <div className="flex items-center space-x-4">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-10 h-10 rounded-full"
            />
            <Button 
              variant="outline" 
              className="flex-1 justify-start text-muted-foreground" 
              onClick={handleOpenDialog}
            >
              Share a new achievement...
            </Button>
            <Button 
              size="icon" 
              className="bg-brand-purple hover:bg-brand-darkPurple" 
              onClick={handleOpenDialog}
            >
              <PlusCircle size={18} />
            </Button>
          </div>
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle>Share Your Achievement</DialogTitle>
              <Button variant="ghost" size="icon" onClick={handleCloseDialog}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </DialogHeader>
          <AchievementForm onSuccess={handleSuccess} onCancel={handleCloseDialog} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ShareAchievement;
