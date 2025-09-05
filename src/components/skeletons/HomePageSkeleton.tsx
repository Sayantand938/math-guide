import { Card, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const HomePageSkeleton = () => {
  return (
    <div>
      <div className="mb-8">
        <Skeleton className="h-9 w-3/4 mb-2" />
        <Skeleton className="h-6 w-1/2" />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {[...Array(6)].map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-6 w-full" />
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default HomePageSkeleton;