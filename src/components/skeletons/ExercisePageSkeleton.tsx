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

      <div className="space-y-6">
        {[...Array(3)].map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <div className="flex items-start gap-2">
                <Skeleton className="h-7 w-12 flex-shrink-0" />
                <Skeleton className="h-7 w-full" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-md">
                   <Skeleton className="h-6 w-1/4 mb-4" />
                   <Skeleton className="h-10 w-full" />
                </div>
                 <div className="p-4 border rounded-md">
                   <Skeleton className="h-6 w-1/4 mb-4" />
                   <Skeleton className="h-10 w-full" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ExercisePageSkeleton;