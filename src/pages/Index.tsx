// Update this page (the content is just a fallback if you fail to update the page)

import { NavLink } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold mb-4">Welcome to ScanDora</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Finance & Health tracking app for Telegram Mini Apps
        </p>
        <NavLink to="/app">
          <Button className="btn-primary text-lg px-8 py-4">
            Ilovani boshlash
          </Button>
        </NavLink>
      </div>
    </div>
  );
};

export default Index;
