import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function NFTCardSkeleton() {
  return (
    <Card>
      <div className="relative h-[300px]">
        <Skeleton
          isRounded={false}
          className="w-full h-full object-cover rounded-t-lg"
        />
      </div>
      <CardContent>
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 p-4">
          <Skeleton className="h-6 w-1/4" />
          <Skeleton
            className="rounded-3xl h-10 w-full sm:w-[66px]"
            isRounded={false}
          />
        </div>
      </CardContent>
    </Card>
  );
}
