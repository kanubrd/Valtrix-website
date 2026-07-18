export function TestimonialsSkeleton() {
  return (
    <div style={{ background: '#F8F8F8' }} className="py-20 md:py-28">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
        {/* Section label skeleton */}
        <div className="flex items-center gap-3 mb-6 animate-pulse">
          <div className="h-px w-8 bg-gray-300" />
          <span className="text-xs font-semibold tracking-[4px] uppercase bg-gray-300 h-4 w-40 rounded" />
        </div>

        {/* Heading row skeleton */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-end mb-16 md:mb-20 animate-pulse">
          <div className="space-y-3">
            <div className="h-12 bg-gray-300 rounded w-4/5" />
            <div className="h-12 bg-gray-300 rounded w-3/5" />
          </div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-300 rounded w-full" />
            <div className="h-4 bg-gray-300 rounded w-full" />
            <div className="h-4 bg-gray-300 rounded w-3/4" />
          </div>
        </div>

        {/* Cards skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 animate-pulse">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white border border-gray-200 rounded overflow-hidden">
              <div className="h-52 w-full bg-gray-300" />
              <div className="p-6 space-y-3">
                <div className="h-5 bg-gray-300 rounded w-3/4" />
                <div className="h-4 bg-gray-300 rounded w-full" />
                <div className="h-4 bg-gray-300 rounded w-5/6" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
