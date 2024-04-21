import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function ContractCardSkeleton() {
  return (
    <Card>
      <div className="relative h-[300px]">
        <Skeleton
          isRounded={false}
          className="w-full h-full object-cover rounded-t-lg"
        />
      </div>
      <CardContent>
        <div className="pt-4">
          <Skeleton className="h-4 w-1/2 mt-2" />
          <Skeleton className="h-2 w-full mt-4" />
          <Skeleton className="h-2 w-4/5 mt-2" />
          <Skeleton className="h-2 w-1/2 mt-2" />
        </div>
      </CardContent>
    </Card>
  );
}
