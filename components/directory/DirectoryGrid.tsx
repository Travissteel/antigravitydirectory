'use client';

import { useState, useMemo } from 'react';
import { DirectoryCard } from './DirectoryCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Filter } from 'lucide-react';
import { DirectoryItem } from '@/types';

interface DirectoryGridProps {
  items: DirectoryItem[];
  showFilters?: boolean;
}

export function DirectoryGrid({ items, showFilters = true }: DirectoryGridProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSafety, setSelectedSafety] = useState<string | null>(null);

  const categories = useMemo(() => {
    const cats = new Set(items.map(item => item.category));
    return Array.from(cats);
  }, [items]);

  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const matchesSearch = !searchQuery ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory = !selectedCategory || item.category === selectedCategory;
      const matchesSafety = !selectedSafety || item.safetyLevel === selectedSafety;

      return matchesSearch && matchesCategory && matchesSafety;
    });
  }, [items, searchQuery, selectedCategory, selectedSafety]);

  return (
    <div className="space-y-6">
      {showFilters && (
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search prompts..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            <Button
              variant={selectedCategory === null ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(null)}
            >
              All
            </Button>
            {categories.slice(0, 5).map(cat => (
              <Button
                key={cat}
                variant={selectedCategory === cat ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>
      )}

      {filteredItems.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          No prompts found matching your criteria.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map(item => (
            <DirectoryCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
