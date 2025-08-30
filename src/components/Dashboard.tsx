import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ActivitySector, type Sector, type Activity } from './ActivitySector';
import { HolographicChart } from './HolographicChart';
import { AIAssistant } from './AIAssistant';
import { 
  Brain, 
  Activity as ActivityIcon, 
  Clock, 
  Zap, 
  TrendingUp,
  Settings,
  User,
  LogOut
} from 'lucide-react';

interface DashboardProps {
  username: string;
  onLogout: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ username, onLogout }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [sectors, setSectors] = useState<Sector[]>([]);
  const [currentActivity, setCurrentActivity] = useState<string>('Monitoring NeoLife Systems');
  const [todayStats, setTodayStats] = useState({
    totalActiveTime: 0,
    productivityScore: 0,
    focusTime: 0,
    activeSectors: 0
  });

  // Simulate real-time activity updates
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      simulateActivityUpdate();
    }, 30000); // Update every 30 seconds

    // Initialize with sample data
    initializeSampleData();

    return () => clearInterval(timer);
  }, []);

  const simulateActivityUpdate = () => {
    const activities = [
      'Analyzing neural patterns...',
      'Processing quantum data streams...',
      'Optimizing consciousness algorithms...',
      'Monitoring biometric feedback...',
      'Calculating productivity metrics...',
      'Synchronizing with neural network...'
    ];
    setCurrentActivity(activities[Math.floor(Math.random() * activities.length)]);
  };

  const initializeSampleData = () => {
    const sampleSectors: Sector[] = [
      {
        id: 'work',
        name: 'Neural Work',
        color: 'purple',
        icon: 'work',
        totalTime: 285,
        activities: [
          {
            id: '1',
            name: 'Quantum Computing Research',
            duration: 120,
            timestamp: new Date(Date.now() - 120 * 60000),
            metadata: 'DeepMind Neural Networks'
          },
          {
            id: '2',
            name: 'Holographic Interface Design',
            duration: 95,
            timestamp: new Date(Date.now() - 95 * 60000),
            metadata: 'AR/VR Development'
          },
          {
            id: '3',
            name: 'AI Algorithm Optimization',
            duration: 70,
            timestamp: new Date(Date.now() - 70 * 60000),
            metadata: 'Machine Learning Pipeline'
          }
        ]
      },
      {
        id: 'learning',
        name: 'Knowledge Synthesis',
        color: 'cyan',
        icon: 'learning',
        totalTime: 165,
        activities: [
          {
            id: '4',
            name: 'Quantum Physics Studies',
            duration: 90,
            timestamp: new Date(Date.now() - 90 * 60000),
            metadata: 'MIT OpenCourseWare'
          },
          {
            id: '5',
            name: 'Consciousness Theory',
            duration: 75,
            timestamp: new Date(Date.now() - 75 * 60000),
            metadata: 'Neural Science Journal'
          }
        ]
      },
      {
        id: 'creativity',
        name: 'Creative Flow',
        color: 'magenta',
        icon: 'creativity',
        totalTime: 110,
        activities: [
          {
            id: '6',
            name: 'Holographic Art Creation',
            duration: 65,
            timestamp: new Date(Date.now() - 65 * 60000),
            metadata: '3D Neural Sculptures'
          },
          {
            id: '7',
            name: 'AI Music Composition',
            duration: 45,
            timestamp: new Date(Date.now() - 45 * 60000),
            metadata: 'Quantum Harmonics'
          }
        ]
      },
      {
        id: 'social',
        name: 'Neural Network',
        color: 'blue',
        icon: 'social',
        totalTime: 85,
        activities: [
          {
            id: '8',
            name: 'Consciousness Mesh Chat',
            duration: 50,
            timestamp: new Date(Date.now() - 50 * 60000),
            metadata: 'Global Neural Link'
          },
          {
            id: '9',
            name: 'Holographic Meetings',
            duration: 35,
            timestamp: new Date(Date.now() - 35 * 60000),
            metadata: 'Mars Colony Sync'
          }
        ]
      }
    ];

    setSectors(sampleSectors);
    
    const totalTime = sampleSectors.reduce((sum, sector) => sum + sector.totalTime, 0);
    setTodayStats({
      totalActiveTime: totalTime,
      productivityScore: Math.min(95, Math.floor((totalTime / 480) * 100)),
      focusTime: Math.floor(totalTime * 0.7),
      activeSectors: sampleSectors.length
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit',
      hour12: false 
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString([], { 
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="glass-panel border-b border-neon-purple/30 p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-neon flex items-center justify-center">
                <Brain className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold neon-text">NeoLife 2070</h1>
                <p className="text-sm text-muted-foreground">Digital Life Stream</p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <div className="text-right">
              <p className="text-lg font-mono text-neon-cyan">{formatTime(currentTime)}</p>
              <p className="text-xs text-muted-foreground">{formatDate(currentTime)}</p>
            </div>
            
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="glass-panel border-neon-purple/30 text-neon-purple">
                <User className="w-3 h-3 mr-1" />
                {username}
              </Badge>
              <Button variant="ghost" size="icon">
                <Settings className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={onLogout}>
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Dashboard */}
      <main className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Current Activity Status */}
        <Card className="glass-panel border-2 border-neon-cyan/30 shadow-cyan">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 rounded-full bg-neon-green animate-pulse"></div>
                <span className="text-lg font-medium text-foreground">Currently Active:</span>
                <span className="text-neon-cyan font-semibold">{currentActivity}</span>
              </div>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>Live Monitor</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Zap className="w-4 h-4" />
                  <span>Neural Sync: 98%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="glass-panel border border-neon-purple/30">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Active Time</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-neon-purple">
                {Math.floor(todayStats.totalActiveTime / 60)}h {todayStats.totalActiveTime % 60}m
              </div>
            </CardContent>
          </Card>

          <Card className="glass-panel border border-neon-cyan/30">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Productivity Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-neon-cyan">
                {todayStats.productivityScore}%
              </div>
            </CardContent>
          </Card>

          <Card className="glass-panel border border-neon-magenta/30">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Focus Time</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-neon-magenta">
                {Math.floor(todayStats.focusTime / 60)}h {todayStats.focusTime % 60}m
              </div>
            </CardContent>
          </Card>

          <Card className="glass-panel border border-neon-blue/30">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Active Sectors</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-neon-blue">
                {todayStats.activeSectors}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Activity Sectors */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-foreground neon-text">Activity Sectors</h2>
              <Button variant="holographic" size="sm">
                <TrendingUp className="w-4 h-4 mr-2" />
                View Analytics
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {sectors.map((sector) => (
                <ActivitySector key={sector.id} sector={sector} />
              ))}
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* 3D Chart */}
            <Card className="glass-panel border-2 border-neon-purple/30">
              <CardHeader>
                <CardTitle className="text-lg font-semibold neon-text">
                  Holographic Analytics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <HolographicChart data={sectors} />
              </CardContent>
            </Card>

            {/* AI Assistant */}
            <AIAssistant 
              sectors={sectors} 
              username={username}
              todayStats={todayStats}
            />
          </div>
        </div>
      </main>
    </div>
  );
};