import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { QrCode, BarChart3, TrendingUp } from 'lucide-react';
import heroImage from '@/assets/hero-scan.jpg';

const Welcome: React.FC = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Hero Section */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-12 text-center">
        <div className="w-full max-w-md mb-8">
          <img
            src={heroImage}
            alt="ScanDora QR scanning illustration"
            className="w-full h-auto rounded-2xl shadow-elevated"
          />
        </div>

        <div className="space-y-6 max-w-lg">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              ScanDora ga{' '}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                xush kelibsiz
              </span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Oziq-ovqat xarajatlaringizni kuzating va AI tavsiyalarini oling. 
              Sog'lom va tejamkor hayot kechirishga yordam beramiz.
            </p>
          </div>

          <div className="space-y-4">
            <NavLink to="/app/scanner" className="block">
              <Button className="btn-primary w-full h-14 text-lg">
                <QrCode className="h-6 w-6 mr-3" />
                Yangi chekni skan qiling
              </Button>
            </NavLink>

            <NavLink to="/app/insights" className="block">
              <Button variant="outline" className="w-full h-12">
                Demo ma'lumotlarni ko'ring
              </Button>
            </NavLink>
          </div>
        </div>
      </div>

      {/* Features Preview */}
      <div className="px-4 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          <div className="card-soft p-6 text-center space-y-3">
            <div className="mx-auto w-12 h-12 bg-expense/10 rounded-xl flex items-center justify-center">
              <QrCode className="h-6 w-6 text-expense" />
            </div>
            <h3 className="font-semibold">Tez skanerlash</h3>
            <p className="text-sm text-muted-foreground">
              QR kodlarni bir soniyada skanerlang va ma'lumotlarni avtomatik sarang
            </p>
          </div>

          <div className="card-soft p-6 text-center space-y-3">
            <div className="mx-auto w-12 h-12 bg-health/10 rounded-xl flex items-center justify-center">
              <BarChart3 className="h-6 w-6 text-health" />
            </div>
            <h3 className="font-semibold">AI Analitika</h3>
            <p className="text-sm text-muted-foreground">
              Xarajatlaringizni tahlil qiling va sog'liq bo'yicha shaxsiy tavsiyalar oling
            </p>
          </div>

          <div className="card-soft p-6 text-center space-y-3">
            <div className="mx-auto w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold">Pul tejash</h3>
            <p className="text-sm text-muted-foreground">
              Eng arzon narxlarni toping va oqilona xarid qilish bo'yicha maslahat oling
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;