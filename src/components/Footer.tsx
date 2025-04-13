
import { Github, Instagram, Linkedin, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white border-t mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4 text-brand-purple">Achievers Hub</h3>
            <p className="text-sm text-muted-foreground mb-4">
              A platform for college students to showcase their achievements, connect with peers,
              and gain visibility in the academic community.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-brand-purple">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-brand-purple">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-brand-purple">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-brand-purple">
                <Github size={20} />
              </a>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold mb-3">Platform</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-muted-foreground hover:text-brand-purple">Home</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-brand-purple">Discover</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-brand-purple">Leaderboard</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-brand-purple">Events</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-muted-foreground hover:text-brand-purple">Help Center</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-brand-purple">Campus Partners</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-brand-purple">API</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-brand-purple">Feedback</a></li>
              </ul>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-3">About</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-muted-foreground hover:text-brand-purple">Our Story</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-brand-purple">Team</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-brand-purple">Careers</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-brand-purple">Privacy Policy</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-brand-purple">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Achievers Hub. All rights reserved.
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
