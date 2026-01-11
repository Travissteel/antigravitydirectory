import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SafetyBadge } from './SafetyBadge';
import { DifficultyBadge } from './DifficultyBadge';
import { Eye, Copy } from 'lucide-react';
import { DirectoryItem } from '@/types';

interface DirectoryCardProps {
  item: DirectoryItem;
}

export function DirectoryCard({ item }: DirectoryCardProps) {
  return (
    <Link href={`/prompts/${item.slug}`}>
      <Card className="h-full hover:border-primary/50 transition-all duration-200 hover:shadow-lg hover:shadow-primary/10 cursor-pointer bg-card">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="text-lg line-clamp-1">{item.title}</CardTitle>
            <SafetyBadge level={item.safetyLevel} score={item.safetyScore} showScore={false} />
          </div>
          <CardDescription className="line-clamp-2">{item.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 mb-4">
            <DifficultyBadge level={item.difficulty} />
            {item.tags.slice(0, 2).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <Eye className="h-3 w-3" />
                {item.viewCount}
              </span>
              <span className="flex items-center gap-1">
                <Copy className="h-3 w-3" />
                {item.copyCount}
              </span>
            </div>
            <span className="text-xs">v{item.version}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
