import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const ExercisePageSkeleton = () => {
  return (
    <div>
      <Skeleton className="mb-6 h-9 w-48" />
      <div className="mb-8">
        <Skeleton className="mb-2 h-9 w-3/4" />
        <Skeleton className="h-6 w-1/2" />
      </div>

      {/* Skeleton for a few question cards */}
      <div className="space-y-6">
        {[...Array(3)].map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-7 w-full" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-10 w-full" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ExercisePageSkeleton;