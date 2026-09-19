
export default function LoadingSkeleton({ count = 8 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <div 
          key={index}
          className="flex flex-col rounded-2xl bg-gray-900/60 border border-gray-800/80 overflow-hidden shadow-lg animate-pulse"
        >
          {/* Poster skeleton */}
          <div className="aspect-[2/3] w-full bg-gray-800/60" />

          {/* Body skeleton */}
          <div className="p-5 space-y-4">
            <div className="h-5 bg-gray-800 rounded-md w-3/4" />
            <div className="flex items-center gap-3">
              <div className="h-4 bg-gray-800 rounded w-16" />
              <div className="h-4 bg-gray-800 rounded w-16" />
            </div>
            <div className="pt-2 border-t border-gray-800">
              <div className="h-10 bg-gray-800/80 rounded-xl w-full" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
