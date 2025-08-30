import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Scan, Eye, Brain, Shield, Fingerprint } from 'lucide-react';

interface BiometricLoginProps {
  onLogin: (username: string) => void;
}

export const BiometricLogin: React.FC<BiometricLoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [scanningStep, setScanningStep] = useState(0);
  const [isScanning, setIsScanning] = useState(false);
  const [authComplete, setAuthComplete] = useState(false);

  const authSteps = [
    { icon: Eye, label: 'Retina Scan', duration: 2000 },
    { icon: Fingerprint, label: 'Neural Pattern', duration: 1500 },
    { icon: Brain, label: 'Consciousness Link', duration: 2500 },
    { icon: Shield, label: 'Quantum Verification', duration: 1000 }
  ];

  const handleBiometricAuth = async () => {
    if (!username.trim()) return;
    
    setIsScanning(true);
    setScanningStep(0);

    for (let i = 0; i < authSteps.length; i++) {
      setScanningStep(i);
      await new Promise(resolve => setTimeout(resolve, authSteps[i].duration));
    }

    setAuthComplete(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    onLogin(username);
  };

  const getCurrentStepIcon = () => {
    if (!isScanning) return Scan;
    return authSteps[scanningStep]?.icon || Shield;
  };

  const CurrentIcon = getCurrentStepIcon();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-br from-neon-purple/10 via-transparent to-neon-cyan/10" />
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(hsl(var(--neon-purple) / 0.1) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--neon-purple) / 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }} />
      </div>

      <Card className="w-full max-w-lg glass-panel border-2 border-neon-purple/30 relative">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-24 h-24 rounded-full glass-panel border-2 border-neon-cyan/50 flex items-center justify-center">
            <CurrentIcon className="w-12 h-12 text-neon-cyan animate-pulse" />
          </div>
          <CardTitle className="text-3xl font-bold neon-text">
            NeoLife 2070
          </CardTitle>
          <CardDescription className="text-lg text-muted-foreground">
            Advanced Biometric Authentication Portal
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {!isScanning ? (
            <>
              <div className="space-y-2">
                <Label htmlFor="username" className="text-foreground font-semibold">
                  Neural ID
                </Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter your neural identifier..."
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="glass-panel border-neon-purple/30 focus:border-neon-purple text-foreground placeholder:text-muted-foreground"
                  onKeyDown={(e) => e.key === 'Enter' && handleBiometricAuth()}
                />
              </div>

              <Button
                variant="biometric"
                size="lg"
                className="w-full text-lg font-semibold"
                onClick={handleBiometricAuth}
                disabled={!username.trim()}
              >
                <Scan className="w-5 h-5" />
                Initialize Biometric Scan
              </Button>

              <div className="grid grid-cols-3 gap-3 pt-4">
                <Button variant="holographic" size="sm" className="text-xs">
                  <Eye className="w-4 h-4" />
                  Retina
                </Button>
                <Button variant="neural" size="sm" className="text-xs">
                  <Brain className="w-4 h-4" />
                  Neural
                </Button>
                <Button variant="scan" size="sm" className="text-xs">
                  <Fingerprint className="w-4 h-4" />
                  Quantum
                </Button>
              </div>
            </>
          ) : (
            <div className="space-y-6 text-center">
              <div className="space-y-4">
                <div className="mx-auto w-32 h-32 rounded-full glass-panel border-4 border-neon-purple biometric-scan flex items-center justify-center">
                  <CurrentIcon className="w-16 h-16 text-neon-purple" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-neon-cyan">
                    {authComplete ? 'Authentication Complete' : authSteps[scanningStep]?.label || 'Initializing...'}
                  </h3>
                  <p className="text-muted-foreground">
                    {authComplete 
                      ? 'Access granted. Welcome to NeoLife 2070.' 
                      : 'Please remain still during biometric verification...'
                    }
                  </p>
                </div>

                {/* Progress indicator */}
                <div className="flex justify-center space-x-2">
                  {authSteps.map((_, index) => (
                    <div
                      key={index}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index <= scanningStep
                          ? 'bg-neon-purple shadow-neon'
                          : 'bg-muted border border-neon-purple/30'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};