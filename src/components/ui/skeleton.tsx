import { cn } from '@/lib/utils';

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  isRounded?: boolean;
}

function Skeleton({ className, isRounded = true, ...props }: SkeletonProps) {
  return (
    <div
      className={cn(
        'animate-pulse bg-muted',
        { 'rounded-md': isRounded },
        className
      )}
      {...props}
    />
  );
}

export { Skeleton };
