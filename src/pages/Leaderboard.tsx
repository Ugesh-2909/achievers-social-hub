
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { leaderboardItems } from "@/data/mockData";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trophy, Users, Award, Flame } from "lucide-react";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

// Get unique categories from leaderboard items
const categories = Array.from(new Set(leaderboardItems.map(item => item.category)));

const LeaderboardPage = () => {
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  // Filter items by category and sort by rank
  const filteredItems = leaderboardItems
    .filter(item => item.category === activeCategory)
    .sort((a, b) => a.rank - b.rank);
  
  // Calculate pagination
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedItems = filteredItems.slice(startIndex, startIndex + itemsPerPage);
  
  // Get badge color based on rank
  const getBadgeColor = (rank: number) => {
    switch (rank) {
      case 1: return "bg-achievement-gold text-white";
      case 2: return "bg-achievement-silver text-gray-800";
      case 3: return "bg-achievement-bronze text-white";
      default: return "bg-gray-200 text-gray-600";
    }
  };

  // Get category icon
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Overall": return <Trophy className="mr-2 h-4 w-4" />;
      case "Research": return <Users className="mr-2 h-4 w-4" />;
      case "Projects": return <Award className="mr-2 h-4 w-4" />;
      case "Activities": return <Flame className="mr-2 h-4 w-4" />;
      default: return <Trophy className="mr-2 h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <h1 className="text-3xl font-bold mb-2 md:mb-0">Leaderboard</h1>
            <p className="text-muted-foreground">See how you stack up against other students</p>
          </div>

          <Tabs defaultValue={activeCategory} onValueChange={(value) => setActiveCategory(value)}>
            <TabsList className="mb-6">
              {categories.map((category) => (
                <TabsTrigger key={category} value={category} className="flex items-center">
                  {getCategoryIcon(category)}
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
            
            {categories.map((category) => (
              <TabsContent key={category} value={category} className="space-y-6">
                <div className="bg-white rounded-lg shadow">
                  <div className="p-4 border-b">
                    <h2 className="text-xl font-semibold flex items-center">
                      {getCategoryIcon(category)}
                      {category} Rankings
                    </h2>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-20">Rank</TableHead>
                          <TableHead>Student</TableHead>
                          <TableHead>University</TableHead>
                          <TableHead className="text-right">Score</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {paginatedItems.map((item) => {
                          const user = item.user;
                          return (
                            <TableRow key={`${item.userId}-${item.category}`}>
                              <TableCell>
                                <div className={`flex items-center justify-center w-10 h-10 rounded-full font-bold ${getBadgeColor(item.rank)}`}>
                                  {item.rank}
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center">
                                  <img 
                                    src={user?.avatar}
                                    alt={user?.name}
                                    className="w-10 h-10 rounded-full mr-3 object-cover"
                                  />
                                  <div>
                                    <p className="font-medium">{user?.name}</p>
                                    <p className="text-xs text-muted-foreground">{user?.major}</p>
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell>{user?.university}</TableCell>
                              <TableCell className="text-right font-bold text-brand-purple">{item.score}</TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </div>
                  
                  {totalPages > 1 && (
                    <div className="p-4 border-t">
                      <Pagination>
                        <PaginationContent>
                          <PaginationItem>
                            <PaginationPrevious 
                              onClick={() => setCurrentPage(curr => Math.max(curr - 1, 1))}
                              className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                            />
                          </PaginationItem>
                          
                          {Array.from({ length: totalPages }).map((_, i) => {
                            const pageNumber = i + 1;
                            // Show first page, last page, and pages around current page
                            if (
                              pageNumber === 1 ||
                              pageNumber === totalPages ||
                              (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                            ) {
                              return (
                                <PaginationItem key={pageNumber}>
                                  <PaginationLink
                                    isActive={pageNumber === currentPage}
                                    onClick={() => setCurrentPage(pageNumber)}
                                  >
                                    {pageNumber}
                                  </PaginationLink>
                                </PaginationItem>
                              );
                            }
                            
                            // Show ellipsis for page gaps
                            if (pageNumber === 2 || pageNumber === totalPages - 1) {
                              return <PaginationEllipsis key={`ellipsis-${pageNumber}`} />;
                            }
                            
                            return null;
                          })}
                          
                          <PaginationItem>
                            <PaginationNext
                              onClick={() => setCurrentPage(curr => Math.min(curr + 1, totalPages))}
                              className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                            />
                          </PaginationItem>
                        </PaginationContent>
                      </Pagination>
                    </div>
                  )}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default LeaderboardPage;
