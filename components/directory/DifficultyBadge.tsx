import { Badge } from '@/components/ui/badge';

interface DifficultyBadgeProps {
  level: 'beginner' | 'intermediate' | 'advanced';
}

export function DifficultyBadge({ level }: DifficultyBadgeProps) {
  const config = {
    beginner: {
      label: 'Beginner',
      className: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    },
    intermediate: {
      label: 'Intermediate',
      className: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    },
    advanced: {
      label: 'Advanced',
      className: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
    },
  };

  const { label, className } = config[level];

  return (
    <Badge variant="outline" className={className}>
      {label}
    </Badge>
  );
}
