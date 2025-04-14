
import React from 'react';
import { Search, Grid, List } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

type ViewMode = 'grid' | 'list';
type CategoryFilter = 'all' | 'academic' | 'extracurricular' | 'professional' | 'volunteer' | 'award';

interface AchievementsFiltersProps {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  categoryFilter: CategoryFilter;
  setCategoryFilter: (category: CategoryFilter) => void;
}

const AchievementsFilters = ({
  viewMode,
  setViewMode,
  searchQuery,
  setSearchQuery,
  categoryFilter,
  setCategoryFilter
}: AchievementsFiltersProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
      <div className="relative w-full sm:w-auto sm:max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        <Input
          type="text"
          placeholder="Search achievements..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 pr-4 py-2"
        />
      </div>

      <div className="flex gap-4 w-full sm:w-auto items-center justify-between sm:justify-end">
        <Select
          value={categoryFilter}
          onValueChange={(value) => setCategoryFilter(value as CategoryFilter)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="academic">Academic</SelectItem>
            <SelectItem value="extracurricular">Extracurricular</SelectItem>
            <SelectItem value="professional">Professional</SelectItem>
            <SelectItem value="volunteer">Volunteer</SelectItem>
            <SelectItem value="award">Award</SelectItem>
          </SelectContent>
        </Select>

        <div className="border rounded-md overflow-hidden">
          <ToggleGroup type="single" value={viewMode} onValueChange={(value) => value && setViewMode(value as ViewMode)}>
            <ToggleGroupItem value="grid" aria-label="Grid view">
              <Grid size={18} />
            </ToggleGroupItem>
            <ToggleGroupItem value="list" aria-label="List view">
              <List size={18} />
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      </div>
    </div>
  );
};

export default AchievementsFilters;
