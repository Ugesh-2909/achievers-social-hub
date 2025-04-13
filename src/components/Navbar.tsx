
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bell, MessageCircle, Search, Menu, X, LogOut, Award, User, Settings, HelpCircle } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-purple to-brand-blue">UpRIT</span>
            </Link>
            {isAuthenticated && (
              <div className="hidden md:ml-6 md:flex md:space-x-4">
                <Link to="/" className="nav-link text-foreground">Home</Link>
                <Link to="/discover" className="nav-link text-foreground">Discover</Link>
                <Link to="/leaderboard" className="nav-link text-foreground">Leaderboard</Link>
                <Link to="/quests" className="nav-link text-foreground">Quests</Link>
              </div>
            )}
          </div>
          
          {isAuthenticated ? (
            <div className="hidden md:flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input 
                  type="search" 
                  placeholder="Search..." 
                  className="pl-10 pr-4 py-2 rounded-full border-gray-300 focus:border-brand-purple focus:ring focus:ring-brand-lightPurple focus:ring-opacity-50"
                />
              </div>
              
              {/* User XP and Level */}
              <div className="flex items-center space-x-2">
                <span className="xp-badge">
                  {user?.xp} XP
                </span>
                <span className="level-badge">
                  Lvl {user?.level}
                </span>
              </div>
              
              <Button variant="ghost" size="icon" className="relative">
                <Bell size={20} />
                <span className="absolute top-0 right-0 block h-2.5 w-2.5 rounded-full bg-red-500"></span>
              </Button>
              
              <Button variant="ghost" size="icon">
                <MessageCircle size={20} />
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <img
                      src={user?.avatar || "https://github.com/shadcn.png"}
                      alt="Profile"
                      className="h-8 w-8 rounded-full"
                    />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-medium">{user?.name}</p>
                      <p className="text-xs text-muted-foreground">{user?.email}</p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="flex items-center cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/achievements" className="flex items-center cursor-pointer">
                      <Award className="mr-2 h-4 w-4" />
                      <span>My Achievements</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/settings" className="flex items-center cursor-pointer">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/help" className="flex items-center cursor-pointer">
                      <HelpCircle className="mr-2 h-4 w-4" />
                      <span>Help & Support</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="flex items-center cursor-pointer" onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className="hidden md:flex items-center space-x-4">
              <Link to="/auth">
                <Button variant="outline" className="font-medium">Login</Button>
              </Link>
              <Link to="/auth">
                <Button className="bg-brand-purple hover:bg-brand-darkPurple font-medium">Sign Up</Button>
              </Link>
            </div>
          )}
          
          <div className="flex items-center md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
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
          {isAuthenticated ? (
            <>
              <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-secondary" onClick={() => setIsMobileMenuOpen(false)}>
                Home
              </Link>
              <Link to="/discover" className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-secondary" onClick={() => setIsMobileMenuOpen(false)}>
                Discover
              </Link>
              <Link to="/leaderboard" className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-secondary" onClick={() => setIsMobileMenuOpen(false)}>
                Leaderboard
              </Link>
              <Link to="/quests" className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-secondary" onClick={() => setIsMobileMenuOpen(false)}>
                Quests
              </Link>
            </>
          ) : (
            <div className="flex flex-col space-y-2 px-3">
              <Link to="/auth" onClick={() => setIsMobileMenuOpen(false)}>
                <Button className="w-full" variant="outline">Login</Button>
              </Link>
              <Link to="/auth" onClick={() => setIsMobileMenuOpen(false)}>
                <Button className="w-full bg-brand-purple hover:bg-brand-darkPurple">Sign Up</Button>
              </Link>
            </div>
          )}
        </div>
        
        {isAuthenticated && (
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center px-4">
              <div className="flex-shrink-0">
                <img
                  className="h-10 w-10 rounded-full"
                  src={user?.avatar || "https://github.com/shadcn.png"}
                  alt="Profile"
                />
              </div>
              <div className="ml-3">
                <div className="text-base font-medium text-gray-800">{user?.name}</div>
                <div className="text-sm font-medium text-gray-500">{user?.university}</div>
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
            <div className="mt-3 space-y-1">
              <Link to="/profile" className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100" onClick={() => setIsMobileMenuOpen(false)}>
                Profile
              </Link>
              <Link to="/achievements" className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100" onClick={() => setIsMobileMenuOpen(false)}>
                My Achievements
              </Link>
              <Link to="/settings" className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100" onClick={() => setIsMobileMenuOpen(false)}>
                Settings
              </Link>
              <button 
                onClick={() => {
                  handleLogout();
                  setIsMobileMenuOpen(false);
                }}
                className="block w-full text-left px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
