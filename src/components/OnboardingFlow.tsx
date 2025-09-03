import React, { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, CarouselApi } from '@/components/ui/carousel';
import { Heart, Lightbulb, BarChart3, ArrowRight } from 'lucide-react';

interface OnboardingFlowProps {
  open: boolean;
  onComplete: () => void;
}

const onboardingSlides = [
  {
    id: 1,
    icon: Heart,
    title: 'AI Sog\'liq Maslahatlari',
    description: 'Xaridlaringiz asosida shaxsiy sog\'liq tavsiyalari oling',
    illustration: '🏥',
    accent: 'health',
    features: ['Ozuqa tarkibi tahlili', 'Sog\'lom alternativalar', 'Kaloriya nazorati']
  },
  {
    id: 2,
    icon: Lightbulb,
    title: 'AI Tejash Maslahatlari',
    description: 'Pul tejash uchun oqilona xarid qilish yo\'llarini bilib oling',
    illustration: '💰',
    accent: 'expense',
    features: ['Arzon narxlar taqqoslash', 'Chegirmalar haqida xabar', 'Byudjet rejalashtirish']
  },
  {
    id: 3,
    icon: BarChart3,
    title: 'Bozorlar Taqqoslash',
    description: 'Qaysi bozorda qaysi mahsulot eng arzon ekanini bilib oling',
    illustration: '🏪',
    accent: 'primary',
    features: ['Narxlar taqqoslash', 'Yaqin bozorlar', 'Yetkazib berish vaqti']
  }
];

const OnboardingFlow: React.FC<OnboardingFlowProps> = ({ open, onComplete }) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  React.useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());
    api.on('select', () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const handleNext = () => {
    if (current === onboardingSlides.length - 1) {
      onComplete();
    } else {
      api?.scrollNext();
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent className="card-elevated max-w-md p-0 gap-0 [&>button]:hidden">
        <Carousel setApi={setApi} className="w-full">
          <CarouselContent>
            {onboardingSlides.map((slide) => (
              <CarouselItem key={slide.id}>
                <div className="p-8 text-center space-y-6">
                  {/* Illustration */}
                  <div className="text-6xl mb-4">{slide.illustration}</div>

                  {/* Icon and title */}
                  <div className="space-y-3">
                    <div className={`mx-auto w-12 h-12 bg-${slide.accent}/10 rounded-xl flex items-center justify-center`}>
                      <slide.icon className={`h-6 w-6 text-${slide.accent}`} />
                    </div>
                    <h2 className="text-xl font-bold">{slide.title}</h2>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {slide.description}
                    </p>
                  </div>

                  {/* Features list */}
                  <div className="space-y-2">
                    {slide.features.map((feature, index) => (
                      <div key={index} className="flex items-center justify-center gap-2 text-sm">
                        <div className={`w-1.5 h-1.5 rounded-full bg-${slide.accent}`}></div>
                        <span className="text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/* Navigation */}
        <div className="p-6 border-t border-border">
          {/* Progress dots */}
          <div className="flex justify-center gap-2 mb-6">
            {onboardingSlides.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === current ? 'bg-primary' : 'bg-muted'
                }`}
              />
            ))}
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-between gap-4">
            <Button variant="ghost" onClick={handleSkip} className="text-muted-foreground">
              O'tkazib yuborish
            </Button>
            <Button onClick={handleNext} className="btn-primary flex items-center gap-2">
              {current === onboardingSlides.length - 1 ? 'Boshlash' : 'Keyingisi'}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OnboardingFlow;