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
  initialQuery?: string;
  initialCategory?: string | null;
}

export function DirectoryGrid({
  items,
  showFilters = true,
  initialQuery = '',
  initialCategory = null
}: DirectoryGridProps) {
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(initialCategory);
  const [selectedSafety, setSelectedSafety] = useState<string | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'newest' | 'popular' | 'safety'>('newest');

  const categories = useMemo(() => {
    const cats = new Set(items.map(item => item.category));
    return Array.from(cats);
  }, [items]);

  const allTags = useMemo(() => {
    const tags = new Set(items.flatMap(item => item.tags));
    return Array.from(tags).slice(0, 10); // Limit to top 10 for UI
  }, [items]);

  const filteredItems = useMemo(() => {
    let result = items.filter(item => {
      const matchesSearch = !searchQuery ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory = !selectedCategory || item.category === selectedCategory;
      const matchesSafety = !selectedSafety || item.safetyLevel === selectedSafety;
      const matchesDifficulty = !selectedDifficulty || item.difficulty === selectedDifficulty;
      const matchesTag = !selectedTag || item.tags.includes(selectedTag);

      return matchesSearch && matchesCategory && matchesSafety && matchesDifficulty && matchesTag;
    });

    // Apply sorting
    return result.sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      if (sortBy === 'popular') {
        return b.viewCount - a.viewCount;
      }
      if (sortBy === 'safety') {
        return b.safetyScore - a.safetyScore;
      }
      return 0;
    });
  }, [items, searchQuery, selectedCategory, selectedSafety, selectedDifficulty, selectedTag, sortBy]);

  return (
    <div className="space-y-8">
      {showFilters && (
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search..."
                className="pl-10 h-10 bg-muted/30 border-border/50 focus:border-primary/50"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <select
                className="bg-muted/30 border border-border/50 rounded-md px-3 py-1 text-sm focus:outline-none focus:border-primary/50"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
              >
                <option value="newest">Newest First</option>
                <option value="popular">Most Popular</option>
                <option value="safety">Safest First</option>
              </select>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-sm font-medium text-muted-foreground mr-2">Category:</span>
            <Button
              variant={selectedCategory === null ? "default" : "outline"}
              size="sm"
              className="h-8"
              onClick={() => setSelectedCategory(null)}
            >
              All
            </Button>
            {categories.map(cat => (
              <Button
                key={cat}
                variant={selectedCategory === cat ? "default" : "outline"}
                size="sm"
                className="h-8"
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </Button>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-sm font-medium text-muted-foreground mr-2">Difficulty:</span>
            {['beginner', 'intermediate', 'advanced'].map(diff => (
              <Button
                key={diff}
                variant={selectedDifficulty === diff ? "default" : "outline"}
                size="sm"
                className="h-8 capitalize"
                onClick={() => setSelectedDifficulty(selectedDifficulty === diff ? null : diff)}
              >
                {diff}
              </Button>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-sm font-medium text-muted-foreground mr-2">Safety:</span>
            {['safe', 'caution', 'dangerous'].map(level => (
              <Button
                key={level}
                variant={selectedSafety === level ? "default" : "outline"}
                size="sm"
                className="h-8 capitalize"
                onClick={() => setSelectedSafety(selectedSafety === level ? null : level)}
              >
                {level}
              </Button>
            ))}
          </div>

          {allTags.length > 0 && (
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-sm font-medium text-muted-foreground mr-2">Tech Stack:</span>
              {allTags.map(tag => (
                <Button
                  key={tag}
                  variant={selectedTag === tag ? "secondary" : "ghost"}
                  size="sm"
                  className="h-7 text-xs px-2"
                  onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                >
                  #{tag}
                </Button>
              ))}
            </div>
          )}
        </div>
      )}

      {filteredItems.length === 0 ? (
        <div className="text-center py-16 border rounded-xl bg-card/20 border-dashed">
          <p className="text-muted-foreground">No items found matching your criteria.</p>
          <Button
            variant="link"
            className="text-primary mt-2"
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory(null);
              setSelectedSafety(null);
              setSelectedDifficulty(null);
              setSelectedTag(null);
            }}
          >
            Clear all filters
          </Button>
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
