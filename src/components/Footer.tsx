
import { Github, Instagram, Linkedin, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white border-t mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4 bg-clip-text text-transparent bg-gradient-to-r from-brand-purple to-brand-blue">UpRIT</h3>
            <p className="text-sm text-muted-foreground mb-4">
              A gamified platform for college students to showcase achievements, connect with peers,
              and gain visibility in the academic community.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-brand-purple transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-brand-purple transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-brand-purple transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-brand-purple transition-colors">
                <Github size={20} />
              </a>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold mb-3">Platform</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/" className="text-muted-foreground hover:text-brand-purple transition-colors">Home</Link></li>
                <li><Link to="/discover" className="text-muted-foreground hover:text-brand-purple transition-colors">Discover</Link></li>
                <li><Link to="/leaderboard" className="text-muted-foreground hover:text-brand-purple transition-colors">Leaderboard</Link></li>
                <li><Link to="/quests" className="text-muted-foreground hover:text-brand-purple transition-colors">Quests</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/help" className="text-muted-foreground hover:text-brand-purple transition-colors">Help Center</Link></li>
                <li><Link to="/partners" className="text-muted-foreground hover:text-brand-purple transition-colors">Campus Partners</Link></li>
                <li><a href="#" className="text-muted-foreground hover:text-brand-purple transition-colors">API</a></li>
                <li><Link to="/feedback" className="text-muted-foreground hover:text-brand-purple transition-colors">Feedback</Link></li>
              </ul>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-3">About</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="text-muted-foreground hover:text-brand-purple transition-colors">Our Story</Link></li>
              <li><Link to="/team" className="text-muted-foreground hover:text-brand-purple transition-colors">Team</Link></li>
              <li><Link to="/careers" className="text-muted-foreground hover:text-brand-purple transition-colors">Careers</Link></li>
              <li><Link to="/privacy" className="text-muted-foreground hover:text-brand-purple transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-muted-foreground hover:text-brand-purple transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} UpRIT. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0">
            <select className="text-sm border rounded py-1 px-2 text-muted-foreground bg-transparent">
              <option value="en">English (US)</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
            </select>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
