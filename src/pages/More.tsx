import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { 
  Globe, 
  DollarSign, 
  Bell, 
  Download, 
  Settings,
  User,
  Shield,
  HelpCircle,
  LogOut,
  Crown
} from 'lucide-react';

const More: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Sozlamalar</h1>
        <Badge variant="outline" className="chip-expense">
          <Crown className="h-3 w-3 mr-1" />
          Premium
        </Badge>
      </div>

      {/* Profile Section */}
      <Card className="card-elevated">
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center">
              <User className="h-8 w-8 text-primary-foreground" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Aziz Foydalanuvchi</h3>
              <p className="text-muted-foreground">Premium a'zo</p>
              <p className="text-sm text-muted-foreground">
                ScanDora dan foydalanish: 15 kun
              </p>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Settings Sections */}
      <div className="space-y-6">
        {/* Language & Currency */}
        <Card className="card-soft">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Globe className="h-5 w-5 text-primary" />
              Til va pul birligi
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Til</p>
                <p className="text-sm text-muted-foreground">Ilova tili</p>
              </div>
              <Button variant="outline" size="sm">
                O'zbek tili
              </Button>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Pul birligi</p>
                <p className="text-sm text-muted-foreground">Narxlar ko'rinishi</p>
              </div>
              <Button variant="outline" size="sm">
                UZS (so'm)
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card className="card-soft">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Bell className="h-5 w-5 text-primary" />
              Bildirishnomalar
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Haftalik xulosa</p>
                <p className="text-sm text-muted-foreground">
                  Har hafta xarajatlar haqida xabar
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Tejash maslahatlari</p>
                <p className="text-sm text-muted-foreground">
                  Pul tejash bo'yicha AI tavsiyalari
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Sog'liq eslatmalari</p>
                <p className="text-sm text-muted-foreground">
                  Sog'lom ovqatlanish maslahatlari
                </p>
              </div>
              <Switch />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Yangi retseptlar</p>
                <p className="text-sm text-muted-foreground">
                  AI Chef dan yangi taomlar
                </p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        {/* Data Management */}
        <Card className="card-soft">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Download className="h-5 w-5 text-primary" />
              Ma'lumotlarni boshqarish
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline" className="w-full justify-start">
              <Download className="h-4 w-4 mr-3" />
              Cheklar CSV da eksport qilish
            </Button>
            
            <Button variant="outline" className="w-full justify-start">
              <Download className="h-4 w-4 mr-3" />
              PDF hisobot yuklab olish
            </Button>
            
            <Button variant="outline" className="w-full justify-start">
              <Shield className="h-4 w-4 mr-3" />
              Ma'lumotlar xavfsizligi
            </Button>
          </CardContent>
        </Card>

        {/* Statistics Overview */}
        <Card className="card-soft">
          <CardHeader>
            <CardTitle className="text-lg">Sizning statistikangiz</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-expense/5 rounded-xl">
                <p className="text-2xl font-bold text-expense">47</p>
                <p className="text-sm text-muted-foreground">Skanerlangan cheklar</p>
              </div>
              <div className="text-center p-3 bg-health/5 rounded-xl">
                <p className="text-2xl font-bold text-health">127</p>
                <p className="text-sm text-muted-foreground">Sog'liq maslahatlari</p>
              </div>
              <div className="text-center p-3 bg-primary/5 rounded-xl">
                <p className="text-2xl font-bold text-primary">89,000</p>
                <p className="text-sm text-muted-foreground">Tejab qolgan so'm</p>
              </div>
              <div className="text-center p-3 bg-accent/50 rounded-xl">
                <p className="text-2xl font-bold">23</p>
                <p className="text-sm text-muted-foreground">Retseptlar tayyorlandi</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Support & About */}
        <Card className="card-soft">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-primary" />
              Yordam va ma'lumot
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="ghost" className="w-full justify-start">
              <HelpCircle className="h-4 w-4 mr-3" />
              Yordam markazi
            </Button>
            
            <Button variant="ghost" className="w-full justify-start">
              <Settings className="h-4 w-4 mr-3" />
              Qo'llab-quvvatlash
            </Button>
            
            <Button variant="ghost" className="w-full justify-start">
              <Shield className="h-4 w-4 mr-3" />
              Maxfiylik siyosati
            </Button>
            
            <div className="pt-4 border-t border-border">
              <Button variant="ghost" className="w-full justify-start text-destructive">
                <LogOut className="h-4 w-4 mr-3" />
                Chiqish
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* App Version */}
        <div className="text-center py-4">
          <p className="text-sm text-muted-foreground">
            ScanDora versiya 1.2.0
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            © 2024 ScanDora. Barcha huquqlar himoyalangan.
          </p>
        </div>
      </div>
    </div>
  );
};

export default More;