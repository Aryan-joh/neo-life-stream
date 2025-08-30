import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Briefcase, 
  BookOpen, 
  Dumbbell, 
  Palette, 
  Users, 
  Gamepad2,
  Monitor,
  Brain,
  Code,
  Music
} from 'lucide-react';

export interface Activity {
  id: string;
  name: string;
  duration: number;
  timestamp: Date;
  metadata?: string;
}

export interface Sector {
  id: string;
  name: string;
  color: string;
  activities: Activity[];
  totalTime: number;
  icon: string;
}

interface ActivitySectorProps {
  sector: Sector;
  className?: string;
}

const iconMap = {
  work: Briefcase,
  learning: BookOpen,
  fitness: Dumbbell,
  creativity: Palette,
  social: Users,
  entertainment: Gamepad2,
  productivity: Monitor,
  research: Brain,
  development: Code,
  music: Music
};

export const ActivitySector: React.FC<ActivitySectorProps> = ({ sector, className = '' }) => {
  const IconComponent = iconMap[sector.icon as keyof typeof iconMap] || Monitor;
  
  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const getColorClasses = (color: string) => {
    const colorMap = {
      purple: 'border-neon-purple/50 shadow-neon',
      cyan: 'border-neon-cyan/50 shadow-cyan',
      magenta: 'border-neon-magenta/50 shadow-magenta',
      blue: 'border-neon-blue/50',
      green: 'border-neon-green/50'
    };
    return colorMap[color as keyof typeof colorMap] || 'border-neon-purple/50';
  };

  return (
    <Card className={`glass-panel border-2 ${getColorClasses(sector.color)} hover:scale-105 transition-all duration-300 ${className}`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg glass-panel border ${getColorClasses(sector.color)}`}>
              <IconComponent className="w-5 h-5 text-neon-cyan" />
            </div>
            <CardTitle className="text-lg font-semibold neon-text">
              {sector.name}
            </CardTitle>
          </div>
          <Badge variant="secondary" className="glass-panel border-neon-purple/30">
            {formatDuration(sector.totalTime)}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="grid gap-2">
          {sector.activities.slice(0, 3).map((activity) => (
            <div
              key={activity.id}
              className="flex items-center justify-between p-2 rounded glass-panel border border-neon-purple/20 hover:border-neon-purple/40 transition-colors"
            >
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {activity.name}
                </p>
                {activity.metadata && (
                  <p className="text-xs text-muted-foreground truncate">
                    {activity.metadata}
                  </p>
                )}
              </div>
              <div className="flex flex-col items-end space-y-1">
                <span className="text-xs text-neon-cyan font-medium">
                  {formatDuration(activity.duration)}
                </span>
                <span className="text-xs text-muted-foreground">
                  {activity.timestamp.toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </span>
              </div>
            </div>
          ))}
        </div>

        {sector.activities.length > 3 && (
          <div className="text-center pt-2">
            <span className="text-xs text-muted-foreground">
              +{sector.activities.length - 3} more activities
            </span>
          </div>
        )}

        {/* Activity Pattern Visualization */}
        <div className="pt-3 border-t border-neon-purple/20">
          <div className="flex items-center space-x-1">
            {Array.from({ length: 12 }, (_, i) => {
              const hour = i + 8; // 8 AM to 8 PM
              const hasActivity = sector.activities.some(activity => 
                activity.timestamp.getHours() === hour
              );
              return (
                <div
                  key={i}
                  className={`w-2 h-6 rounded-sm transition-all duration-300 ${
                    hasActivity 
                      ? `bg-neon-${sector.color} shadow-${sector.color}` 
                      : 'bg-muted/30'
                  }`}
                />
              );
            })}
          </div>
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>8AM</span>
            <span>8PM</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};