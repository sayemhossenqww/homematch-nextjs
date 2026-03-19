"use client";
import { Star, Shield, Quote } from "lucide-react";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ui/ScrollReveal";

const reviews = [
  {
    name: "Priya Rajan", initials: "PR", type: "HDB 5-Room · Sengkang", firm: "Calibrate Design", budget: "S$68K", color: "#c8881f", rating: 5,
    text: "Submitted the form at 9pm on a Tuesday and had a call from the Interior Match team by 10am the next morning. They'd already read my brief and pre-screened the firms. Got matched with 6 excellent firms — ended up choosing Calibrate Design. The renovation was completed beautifully, within budget, and the team was professional throughout. Best part? The entire process was completely free for me as a homeowner.",
  },
  {
    name: "Marcus Tan", initials: "MT", type: "Condo 3BR · Bishan", firm: "Brick & Decor", budget: "S$94K", color: "#60a5fa", rating: 5,
    text: "The CaseTrust assurance was the primary reason I chose Interior Match over other platforms. I'd heard too many horror stories about renovation scams and contractors vanishing mid-project. Knowing every firm is certified gave me real peace of mind before I even picked up the phone. Getting 6 pre-shortlisted firms saved me at least three weeks of research. Brick & Decor delivered everything on time, on budget, and the quality was outstanding.",
  },
  {
    name: "Sharon Lim", initials: "SL", type: "HDB 4-Room · Tampines", firm: "9 Creation", budget: "S$55K", color: "#4ade80", rating: 5,
    text: "As a first-time homeowner, I was completely overwhelmed by the renovation process — I didn't know where to start. Interior Match walked us through every stage, from understanding what questions to ask the designers, to what to look out for in a renovation contract. Designer Kelvin from 9 Creation was incredibly patient with our never-ending questions. Our home looks absolutely beautiful and came in right within our original budget. We couldn't be more grateful.",
  },
  {
    name: "Ivan Ong", initials: "IO", type: "Landed Terrace · Serangoon", firm: "Aestherior", budget: "S$185K", color: "#a78bfa", rating: 5,
    text: "We tested 5 different renovation platforms before committing to Interior Match. The critical difference is the personal human matching — their team actually called us to clarify our style preferences and requirements before sending any firm recommendations. Every other platform just blasts you with cold calls from random firms you never asked for. All 6 firms matched by Interior Match were genuinely relevant. Aestherior exceeded every expectation for our landed terrace.",
  },
  {
    name: "Joanna Koh", initials: "JK", type: "Condo 2BR · Buona Vista", firm: "Areana Creation", budget: "S$78K", color: "#34d399", rating: 5,
    text: "What genuinely surprised me was how precisely the 6 matched firms aligned with our aesthetic vision. Usually with these services you receive random recommendations that miss the brief entirely. It was obvious Interior Match actually read every word of what we wrote and applied real thought to the shortlisting. Areana Creation understood our vision from the very first meeting and delivered a finished home that looks straight out of an architecture magazine. Absolutely love it.",
  },
  {
    name: "Darren Yeo", initials: "DY", type: "HDB 3-Room · Ang Mo Kio", firm: "96 Designers", budget: "S$42K", color: "#fb923c", rating: 5,
    text: "I'll be honest — I was genuinely skeptical that a free service could be this good. Usually 'free' means you're the product, getting sold to advertisers or bombarded with spam forever. Interior Match completely defied my expectations. Renovation done in 8 weeks flat, came in exactly on budget, and I didn't receive a single unsolicited call from any firm I hadn't personally reached out to first. It is, without doubt, the most transparent renovation platform operating in Singapore right now.",
  },
  {
    name: "Alicia Ng", initials: "AN", type: "Condo 4BR · Novena", firm: "Calibrate Design", budget: "S$132K", color: "#c8881f", rating: 5,
    text: "Three of the 6 matched firms were an absolutely perfect fit for our style and budget. We ended up visiting all 6 out of curiosity, and even the less perfect matches were high-quality firms — just not right for our specific brief. We chose Calibrate Design and they delivered a renovation so stunning that visitors think it's from a showroom. Zero regrets. I've since personally recommended Interior Match to four colleagues and every single one of them has had an equally excellent experience.",
  },
  {
    name: "Bernard Chua", initials: "BC", type: "HDB 4-Room · Jurong West", firm: "9 Creation", budget: "S$61K", color: "#60a5fa", rating: 5,
    text: "Interior Match is genuinely the fastest, most reliable way to shortlist interior designers in Singapore — period. No unsolicited cold calls, no spam emails, no high-pressure salespeople — just 6 perfectly curated firms matching your exact needs, delivered to your inbox within 24 hours. I've renovated two homes now. The first time I did it the exhausting old way and wasted almost two months. This time I used Interior Match and had my designer confirmed in under two weeks.",
  },
  {
    name: "Mei Ling Tan", initials: "ML", type: "Landed Semi-D · Bukit Timah", firm: "Aestherior", budget: "S$220K", color: "#4ade80", rating: 5,
    text: "Our final interior designer was one of the 6 firms Interior Match matched us with, and the finished renovation has absolutely exceeded every single expectation we had. The platform team was incredibly responsive throughout the entire process and even helped us understand the contract terms before we put pen to paper. For a project of this scale, having CaseTrust protection combined with the quality of personal matching was completely non-negotiable. Our dream home is finally a reality.",
  },
  {
    name: "Thomas Wee", initials: "TW", type: "Condo Studio · Tanjong Pagar", firm: "Brick & Decor", budget: "S$38K", color: "#a78bfa", rating: 5,
    text: "Even for a relatively compact studio apartment, the Interior Match team took real time to match me correctly rather than throwing the first available firms at me. They clearly understood I had a tight budget along with very specific minimalist taste, and every one of the 6 firms they sent was genuinely appropriate for my brief. I ended up with a dream home on a tight budget, completed three days ahead of schedule. The calibre of service here is what you'd normally expect to pay a consultant for. Remarkable.",
  },
];

