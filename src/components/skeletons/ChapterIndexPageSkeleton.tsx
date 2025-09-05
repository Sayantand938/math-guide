import { Skeleton } from "@/components/ui/skeleton";

const ChapterIndexPageSkeleton = () => {
    return (
      <div>
        <Skeleton className="h-9 w-40 mb-6" />
        <Skeleton className="h-9 w-3/4 mb-2" />
        <Skeleton className="h-6 w-1/2 mb-8" />
        <div className="flex flex-wrap gap-2">
          <Skeleton className="h-10 w-20 rounded-md" />
          <Skeleton className="h-10 w-20 rounded-md" />
          <Skeleton className="h-10 w-20 rounded-md" />
        </div>
      </div>
    );
};

export default ChapterIndexPageSkeleton;