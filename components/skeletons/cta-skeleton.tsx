export function CTASkeleton() {
  return (
    <section className="relative overflow-hidden py-24 md:py-32" style={{ background: '#F8F8F8' }}>
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 text-center animate-pulse">
        {/* Label skeleton */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="h-px w-8 bg-gray-300" />
          <span className="text-xs font-semibold tracking-[4px] uppercase bg-gray-300 h-4 w-48 rounded" />
          <div className="h-px w-8 bg-gray-300" />
        </div>

        {/* Heading skeleton */}
        <div className="space-y-3 mb-6 mx-auto max-w-lg">
          <div className="h-12 bg-gray-300 rounded w-4/5 mx-auto" />
          <div className="h-12 bg-gray-300 rounded w-3/5 mx-auto" />
        </div>

        {/* Description skeleton */}
        <div className="space-y-2 mb-10 mx-auto max-w-md">
          <div className="h-4 bg-gray-300 rounded w-full" />
          <div className="h-4 bg-gray-300 rounded w-full" />
          <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto" />
        </div>

        {/* CTA buttons skeleton */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <div className="h-12 bg-gray-300 rounded w-40" />
          <div className="h-12 bg-gray-300 rounded w-40" />
        </div>

        {/* Trust badges skeleton */}
        <div className="flex flex-col sm:flex-row justify-center gap-6 pt-8" style={{ borderTop: '1px solid #E5E7EB' }}>
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center justify-center gap-2 bg-gray-200 h-6 w-48 rounded" />
          ))}
        </div>
      </div>
    </section>
  );
}
