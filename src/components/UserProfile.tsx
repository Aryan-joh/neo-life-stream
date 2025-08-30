import React from 'react';
import { 
  Sheet, 
  SheetContent, 
  SheetDescription, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger 
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Settings, 
  User, 
  Mail, 
  Calendar, 
  MapPin, 
  Shield,
  Bell,
  Palette,
  Database
} from 'lucide-react';

interface UserProfileProps {
  username: string;
  todayStats: {
    totalActiveTime: number;
    productivityScore: number;
    focusTime: number;
    activeSectors: number;
  };
}

export const UserProfile: React.FC<UserProfileProps> = ({ username, todayStats }) => {
  const userInfo = {
    name: username,
    email: `${username.toLowerCase()}@neolife2070.ai`,
    joinDate: '2070-01-15',
    location: 'Neo Tokyo',
    neuralId: 'NL-2070-' + Math.random().toString(36).substr(2, 6).toUpperCase(),
    status: 'Active Neural Link'
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="hover:bg-neon-purple/20">
          <Settings className="w-4 h-4" />
        </Button>
      </SheetTrigger>
      <SheetContent className="glass-panel border-l border-neon-purple/30 w-full sm:max-w-md">
        <SheetHeader className="space-y-4">
          <div className="flex items-center space-x-4">
            <Avatar className="w-16 h-16 border-2 border-neon-cyan/50">
              <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`} />
              <AvatarFallback className="bg-gradient-neon text-primary-foreground text-lg font-bold">
                {username.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <SheetTitle className="text-xl neon-text">{userInfo.name}</SheetTitle>
              <SheetDescription className="text-neon-cyan">{userInfo.status}</SheetDescription>
              <Badge variant="outline" className="mt-1 text-xs border-neon-purple/30">
                ID: {userInfo.neuralId}
              </Badge>
            </div>
          </div>
        </SheetHeader>

        <div className="space-y-6 mt-6">
          {/* User Information */}
          <Card className="glass-panel border border-neon-purple/30">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                <User className="w-4 h-4 mr-2" />
                Profile Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-neon-cyan" />
                <span className="text-sm">{userInfo.email}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Calendar className="w-4 h-4 text-neon-magenta" />
                <span className="text-sm">Joined {userInfo.joinDate}</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-neon-blue" />
                <span className="text-sm">{userInfo.location}</span>
              </div>
            </CardContent>
          </Card>

          {/* Today's Stats */}
          <Card className="glass-panel border border-neon-cyan/30">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Today's Performance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Active Time</span>
                <span className="text-neon-purple font-semibold">
                  {Math.floor(todayStats.totalActiveTime / 60)}h {todayStats.totalActiveTime % 60}m
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Productivity Score</span>
                <span className="text-neon-cyan font-semibold">{todayStats.productivityScore}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Focus Time</span>
                <span className="text-neon-magenta font-semibold">
                  {Math.floor(todayStats.focusTime / 60)}h {todayStats.focusTime % 60}m
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Active Sectors</span>
                <span className="text-neon-blue font-semibold">{todayStats.activeSectors}</span>
              </div>
            </CardContent>
          </Card>

          {/* Settings Options */}
          <Card className="glass-panel border border-neon-magenta/30">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                System Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="ghost" className="w-full justify-start text-sm">
                <Shield className="w-4 h-4 mr-3 text-neon-purple" />
                Neural Security Settings
              </Button>
              <Button variant="ghost" className="w-full justify-start text-sm">
                <Bell className="w-4 h-4 mr-3 text-neon-cyan" />
                Notification Preferences
              </Button>
              <Button variant="ghost" className="w-full justify-start text-sm">
                <Palette className="w-4 h-4 mr-3 text-neon-magenta" />
                Interface Customization
              </Button>
              <Button variant="ghost" className="w-full justify-start text-sm">
                <Database className="w-4 h-4 mr-3 text-neon-blue" />
                Data & Privacy
              </Button>
            </CardContent>
          </Card>
        </div>
      </SheetContent>
    </Sheet>
  );
};