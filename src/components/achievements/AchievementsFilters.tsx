
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AchievementSearchParams } from '@/pages/Achievements';

interface AchievementsFiltersProps {
  onFilter: (params: AchievementSearchParams) => void;
}

const AchievementsFilters = ({ onFilter }: AchievementsFiltersProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    onFilter({
      search: value,
      category: categoryFilter !== 'all' ? categoryFilter : undefined
    });
  };

  const handleCategoryChange = (value: string) => {
    setCategoryFilter(value);
    onFilter({
      search: searchQuery,
      category: value !== 'all' ? value : undefined
    });
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        <Input
          type="text"
          placeholder="Search achievements..."
          value={searchQuery}
          onChange={handleSearch}
          className="pl-10 pr-4 py-2"
        />
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Categories</h3>
        <Select
          value={categoryFilter}
          onValueChange={handleCategoryChange}
        >
          <SelectTrigger className="w-full">
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
      </div>
    </div>
  );
};

export default AchievementsFilters;
