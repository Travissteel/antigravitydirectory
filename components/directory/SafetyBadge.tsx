import { Badge } from '@/components/ui/badge';
import { Shield, AlertTriangle, XCircle } from 'lucide-react';

interface SafetyBadgeProps {
  level: 'safe' | 'caution' | 'dangerous';
  score: number;
  showScore?: boolean;
}

export function SafetyBadge({ level, score, showScore = true }: SafetyBadgeProps) {
  const config = {
    safe: {
      icon: Shield,
      label: 'Safe',
      className: 'bg-green-500/20 text-green-400 border-green-500/30 hover:bg-green-500/30',
    },
    caution: {
      icon: AlertTriangle,
      label: 'Caution',
      className: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30 hover:bg-yellow-500/30',
    },
    dangerous: {
      icon: XCircle,
      label: 'Dangerous',
      className: 'bg-red-500/20 text-red-400 border-red-500/30 hover:bg-red-500/30',
    },
  };

  const { icon: Icon, label, className } = config[level];

  return (
    <Badge variant="outline" className={className}>
      <Icon className="h-3 w-3 mr-1" />
      {label}
      {showScore && <span className="ml-1 opacity-70">({score})</span>}
    </Badge>
  );
}
