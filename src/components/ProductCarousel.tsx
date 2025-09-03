import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { MapPin, Clock } from 'lucide-react';
import Autoplay from 'embla-carousel-autoplay';

interface Product {
  id: string;
  name: string;
  image: string;
  cheapestPrice: number;
  marketName: string;
  discount?: number;
  deliveryTime?: string;
}

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Milk, 1L',
    image: '🥛',
    cheapestPrice: 12000,
    marketName: 'Korzinka',
    discount: 15,
    deliveryTime: '30 min'
  },
  {
    id: '2', 
    name: 'Bread, 400g',
    image: '🍞',
    cheapestPrice: 8000,
    marketName: 'Macro',
    deliveryTime: '45 min'
  },
  {
    id: '3',
    name: 'Chicken Breast, 1kg',
    image: '🍖',
    cheapestPrice: 52000,
    marketName: 'Havas',
    discount: 10,
    deliveryTime: '1 hour'
  },
  {
    id: '4',
    name: 'Bananas, 1kg', 
    image: '🍌',
    cheapestPrice: 18000,
    marketName: 'Uzum Market',
    deliveryTime: '25 min'
  },
  {
    id: '5',
    name: 'Rice, 1kg',
    image: '🌾',
    cheapestPrice: 28000,
    marketName: 'Korzinka',
    discount: 8,
    deliveryTime: '30 min'
  }
];

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('uz-UZ').format(amount) + ' so\'m';
};

const ProductCarousel: React.FC = () => {
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Eng arzon mahsulotlar</h3>
        <Button variant="ghost" size="sm" className="text-primary">
          Barchasini ko'rish
        </Button>
      </div>

      <Carousel
        plugins={[plugin.current]}
        className="w-full"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {mockProducts.map((product) => (
            <CarouselItem key={product.id} className="pl-2 md:pl-4 basis-72">
              <Card className="card-soft hover:shadow-elevated transition-all duration-300 cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="text-3xl">{product.image}</div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium truncate">{product.name}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-lg font-bold text-foreground">
                          {formatCurrency(product.cheapestPrice)}
                        </span>
                        {product.discount && (
                          <Badge className="bg-expense/10 text-expense text-xs">
                            -{product.discount}%
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {product.marketName}
                        </div>
                        {product.deliveryTime && (
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {product.deliveryTime}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex" />
        <CarouselNext className="hidden md:flex" />
      </Carousel>
    </div>
  );
};

export default ProductCarousel;