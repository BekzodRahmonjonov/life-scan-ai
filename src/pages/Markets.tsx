import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, MapPin, Clock, TrendingDown, Plus } from 'lucide-react';

interface MarketProduct {
  id: string;
  name: string;
  image: string;
  prices: {
    marketName: string;
    price: number;
    discount?: number;
    deliveryTime: string;
    distance: string;
    inStock: boolean;
  }[];
}

const mockMarketProducts: MarketProduct[] = [
  {
    id: '1',
    name: 'Milk, 1L',
    image: '🥛',
    prices: [
      { marketName: 'Korzinka', price: 12000, discount: 15, deliveryTime: '30 min', distance: '2.1 km', inStock: true },
      { marketName: 'Macro', price: 14000, deliveryTime: '45 min', distance: '3.5 km', inStock: true },
      { marketName: 'Havas', price: 13500, deliveryTime: '1 hour', distance: '4.2 km', inStock: false },
      { marketName: 'Uzum Market', price: 13000, deliveryTime: '25 min', distance: '1.8 km', inStock: true }
    ]
  },
  {
    id: '2',
    name: 'Bread, 400g',
    image: '🍞',
    prices: [
      { marketName: 'Korzinka', price: 8000, deliveryTime: '30 min', distance: '2.1 km', inStock: true },
      { marketName: 'Macro', price: 7500, discount: 10, deliveryTime: '45 min', distance: '3.5 km', inStock: true },
      { marketName: 'Havas', price: 9000, deliveryTime: '1 hour', distance: '4.2 km', inStock: true }
    ]
  },
  {
    id: '3',
    name: 'Chicken Breast, 1kg',
    image: '🍖',
    prices: [
      { marketName: 'Macro', price: 52000, deliveryTime: '45 min', distance: '3.5 km', inStock: true },
      { marketName: 'Havas', price: 48000, discount: 8, deliveryTime: '1 hour', distance: '4.2 km', inStock: true },
      { marketName: 'Uzum Market', price: 55000, deliveryTime: '25 min', distance: '1.8 km', inStock: true }
    ]
  }
];

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('uz-UZ').format(amount) + ' so\'m';
};

const Markets: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('tashkent');
  const [showInStockOnly, setShowInStockOnly] = useState(false);

  const filteredProducts = mockMarketProducts.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Bozorlar taqqoslash</h1>
      </div>

      {/* Search and Filters */}
      <Card className="card-soft">
        <CardContent className="p-4 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Mahsulot nomini kiriting..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={selectedCity} onValueChange={setSelectedCity}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Shaharni tanlang" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="tashkent">Toshkent</SelectItem>
                <SelectItem value="samarkand">Samarqand</SelectItem>
                <SelectItem value="bukhara">Buxoro</SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant={showInStockOnly ? "default" : "outline"}
              onClick={() => setShowInStockOnly(!showInStockOnly)}
              className="whitespace-nowrap"
            >
              Faqat mavjud
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Products List */}
      <div className="space-y-6">
        {filteredProducts.map((product) => {
          const sortedPrices = [...product.prices]
            .filter(price => !showInStockOnly || price.inStock)
            .sort((a, b) => a.price - b.price);

          const cheapestPrice = sortedPrices[0];

          return (
            <Card key={product.id} className="card-elevated">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="text-3xl">{product.image}</div>
                  <div className="flex-1">
                    <CardTitle className="text-lg">{product.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {sortedPrices.length} ta bozorda mavjud
                    </p>
                  </div>
                  {cheapestPrice && (
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Eng arzon</p>
                      <p className="text-xl font-bold text-expense">
                        {formatCurrency(cheapestPrice.price)}
                      </p>
                    </div>
                  )}
                </div>
              </CardHeader>
              
              <CardContent className="space-y-3">
                {sortedPrices.map((price, index) => (
                  <div
                    key={`${product.id}-${price.marketName}`}
                    className={`p-4 rounded-xl border transition-all ${
                      index === 0 
                        ? 'bg-expense/5 border-expense/20' 
                        : price.inStock 
                          ? 'bg-card hover:bg-muted/50' 
                          : 'bg-muted/30 opacity-60'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold">{price.marketName}</h4>
                            {index === 0 && (
                              <Badge className="bg-expense/10 text-expense text-xs">
                                Eng arzon
                              </Badge>
                            )}
                            {price.discount && (
                              <Badge variant="outline" className="text-xs">
                                -{price.discount}%
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                            <div className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {price.distance}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {price.deliveryTime}
                            </div>
                            {!price.inStock && (
                              <span className="text-destructive text-xs">Mavjud emas</span>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <p className="text-lg font-bold">
                          {formatCurrency(price.price)}
                        </p>
                        {price.inStock && (
                          <Button size="sm" variant="outline" className="mt-2">
                            Buyurtma berish
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full text-primary"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Xarid ro'yxatiga qo'shish
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredProducts.length === 0 && (
        <Card className="card-soft">
          <CardContent className="py-12 text-center">
            <div className="text-4xl mb-4">🔍</div>
            <h3 className="font-semibold mb-2">Mahsulot topilmadi</h3>
            <p className="text-muted-foreground">
              Boshqa mahsulot nomini sinab ko'ring
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Markets;