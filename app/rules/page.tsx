'use client';

import { getAllRules } from '@/lib/data';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Eye, Code2 } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { Rule } from '@/types';
import { SafetyBadge } from '@/components/directory';

export default function RulesPage() {
  const allRules = getAllRules();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { value: 'all', label: 'All Rules' },
    { value: 'coding-style', label: 'Coding Style' },
    { value: 'architectural-patterns', label: 'Architectural Patterns' },
    { value: 'security-standards', label: 'Security Standards' },
    { value: 'performance', label: 'Performance' }
  ];

  const filteredRules = selectedCategory === 'all'
    ? allRules
    : allRules.filter(rule => rule.category === selectedCategory);

  const getCategoryColor = (category: Rule['category']) => {
    switch (category) {
      case 'coding-style': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'architectural-patterns': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'security-standards': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'performance': return 'bg-green-500/20 text-green-400 border-green-500/30';
      default: return '';
    }
  };

  return (
    <div className="container py-12">
      <div className="mb-12 text-center max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 tracking-tight">Coding Rules & Best Practices</h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          {allRules.length} curated coding rules across multiple languages and categories.
        </p>
      </div>

      {/* Category Filter */}
      <div className="mb-8 flex justify-center">
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map((category) => (
            <button
              key={category.value}
              onClick={() => setSelectedCategory(category.value)}
              className={`px-4 py-2 rounded-lg transition-all duration-200 ${selectedCategory === category.value
                  ? 'bg-primary text-white shadow-lg shadow-primary/20'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      {/* Rules Grid */}
      {filteredRules.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <Code2 className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold mb-2">No rules yet</h3>
            <p className="text-muted-foreground">
              Rules will be added soon. Check back later!
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRules.map((rule) => (
            <Link key={rule.id} href={`/rules/${rule.slug}`}>
              <Card className="h-full hover:border-purple-500/50 transition-all duration-200 hover:shadow-lg hover:shadow-purple-500/10 cursor-pointer">
                <CardHeader>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <CardTitle className="text-lg">{rule.name}</CardTitle>
                    {rule.safetyLevel && (
                      <SafetyBadge level={rule.safetyLevel} score={rule.safetyScore || 0} showScore={false} />
                    )}
                  </div>
                  <CardDescription className="line-clamp-2">{rule.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="outline" className={getCategoryColor(rule.category)}>
                      {rule.category.replace('-', ' ')}
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      {rule.language}
                    </Badge>
                    {rule.tags.slice(0, 2).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Eye className="h-3 w-3 mr-1" />
                    {rule.viewCount} views
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
