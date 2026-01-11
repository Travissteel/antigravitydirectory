'use client';

import { getAllWorkflows } from '@/lib/data';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Eye, Clock, List } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { Workflow } from '@/types';
import { SafetyBadge } from '@/components/directory';

export default function WorkflowsPage() {
  const allWorkflows = getAllWorkflows();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { value: 'all', label: 'All Workflows' },
    { value: 'automated-qa', label: 'Automated QA' },
    { value: 'ci-cd', label: 'CI/CD' },
    { value: 'database-migration', label: 'Database Migration' },
    { value: 'deployment', label: 'Deployment' },
    { value: 'refactoring', label: 'Refactoring' }
  ];

  const filteredWorkflows = selectedCategory === 'all'
    ? allWorkflows
    : allWorkflows.filter(workflow => workflow.category === selectedCategory);

  const getCategoryColor = (category: Workflow['category']) => {
    switch (category) {
      case 'automated-qa': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'ci-cd': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'database-migration': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'deployment': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'refactoring': return 'bg-pink-500/20 text-pink-400 border-pink-500/30';
      default: return '';
    }
  };

  return (
    <div className="container py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Automated Workflows</h1>
        <p className="text-muted-foreground">
          {allWorkflows.length} curated workflows for automating common development tasks
        </p>
      </div>

      {/* Category Filter */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category.value}
              onClick={() => setSelectedCategory(category.value)}
              className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                selectedCategory === category.value
                  ? 'bg-purple-500 text-white'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      {/* Workflows Grid */}
      {filteredWorkflows.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <List className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold mb-2">No workflows yet</h3>
            <p className="text-muted-foreground">
              Workflows will be added soon. Check back later!
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWorkflows.map((workflow) => (
            <Link key={workflow.id} href={`/workflows/${workflow.slug}`}>
              <Card className="h-full hover:border-purple-500/50 transition-all duration-200 hover:shadow-lg hover:shadow-purple-500/10 cursor-pointer">
                <CardHeader>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <CardTitle className="text-lg">{workflow.name}</CardTitle>
                    <SafetyBadge level={workflow.safetyLevel} score={workflow.safetyScore} showScore={false} />
                  </div>
                  <CardDescription className="line-clamp-2">{workflow.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="outline" className={getCategoryColor(workflow.category)}>
                      {workflow.category.replace('-', ' ')}
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      {workflow.difficulty}
                    </Badge>
                    {workflow.tags.slice(0, 2).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {workflow.estimatedTime}
                      </div>
                      <div className="flex items-center">
                        <List className="h-3 w-3 mr-1" />
                        {workflow.steps.length} steps
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Eye className="h-3 w-3 mr-1" />
                      {workflow.viewCount}
                    </div>
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
