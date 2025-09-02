import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, 
  Filter, 
  Calendar, 
  MapPin, 
  Receipt as ReceiptIcon, 
  Eye,
  Edit,
  Share,
  QrCode,
  ChefHat,
  Clock,
  Users
} from 'lucide-react';
import { 
  mockReceipts, 
  mockRecipes,
  formatCurrency, 
  formatDate,
  type Receipt 
} from '@/data/mockData';
import emptyImage from '@/assets/empty-receipts.jpg';

const Receipts: React.FC = () => {
  const [selectedReceipt, setSelectedReceipt] = useState<Receipt | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredReceipts = mockReceipts.filter(receipt =>
    receipt.market.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    receipt.items.some(item => 
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const ReceiptsList = () => (
    <div className="space-y-4">
      {/* Search and Filter */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Chek yoki mahsulot qidirish..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      {/* Receipts Grid */}
      {filteredReceipts.length === 0 ? (
        <Card className="card-soft">
          <CardContent className="py-12 text-center">
            <img
              src={emptyImage}
              alt="Cheklar yo'q"
              className="w-48 h-36 mx-auto mb-4 opacity-60"
            />
            <h3 className="font-semibold mb-2">Hali cheklar yo'q</h3>
            <p className="text-muted-foreground mb-4">
              Birinchi chekingizni skanerlash uchun pastdagi tugmani bosing
            </p>
            <Button className="btn-primary">
              <QrCode className="h-4 w-4 mr-2" />
              Chek skanerlash
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {filteredReceipts.map((receipt) => (
            <Card 
              key={receipt.id} 
              className="card-soft hover:shadow-elevated transition-all duration-200 cursor-pointer"
              onClick={() => setSelectedReceipt(receipt)}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <ReceiptIcon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{receipt.market.name}</h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        {receipt.market.city}
                        <Calendar className="h-3 w-3 ml-2" />
                        {formatDate(receipt.date)}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-expense">
                      {formatCurrency(receipt.totalUZS)}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {receipt.items.length} mahsulot
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    {receipt.ai.health.length > 0 && (
                      <Badge variant="outline" className="chip-health text-xs">
                        Sog'liq: {receipt.ai.health.length}
                      </Badge>
                    )}
                    {receipt.ai.saving.length > 0 && (
                      <Badge variant="outline" className="chip-expense text-xs">
                        Tejash: {receipt.ai.saving.length}
                      </Badge>
                    )}
                  </div>
                  <Button variant="ghost" size="sm" className="text-primary">
                    <Eye className="h-4 w-4 mr-1" />
                    Ko'rish
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );

  const ReceiptDetails = ({ receipt }: { receipt: Receipt }) => (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <Button 
          variant="ghost" 
          onClick={() => setSelectedReceipt(null)}
        >
          ← Orqaga
        </Button>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Edit className="h-4 w-4 mr-1" />
            Tahrirlash
          </Button>
          <Button variant="outline" size="sm">
            <Share className="h-4 w-4 mr-1" />
            Ulashish
          </Button>
        </div>
      </div>

      {/* Receipt Header */}
      <Card className="card-elevated">
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-xl">{receipt.market.name}</CardTitle>
              <div className="flex items-center gap-4 text-muted-foreground mt-1">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {receipt.market.city}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {formatDate(receipt.date)}
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-expense">
                {formatCurrency(receipt.totalUZS)}
              </p>
              <p className="text-muted-foreground">
                {receipt.items.length} ta mahsulot
              </p>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Items Table */}
      <Card className="card-soft">
        <CardHeader>
          <CardTitle className="text-lg">Xarid qilingan mahsulotlar</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-border">
                <tr className="text-left text-sm text-muted-foreground">
                  <th className="p-4">Mahsulot</th>
                  <th className="p-4">Soni</th>
                  <th className="p-4">Narxi</th>
                  <th className="p-4">Jami</th>
                  <th className="p-4">Kategoriya</th>
                </tr>
              </thead>
              <tbody>
                {receipt.items.map((item) => (
                  <tr key={item.id} className="border-b border-border last:border-0">
                    <td className="p-4">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        {item.nutrition && (
                          <p className="text-xs text-muted-foreground">
                            {item.nutrition.kcal && `${item.nutrition.kcal} kcal`}
                            {item.nutrition.protein_g && ` • ${item.nutrition.protein_g}g protein`}
                          </p>
                        )}
                      </div>
                    </td>
                    <td className="p-4">{item.quantity}</td>
                    <td className="p-4">{formatCurrency(item.unitPrice)}</td>
                    <td className="p-4 font-semibold text-expense">
                      {formatCurrency(item.total)}
                    </td>
                    <td className="p-4">
                      <Badge variant="outline" className="text-xs">
                        {item.category}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* AI Suggestions */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Health Tips */}
        <Card className="card-soft border-l-4 border-l-health">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <div className="p-1 bg-health/10 rounded">
                <Users className="h-4 w-4 text-health" />
              </div>
              Sog'liq maslahatlari
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {receipt.ai.health.map((tip, index) => (
              <div key={index} className="p-3 bg-health/5 rounded-lg border border-health/10">
                <p className="text-sm">{tip}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Saving Tips */}
        <Card className="card-soft border-l-4 border-l-expense">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <div className="p-1 bg-expense/10 rounded">
                <Users className="h-4 w-4 text-expense" />
              </div>
              Tejash maslahatlari
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {receipt.ai.saving.map((tip, index) => (
              <div key={index} className="p-3 bg-expense/5 rounded-lg border border-expense/10">
                <p className="text-sm">{tip}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* AI Chef Suggestions */}
      <Card className="card-elevated">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <ChefHat className="h-5 w-5 text-primary" />
            AI Chef tavsiyalari
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {mockRecipes.slice(0, 2).map((recipe) => (
              <div key={recipe.id} className="p-4 bg-muted/30 rounded-xl border">
                <div className="space-y-3">
                  <h4 className="font-semibold">{recipe.title}</h4>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {recipe.prepTime}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {recipe.kcal} kcal
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {recipe.difficulty}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Mavjud mahsulotlar:</p>
                    <div className="flex flex-wrap gap-1">
                      {recipe.matchedItems.map((item, index) => (
                        <Badge key={index} className="chip-expense text-xs">
                          ✓ {item.split(',')[0]}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <Button size="sm" variant="outline" className="w-full">
                    Retseptni ko'rish
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="space-y-6">
      {selectedReceipt ? (
        <ReceiptDetails receipt={selectedReceipt} />
      ) : (
        <>
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Cheklar</h1>
            <Button className="btn-primary">
              <QrCode className="h-4 w-4 mr-2" />
              Yangi skan
            </Button>
          </div>
          <ReceiptsList />
        </>
      )}
    </div>
  );
};

export default Receipts;