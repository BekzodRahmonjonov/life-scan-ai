import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent } from '@/components/ui/card';

const ReceiptItemSkeleton: React.FC = () => {
  return (
    <Card className="card-soft">
      <CardContent className="p-4">
        <div className="space-y-4">
          {/* Header skeleton */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Skeleton className="h-10 w-10 rounded-lg" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-24" />
              </div>
            </div>
            <div className="text-right space-y-2">
              <Skeleton className="h-5 w-20" />
              <Skeleton className="h-3 w-16" />
            </div>
          </div>

          {/* Items skeleton */}
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-6 w-6 rounded" />
                  <div className="space-y-1">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-3 w-16" />
                  </div>
                </div>
                <Skeleton className="h-4 w-16" />
              </div>
            ))}
          </div>

          {/* Tags skeleton */}
          <div className="flex gap-2">
            <Skeleton className="h-5 w-16 rounded-full" />
            <Skeleton className="h-5 w-14 rounded-full" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReceiptItemSkeleton;