
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AchievementsHeader from '@/components/achievements/AchievementsHeader';
import AchievementsFilters from '@/components/achievements/AchievementsFilters';
import AchievementsList from '@/components/achievements/AchievementsList';
import AchievementsGrid from '@/components/achievements/AchievementsGrid';
import { achievements } from '@/data/mockData';
import { Achievement } from '@/data/mockData';

type ViewMode = 'grid' | 'list';
type CategoryFilter = 'all' | 'academic' | 'extracurricular' | 'professional' | 'volunteer' | 'award';

const AchievementsPage = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('all');

  // Filter achievements based on search query and category
  const filteredAchievements = achievements.filter((achievement) => {
    // Apply search filter
    const matchesSearch = 
      achievement.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      achievement.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Apply category filter
    const matchesCategory = categoryFilter === 'all' || achievement.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AchievementsHeader />
        
        <AchievementsFilters 
          viewMode={viewMode}
          setViewMode={setViewMode}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
        />
        
        <div className="mt-6">
          {viewMode === 'grid' ? (
            <AchievementsGrid achievements={filteredAchievements} />
          ) : (
            <AchievementsList achievements={filteredAchievements} />
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AchievementsPage;
