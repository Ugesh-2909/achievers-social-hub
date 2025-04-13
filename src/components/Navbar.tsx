
import { Bell, MessageCircle, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-brand-purple">Achievers Hub</span>
            </div>
            <div className="hidden md:ml-6 md:flex md:space-x-4">
              <a href="#" className="nav-link text-foreground">Home</a>
              <a href="#" className="nav-link text-foreground">Discover</a>
              <a href="#" className="nav-link text-foreground">Leaderboard</a>
              <a href="#" className="nav-link text-foreground">Events</a>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input 
                type="search" 
                placeholder="Search..." 
                className="pl-10 pr-4 py-2 rounded-full border-gray-300 focus:border-brand-purple focus:ring focus:ring-brand-lightPurple focus:ring-opacity-50"
              />
            </div>
            
            <Button variant="ghost" size="icon" className="relative">
              <Bell size={20} />
              <span className="absolute top-0 right-0 block h-2.5 w-2.5 rounded-full bg-red-500"></span>
            </Button>
            
            <Button variant="ghost" size="icon">
              <MessageCircle size={20} />
            </Button>
            
            <Button variant="ghost" size="icon" className="rounded-full">
              <img
                src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=400&fit=crop"
                alt="Profile"
                className="h-8 w-8 rounded-full"
              />
            </Button>
          </div>
          
          <div className="flex items-center md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {/* Icon when menu is closed */}
              <svg
                className={`${isMobileMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              {/* Icon when menu is open */}
              <svg
                className={`${isMobileMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:hidden`}
        id="mobile-menu"
      >
        <div className="pt-2 pb-3 space-y-1">
          <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-secondary">Home</a>
          <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-secondary">Discover</a>
          <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-secondary">Leaderboard</a>
          <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-secondary">Events</a>
        </div>
        <div className="pt-4 pb-3 border-t border-gray-200">
          <div className="flex items-center px-4">
            <div className="flex-shrink-0">
              <img
                className="h-10 w-10 rounded-full"
                src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=400&fit=crop"
                alt="Profile"
              />
            </div>
            <div className="ml-3">
              <div className="text-base font-medium text-gray-800">Alex Johnson</div>
              <div className="text-sm font-medium text-gray-500">alex_j</div>
            </div>
            <div className="ml-auto flex space-x-3">
              <Button variant="ghost" size="icon">
                <Bell size={20} />
              </Button>
              <Button variant="ghost" size="icon">
                <MessageCircle size={20} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
