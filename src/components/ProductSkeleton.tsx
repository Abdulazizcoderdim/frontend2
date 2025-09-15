import { Skeleton } from "./ui/skeleton";

const ProductSkeleton = () => {
  return (
    <div className="h-full w-full space-y-3">
      {/* Rasm joyi */}
      <div className="relative h-[270px] flex items-center justify-center rounded-md bg-[#F5F5F5]">
        <Skeleton className="h-44 w-44 rounded-md" />
        <span className="absolute top-3 left-3">
          <Skeleton className="h-6 w-12 rounded-md" />
        </span>
        <span className="absolute top-3 right-3">
          <Skeleton className="h-8 w-8 rounded-full" />
        </span>
        <div className="absolute bottom-0 left-0 right-0 p-2">
          <Skeleton className="h-10 w-full rounded-md" />
        </div>
      </div>

      {/* Title */}
      <Skeleton className="h-5 w-3/4 rounded-md" />

      {/* Narxlar */}
      <div className="flex gap-3">
        <Skeleton className="h-5 w-16 rounded-md" />
        <Skeleton className="h-5 w-16 rounded-md" />
      </div>
    </div>
  );
};

export default ProductSkeleton;