// Double the array for seamless marquee loop
const row1 = [...reviews.slice(0, 5), ...reviews.slice(0, 5)];
const row2 = [...reviews.slice(5), ...reviews.slice(5)];

function ReviewCard({ r }: { r: typeof reviews[0] }) {
  return (
    <div
      className="flex-shrink-0 w-80 p-5 flex flex-col relative overflow-hidden"
      style={{
        borderRadius: "16px",
        background: "rgba(255,255,255,0.05)",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.09)",
        boxShadow: "0 4px 24px rgba(0,0,0,0.2)",
        whiteSpace: "normal",
        verticalAlign: "top",
      }}
    >
      {/* Subtle top accent */}
      <div className="absolute top-0 left-0 right-0 h-0.5 rounded-full"
        style={{ background: `linear-gradient(to right, ${r.color}, transparent)` }} />

      {/* Quote + stars */}
      <div className="flex items-start justify-between mb-3">
        <Quote className="w-5 h-5 opacity-25 flex-shrink-0" style={{ color: r.color }} />
        <div className="flex gap-0.5">
          {Array(r.rating).fill(0).map((_, i) => (
            <Star key={i} className="w-3 h-3" style={{ color: "#f59e0b", fill: "#f59e0b" }} />
          ))}
        </div>
      </div>

      {/* Text */}
      <p className="text-sm leading-relaxed flex-1 mb-4" style={{ color: "rgba(255,255,255,0.70)" }}>
        &ldquo;{r.text}&rdquo;
      </p>

      {/* Footer */}
      <div className="flex items-center gap-2.5 pt-3" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-black flex-shrink-0"
          style={{ background: `${r.color}22`, border: `1px solid ${r.color}40`, color: r.color }}>
          {r.initials}
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <p className="font-semibold text-sm text-white leading-tight truncate">{r.name}</p>
            <Shield className="w-3 h-3 flex-shrink-0" style={{ color: "#4ade80" }} />
          </div>
          <p className="text-[10px] truncate" style={{ color: "rgba(255,255,255,0.38)" }}>{r.type}</p>
          <p className="text-[10px] font-semibold" style={{ color: r.color }}>{r.budget} · {r.firm}</p>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="relative overflow-hidden" style={{ background: "var(--color-primary)", paddingTop: "5rem", paddingBottom: "5rem" }}>
      {/* Ambient glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(200,136,31,0.08) 0%, transparent 65%)", filter: "blur(80px)" }} />

      {/* Edge fade masks */}
      <div className="absolute inset-y-0 left-0 w-32 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to right, var(--color-primary), transparent)" }} />
      <div className="absolute inset-y-0 right-0 w-32 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to left, var(--color-primary), transparent)" }} />

      {/* Header */}
      <ScrollReveal direction="up" delay={0.1} className="section-container relative z-10 mb-14">
        <div className="text-center">
          <p className="section-label mb-3">Reviews</p>
          <h2 className="text-section text-white mb-4">Trusted by 3,200+ Singapore Homeowners</h2>
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full mt-2 mb-8"
            style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}>
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((s) => <Star key={s} className="w-4 h-4" style={{ color: "#f59e0b", fill: "#f59e0b" }} />)}
            </div>
            <span className="font-black text-xl text-white">4.9 / 5</span>
            <div className="w-px h-5" style={{ background: "rgba(255,255,255,0.15)" }} />
            <span className="text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>1,247 verified reviews</span>
          </div>
        </div>
      </ScrollReveal>

      {/* Marquee row 1 → left */}
      <ScrollReveal direction="up" delay={0.2} className="mb-4 flex gap-4" style={{ overflow: "hidden" }}>
        <div className="flex gap-4 animate-marquee">
          {row1.map((r, i) => <ReviewCard key={`r1-${i}`} r={r} />)}
        </div>
      </ScrollReveal>

      {/* Marquee row 2 → right (reverse) */}
      <ScrollReveal direction="up" delay={0.3} className="flex gap-4" style={{ overflow: "hidden" }}>
        <div className="flex gap-4 animate-marquee-reverse">
          {row2.map((r, i) => <ReviewCard key={`r2-${i}`} r={r} />)}
        </div>
      </ScrollReveal>

      {/* Platform stats */}
      <div className="section-container relative z-10 mt-12">
        <StaggerContainer delay={0.4} staggerDelay={0.1} className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { value: "4.9 / 5", label: "Average Rating", sub: "from 1,247 verified reviews" },
            { value: "3,200+", label: "Homeowners Matched", sub: "across Singapore since 2020" },
            { value: "100%", label: "CaseTrust Firms", sub: "independently verified" },
            { value: "24 hrs", label: "Avg Match Time", sub: "from submission to 6 matches" },
          ].map(({ value, label, sub }) => (
            <StaggerItem key={label} className="p-5 text-center h-full"
              style={{ borderRadius: "14px", background: "rgba(255,255,255,0.035)", border: "1px solid rgba(255,255,255,0.07)" }}>
              <p className="font-black text-2xl text-white mb-1">{value}</p>
              <p className="font-semibold text-sm text-white mb-0.5">{label}</p>
              <p className="text-[11px]" style={{ color: "rgba(255,255,255,0.35)" }}>{sub}</p>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>

      <style>{`
        @keyframes marquee         { from { transform: translateX(0); }    to { transform: translateX(-50%); } }
        @keyframes marquee-reverse { from { transform: translateX(-50%); } to { transform: translateX(0); }    }
        .animate-marquee         { animation: marquee 45s linear infinite; white-space: nowrap; }
        .animate-marquee-reverse { animation: marquee-reverse 52s linear infinite; white-space: nowrap; }
        .animate-marquee:hover, .animate-marquee-reverse:hover { animation-play-state: paused; }
      `}</style>
    </section>
  );
}
