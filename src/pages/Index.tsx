import React, { useState, useEffect } from 'react';
import { BiometricLogin } from '@/components/BiometricLogin';
import { Dashboard } from '@/components/Dashboard';

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const savedSession = localStorage.getItem('neolife_session');
    if (savedSession) {
      const session = JSON.parse(savedSession);
      setUsername(session.username);
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const handleLogin = (user: string) => {
    setUsername(user);
    setIsAuthenticated(true);
    
    // Save session
    localStorage.setItem('neolife_session', JSON.stringify({
      username: user,
      timestamp: Date.now()
    }));
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUsername('');
    localStorage.removeItem('neolife_session');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="glass-panel border-2 border-neon-purple/30 p-8 rounded-lg">
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 border-2 border-neon-purple border-t-transparent rounded-full animate-spin"></div>
            <span className="text-lg text-foreground">Initializing NeoLife Systems...</span>
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <BiometricLogin onLogin={handleLogin} />;
  }

  return <Dashboard username={username} onLogout={handleLogout} />;
};

export default Index;
