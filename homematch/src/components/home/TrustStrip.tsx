import {
  ShieldCheck,
  Star,
  ClipboardList,
  Zap,
  BadgeCheck,
  Building2,
  Award,
  Camera,
} from "lucide-react";

const items = [
  { icon: ShieldCheck,   label: "CaseTrust Certified" },
  { icon: Star,          label: "4.9 / 5 Rating" },
  { icon: ClipboardList, label: "100+ Verified Firms" },
  { icon: Camera,        label: "1,400+ Real Projects" },
  { icon: BadgeCheck,    label: "Always Free for Homeowners" },
  { icon: Zap,           label: "Matched in 24 Hours" },
  { icon: Award,         label: "Govt-Backed Certification" },
  { icon: Building2,     label: "HDB-Registered Firms Only" },
  { icon: ShieldCheck,   label: "Singapore Only" },
];

export default function TrustStrip() {
  const doubled = [...items, ...items];

  return (
    <div
      className="relative overflow-hidden"
      style={{
        background: "rgba(9,22,42,0.97)",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      {/* Edge fade masks */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-20 z-10"
        style={{ background: "linear-gradient(to right, rgba(9,22,42,0.97), transparent)" }} />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-20 z-10"
        style={{ background: "linear-gradient(to left, rgba(9,22,42,0.97), transparent)" }} />

      {/* Scrolling track */}
      <div
        className="flex w-max"
        style={{ animation: "marqueeScroll 40s linear infinite" }}
      >
        {doubled.map(({ icon: Icon, label }, i) => (
          <div key={i} className="flex items-center gap-2 flex-none px-2 py-3.5">
            <div
              className="flex items-center gap-2 px-4 py-2 rounded-full"
              style={{
                background: "rgba(255,255,255,0.07)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                border: "1px solid rgba(255,255,255,0.13)",
              }}
            >
              <div
                className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: "rgba(200,136,31,0.18)" }}
              >
                <Icon className="w-3 h-3" style={{ color: "#c8881f" }} />
              </div>
              <span
                className="text-xs font-semibold whitespace-nowrap"
                style={{ color: "rgba(255,255,255,0.78)" }}
              >
                {label}
              </span>
            </div>

            {/* Dot gap */}
            <div
              className="w-1 h-1 rounded-full flex-shrink-0 mx-1"
              style={{ background: "var(--color-border)" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
