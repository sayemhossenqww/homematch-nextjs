export default function InspirationsLoading() {
  return (
    <div className="min-h-screen bg-[#05080f] pt-24 pb-20 animate-pulse">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="py-10 mb-8">
          <div className="h-4 w-20 bg-white/8 rounded-full mb-4" />
          <div className="h-12 w-88 bg-white/8 rounded-xl mb-3" />
          <div className="h-4 w-56 bg-white/5 rounded-full" />
        </div>

        {/* Filters */}
        <div className="flex gap-3 mb-8 overflow-hidden">
          {[1,2,3,4,5].map(i => (
            <div key={i} className="h-10 w-24 bg-white/6 rounded-xl shrink-0" />
          ))}
        </div>

        {/* Masonry-style grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[1,2,3,4,5,6,7,8,9].map(i => (
            <div key={i} className="rounded-2xl overflow-hidden"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
              <div className={`bg-white/8 ${i % 3 === 0 ? "h-64" : "h-48"}`} />
              <div className="p-4 space-y-2">
                <div className="h-4 w-3/4 bg-white/8 rounded-lg" />
                <div className="h-3 w-1/2 bg-white/5 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
