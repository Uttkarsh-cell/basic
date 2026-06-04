import { GameGridSkeleton } from '@/components/ui/Skeleton';

export default function Loading() {
  return (
    <div className="container-page section-padding py-8">
      <div className="skeleton mb-2 h-9 w-48 rounded-lg" />
      <div className="skeleton mb-8 h-4 w-64 rounded-lg" />
      <GameGridSkeleton count={10} />
    </div>
  );
}
