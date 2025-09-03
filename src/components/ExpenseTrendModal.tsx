import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X, TrendingUp } from 'lucide-react';

interface ExpenseTrendModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ExpenseTrendModal: React.FC<ExpenseTrendModalProps> = ({ open, onOpenChange }) => {
  // Mock data for current vs previous week
  const currentWeekData = [
    { day: 'Mon', spent: 45000 },
    { day: 'Tue', spent: 32000 },
    { day: 'Wed', spent: 67000 },
    { day: 'Thu', spent: 28000 },
    { day: 'Fri', spent: 89000 },
    { day: 'Sat', spent: 134000 },
    { day: 'Sun', spent: 78000 }
  ];

  const previousWeekData = [
    { day: 'Mon', spent: 38000 },
    { day: 'Tue', spent: 45000 },
    { day: 'Wed', spent: 52000 },
    { day: 'Thu', spent: 35000 },
    { day: 'Fri', spent: 76000 },
    { day: 'Sat', spent: 120000 },
    { day: 'Sun', spent: 65000 }
  ];

  const maxSpent = Math.max(
    ...currentWeekData.map(d => d.spent),
    ...previousWeekData.map(d => d.spent)
  );

  const LineChart = () => (
    <div className="relative h-64 p-6">
      <svg className="w-full h-full" viewBox="0 0 400 200">
        {/* Grid lines */}
        {[0, 50, 100, 150, 200].map((y) => (
          <line
            key={y}
            x1="40"
            y1={y}
            x2="380"
            y2={y}
            stroke="hsl(var(--border))"
            strokeWidth="1"
            opacity="0.3"
          />
        ))}

        {/* Previous week line (slate) */}
        <polyline
          fill="none"
          stroke="hsl(var(--muted-foreground))"
          strokeWidth="2"
          strokeDasharray="5,5"
          points={previousWeekData
            .map((point, index) => 
              `${40 + (index * 50)},${200 - (point.spent / maxSpent) * 160}`
            )
            .join(' ')
          }
        />

        {/* Current week line (indigo) */}
        <polyline
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth="3"
          points={currentWeekData
            .map((point, index) => 
              `${40 + (index * 50)},${200 - (point.spent / maxSpent) * 160}`
            )
            .join(' ')
          }
        />

        {/* Data points - Previous week */}
        {previousWeekData.map((point, index) => (
          <circle
            key={`prev-${index}`}
            cx={40 + (index * 50)}
            cy={200 - (point.spent / maxSpent) * 160}
            r="4"
            fill="hsl(var(--muted-foreground))"
            stroke="hsl(var(--card))"
            strokeWidth="2"
          />
        ))}

        {/* Data points - Current week */}
        {currentWeekData.map((point, index) => (
          <circle
            key={`curr-${index}`}
            cx={40 + (index * 50)}
            cy={200 - (point.spent / maxSpent) * 160}
            r="5"
            fill="hsl(var(--primary))"
            stroke="hsl(var(--card))"
            strokeWidth="2"
          />
        ))}

        {/* X-axis labels */}
        {currentWeekData.map((point, index) => (
          <text
            key={`label-${index}`}
            x={40 + (index * 50)}
            y="215"
            textAnchor="middle"
            fill="hsl(var(--muted-foreground))"
            fontSize="12"
          >
            {point.day}
          </text>
        ))}
      </svg>
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="card-elevated max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Xarajat trendi tahlili
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Legend */}
          <div className="flex items-center justify-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-4 h-0.5 bg-primary"></div>
              <span className="text-sm">Joriy hafta</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-0.5 bg-muted-foreground border-dashed border-b-2"></div>
              <span className="text-sm">O'tgan hafta</span>
            </div>
          </div>

          <LineChart />

          {/* Summary stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-primary/5 rounded-xl border border-primary/20">
              <p className="text-2xl font-bold text-primary">473,000</p>
              <p className="text-xs text-muted-foreground">Joriy hafta</p>
            </div>
            <div className="text-center p-4 bg-muted/20 rounded-xl border">
              <p className="text-2xl font-bold text-muted-foreground">431,000</p>
              <p className="text-xs text-muted-foreground">O'tgan hafta</p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 text-sm">
            <TrendingUp className="h-4 w-4 text-expense" />
            <span className="text-muted-foreground">O'tgan haftaga nisbatan</span>
            <span className="font-semibold text-expense">+9.7% (+42,000 so'm)</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ExpenseTrendModal;