import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { QrCode, BarChart3, TrendingUp } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import heroImage from '@/assets/hero-scan.jpg';
import ProductCarousel from '@/components/ProductCarousel';
import OnboardingFlow from '@/components/OnboardingFlow';
import Autoplay from 'embla-carousel-autoplay';

const Welcome: React.FC = () => {
  const [showOnboarding, setShowOnboarding] = useState(false);

  // Check if it's first time user
  useEffect(() => {
    const hasSeenOnboarding = localStorage.getItem('scandora-onboarding-completed');
    if (!hasSeenOnboarding) {
      setShowOnboarding(true);
    }
  }, []);

  const handleOnboardingComplete = () => {
    localStorage.setItem('scandora-onboarding-completed', 'true');
    setShowOnboarding(false);
  };

  const featureCards = [
    {
      id: 1,
      icon: QrCode,
      title: 'Tez skanerlash',
      description: 'QR kodlarni bir soniyada skanerlang va ma\'lumotlarni avtomatik saqlang',
      accent: 'expense',
      illustration: '📱'
    },
    {
      id: 2,
      icon: BarChart3,
      title: 'AI Analitika',
      description: 'Xarajatlaringizni tahlil qiling va sog\'liq bo\'yicha shaxsiy tavsiyalar oling',
      accent: 'health',
      illustration: '📊'
    },
    {
      id: 3,
      icon: TrendingUp,
      title: 'Pul tejash',
      description: 'Eng arzon narxlarni toping va oqilona xarid qilish bo\'yicha maslahat oling',
      accent: 'primary',
      illustration: '💰'
    }
  ];

  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  );
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

      {/* Product Carousel */}
      <div className="px-4 pb-6">
        <ProductCarousel />
      </div>

      {/* Features Preview - Horizontal Carousel */}
      <div className="px-4 pb-8">
        <h3 className="text-lg font-semibold mb-4 text-center">ScanDora imkoniyatlari</h3>
        <Carousel
          plugins={[plugin.current]}
          className="w-full max-w-4xl mx-auto"
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
        >
          <CarouselContent>
            {featureCards.map((feature) => (
              <CarouselItem key={feature.id} className="md:basis-1/2 lg:basis-1/3">
                <div className="card-soft p-6 text-center space-y-4 mx-2">
                  <div className="text-4xl mb-2">{feature.illustration}</div>
                  <div className={`mx-auto w-12 h-12 bg-${feature.accent}/10 rounded-xl flex items-center justify-center`}>
                    <feature.icon className={`h-6 w-6 text-${feature.accent}`} />
                  </div>
                  <h3 className="font-semibold">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>
        
        {/* Pagination dots */}
        <div className="flex justify-center gap-2 mt-4">
          {featureCards.map((_, index) => (
            <div
              key={index}
              className="w-2 h-2 rounded-full bg-muted"
            />
          ))}
        </div>
      </div>

      <OnboardingFlow 
        open={showOnboarding} 
        onComplete={handleOnboardingComplete}
      />
    </div>
  );
};

export default Welcome;