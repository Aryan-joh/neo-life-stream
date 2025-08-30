import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Bot, 
  MessageSquare, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX,
  Zap,
  Brain,
  TrendingUp
} from 'lucide-react';
import type { Sector } from './ActivitySector';

interface AIAssistantProps {
  sectors: Sector[];
  username: string;
  todayStats: {
    totalActiveTime: number;
    productivityScore: number;
    focusTime: number;
    activeSectors: number;
  };
}

interface Message {
  id: string;
  content: string;
  type: 'ai' | 'user' | 'system';
  timestamp: Date;
}

export const AIAssistant: React.FC<AIAssistantProps> = ({ 
  sectors, 
  username, 
  todayStats 
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    // Initialize with welcome message
    addMessage(
      `Welcome back, ${username}. I've analyzed your neural patterns and compiled today's insights. Your productivity is optimal at ${todayStats.productivityScore}%. Would you like me to provide deeper analysis?`,
      'ai'
    );

    // Periodic insights
    const insightTimer = setInterval(() => {
      generateInsight();
    }, 120000); // Every 2 minutes

    return () => clearInterval(insightTimer);
  }, [username, todayStats.productivityScore]);

  const addMessage = (content: string, type: 'ai' | 'user' | 'system') => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      type,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const generateInsight = () => {
    const insights = [
      `Your neural work sector shows ${Math.floor(sectors[0]?.totalTime / 60)}h of focused activity. This indicates high cognitive engagement patterns.`,
      `Detected optimal learning windows between productive sessions. Your knowledge synthesis efficiency is above baseline.`,
      `Creative flow patterns suggest enhanced right-brain activity. Consider extending these sessions for maximum neural plasticity.`,
      `Social network interactions maintain healthy balance. Your consciousness mesh connectivity remains stable.`,
      `Biometric analysis indicates optimal hydration and neural glucose levels. Maintain current patterns for peak performance.`,
      `Quantum processing cycles show 98% efficiency. Your digital consciousness integration is performing exceptionally.`
    ];

    const randomInsight = insights[Math.floor(Math.random() * insights.length)];
    addMessage(randomInsight, 'system');
  };

  const handleVoiceInput = () => {
    if (!isListening) {
      setIsListening(true);
      addMessage("Voice recognition activated. Neural link established.", 'system');
      
      // Simulate voice processing
      setTimeout(() => {
        setIsListening(false);
        setIsProcessing(true);
        addMessage("Processing neural voice patterns...", 'system');
        
        setTimeout(() => {
          setIsProcessing(false);
          const responses = [
            "Your voice patterns indicate elevated focus levels. I recommend a 15-minute meditation break to optimize neural efficiency.",
            "Analysis complete. Your stress markers are within optimal range. Continue current activity patterns.",
            "Neural voice signature confirmed. Your cognitive load is at 78% capacity. Consider task prioritization.",
            "Voice analysis suggests high creativity potential. This would be an optimal time for innovative projects."
          ];
          const response = responses[Math.floor(Math.random() * responses.length)];
          addMessage(response, 'ai');
        }, 2000);
      }, 3000);
    }
  };

  const handleSpeakInsight = () => {
    if (!isSpeaking) {
      setIsSpeaking(true);
      const latestMessage = messages[messages.length - 1];
      
      addMessage("Initializing neural audio synthesis...", 'system');
      
      // Simulate speech synthesis
      setTimeout(() => {
        setIsSpeaking(false);
        addMessage("Audio transmission complete. Neural patterns synchronized.", 'system');
      }, 3000);
    }
  };

  const getMessageIcon = (type: string) => {
    switch (type) {
      case 'ai':
        return <Bot className="w-4 h-4 text-neon-purple" />;
      case 'system':
        return <Zap className="w-4 h-4 text-neon-cyan" />;
      default:
        return <MessageSquare className="w-4 h-4 text-neon-magenta" />;
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <Card className="glass-panel border-2 border-neon-purple/30 h-96">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gradient-cyberpunk flex items-center justify-center">
                <Brain className="w-5 h-5 text-foreground" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-neon-green rounded-full animate-pulse"></div>
            </div>
            <div>
              <CardTitle className="text-lg font-semibold neon-text">
                Neural Assistant
              </CardTitle>
              <p className="text-xs text-muted-foreground">
                Consciousness Analysis Engine
              </p>
            </div>
          </div>
          
          <Badge variant="outline" className="glass-panel border-neon-purple/30 text-neon-purple">
            <TrendingUp className="w-3 h-3 mr-1" />
            Active
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Messages */}
        <ScrollArea className="h-48 w-full rounded glass-panel border border-neon-purple/20 p-3">
          <div className="space-y-3">
            {messages.map((message) => (
              <div key={message.id} className="space-y-1">
                <div className="flex items-center space-x-2">
                  {getMessageIcon(message.type)}
                  <span className="text-xs text-muted-foreground">
                    {formatTime(message.timestamp)}
                  </span>
                  {message.type === 'ai' && (
                    <Badge variant="secondary" className="text-xs px-1 py-0">
                      AI
                    </Badge>
                  )}
                  {message.type === 'system' && (
                    <Badge variant="outline" className="text-xs px-1 py-0 border-neon-cyan/30">
                      SYS
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-foreground leading-relaxed pl-6">
                  {message.content}
                </p>
              </div>
            ))}
            
            {isProcessing && (
              <div className="flex items-center space-x-2 pl-6">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-neon-purple rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-neon-cyan rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-neon-magenta rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                </div>
                <span className="text-xs text-muted-foreground">Processing neural data...</span>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Controls */}
        <div className="flex items-center space-x-2">
          <Button
            variant={isListening ? "neural" : "holographic"}
            size="sm"
            onClick={handleVoiceInput}
            disabled={isProcessing}
            className="flex-1"
          >
            {isListening ? (
              <>
                <MicOff className="w-4 h-4 mr-2" />
                Listening...
              </>
            ) : (
              <>
                <Mic className="w-4 h-4 mr-2" />
                Voice Input
              </>
            )}
          </Button>

          <Button
            variant={isSpeaking ? "neural" : "scan"}
            size="sm"
            onClick={handleSpeakInsight}
            disabled={isProcessing || messages.length === 0}
          >
            {isSpeaking ? (
              <VolumeX className="w-4 h-4" />
            ) : (
              <Volume2 className="w-4 h-4" />
            )}
          </Button>
        </div>

        {/* Neural Status */}
        <div className="glass-panel border border-neon-purple/20 p-2 rounded">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Neural Sync:</span>
            <span className="text-neon-cyan font-medium">98.3%</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Processing Power:</span>
            <span className="text-neon-purple font-medium">Quantum Level</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Consciousness Link:</span>
            <span className="text-neon-green font-medium">Stable</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};