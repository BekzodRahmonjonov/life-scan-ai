import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TrendingUp, TrendingDown, DollarSign, ShoppingBag, Heart, Lightbulb, Calendar } from 'lucide-react';
import { 
  mockReceipts, 
  categoryData, 
  weeklyData, 
  healthTips, 
  savingTips,
  formatCurrency 
} from '@/data/mockData';

const Insights: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Calculate totals
  const totalSpent = mockReceipts.reduce((sum, receipt) => sum + receipt.totalUZS, 0);
  const totalItems = mockReceipts.reduce((sum, receipt) => sum + receipt.items.length, 0);
  const totalSaved = 25000; // Mock saved amount

  const WeeklySummaryCard = () => (
    <Card className="card-elevated">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            Haftalik xulosa
          </CardTitle>
          <Badge variant="outline">26 Avg - 2 Sen</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-3 bg-expense/5 rounded-xl border border-expense/20">
            <p className="text-2xl font-bold text-expense">{formatCurrency(totalSpent)}</p>
            <p className="text-xs text-muted-foreground">Jami xarajat</p>
          </div>
          <div className="text-center p-3 bg-primary/5 rounded-xl border border-primary/20">
            <p className="text-2xl font-bold text-primary">{totalItems}</p>
            <p className="text-xs text-muted-foreground">Mahsulotlar</p>
          </div>
          <div className="text-center p-3 bg-health/5 rounded-xl border border-health/20">
            <p className="text-2xl font-bold text-health">{formatCurrency(totalSaved)}</p>
            <p className="text-xs text-muted-foreground">Tejaldi</p>
          </div>
        </div>

        {/* Weekly Trend */}
        <div className="space-y-2">
          <h4 className="font-medium text-sm">Haftalik trend</h4>
          <div className="flex items-end gap-1 h-20">
            {weeklyData.map((day, index) => (
              <div key={day.day} className="flex-1 flex flex-col items-center gap-1">
                <div 
                  className="w-full bg-primary/20 rounded-t-sm"
                  style={{ 
                    height: `${(day.spent / Math.max(...weeklyData.map(d => d.spent))) * 60}px`,
                    backgroundColor: index === weeklyData.length - 1 ? 'hsl(var(--primary))' : 'hsl(var(--primary) / 0.3)'
                  }}
                />
                <span className="text-xs text-muted-foreground">{day.day}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const CategoryBreakdown = () => (
    <Card className="card-soft">
      <CardHeader>
        <CardTitle className="text-lg">Kategoriyalar bo'yicha</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {categoryData.map((category) => (
          <div key={category.name} className="flex items-center justify-between p-3 bg-card rounded-lg border">
            <div className="flex items-center gap-3">
              <div 
                className="w-4 h-4 rounded-full" 
                style={{ backgroundColor: category.color }}
              />
              <span className="font-medium">{category.name}</span>
            </div>
            <div className="text-right">
              <p className="font-semibold">{formatCurrency(category.spent)}</p>
              <p className="text-xs text-muted-foreground">{category.percentage}%</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );

  const HealthTipsSection = () => (
    <div className="space-y-4">
      {healthTips.map((tip) => (
        <Card key={tip.id} className="card-soft border-l-4 border-l-health">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-health/10 rounded-lg">
                <Heart className="h-4 w-4 text-health" />
              </div>
              <div className="flex-1 space-y-2">
                <h4 className="font-semibold text-sm">{tip.title}</h4>
                <p className="text-sm text-muted-foreground">{tip.description}</p>
                {tip.relatedItems.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {tip.relatedItems.map((item, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {item}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const SavingTipsSection = () => (
    <div className="space-y-4">
      {savingTips.map((tip) => (
        <Card key={tip.id} className="card-soft border-l-4 border-l-expense">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-expense/10 rounded-lg">
                <DollarSign className="h-4 w-4 text-expense" />
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-sm">{tip.title}</h4>
                  <span className="text-sm font-medium text-expense">
                    +{formatCurrency(tip.potentialSaving)}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{tip.description}</p>
                {tip.relatedItems.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {tip.relatedItems.map((item, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {item}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Analitika va tavsiyalar</h1>
        <Button variant="outline" size="sm">
          <TrendingUp className="h-4 w-4 mr-2" />
          Export
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            <span className="hidden sm:inline">Umumiy</span>
          </TabsTrigger>
          <TabsTrigger value="health" className="flex items-center gap-2">
            <Heart className="h-4 w-4" />
            <span className="hidden sm:inline">Sog'liq</span>
          </TabsTrigger>
          <TabsTrigger value="saving" className="flex items-center gap-2">
            <Lightbulb className="h-4 w-4" />
            <span className="hidden sm:inline">Tejash</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <WeeklySummaryCard />
          <CategoryBreakdown />
          
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="card-soft">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-expense" />
                  Xarajat trendi
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-expense" />
                  <span className="text-sm text-muted-foreground">O'tgan haftaga nisbatan</span>
                  <Badge className="bg-expense/10 text-expense">+12%</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="card-soft">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <ShoppingBag className="h-5 w-5 text-primary" />
                  Eng ko'p xarid
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Meat</span>
                    <span className="text-sm font-medium">28%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Dairy</span>
                    <span className="text-sm font-medium">25%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="health" className="space-y-6">
          <Card className="card-elevated border-l-4 border-l-health">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Heart className="h-5 w-5 text-health" />
                Sog'liq bo'yicha tavsiyalar
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                So'nggi xaridlaringiz asosida AI tavsiyalari
              </p>
            </CardContent>
          </Card>
          <HealthTipsSection />
        </TabsContent>

        <TabsContent value="saving" className="space-y-6">
          <Card className="card-elevated border-l-4 border-l-expense">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-expense" />
                Tejash imkoniyatlari
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Pul tejash uchun shaxsiy tavsiyalar
              </p>
            </CardContent>
          </Card>
          <SavingTipsSection />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Insights;