import { Skeleton } from "@/components/ui/skeleton";

export default function InvestLoading() {
  return (
    <div className="min-h-screen">
      <Skeleton className="h-[85vh] w-full" />
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <Skeleton className="h-6 w-full" />
        <Skeleton className="mt-3 h-6 w-3/4" />
        <Skeleton className="mt-3 h-6 w-1/2" />
      </div>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-48 rounded-xl" />
          ))}
        </div>
      </div>
    </div>
  );
}
