import React from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  Clock, 
  Target, 
  Activity as ActivityIcon,
  BarChart3,
  Calendar,
  Zap
} from 'lucide-react';
import { type Sector } from './ActivitySector';

interface AnalyticsModalProps {
  sectors: Sector[];
  todayStats: {
    totalActiveTime: number;
    productivityScore: number;
    focusTime: number;
    activeSectors: number;
  };
}

export const AnalyticsModal: React.FC<AnalyticsModalProps> = ({ sectors, todayStats }) => {
  const weeklyProjection = {
    totalTime: todayStats.totalActiveTime * 7,
    avgProductivity: Math.min(100, todayStats.productivityScore + 5),
    topSector: sectors.reduce((prev, current) => 
      prev.totalTime > current.totalTime ? prev : current, sectors[0]
    )?.name || 'None'
  };

  const insights = [
    `Your most productive sector is "${weeklyProjection.topSector}" with the highest time investment.`,
    `At ${todayStats.productivityScore}% productivity, you're performing ${todayStats.productivityScore > 75 ? 'excellently' : 'well'}.`,
    `Your focus time of ${Math.floor(todayStats.focusTime / 60)}h shows ${todayStats.focusTime > 200 ? 'strong' : 'moderate'} concentration ability.`,
    `Weekly projection suggests ${Math.floor(weeklyProjection.totalTime / 60)}h of total activity time.`
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="holographic" size="sm">
          <TrendingUp className="w-4 h-4 mr-2" />
          View Analytics
        </Button>
      </DialogTrigger>
      <DialogContent className="glass-panel border-2 border-neon-purple/30 max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl neon-text flex items-center">
            <BarChart3 className="w-6 h-6 mr-3 text-neon-cyan" />
            Advanced Analytics Dashboard
          </DialogTitle>
          <DialogDescription className="text-neon-cyan">
            Comprehensive insights into your digital life patterns and productivity metrics
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-6">
          {/* Key Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="glass-panel border border-neon-purple/30">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground">Today's Total</p>
                    <p className="text-lg font-bold text-neon-purple">
                      {Math.floor(todayStats.totalActiveTime / 60)}h {todayStats.totalActiveTime % 60}m
                    </p>
                  </div>
                  <Clock className="w-8 h-8 text-neon-purple/50" />
                </div>
              </CardContent>
            </Card>

            <Card className="glass-panel border border-neon-cyan/30">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground">Productivity</p>
                    <p className="text-lg font-bold text-neon-cyan">{todayStats.productivityScore}%</p>
                  </div>
                  <Target className="w-8 h-8 text-neon-cyan/50" />
                </div>
              </CardContent>
            </Card>

            <Card className="glass-panel border border-neon-magenta/30">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground">Focus Time</p>
                    <p className="text-lg font-bold text-neon-magenta">
                      {Math.floor(todayStats.focusTime / 60)}h {todayStats.focusTime % 60}m
                    </p>
                  </div>
                  <Zap className="w-8 h-8 text-neon-magenta/50" />
                </div>
              </CardContent>
            </Card>

            <Card className="glass-panel border border-neon-blue/30">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground">Active Sectors</p>
                    <p className="text-lg font-bold text-neon-blue">{todayStats.activeSectors}</p>
                  </div>
                  <ActivityIcon className="w-8 h-8 text-neon-blue/50" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sector Breakdown */}
          <Card className="glass-panel border border-neon-purple/30">
            <CardHeader>
              <CardTitle className="text-lg neon-text">Sector Time Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sectors.map((sector) => {
                  const percentage = Math.round((sector.totalTime / todayStats.totalActiveTime) * 100);
                  return (
                    <div key={sector.id} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-3">
                          <div className={`w-3 h-3 rounded-full bg-neon-${sector.color}`}></div>
                          <span className="font-medium">{sector.name}</span>
                          <Badge variant="outline" className="text-xs">
                            {sector.activities.length} activities
                          </Badge>
                        </div>
                        <div className="text-right">
                          <span className="font-semibold">{Math.floor(sector.totalTime / 60)}h {sector.totalTime % 60}m</span>
                          <span className="text-xs text-muted-foreground ml-2">({percentage}%)</span>
                        </div>
                      </div>
                      <div className="w-full bg-background/20 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full bg-gradient-to-r from-neon-${sector.color}/50 to-neon-${sector.color}`}
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Weekly Projections */}
          <Card className="glass-panel border border-neon-cyan/30">
            <CardHeader>
              <CardTitle className="text-lg neon-text flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                Weekly Projections
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-neon-purple">
                    {Math.floor(weeklyProjection.totalTime / 60)}h
                  </p>
                  <p className="text-sm text-muted-foreground">Projected Weekly Time</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-neon-cyan">{weeklyProjection.avgProductivity}%</p>
                  <p className="text-sm text-muted-foreground">Average Productivity</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-neon-magenta">{weeklyProjection.topSector}</p>
                  <p className="text-sm text-muted-foreground">Top Performing Sector</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* AI Insights */}
          <Card className="glass-panel border border-neon-magenta/30">
            <CardHeader>
              <CardTitle className="text-lg neon-text">AI-Generated Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {insights.map((insight, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 rounded-full bg-neon-cyan mt-2 flex-shrink-0"></div>
                    <p className="text-sm leading-relaxed">{insight}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};