export default function FirmsLoading() {
  return (
    <div className="min-h-screen bg-[#05080f] pt-24 pb-20 animate-pulse">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header skeleton */}
        <div className="mb-10 pt-6">
          <div className="h-4 w-24 bg-white/8 rounded-full mb-4" />
          <div className="h-10 w-80 bg-white/8 rounded-xl mb-3" />
          <div className="h-4 w-56 bg-white/5 rounded-full" />
        </div>

        {/* Filter bar skeleton */}
        <div className="flex gap-3 mb-8 overflow-hidden">
          {[1,2,3,4,5,6].map(i => (
            <div key={i} className="h-10 w-28 bg-white/6 rounded-xl shrink-0" />
          ))}
        </div>

        {/* Cards grid skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[1,2,3,4,5,6].map(i => (
            <div key={i} className="rounded-2xl overflow-hidden"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
              <div className="h-44 bg-white/8" />
              <div className="p-5 space-y-3">
                <div className="h-5 w-40 bg-white/8 rounded-lg" />
                <div className="h-3 w-full bg-white/5 rounded-full" />
                <div className="h-3 w-3/4 bg-white/5 rounded-full" />
                <div className="flex gap-2 pt-2">
                  <div className="h-6 w-20 bg-white/6 rounded-full" />
                  <div className="h-6 w-20 bg-white/6 rounded-full" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
