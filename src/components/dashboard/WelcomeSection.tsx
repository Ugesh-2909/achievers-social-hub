
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Award } from "lucide-react";

const WelcomeSection = () => {
  return (
    <section className="mb-10 text-center">
      <h1 className="text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-brand-purple to-brand-blue">Welcome to UpRIT</h1>
      <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
        Level up your academic journey, showcase achievements, and connect with peers in a gamified campus experience.
      </p>
      <Button asChild className="bg-gradient-to-r from-brand-purple to-brand-blue hover:from-brand-purple/90 hover:to-brand-blue/90">
        <Link to="/achievements">
          <Award className="mr-2" />
          View All Achievements
        </Link>
      </Button>
    </section>
  );
};

export default WelcomeSection;
