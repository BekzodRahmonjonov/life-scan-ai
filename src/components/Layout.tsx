import React from 'react';
import { Outlet, useLocation, NavLink } from 'react-router-dom';
import { ScanLine, BarChart3, Receipt, MoreHorizontal, Globe, QrCode } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Layout: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { to: '/app/scanner', icon: ScanLine, label: 'Scanner', labelUz: 'Skaner' },
    { to: '/app/insights', icon: BarChart3, label: 'Insights', labelUz: 'Analitika' },
    { to: '/app/receipts', icon: Receipt, label: 'Receipts', labelUz: 'Cheklar' },
    { to: '/app/more', icon: MoreHorizontal, label: 'More', labelUz: 'Boshqa' }
  ];

  const isActive = (path: string) => location.pathname.startsWith(path);

  return (
    <div className="min-h-screen bg-background flex flex-col lg:flex-row">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:w-64 lg:flex-col lg:border-r lg:border-border lg:bg-card">
        <div className="p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-primary p-2 rounded-xl">
              <QrCode className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold">ScanDora</h1>
              <p className="text-sm text-muted-foreground">Finance & Health</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200 ${
                  isActive
                    ? 'bg-primary/10 text-primary border border-primary/20'
                    : 'text-foreground hover:bg-muted hover:text-foreground'
                }`
              }
            >
              <item.icon className="h-5 w-5" />
              <span className="font-medium">{item.labelUz}</span>
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-border">
          <Button variant="outline" size="sm" className="w-full justify-start gap-2">
            <Globe className="h-4 w-4" />
            O'zbek tili
          </Button>
        </div>
      </aside>

      {/* Mobile Header */}
      <header className="lg:hidden sticky top-0 z-40 glass-effect border-b border-border">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-primary p-2 rounded-xl">
              <QrCode className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-bold">ScanDora</h1>
              <p className="text-xs text-muted-foreground">Finance & Health</p>
            </div>
          </div>
          <Button variant="outline" size="sm" className="gap-2">
            <Globe className="h-4 w-4" />
            UZ
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 lg:max-w-7xl lg:mx-auto w-full">
        <div className="container mx-auto px-4 lg:px-8 py-6 pb-20 lg:pb-6">
          <Outlet />
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 glass-effect border-t border-border">
        <div className="grid grid-cols-4 px-2 py-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center gap-1 p-3 rounded-xl transition-all duration-200 ${
                  isActive
                    ? 'text-primary bg-primary/10'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`
              }
            >
              <item.icon className="h-5 w-5" />
              <span className="text-xs font-medium">{item.labelUz}</span>
            </NavLink>
          ))}
        </div>
      </nav>

      {/* Floating Scan Button - Mobile Only */}
      {location.pathname !== '/app/scanner' && (
        <NavLink to="/app/scanner" className="lg:hidden scan-button">
          <QrCode className="h-6 w-6" />
        </NavLink>
      )}
    </div>
  );
};

export default Layout;