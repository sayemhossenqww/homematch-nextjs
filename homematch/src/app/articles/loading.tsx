export default function ArticlesLoading() {
  return (
    <div className="min-h-screen bg-[#05080f] pt-24 pb-20 animate-pulse">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero skeleton */}
        <div className="py-12 text-center mb-10">
          <div className="h-4 w-20 bg-white/8 rounded-full mx-auto mb-4" />
          <div className="h-12 w-96 bg-white/8 rounded-xl mx-auto mb-3" />
          <div className="h-4 w-64 bg-white/5 rounded-full mx-auto" />
        </div>

        {/* Category tabs skeleton */}
        <div className="flex gap-3 mb-8 overflow-hidden">
          {[1,2,3,4,5].map(i => (
            <div key={i} className="h-9 w-28 bg-white/6 rounded-full shrink-0" />
          ))}
        </div>

        {/* Featured + grid skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Featured */}
          <div className="lg:col-span-5 rounded-2xl overflow-hidden"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
            <div className="h-56 bg-white/8" />
            <div className="p-6 space-y-3">
              <div className="h-5 w-3/4 bg-white/8 rounded-lg" />
              <div className="h-3 w-full bg-white/5 rounded-full" />
              <div className="h-3 w-5/6 bg-white/5 rounded-full" />
            </div>
          </div>
          {/* Grid */}
          <div className="lg:col-span-7 grid grid-cols-2 gap-5">
            {[1,2,3,4].map(i => (
              <div key={i} className="rounded-2xl overflow-hidden"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
                <div className="h-36 bg-white/8" />
                <div className="p-4 space-y-2">
                  <div className="h-4 w-5/6 bg-white/8 rounded-lg" />
                  <div className="h-3 w-full bg-white/5 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
