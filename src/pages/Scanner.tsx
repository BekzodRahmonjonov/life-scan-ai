import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Camera, Upload, CheckCircle, AlertCircle, QrCode } from 'lucide-react';
import { mockReceipts, formatCurrency, formatDate } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';

const Scanner: React.FC = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [scannedReceipt, setScannedReceipt] = useState<typeof mockReceipts[0] | null>(null);
  const { toast } = useToast();

  const handleScanStart = () => {
    setIsScanning(true);
    
    // Simulate scanning process
    setTimeout(() => {
      setIsScanning(false);
      setScannedReceipt(mockReceipts[0]);
      toast({
        title: "Chek muvaffaqiyatli skanerlandi!",
        description: "Ma'lumotlar avtomatik saqlandi.",
      });
    }, 2000);
  };

  const handleUpload = () => {
    // Simulate file upload
    setScannedReceipt(mockReceipts[1]);
    toast({
      title: "Rasm yuklandi!",
      description: "Chek ma'lumotlari qayta ishlandi.",
    });
  };

  if (scannedReceipt) {
    return (
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Chek skanerlandi</h1>
          <Button 
            variant="outline" 
            onClick={() => setScannedReceipt(null)}
          >
            Yangi skan
          </Button>
        </div>

        {/* Scanned Receipt Summary */}
        <Card className="card-elevated">
          <CardHeader className="pb-4">
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-lg">{scannedReceipt.market.name}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  {formatDate(scannedReceipt.date)}
                </p>
              </div>
              <div className="flex items-center gap-2 text-expense">
                <CheckCircle className="h-5 w-5" />
                <span className="font-medium">Tasdiqlandi</span>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 p-4 bg-muted/50 rounded-xl">
              <div>
                <p className="text-sm text-muted-foreground">Jami summa</p>
                <p className="text-2xl font-bold text-expense">
                  {formatCurrency(scannedReceipt.totalUZS)}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Mahsulotlar soni</p>
                <p className="text-2xl font-bold">
                  {scannedReceipt.items.length} ta
                </p>
              </div>
            </div>

            {/* Items Preview */}
            <div className="space-y-2">
              <h4 className="font-medium">Xarid qilingan mahsulotlar:</h4>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {scannedReceipt.items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between py-2 px-3 bg-card rounded-lg border">
                    <div>
                      <p className="font-medium text-sm">{item.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {item.quantity} × {formatCurrency(item.unitPrice)}
                      </p>
                    </div>
                    <p className="font-semibold text-expense">
                      {formatCurrency(item.total)}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Tags */}
            <div className="flex flex-wrap gap-2">
              <span className="chip-health">Sog'liq maslahati: 3 ta</span>
              <span className="chip-expense">Tejash imkoniyati: 2 ta</span>
            </div>

            <div className="flex gap-2 pt-2">
              <Button className="flex-1">
                Tafsilotlarni ko'rish
              </Button>
              <Button variant="outline">
                Tahrirlash
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold">Chekingizni skanerlang</h1>
        <p className="text-muted-foreground">
          QR kod yoki chek rasmini yuklang, ma'lumotlarni avtomatik sarang
        </p>
      </div>

      {/* Scanner Card */}
      <Card className="card-elevated">
        <CardContent className="p-8">
          <div className="text-center space-y-6">
            {isScanning ? (
              <div className="space-y-4 animate-pulse">
                <div className="mx-auto w-20 h-20 bg-primary/20 rounded-2xl flex items-center justify-center">
                  <QrCode className="h-10 w-10 text-primary animate-spin" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Skanerlash...</h3>
                  <p className="text-muted-foreground">
                    Chek ma'lumotlari qayta ishlanmoqda
                  </p>
                </div>
              </div>
            ) : (
              <>
                <div className="mx-auto w-32 h-32 bg-primary/10 rounded-2xl flex items-center justify-center">
                  <QrCode className="h-16 w-16 text-primary" />
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-semibold text-xl">Chekni skanerlash</h3>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    Kameradan foydalanib QR kodni skanerlang yoki chek rasmini yuklang
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 max-w-sm mx-auto">
                  <Button 
                    className="btn-primary flex-1"
                    onClick={handleScanStart}
                    disabled={isScanning}
                  >
                    <Camera className="h-5 w-5 mr-2" />
                    Kamerani ishga tushiring
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={handleUpload}
                  >
                    <Upload className="h-5 w-5 mr-2" />
                    Rasm yuklash
                  </Button>
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Tips Card */}
      <Card className="card-soft">
        <CardContent className="p-6">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-health/10 rounded-lg">
              <AlertCircle className="h-5 w-5 text-health" />
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Maslahat</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• QR kodni yaxshi yoritilgan joyda skanerlang</li>
                <li>• Chek rasmini aniq va to'liq oling</li>
                <li>• Skanerlangan ma'lumotlarni tekshiring</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Scanner;