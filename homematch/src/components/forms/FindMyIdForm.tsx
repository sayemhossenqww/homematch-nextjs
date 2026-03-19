"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight, ArrowLeft, CheckCircle2, Check,
  // Timeline
  KeyRound, CalendarClock, CalendarDays, Hourglass, Clock, CalendarCheck,
  // Property
  Building2, Building, Home, LayoutGrid, Hotel, BedDouble, Landmark,
  // Location
  MapPin, Compass, Sun, Wind,
  // Scope
  Hammer, Tv, Utensils, Bed, Droplets, BookOpen, Archive, Coffee,
  // Budget
  BadgeDollarSign, TrendingUp, HelpCircle,
  // Styles
  Palette,
  // Working
  CalendarCheck2, SlidersHorizontal, Lightbulb, ScanSearch, ShieldCheck, MessageSquare, Plus,
  // Language / Special
  Globe, Leaf, Zap, Star,
  // Residents
  Heart, Users, Baby, PersonStanding, Dog, Cat, Bird, Fish, Rabbit, UserRound,
  // Guarantees
  Shield, FileText, BadgePercent,
  // Contact
  User, Phone, Mail, Shuffle, Share2, Ruler,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { PawPrint } from "lucide-react";

// ─── Data ────────────────────────────────────────────────────────────────────

const TIMELINE = [
  { value: "collected", label: "Already Collected",   sub: "Keys are in hand — ready to start",   Icon: KeyRound },
  { value: "1m",        label: "Within 1 Month",      sub: "Getting the keys very soon",           Icon: CalendarCheck },
  { value: "1-3m",      label: "1 – 3 Months",        sub: "Short-term planning phase",            Icon: CalendarDays },
  { value: "3-6m",      label: "3 – 6 Months",        sub: "Medium-term planning",                 Icon: CalendarClock },
  { value: "6-12m",     label: "6 – 12 Months",       sub: "Long-term planning ahead",             Icon: Hourglass },
  { value: "12m+",      label: "More Than 12 Months", sub: "Early research — no rush",             Icon: Clock },
];

const PROP_TYPES = [
  { id: "hdb",    label: "HDB",    sub: "Public housing",            Icon: Building2 },
  { id: "condo",  label: "Condo",  sub: "Private apartment",         Icon: Hotel },
  { id: "landed", label: "Landed", sub: "Terrace, semi-D, bungalow", Icon: Home },
];

const HDB_TYPES    = ["2-Room Flexi", "3-Room", "4-Room", "5-Room", "3Gen (3-Generation)", "Executive Flat"];
const HDB_STATUS   = ["BTO (New)", "Resale", "DBSS"];
const CONDO_TYPES  = ["Studio", "1-Bedroom", "2-Bedroom", "3-Bedroom", "4-Bedroom+", "Penthouse", "Dual-Key"];
const CONDO_STATUS = ["New Launch", "Resale", "Executive Condo (EC)"];
const LANDED_TYPES = ["Terrace / Link House", "Semi-Detached", "Bungalow / Detached", "Cluster House", "Good Class Bungalow"];
const LANDED_STATUS = ["New Build", "Resale Landed", "A&A (Addition & Alteration)"];

// ─── Location ──────────────────────────────────────────────────────────────

const REGIONS = [
  { id: "central",   label: "Central",    sub: "Orchard, Bishan, Novena",       Icon: Building2 },
  { id: "north",     label: "North",      sub: "Woodlands, Yishun, AMK",        Icon: Compass },
  { id: "northeast", label: "North-East", sub: "Sengkang, Punggol, Hougang",    Icon: MapPin },
  { id: "east",      label: "East",       sub: "Tampines, Bedok, Pasir Ris",    Icon: Sun },
  { id: "west",      label: "West",       sub: "Jurong, Clementi, Bukit Batok", Icon: Wind },
];

const DISTRICTS: Record<string, string[]> = {
  central:   ["Orchard / River Valley", "Novena / Thomson", "Bishan / Toa Payoh", "Queenstown / Buona Vista", "Tiong Bahru / Outram", "Holland / Bukit Timah", "Redhill / Alexandra", "Jurong East / IMM", "Dempsey / Tanglin"],
  north:     ["Woodlands", "Yishun", "Sembawang", "Ang Mo Kio", "Admiralty / Canberra", "Mandai"],
  northeast: ["Sengkang", "Punggol", "Hougang", "Serangoon", "Kovan / Lorong Ah Soo", "Buangkok", "Eunos / Aljunied"],
  east:      ["Tampines", "Bedok", "Pasir Ris", "Simei / Changi", "Marine Parade", "Paya Lebar", "Geylang / Macpherson", "Loyang / Changi Village"],
  west:      ["Jurong West", "Jurong East", "Boon Lay / Pioneer", "Bukit Batok / Bukit Gombak", "Choa Chu Kang", "Clementi", "Bukit Panjang", "Tengah (New Town)"],
};

// ─── Scope ─────────────────────────────────────────────────────────────────

const PROPERTY_SIZES = [
  { value: "under700",  label: "Under 700 sqft",      sub: "Studio / 2-room compact" },
  { value: "700-900",   label: "700 – 900 sqft",      sub: "3-room HDB typical" },
  { value: "900-1100",  label: "900 – 1,100 sqft",    sub: "4-room HDB typical" },
  { value: "1100-1400", label: "1,100 – 1,400 sqft",  sub: "5-room HDB / mid condo" },
  { value: "1400-1800", label: "1,400 – 1,800 sqft",  sub: "Large condo / EC" },
  { value: "1800+",     label: "Above 1,800 sqft",    sub: "Landed / penthouse" },
  { value: "unsure",    label: "Not Sure",             sub: "We can help you estimate" },
];

const CONDITIONS = [
  { value: "new",     label: "New / Never Renovated",      sub: "BTO key collection or brand-new launch",   Icon: KeyRound },
  { value: "resale",  label: "Resale — Full Overhaul",     sub: "Gutting and starting completely fresh",     Icon: Hammer },
  { value: "refresh", label: "Existing — Partial Refresh", sub: "Keeping some works, upgrading the rest",    Icon: Palette },
];

const ROOMS = [
  { id: "living",      label: "Living Room",      Icon: Tv },
  { id: "kitchen",     label: "Kitchen",          Icon: Utensils },
  { id: "master-bed",  label: "Master Bedroom",   Icon: BedDouble },
  { id: "bedroom",     label: "Bedroom(s)",       Icon: Bed },
  { id: "master-bath", label: "Master Bathroom",  Icon: Droplets },
  { id: "bathroom",    label: "Common Bathroom",  Icon: Droplets },
  { id: "dining",      label: "Dining Area",      Icon: Coffee },
  { id: "study",       label: "Study / Office",   Icon: BookOpen },
  { id: "balcony",     label: "Balcony / Yard",   Icon: Sun },
  { id: "storage",     label: "Storage / Utility",Icon: Archive },
  { id: "entire",      label: "Entire Home",      Icon: Home },
];

const RENO_TYPES = [
  { value: "full",    label: "Full Renovation",    sub: "Complete overhaul of all rooms",        Icon: Hammer },
  { value: "partial", label: "Partial Renovation", sub: "Selected rooms only",                   Icon: LayoutGrid },
  { value: "refresh", label: "Refresh & Top-up",   sub: "Cosmetic updates, no hacking",          Icon: Palette },
  { value: "aa",      label: "A&A Works",          sub: "Addition & Alteration — structural",    Icon: Plus },
];

const PRIORITIES = [
  "Staying on budget",
  "Meeting the deadline",
  "Premium quality finishes",
  "Maximising space",
  "Clever storage solutions",
  "Child-safe & family-friendly",
  "Easy to clean & maintain",
  "Eco-friendly / sustainable",
  "Smart home integration",
  "Heavy custom carpentry",
  "Open concept layout",
  "Feng Shui compliance",
];

// ─── Budget ────────────────────────────────────────────────────────────────

const BUDGET = [
  { value: "<30k",     label: "Under S$30,000",          sub: "Smaller-scale or selective renovation" },
  { value: "30-50k",   label: "S$30,000 – S$50,000",     sub: "Standard HDB works" },
  { value: "50-70k",   label: "S$50,000 – S$70,000",     sub: "Full renovation, quality finishes" },
  { value: "70-100k",  label: "S$70,000 – S$100,000",    sub: "Premium materials, comprehensive scope" },
  { value: "100-150k", label: "S$100,000 – S$150,000",   sub: "Luxury finishes or larger homes" },
  { value: "150-200k", label: "S$150,000 – S$200,000",   sub: "High-end landed or large condo" },
  { value: "200k+",    label: "Above S$200,000",          sub: "Premium landed or bespoke projects" },
  { value: "unsure",   label: "Not Sure Yet",             sub: "We'll help you set a realistic budget" },
];

const RENO_LOAN = [
  { value: "yes",   label: "Yes — I'm interested in a renovation loan",  Icon: BadgePercent },
  { value: "no",    label: "No — I'll be paying out of pocket",          Icon: Shield },
  { value: "maybe", label: "Maybe — depends on the final quote",         Icon: HelpCircle },
];

// ─── Renovation cost database ────────────────────────────────────────────────

type CR = [number, number]; // cost range [low, high]
interface PropertyCosts { new: CR; resale: CR }

const HDB_COSTS: Record<string, PropertyCosts> = {
  "2-Room Flexi":          { new: [15400,  31600], resale: [28100,  41300]  },
  "3-Room":                { new: [32800,  51500], resale: [42900,  66600]  },
  "4-Room":                { new: [40300,  62300], resale: [55700,  80400]  },
  "5-Room":                { new: [44700,  69800], resale: [64300,  92600]  },
  "3Gen (3-Generation)":   { new: [61300,  93200], resale: [79200, 103500]  },
  "Executive Flat":        { new: [83500, 118200], resale: [83500, 118200]  },
};

const CONDO_COSTS: Record<string, PropertyCosts> = {
  "Studio":      { new: [15400,  37300], resale: [15400,  37300] },
  "1-Bedroom":   { new: [20000,  44000], resale: [38000,  58000] },
  "2-Bedroom":   { new: [24800,  48200], resale: [47900,  71100] },
  "3-Bedroom":   { new: [32200,  68500], resale: [60400,  84100] },
  "4-Bedroom+":  { new: [41700,  72900], resale: [66300,  92400] },
  "Dual-Key":    { new: [38000,  65000], resale: [55000,  80000] },
  "Penthouse":   { new: [122700, 181100], resale: [122700, 181100] },
};

const LANDED_COSTS: Record<string, PropertyCosts> = {
  "Terrace / Link House":    { new: [120000, 200000], resale: [180000, 280000] },
  "Semi-Detached":           { new: [180000, 280000], resale: [250000, 380000] },
  "Bungalow / Detached":     { new: [250000, 400000], resale: [350000, 550000] },
  "Cluster House":           { new: [150000, 250000], resale: [200000, 320000] },
  "Good Class Bungalow":     { new: [500000, 900000], resale: [500000, 900000] },
};

const PARTIAL_COSTS: Record<string, { label: string; low: number; high: number }> = {
  "living":      { label: "Living Room",        low: 8000,  high: 18000 },
  "kitchen":     { label: "Kitchen",            low: 10800, high: 22300 },
  "master-bed":  { label: "Master Bedroom",     low: 5000,  high: 12000 },
  "bedroom":     { label: "Bedroom(s)",         low: 3500,  high:  8500 },
  "master-bath": { label: "Master Bathroom",    low: 4200,  high:  8700 },
  "bathroom":    { label: "Common Bathroom",    low: 3200,  high:  7200 },
  "dining":      { label: "Dining Area",        low: 2500,  high:  6000 },
  "study":       { label: "Study / Office",     low: 2500,  high:  5500 },
  "balcony":     { label: "Balcony / Yard",     low: 1800,  high:  4500 },
  "storage":     { label: "Storage / Utility",  low: 1200,  high:  3000 },
};

// ─── Static cost reference tables ────────────────────────────────────────────

const PARTIAL_TABLE = [
  { label: "1 Bathroom",              low: 4200,  high: 8700  },
  { label: "1 Kitchen",               low: 10800, high: 22300 },
  { label: "1 Kitchen + 2 Bathrooms", low: 18700, high: 31600 },
  { label: "Living Room",             low: 8000,  high: 18000 },
  { label: "Master Bedroom",          low: 5000,  high: 12000 },
  { label: "Bedroom",                 low: 3500,  high: 8500  },
  { label: "Dining Area",             low: 2500,  high: 6000  },
  { label: "Study / Office",          low: 2500,  high: 5500  },
  { label: "Balcony / Yard",          low: 1800,  high: 4500  },
  { label: "Storage / Utility",       low: 1200,  high: 3000  },
];

interface FullRow { label: string; newBto: CR; resale?: CR }

const HDB_TABLE: FullRow[] = [
  { label: "2-Room Flexi",   newBto: [15400,  31600], resale: [28100,  41300]  },
  { label: "3-Room",         newBto: [32800,  51500], resale: [42900,  66600]  },
  { label: "4-Room",         newBto: [40300,  62300], resale: [55700,  80400]  },
  { label: "5-Room",         newBto: [44700,  69800], resale: [64300,  92600]  },
  { label: "3Gen",           newBto: [61300,  93200], resale: [79200, 103500]  },
  { label: "Executive Flat", newBto: [83500, 118200]                           },
  { label: "Maisonette",     newBto: [91200, 134800]                           },
  { label: "Jumbo Flat",     newBto: [101000, 155900]                          },
];

const CONDO_TABLE: FullRow[] = [
  { label: "Studio",     newBto: [15400,  37300]                            },
  { label: "1-Bedroom",  newBto: [20000,  44000], resale: [38000,  58000]  },
  { label: "2-Bedroom",  newBto: [24800,  48200], resale: [47900,  71100]  },
  { label: "3-Bedroom",  newBto: [32200,  68500], resale: [60400,  84100]  },
  { label: "4-Bedroom+", newBto: [41700,  72900], resale: [66300,  92400]  },
  { label: "Dual-Key",   newBto: [38000,  65000], resale: [55000,  80000]  },
  { label: "Loft",       newBto: [40200,  53200]                            },
  { label: "Penthouse",  newBto: [122700, 181100]                           },
];

const LANDED_TABLE: FullRow[] = [
  { label: "Terrace / Link House",  newBto: [120000, 200000], resale: [180000, 280000] },
  { label: "Semi-Detached",         newBto: [180000, 280000], resale: [250000, 380000] },
  { label: "Bungalow / Detached",   newBto: [250000, 400000], resale: [350000, 550000] },
  { label: "Cluster House",         newBto: [150000, 250000], resale: [200000, 320000] },
  { label: "Good Class Bungalow",   newBto: [500000, 900000]                           },
];

function fmtSGD(n: number) {
  return "S$" + n.toLocaleString("en-SG");
}
function fmtRange(low: number, high: number) {
  return `${fmtSGD(low)} – ${fmtSGD(high)}`;
}

// Column header pill
function ColHead({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-3 py-2 text-center text-[11px] font-black uppercase tracking-widest rounded-lg"
      style={{ background: "rgba(200,136,31,0.14)", color: "#c8881f", border: "1px solid rgba(200,136,31,0.22)" }}>
      {children}
    </div>
  );
}

// Section divider
function TableSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-5">
      <div className="flex items-center gap-2 mb-2">
        <span className="h-px flex-1" style={{ background: "rgba(255,255,255,0.07)" }} />
        <span className="text-[11px] font-black uppercase tracking-widest text-white/35 shrink-0">{title}</span>
        <span className="h-px flex-1" style={{ background: "rgba(255,255,255,0.07)" }} />
      </div>
      {children}
    </div>
  );
}

function CostEstimatePanel() {
  const [open, setOpen] = useState(false);

  return (
    <div className="mb-8 rounded-2xl overflow-hidden"
      style={{ border: "1px solid rgba(200,136,31,0.2)", background: "rgba(200,136,31,0.04)" }}>

      {/* Toggle header */}
      <button type="button" onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-5 py-4 text-left transition-colors hover:bg-white/[0.02]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: "rgba(200,136,31,0.15)", border: "1px solid rgba(200,136,31,0.25)" }}>
            <TrendingUp className="w-4.5 h-4.5 text-[#c8881f]" />
          </div>
          <div>
            <p className="text-sm font-bold text-white">Average Renovation Costs in Singapore</p>
            <p className="text-xs text-white/40 mt-0.5">2024–2025 market rates · all property types</p>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0 ml-4">
          <span className="text-xs font-semibold text-[#c8881f]/80 hidden sm:block">
            {open ? "Hide" : "See full breakdown"}
          </span>
          <div className="w-7 h-7 rounded-lg flex items-center justify-center"
            style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}>
            <ArrowRight className={`w-3.5 h-3.5 text-white/40 transition-transform duration-200 ${open ? "rotate-90" : ""}`} />
          </div>
        </div>
      </button>

      {/* Full table body */}
      {open && (
        <div className="px-5 pb-6 border-t" style={{ borderColor: "rgba(200,136,31,0.14)" }}>
          <div className="pt-5 space-y-6">

            {/* ── Partial Renovation ── */}
            <TableSection title="Partial Renovation">
              {/* Header */}
              <div className="grid grid-cols-2 gap-2 mb-1.5">
                <ColHead>Room / Area</ColHead>
                <ColHead>New/BTO or Resale</ColHead>
              </div>
              {/* Rows */}
              <div className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.07)" }}>
                {PARTIAL_TABLE.map((row, i) => (
                  <div key={row.label}
                    className="grid grid-cols-2 items-center"
                    style={{ background: i % 2 === 0 ? "rgba(255,255,255,0.025)" : "rgba(255,255,255,0.012)", borderTop: i > 0 ? "1px solid rgba(255,255,255,0.05)" : "none" }}>
                    <div className="px-4 py-2.5">
                      <p className="text-xs font-semibold text-white/75">{row.label}</p>
                    </div>
                    <div className="px-4 py-2.5 text-right">
                      <p className="text-xs tabular-nums font-semibold text-white/65">{fmtRange(row.low, row.high)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </TableSection>

            {/* ── Full Renovation — HDB ── */}
            <TableSection title="Full Renovation — HDB">
              <div className="grid grid-cols-3 gap-2 mb-1.5">
                <ColHead>Flat Type</ColHead>
                <ColHead>New / BTO</ColHead>
                <ColHead>Resale</ColHead>
              </div>
              <div className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.07)" }}>
                {HDB_TABLE.map((row, i) => (
                  <div key={row.label}
                    className="grid items-center"
                    style={{
                      gridTemplateColumns: row.resale ? "1fr 1fr 1fr" : "1fr 2fr",
                      background: i % 2 === 0 ? "rgba(255,255,255,0.025)" : "rgba(255,255,255,0.012)",
                      borderTop: i > 0 ? "1px solid rgba(255,255,255,0.05)" : "none",
                    }}>
                    <div className="px-4 py-2.5">
                      <p className="text-xs font-semibold text-white/75">{row.label}</p>
                    </div>
                    {row.resale ? (
                      <>
                        <div className="px-4 py-2.5 text-right border-l" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                          <p className="text-xs tabular-nums text-white/65">{fmtRange(...row.newBto)}</p>
                        </div>
                        <div className="px-4 py-2.5 text-right border-l" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                          <p className="text-xs tabular-nums text-white/65">{fmtRange(...row.resale)}</p>
                        </div>
                      </>
                    ) : (
                      <div className="px-4 py-2.5 text-center border-l" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                        <p className="text-xs tabular-nums text-white/65">{fmtRange(...row.newBto)}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </TableSection>

            {/* ── Full Renovation — Condo ── */}
            <TableSection title="Full Renovation — Condo">
              <div className="grid grid-cols-3 gap-2 mb-1.5">
                <ColHead>Unit Type</ColHead>
                <ColHead>New / Launch</ColHead>
                <ColHead>Resale</ColHead>
              </div>
              <div className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.07)" }}>
                {CONDO_TABLE.map((row, i) => (
                  <div key={row.label}
                    className="grid items-center"
                    style={{
                      gridTemplateColumns: row.resale ? "1fr 1fr 1fr" : "1fr 2fr",
                      background: i % 2 === 0 ? "rgba(255,255,255,0.025)" : "rgba(255,255,255,0.012)",
                      borderTop: i > 0 ? "1px solid rgba(255,255,255,0.05)" : "none",
                    }}>
                    <div className="px-4 py-2.5">
                      <p className="text-xs font-semibold text-white/75">{row.label}</p>
                    </div>
                    {row.resale ? (
                      <>
                        <div className="px-4 py-2.5 text-right border-l" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                          <p className="text-xs tabular-nums text-white/65">{fmtRange(...row.newBto)}</p>
                        </div>
                        <div className="px-4 py-2.5 text-right border-l" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                          <p className="text-xs tabular-nums text-white/65">{fmtRange(...row.resale)}</p>
                        </div>
                      </>
                    ) : (
                      <div className="px-4 py-2.5 text-center border-l" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                        <p className="text-xs tabular-nums text-white/65">{fmtRange(...row.newBto)}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </TableSection>

            {/* ── Full Renovation — Landed ── */}
            <TableSection title="Full Renovation — Landed">
              <div className="grid grid-cols-3 gap-2 mb-1.5">
                <ColHead>Property Type</ColHead>
                <ColHead>New Build</ColHead>
                <ColHead>Resale</ColHead>
              </div>
              <div className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.07)" }}>
                {LANDED_TABLE.map((row, i) => (
                  <div key={row.label}
                    className="grid items-center"
                    style={{
                      gridTemplateColumns: row.resale ? "1fr 1fr 1fr" : "1fr 2fr",
                      background: i % 2 === 0 ? "rgba(255,255,255,0.025)" : "rgba(255,255,255,0.012)",
                      borderTop: i > 0 ? "1px solid rgba(255,255,255,0.05)" : "none",
                    }}>
                    <div className="px-4 py-2.5">
                      <p className="text-xs font-semibold text-white/75">{row.label}</p>
                    </div>
                    {row.resale ? (
                      <>
                        <div className="px-4 py-2.5 text-right border-l" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                          <p className="text-xs tabular-nums text-white/65">{fmtRange(...row.newBto)}</p>
                        </div>
                        <div className="px-4 py-2.5 text-right border-l" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                          <p className="text-xs tabular-nums text-white/65">{fmtRange(...row.resale)}</p>
                        </div>
                      </>
                    ) : (
                      <div className="px-4 py-2.5 text-center border-l" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                        <p className="text-xs tabular-nums text-white/65">{fmtRange(...row.newBto)}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </TableSection>

            {/* Methodology note */}
            <div className="flex items-start gap-2.5 pt-1">
              <HelpCircle className="w-3.5 h-3.5 text-[#c8881f]/50 shrink-0 mt-0.5" />
              <p className="text-[11px] text-white/30 leading-relaxed">
                <span className="text-white/45 font-semibold">Methodology: </span>
                Estimates are derived by analysing current material and labour costs, accounting for inflation, and applying a 15% industry-standard profit margin. Costs vary by design complexity, finishes, and contractor. Use as a planning guide only.
              </p>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}

// ─── Matching ──────────────────────────────────────────────────────────────

const STYLES = [
  { id: "minimalist",       label: "Minimalist",       sub: "Clean, pure lines",        img: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop&q=75" },
  { id: "industrial",       label: "Industrial",       sub: "Raw, urban, exposed",      img: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=400&h=300&fit=crop&q=75" },
  { id: "scandinavian",     label: "Scandinavian",     sub: "Light, airy, natural",     img: "https://images.unsplash.com/photo-1555041469-149b1b06d585?w=400&h=300&fit=crop&q=75" },
  { id: "eclectic",         label: "Eclectic",         sub: "Bold, mixed styles",       img: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=400&h=300&fit=crop&q=75" },
  { id: "contemporary",     label: "Contemporary",     sub: "Modern & sleek",           img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=300&fit=crop&q=75" },
  { id: "muji",             label: "Muji / Japandi",   sub: "Zen & refined simplicity", img: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=400&h=300&fit=crop&q=75" },
  { id: "modern-victorian", label: "Modern Victorian", sub: "Classic meets modern",     img: "https://images.unsplash.com/photo-1600210491892-03d54c159d8e?w=400&h=300&fit=crop&q=75" },
  { id: "luxury",           label: "Luxury",           sub: "Opulent, premium feel",    img: "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=400&h=300&fit=crop&q=75" },
  { id: "mid-century",      label: "Mid Century",      sub: "Retro-modern forms",       img: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=400&h=300&fit=crop&q=75" },
  { id: "other",            label: "Other",            sub: "Tell us your style",       img: "" },
];

const WORKING_STYLES = [
  { id: "schedule",     label: "Accommodate to my schedule",        Icon: CalendarCheck2 },
  { id: "needs",        label: "Accommodate to my specific needs",  Icon: SlidersHorizontal },
  { id: "creative",     label: "Propose out-of-the-box ideas",      Icon: Lightbulb },
  { id: "ocd",          label: "Somewhat OCD — detail oriented",    Icon: ScanSearch },
  { id: "assurance",    label: "Provides assurance along the way",  Icon: ShieldCheck },
  { id: "communicator", label: "Straightforward communicator",      Icon: MessageSquare },
  { id: "other",        label: "Other",                             Icon: Plus },
];

const LANGUAGES = [
  { id: "english",  label: "English",   sub: "" },
  { id: "mandarin", label: "Mandarin",  sub: "普通话" },
  { id: "malay",    label: "Malay",     sub: "Bahasa" },
  { id: "tamil",    label: "Tamil",     sub: "தமிழ்" },
  { id: "any",      label: "No Preference", sub: "Any language is fine" },
];

const SPECIAL_REQS = [
  "Feng Shui compliance",
  "Child-safe design",
  "Elderly / mobility-friendly",
  "Pet-friendly materials",
  "Eco / sustainable materials",
  "Smart home integration",
  "Heavy custom carpentry",
  "Universal Design (UD)",
  "Maximise storage",
  "Open-concept layout",
  "Hacking / structural works",
  "False ceiling works",
];

const ID_EXPERIENCE = [
  { value: "none", label: "Haven't spoken to anyone yet",  sub: "You're my very first step",              Icon: Star },
  { value: "few",  label: "Spoken to 1–2 ID firms",        sub: "Still exploring and comparing",          Icon: Users },
  { value: "many", label: "Spoken to 3+ ID firms",         sub: "Looking for the right fit",              Icon: SlidersHorizontal },
  { value: "bad",  label: "Had a bad experience before",   sub: "Starting fresh — need a reliable firm",  Icon: ShieldCheck },
];

const RESIDENTS = [
  { id: "partner",   label: "Partner",      Icon: Heart },
  { id: "housemate", label: "Housemate",    Icon: Users },
  { id: "kids",      label: "Kids",         Icon: Baby },
  { id: "seniors",   label: "Seniors",      Icon: PersonStanding },
  { id: "pets",      label: "Pets",         Icon: PawPrint },
  { id: "myself",    label: "Just Myself",  Icon: UserRound },
  { id: "other",     label: "Other",        Icon: Plus },
];

const PETS = [
  { id: "dog",    label: "Dog",       Icon: Dog },
  { id: "cat",    label: "Cat",       Icon: Cat },
  { id: "bird",   label: "Bird",      Icon: Bird },
  { id: "fish",   label: "Fish",      Icon: Fish },
  { id: "rabbit", label: "Rabbit",    Icon: Rabbit },
  { id: "other",  label: "Other Pet", Icon: Plus },
];

const GUARANTEES = [
  { id: "assurance", label: "Safest-Smartest Assurance", badge: "Free", Icon: Shield,       desc: "Vetted & verified renovators only" },
  { id: "contract",  label: "Contract Review",           badge: "Free", Icon: FileText,     desc: "We review your renovation contract" },
  { id: "loan",      label: "Reno Loan Guide",           badge: null,   Icon: BadgePercent, desc: "Best renovation loan for your project" },
];

// ─── Contact config ─────────────────────────────────────────────────────────

const CONTACT_TIMES = [
  "Morning (9am – 12pm)",
  "Afternoon (12pm – 5pm)",
  "Evening (5pm – 9pm)",
  "Weekends only",
  "Anytime is fine",
];

const REFERRAL_SOURCES = [
  "Google Search",
  "Instagram / Facebook",
  "Friend / Referral",
  "HDB / CPF Website",
  "Property Agent",
  "Straits Times / Media",
  "YouTube",
  "TikTok",
  "Other",
];

// ─── Types ───────────────────────────────────────────────────────────────────

interface FormData {
  // Step 1 — Timeline
  timeline: string;
  // Step 2 — Property
  propertyType: string;
  hdbType: string; hdbStatus: string;
  condoType: string; condoStatus: string;
  landedType: string; landedStatus: string;
  region: string; district: string;
  // Step 3 — Scope
  propertySize: string;
  condition: string;
  rooms: string[];
  renoType: string;
  priorities: string[];
  // Step 4 — Budget
  budget: string;
  renoLoan: string;
  // Step 5 — Matching
  wantsOptional: boolean | null;
  styles: string[]; styleOther: string;
  workingStyles: string[]; workingStyleOther: string;
  languages: string[];
  specialReqs: string[];
  idExperience: string;
  residents: string[]; residentsOther: string;
  pets: string[]; petOther: string;
  guarantees: string[];
  // Step 6 — Contact
  name: string; email: string; whatsapp: string;
  contactTime: string;
  referralSource: string;
}

const INIT: FormData = {
  timeline: "", propertyType: "",
  hdbType: "", hdbStatus: "", condoType: "", condoStatus: "", landedType: "", landedStatus: "",
  region: "", district: "",
  propertySize: "", condition: "", rooms: [], renoType: "", priorities: [],
  budget: "", renoLoan: "",
  wantsOptional: null,
  styles: [], styleOther: "", workingStyles: [], workingStyleOther: "",
  languages: [], specialReqs: [], idExperience: "",
  residents: [], residentsOther: "", pets: [], petOther: "", guarantees: [],
  name: "", email: "", whatsapp: "", contactTime: "", referralSource: "",
};

function toggle2(arr: string[], val: string): string[] {
  return arr.includes(val) ? arr.filter(v => v !== val) : arr.length >= 2 ? arr : [...arr, val];
}
function toggle3(arr: string[], val: string): string[] {
  return arr.includes(val) ? arr.filter(v => v !== val) : arr.length >= 3 ? arr : [...arr, val];
}
function toggleN(arr: string[], val: string): string[] {
  return arr.includes(val) ? arr.filter(v => v !== val) : [...arr, val];
}

// ─── UI Primitives ───────────────────────────────────────────────────────────

function RowCard({ Icon, label, sub, selected, onClick, accent = "#c8881f" }: {
  Icon: React.ElementType; label: string; sub?: string;
  selected: boolean; onClick: () => void; accent?: string;
}) {
  return (
    <button type="button" onClick={onClick}
      className="w-full flex items-center gap-4 px-5 py-4 text-left transition-all duration-250 group relative overflow-hidden"
      style={{
        background:   selected ? `${accent}0e` : "rgba(255,255,255,0.025)",
        border:       `1px solid ${selected ? `${accent}40` : "rgba(255,255,255,0.07)"}`,
        borderRadius: 16,
        boxShadow:    selected ? `0 8px 32px ${accent}14, inset 0 1px 0 ${accent}18` : "0 1px 3px rgba(0,0,0,0.2)",
      }}>
      <div className="absolute left-0 top-3 bottom-3 w-[3px] rounded-full transition-all duration-300"
        style={{ background: selected ? `linear-gradient(to bottom, ${accent}, ${accent}60)` : "transparent" }} />
      <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-all duration-250 ml-1"
        style={{
          background: selected ? `linear-gradient(135deg, ${accent}28, ${accent}12)` : "rgba(255,255,255,0.045)",
          border: `1px solid ${selected ? `${accent}28` : "rgba(255,255,255,0.07)"}`,
          boxShadow: selected ? `0 4px 12px ${accent}18` : "none",
        }}>
        <Icon className="w-5 h-5 transition-all duration-250"
          style={{ color: selected ? accent : "rgba(255,255,255,0.38)" }} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold leading-snug transition-colors duration-200"
          style={{ color: selected ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.68)" }}>{label}</p>
        {sub && <p className="text-xs mt-0.5 leading-relaxed"
          style={{ color: selected ? `${accent}99` : "rgba(255,255,255,0.28)" }}>{sub}</p>}
      </div>
      <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition-all duration-200"
        style={{
          background: selected ? accent : "transparent",
          border: `1.5px solid ${selected ? "transparent" : "rgba(255,255,255,0.14)"}`,
          boxShadow: selected ? `0 2px 8px ${accent}50` : "none",
          transform: selected ? "scale(1)" : "scale(0.85)",
        }}>
        {selected && <Check className="w-3 h-3 text-white" strokeWidth={3.5} />}
      </div>
    </button>
  );
}

function SquareCard({ Icon, label, sub, selected, onClick, accent = "#c8881f" }: {
  Icon: React.ElementType; label: string; sub?: string;
  selected: boolean; onClick: () => void; accent?: string;
}) {
  return (
    <button type="button" onClick={onClick}
      className="flex flex-col items-center gap-3 p-4 rounded-2xl text-center transition-all duration-250 group relative"
      style={{
        background:  selected ? `${accent}0e` : "rgba(255,255,255,0.025)",
        border:      `1px solid ${selected ? `${accent}40` : "rgba(255,255,255,0.07)"}`,
        boxShadow:   selected ? `0 8px 28px ${accent}18, inset 0 1px 0 ${accent}18` : "0 1px 3px rgba(0,0,0,0.15)",
        transform:   selected ? "translateY(-1px)" : "translateY(0)",
      }}>
      <div className="w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-250"
        style={{
          background: selected ? `linear-gradient(135deg, ${accent}28, ${accent}12)` : "rgba(255,255,255,0.04)",
          border: `1px solid ${selected ? `${accent}28` : "rgba(255,255,255,0.07)"}`,
          boxShadow: selected ? `0 4px 14px ${accent}20` : "none",
        }}>
        <Icon className="w-5 h-5 transition-all duration-250"
          style={{ color: selected ? accent : "rgba(255,255,255,0.35)" }} />
      </div>
      <div>
        <p className="text-xs font-semibold leading-tight"
          style={{ color: selected ? "white" : "rgba(255,255,255,0.55)" }}>{label}</p>
        {sub && <p className="text-[10px] mt-0.5 leading-tight hidden sm:block"
          style={{ color: selected ? `${accent}80` : "rgba(255,255,255,0.25)" }}>{sub}</p>}
      </div>
      <div className="absolute top-2 right-2 transition-all duration-200"
        style={{ opacity: selected ? 1 : 0, transform: selected ? "scale(1)" : "scale(0.5)" }}>
        <div className="w-4 h-4 rounded-full flex items-center justify-center"
          style={{ background: accent, boxShadow: `0 2px 6px ${accent}60` }}>
          <Check className="w-2.5 h-2.5 text-white" strokeWidth={3.5} />
        </div>
      </div>
    </button>
  );
}

function StyleImageCard({ label, sub, img, selected, onClick, accent = "#c8881f" }: {
  label: string; sub?: string; img?: string;
  selected: boolean; onClick: () => void; accent?: string;
}) {
  return (
    <button type="button" onClick={onClick}
      className="relative overflow-hidden text-left transition-all duration-300 group"
      style={{
        aspectRatio: "4/3",
        borderRadius: 10,
        border: `1.5px solid ${selected ? accent : "rgba(255,255,255,0.09)"}`,
        boxShadow: selected
          ? `0 0 0 3px ${accent}28, 0 12px 40px ${accent}28, 0 4px 16px rgba(0,0,0,0.5)`
          : "0 4px 16px rgba(0,0,0,0.4)",
        transform: selected ? "translateY(-2px) scale(1.01)" : "translateY(0) scale(1)",
      }}>
      {img ? (
        <div className="absolute inset-0 bg-center bg-cover transition-transform duration-700 ease-out group-hover:scale-110"
          style={{ backgroundImage: `url(${img})` }} />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2"
          style={{ background: "linear-gradient(135deg, rgba(200,136,31,0.14) 0%, rgba(30,30,45,0.9) 100%)" }}>
          <Palette className="w-7 h-7" style={{ color: selected ? accent : "rgba(255,255,255,0.25)" }} />
        </div>
      )}
      <div className="absolute inset-0 transition-all duration-300"
        style={{
          background: selected
            ? `linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.35) 50%, ${accent}18 100%)`
            : "linear-gradient(to top, rgba(0,0,0,0.84) 0%, rgba(0,0,0,0.22) 55%, rgba(0,0,0,0.05) 100%)",
        }} />
      <div className="absolute top-0 left-0 right-0 h-[2px] transition-all duration-300"
        style={{
          opacity: selected ? 1 : 0,
          background: `linear-gradient(90deg, transparent, ${accent}, #e8a83f, ${accent}, transparent)`,
        }} />
      <div className="absolute bottom-0 left-0 right-0 px-3 py-2.5">
        <p className="text-[13px] font-bold text-white leading-tight" style={{ textShadow: "0 1px 4px rgba(0,0,0,0.8)" }}>{label}</p>
        {sub && <p className="text-[10px] mt-0.5 hidden sm:block"
          style={{ color: selected ? `${accent}cc` : "rgba(255,255,255,0.45)", textShadow: "0 1px 3px rgba(0,0,0,0.7)" }}>{sub}</p>}
      </div>
      <div className="absolute top-2.5 right-2.5 transition-all duration-250"
        style={{ opacity: selected ? 1 : 0, transform: selected ? "scale(1) rotate(0deg)" : "scale(0.4) rotate(-90deg)" }}>
        <div className="w-6 h-6 rounded-full flex items-center justify-center"
          style={{ background: accent, boxShadow: `0 2px 10px ${accent}80, 0 0 0 2px rgba(255,255,255,0.2)` }}>
          <Check className="w-3.5 h-3.5 text-white" strokeWidth={3.5} />
        </div>
      </div>
    </button>
  );
}

function PillChip({ Icon, label, selected, onClick, accent = "#c8881f" }: {
  Icon?: React.ElementType; label: string; selected: boolean; onClick: () => void; accent?: string;
}) {
  return (
    <button type="button" onClick={onClick}
      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200"
      style={{
        background:  selected ? `${accent}16` : "rgba(255,255,255,0.04)",
        border:      `1px solid ${selected ? `${accent}45` : "rgba(255,255,255,0.08)"}`,
        color:       selected ? "white" : "rgba(255,255,255,0.5)",
        boxShadow:   selected ? `0 2px 8px ${accent}18` : "none",
      }}>
      {Icon && <Icon className="w-3.5 h-3.5 shrink-0" style={{ color: selected ? accent : "rgba(255,255,255,0.35)" }} />}
      {label}
      {selected && <Check className="w-3 h-3 ml-0.5 shrink-0" style={{ color: accent }} strokeWidth={3} />}
    </button>
  );
}

function OtherTextInput({ value, onChange, placeholder = "Please specify…" }: { value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
      className="mt-3 w-full px-4 py-3 rounded-xl text-sm text-white placeholder-white/20 outline-none transition-all"
      style={{ background: "rgba(200,136,31,0.05)", border: "1px solid rgba(200,136,31,0.22)", boxShadow: "inset 0 1px 3px rgba(0,0,0,0.2)" }} />
  );
}

function SectionTitle({ Icon, children }: { Icon: React.ElementType; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2.5 mb-5">
      <div className="w-6 h-6 rounded-md flex items-center justify-center shrink-0"
        style={{ background: "rgba(200,136,31,0.14)", border: "1px solid rgba(200,136,31,0.2)" }}>
        <Icon className="w-3 h-3 text-[#c8881f]" />
      </div>
      <p className="text-[11px] font-black uppercase tracking-[0.2em] text-white/40">{children}</p>
    </div>
  );
}

function StepHead({ Icon, title, sub }: { Icon: React.ElementType; title: string; sub?: string }) {
  return (
    <div className="mb-8">
      <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5 relative"
        style={{
          background: "linear-gradient(135deg, rgba(200,136,31,0.18), rgba(200,136,31,0.06))",
          border: "1px solid rgba(200,136,31,0.22)",
          boxShadow: "0 8px 32px rgba(200,136,31,0.15)",
        }}>
        <Icon className="w-5.5 h-5.5 text-[#c8881f]" style={{ width: 22, height: 22 }} />
      </div>
      <h2 className="text-[22px] font-black text-white leading-snug tracking-tight">{title}</h2>
      {sub && <p className="text-sm text-white/40 mt-2 leading-relaxed">{sub}</p>}
    </div>
  );
}

// ─── Progress ────────────────────────────────────────────────────────────────

const STEP_META = [
  { label: "Timeline", Icon: CalendarDays },
  { label: "Property", Icon: Home },
  { label: "Scope",    Icon: LayoutGrid },
  { label: "Budget",   Icon: BadgeDollarSign },
  { label: "Matching", Icon: Shuffle },
  { label: "Contact",  Icon: Mail },
];

function Progress({ step }: { step: number }) {
  return (
    <div className="mb-9">
      <div className="flex items-center">
        {STEP_META.map((s, i) => {
          const done   = i < step;
          const active = i === step;
          const SIcon  = s.Icon;
          return (
            <div key={s.label} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center gap-1.5 shrink-0">
                <div className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-400 relative"
                  style={{
                    background: done ? "linear-gradient(135deg, #c8881f, #e8a83f)" : active ? "rgba(200,136,31,0.12)" : "rgba(255,255,255,0.04)",
                    border: done ? "none" : active ? "1.5px solid rgba(200,136,31,0.55)" : "1px solid rgba(255,255,255,0.08)",
                    boxShadow: done ? "0 4px 14px rgba(200,136,31,0.35)" : active ? "0 0 0 4px rgba(200,136,31,0.08)" : "none",
                  }}>
                  {done
                    ? <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
                    : <SIcon className="w-3.5 h-3.5" style={{ color: active ? "#c8881f" : "rgba(255,255,255,0.18)" }} />}
                </div>
                <span className="text-[9px] font-bold uppercase tracking-widest hidden sm:block"
                  style={{ color: done ? "rgba(200,136,31,0.55)" : active ? "#c8881f" : "rgba(255,255,255,0.18)" }}>
                  {s.label}
                </span>
              </div>
              {i < STEP_META.length - 1 && (
                <div className="flex-1 h-px mx-2 mb-4 sm:mb-[18px] relative overflow-hidden rounded-full"
                  style={{ background: "rgba(255,255,255,0.07)" }}>
                  <div className="absolute inset-y-0 left-0 transition-all duration-500 rounded-full"
                    style={{ width: i < step ? "100%" : "0%", background: "linear-gradient(90deg, #c8881f, #e8a83f)" }} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Nav ──────────────────────────────────────────────────────────────────────

function NavBtns({ onBack, onNext, nextLabel = "Continue", disabled, loading }: {
  onBack?: () => void; onNext: () => void; nextLabel?: string; disabled?: boolean; loading?: boolean;
}) {
  return (
    <div className="flex gap-3 mt-8 pt-6" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
      {onBack && (
        <button type="button" onClick={onBack}
          className="flex items-center gap-2 px-5 py-3.5 rounded-xl text-sm font-semibold transition-all duration-200 shrink-0"
          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.09)", color: "rgba(255,255,255,0.45)" }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.06)"; (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.75)"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.03)"; (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.45)"; }}>
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
      )}
      <button type="button" onClick={onNext} disabled={disabled || loading}
        className="flex-1 flex items-center justify-center gap-2.5 py-3.5 rounded-xl font-bold text-sm text-white transition-all duration-200 active:scale-[0.98]"
        style={{
          background: disabled ? "rgba(200,136,31,0.25)" : "linear-gradient(135deg, #c8881f 0%, #e09030 50%, #e8a83f 100%)",
          boxShadow: disabled ? "none" : "0 6px 28px rgba(200,136,31,0.4), inset 0 1px 0 rgba(255,255,255,0.15)",
          opacity: disabled ? 0.5 : 1,
          cursor: disabled ? "not-allowed" : "pointer",
        }}>
        {loading
          ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Finding your matches…</>
          : <>{nextLabel} <ArrowRight className="w-4 h-4" /></>}
      </button>
    </div>
  );
}

// ─── Step 1: Timeline ────────────────────────────────────────────────────────

function S1({ form, set }: { form: FormData; set: (f: FormData) => void }) {
  return (
    <>
      <StepHead Icon={CalendarClock} title="When Do You Get Your Keys?"
        sub="We'll match you with firms ready to work within your timeline." />
      <div className="space-y-2.5">
        {TIMELINE.map(o => (
          <RowCard key={o.value} Icon={o.Icon} label={o.label} sub={o.sub}
            selected={form.timeline === o.value} onClick={() => set({ ...form, timeline: o.value })} />
        ))}
      </div>
    </>
  );
}

// ─── Step 2: Property ────────────────────────────────────────────────────────

function S2({ form, set }: { form: FormData; set: (f: FormData) => void }) {
  const clear = { hdbType: "", hdbStatus: "", condoType: "", condoStatus: "", landedType: "", landedStatus: "" };
  return (
    <>
      <StepHead Icon={Home} title="Your Property"
        sub="Firms are matched based on property type and your location in Singapore." />

      {/* Property type */}
      <div className="grid grid-cols-3 gap-3 mb-8">
        {PROP_TYPES.map(pt => (
          <SquareCard key={pt.id} Icon={pt.Icon} label={pt.label} sub={pt.sub}
            selected={form.propertyType === pt.id}
            onClick={() => set({ ...form, ...clear, propertyType: pt.id })} />
        ))}
      </div>

      {/* Sub-type + status */}
      {form.propertyType === "hdb" && (
        <div className="space-y-6 mb-8 pt-6 border-t border-white/[0.06]">
          <div>
            <SectionTitle Icon={LayoutGrid}>HDB Flat Type</SectionTitle>
            <div className="flex flex-wrap gap-2">
              {HDB_TYPES.map(t => <PillChip key={t} label={t} selected={form.hdbType === t} onClick={() => set({ ...form, hdbType: t })} />)}
            </div>
          </div>
          <div>
            <SectionTitle Icon={Building2}>Property Status</SectionTitle>
            <div className="flex flex-wrap gap-2">
              {HDB_STATUS.map(s => <PillChip key={s} label={s} selected={form.hdbStatus === s} onClick={() => set({ ...form, hdbStatus: s })} />)}
            </div>
          </div>
        </div>
      )}
      {form.propertyType === "condo" && (
        <div className="space-y-6 mb-8 pt-6 border-t border-white/[0.06]">
          <div>
            <SectionTitle Icon={Hotel}>Condo Unit Type</SectionTitle>
            <div className="flex flex-wrap gap-2">
              {CONDO_TYPES.map(t => <PillChip key={t} label={t} selected={form.condoType === t} onClick={() => set({ ...form, condoType: t })} />)}
            </div>
          </div>
          <div>
            <SectionTitle Icon={Building}>Property Status</SectionTitle>
            <div className="flex flex-wrap gap-2">
              {CONDO_STATUS.map(s => <PillChip key={s} label={s} selected={form.condoStatus === s} onClick={() => set({ ...form, condoStatus: s })} />)}
            </div>
          </div>
        </div>
      )}
      {form.propertyType === "landed" && (
        <div className="space-y-6 mb-8 pt-6 border-t border-white/[0.06]">
          <div>
            <SectionTitle Icon={Landmark}>Property Type</SectionTitle>
            <div className="flex flex-wrap gap-2">
              {LANDED_TYPES.map(t => <PillChip key={t} label={t} selected={form.landedType === t} onClick={() => set({ ...form, landedType: t })} />)}
            </div>
          </div>
          <div>
            <SectionTitle Icon={Home}>Property Status</SectionTitle>
            <div className="flex flex-wrap gap-2">
              {LANDED_STATUS.map(s => <PillChip key={s} label={s} selected={form.landedStatus === s} onClick={() => set({ ...form, landedStatus: s })} />)}
            </div>
          </div>
        </div>
      )}

      {/* Location */}
      <div className="pt-6 border-t border-white/[0.06]">
        <SectionTitle Icon={MapPin}>Your Location in Singapore</SectionTitle>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 mb-5">
          {REGIONS.map(r => (
            <SquareCard key={r.id} Icon={r.Icon} label={r.label} sub={r.sub}
              selected={form.region === r.id}
              onClick={() => set({ ...form, region: r.id, district: "" })} />
          ))}
        </div>
        {form.region && (
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/35 mb-3">Specific Area</p>
            <div className="flex flex-wrap gap-2">
              {DISTRICTS[form.region].map(d => (
                <PillChip key={d} label={d} selected={form.district === d} onClick={() => set({ ...form, district: d })} />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

// ─── Step 3: Scope ───────────────────────────────────────────────────────────

function S3({ form, set }: { form: FormData; set: (f: FormData) => void }) {
  return (
    <>
      <StepHead Icon={LayoutGrid} title="Renovation Scope"
        sub="Help firms understand the size and nature of your project." />

      {/* Property condition */}
      <div className="mb-8">
        <SectionTitle Icon={Home}>Current Condition</SectionTitle>
        <div className="space-y-2.5">
          {CONDITIONS.map(c => (
            <RowCard key={c.value} Icon={c.Icon} label={c.label} sub={c.sub}
              selected={form.condition === c.value} onClick={() => set({ ...form, condition: c.value })} />
          ))}
        </div>
      </div>

      {/* Property size */}
      <div className="mb-8">
        <SectionTitle Icon={Ruler}>Property Size</SectionTitle>
        <div className="flex flex-wrap gap-2">
          {PROPERTY_SIZES.map(s => (
            <PillChip key={s.value} label={s.label} selected={form.propertySize === s.value}
              onClick={() => set({ ...form, propertySize: s.value })} />
          ))}
        </div>
      </div>

      {/* Rooms */}
      <div className="mb-8">
        <SectionTitle Icon={LayoutGrid}>Rooms to Renovate — Select all that apply</SectionTitle>
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5">
          {ROOMS.map(r => (
            <SquareCard key={r.id} Icon={r.Icon} label={r.label}
              selected={form.rooms.includes(r.id)}
              onClick={() => set({ ...form, rooms: toggleN(form.rooms, r.id) })} />
          ))}
        </div>
      </div>

      {/* Renovation type */}
      <div className="mb-8">
        <SectionTitle Icon={Hammer}>Renovation Type</SectionTitle>
        <div className="space-y-2.5">
          {RENO_TYPES.map(t => (
            <RowCard key={t.value} Icon={t.Icon} label={t.label} sub={t.sub}
              selected={form.renoType === t.value} onClick={() => set({ ...form, renoType: t.value })} />
          ))}
        </div>
      </div>

      {/* Priorities */}
      <div>
        <SectionTitle Icon={Star}>Your Top Priorities — Select up to 3</SectionTitle>
        <div className="flex flex-wrap gap-2">
          {PRIORITIES.map(p => (
            <PillChip key={p} label={p}
              selected={form.priorities.includes(p)}
              onClick={() => set({ ...form, priorities: toggle3(form.priorities, p) })} />
          ))}
        </div>
      </div>
    </>
  );
}

// ─── Step 4: Budget ───────────────────────────────────────────────────────────

function S4({ form, set }: { form: FormData; set: (f: FormData) => void }) {
  return (
    <>
      <StepHead Icon={BadgeDollarSign} title="What's Your Budget?"
        sub="Indicate your maximum. Receiving itemised quotes from multiple firms lets you make fair comparisons." />

      <CostEstimatePanel />

      <div className="space-y-2.5 mb-8">
        {BUDGET.map((o, i) => {
          const Icon = i === BUDGET.length - 1 ? HelpCircle : TrendingUp;
          return (
            <RowCard key={o.value} Icon={Icon} label={o.label} sub={o.sub}
              selected={form.budget === o.value} onClick={() => set({ ...form, budget: o.value })} />
          );
        })}
      </div>

      {/* Reno loan */}
      <div className="pt-6 border-t border-white/[0.06]">
        <SectionTitle Icon={BadgePercent}>Interested in a Renovation Loan?</SectionTitle>
        <div className="space-y-2.5">
          {RENO_LOAN.map(l => (
            <RowCard key={l.value} Icon={l.Icon} label={l.label}
              selected={form.renoLoan === l.value} onClick={() => set({ ...form, renoLoan: l.value })} />
          ))}
        </div>
      </div>
    </>
  );
}

// ─── Step 5: Matching ────────────────────────────────────────────────────────

function S5({ form, set }: { form: FormData; set: (f: FormData) => void }) {
  const hasPets = form.residents.includes("pets");

  if (form.wantsOptional === null) {
    return (
      <>
        <StepHead Icon={Shuffle} title="Fine-Tune Your Match"
          sub="A few optional questions for more personalised results. Skip any time." />
        <div className="space-y-3">
          <button type="button" onClick={() => set({ ...form, wantsOptional: true })}
            className="w-full flex items-center gap-4 px-6 py-5 rounded-2xl border text-left transition-all group"
            style={{ background: "rgba(200,136,31,0.07)", borderColor: "rgba(200,136,31,0.35)" }}>
            <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: "rgba(200,136,31,0.15)" }}>
              <Shuffle className="w-5 h-5 text-[#c8881f]" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-white">Yes — personalise my matches</p>
              <p className="text-xs text-white/40 mt-0.5">Takes ~2 minutes. Skip any question freely.</p>
            </div>
            <ArrowRight className="w-5 h-5 text-[#c8881f]/60 group-hover:text-[#c8881f] transition-colors shrink-0" />
          </button>
          <button type="button" onClick={() => set({ ...form, wantsOptional: false })}
            className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl border text-left transition-all group hover:border-white/20"
            style={{ background: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.08)" }}>
            <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ background: "rgba(255,255,255,0.05)" }}>
              <ArrowRight className="w-5 h-5 text-white/30 group-hover:text-white/50 transition-colors" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white/60 group-hover:text-white/80 transition-colors">Skip — go to contact details</p>
              <p className="text-xs text-white/30 mt-0.5">You can still get great matches without this.</p>
            </div>
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      <StepHead Icon={Shuffle} title="Fine-Tune Your Match"
        sub="Skip any section that doesn't apply to you." />

      {/* Styles */}
      <div className="mb-8">
        <SectionTitle Icon={Palette}>Preferred Aesthetics — Select up to 2</SectionTitle>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {STYLES.map(s => (
            <StyleImageCard key={s.id} label={s.label} sub={s.sub} img={s.img}
              selected={form.styles.includes(s.id)}
              onClick={() => set({ ...form, styles: toggle2(form.styles, s.id) })} />
          ))}
        </div>
        {form.styles.includes("other") && (
          <OtherTextInput value={form.styleOther} onChange={v => set({ ...form, styleOther: v })} placeholder="Describe your preferred style…" />
        )}
      </div>

      {/* Language */}
      <div className="mb-8">
        <SectionTitle Icon={Globe}>Preferred Language with Your ID</SectionTitle>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
          {LANGUAGES.map(l => (
            <SquareCard key={l.id} Icon={Globe} label={l.label} sub={l.sub}
              selected={form.languages.includes(l.id)}
              onClick={() => set({ ...form, languages: toggleN(form.languages, l.id) })} />
          ))}
        </div>
      </div>

      {/* Special requirements */}
      <div className="mb-8">
        <SectionTitle Icon={Zap}>Special Requirements — Select all that apply</SectionTitle>
        <div className="flex flex-wrap gap-2">
          {SPECIAL_REQS.map(r => (
            <PillChip key={r} label={r} selected={form.specialReqs.includes(r)}
              onClick={() => set({ ...form, specialReqs: toggleN(form.specialReqs, r) })} />
          ))}
        </div>
      </div>

      {/* Working style */}
      <div className="mb-8">
        <SectionTitle Icon={SlidersHorizontal}>Must-Haves in a Renovator — Select up to 2</SectionTitle>
        <div className="space-y-2">
          {WORKING_STYLES.map(ws => (
            <RowCard key={ws.id} Icon={ws.Icon} label={ws.label}
              selected={form.workingStyles.includes(ws.id)}
              onClick={() => set({ ...form, workingStyles: toggle2(form.workingStyles, ws.id) })} />
          ))}
        </div>
        {form.workingStyles.includes("other") && (
          <OtherTextInput value={form.workingStyleOther} onChange={v => set({ ...form, workingStyleOther: v })} />
        )}
      </div>

      {/* ID experience */}
      <div className="mb-8">
        <SectionTitle Icon={Star}>Have You Spoken to Any ID Firms Yet?</SectionTitle>
        <div className="space-y-2.5">
          {ID_EXPERIENCE.map(e => (
            <RowCard key={e.value} Icon={e.Icon} label={e.label} sub={e.sub}
              selected={form.idExperience === e.value} onClick={() => set({ ...form, idExperience: e.value })} />
          ))}
        </div>
      </div>

      {/* Residents */}
      <div className="mb-8">
        <SectionTitle Icon={Users}>Who Will Be Living With You?</SectionTitle>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {RESIDENTS.map(r => (
            <SquareCard key={r.id} Icon={r.Icon} label={r.label}
              selected={form.residents.includes(r.id)}
              onClick={() => set({ ...form, residents: toggleN(form.residents, r.id) })} />
          ))}
        </div>
        {form.residents.includes("other") && (
          <OtherTextInput value={form.residentsOther} onChange={v => set({ ...form, residentsOther: v })} />
        )}
        {hasPets && (
          <div className="mt-6 pt-5 border-t border-white/[0.05]">
            <SectionTitle Icon={Heart}>Tell Us About Your Pets</SectionTitle>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5">
              {PETS.map(p => (
                <SquareCard key={p.id} Icon={p.Icon} label={p.label}
                  selected={form.pets.includes(p.id)}
                  onClick={() => set({ ...form, pets: toggleN(form.pets, p.id) })} />
              ))}
            </div>
            {form.pets.includes("other") && (
              <OtherTextInput value={form.petOther} onChange={v => set({ ...form, petOther: v })} placeholder="Describe your pet…" />
            )}
          </div>
        )}
      </div>

      {/* Guarantees */}
      <div>
        <SectionTitle Icon={ShieldCheck}>Reserve Your Guarantees — Select as many as you like</SectionTitle>
        <div className="space-y-2.5">
          {GUARANTEES.map(g => {
            const sel = form.guarantees.includes(g.id);
            const GIcon = g.Icon;
            return (
              <button key={g.id} type="button"
                onClick={() => set({ ...form, guarantees: toggleN(form.guarantees, g.id) })}
                className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl border text-left transition-all duration-200"
                style={{ background: sel ? "rgba(200,136,31,0.09)" : "rgba(255,255,255,0.03)", borderColor: sel ? "rgba(200,136,31,0.45)" : "rgba(255,255,255,0.08)" }}>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: sel ? "rgba(200,136,31,0.18)" : "rgba(255,255,255,0.05)" }}>
                  <GIcon className="w-5 h-5" style={{ color: sel ? "#c8881f" : "rgba(255,255,255,0.35)" }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold" style={{ color: sel ? "white" : "rgba(255,255,255,0.7)" }}>{g.label}</p>
                  <p className="text-xs text-white/35 mt-0.5">{g.desc}</p>
                </div>
                {g.badge && (
                  <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-lg shrink-0"
                    style={{ background: "rgba(34,197,94,0.1)", color: "#4ade80", border: "1px solid rgba(74,222,128,0.2)" }}>
                    {g.badge}
                  </span>
                )}
                <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition-all"
                  style={{ background: sel ? "#c8881f" : "rgba(255,255,255,0.06)", border: sel ? "none" : "1px solid rgba(255,255,255,0.12)" }}>
                  {sel && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}

// ─── Step 6: Contact ─────────────────────────────────────────────────────────

type ContactErr = Partial<Record<"name" | "email" | "whatsapp", string>>;

function S6({ form, set, errors }: { form: FormData; set: (f: FormData) => void; errors: ContactErr }) {
  const FIELDS = [
    { key: "name",     label: "Full Name",       Icon: User,  type: "text",  ph: "Jane Tan",         ac: "name" },
    { key: "email",    label: "Email Address",   Icon: Mail,  type: "email", ph: "jane@example.com", ac: "email" },
    { key: "whatsapp", label: "WhatsApp Number", Icon: Phone, type: "tel",   ph: "+65 9123 4567",    ac: "tel" },
  ] as const;

  return (
    <>
      <StepHead Icon={Mail} title="Where Should We Send Your Matches?"
        sub="You'll receive your 6 personalised firm matches via WhatsApp within 24 hours." />

      {/* Core fields */}
      <div className="space-y-5 mb-8">
        {FIELDS.map(({ key, label, Icon, type, ph, ac }) => (
          <div key={key}>
            <label className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.2em] text-white/45 mb-2">
              <Icon className="w-3.5 h-3.5 text-[#c8881f]/60" />{label}
            </label>
            <div className="relative">
              <Icon className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
                style={{ color: errors[key] ? "rgba(239,68,68,0.6)" : "rgba(255,255,255,0.25)", width: 18, height: 18 }} />
              <input value={form[key]} onChange={e => set({ ...form, [key]: e.target.value })}
                placeholder={ph} type={type} autoComplete={ac}
                className="w-full py-4 rounded-2xl text-sm text-white placeholder-white/20 outline-none transition-all"
                style={{ paddingLeft: "3rem", background: "rgba(255,255,255,0.05)", border: `1.5px solid ${errors[key] ? "rgba(239,68,68,0.45)" : "rgba(255,255,255,0.09)"}` }} />
            </div>
            {errors[key] && <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1.5"><CheckCircle2 className="w-3 h-3" />{errors[key]}</p>}
          </div>
        ))}
      </div>

      {/* Contact time */}
      <div className="mb-8">
        <SectionTitle Icon={Clock}>Best Time to Reach You</SectionTitle>
        <div className="flex flex-wrap gap-2">
          {CONTACT_TIMES.map(t => (
            <PillChip key={t} label={t} selected={form.contactTime === t} onClick={() => set({ ...form, contactTime: t })} />
          ))}
        </div>
      </div>

      {/* Referral */}
      <div className="mb-8">
        <SectionTitle Icon={Share2}>How Did You Hear About Us?</SectionTitle>
        <div className="flex flex-wrap gap-2">
          {REFERRAL_SOURCES.map(r => (
            <PillChip key={r} label={r} selected={form.referralSource === r} onClick={() => set({ ...form, referralSource: r })} />
          ))}
        </div>
      </div>

      {/* Trust box */}
      <div className="rounded-2xl p-5 space-y-3"
        style={{ background: "rgba(34,197,94,0.05)", border: "1px solid rgba(34,197,94,0.12)" }}>
        {[
          { Icon: Phone,       text: "You'll receive your 6 matches via WhatsApp within 24 hours" },
          { Icon: ShieldCheck, text: "We'll always get your permission before sharing your contact with any firm" },
          { Icon: CheckCircle2,text: "No spam, no unwanted calls. Zero obligation to proceed." },
          { Icon: Leaf,        text: "Your data is never sold to third parties. Ever." },
        ].map(({ Icon, text }) => (
          <div key={text} className="flex items-start gap-3">
            <Icon className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <p className="text-xs text-white/50 leading-relaxed">{text}</p>
          </div>
        ))}
      </div>
    </>
  );
}

// ─── Main wizard ──────────────────────────────────────────────────────────────

function canAdvance(step: number, form: FormData) {
  if (step === 0) return !!form.timeline;
  if (step === 1) return !!form.propertyType;
  if (step === 2) return form.rooms.length > 0;
  if (step === 3) return !!form.budget;
  if (step === 4) return form.wantsOptional !== null;
  return true;
}

export default function FindMyIdForm() {
  const router = useRouter();
  const topRef = useRef<HTMLDivElement>(null);
  const [step,      setStep]   = useState(0);
  const [_formRaw,  setForm]   = useState<FormData>(INIT);
  const [errors,    setErrors] = useState<ContactErr>({});
  const [loading,   setLoad]   = useState(false);

  useEffect(() => {
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [step]);

  // Always merge with INIT so stale HMR state or future schema additions never
  // leave array fields undefined and crash .includes() calls in child steps.
  const form: FormData = { ...INIT, ..._formRaw };

  function next() {
    if (step === 5) { submit(); return; }
    if (step === 4 && form.wantsOptional === false) { setStep(5); return; }
    setStep(s => s + 1);
  }

  function back() {
    if (step === 5 && form.wantsOptional === false) {
      setForm(f => ({ ...f, wantsOptional: null }));
      setStep(4); return;
    }
    setStep(s => Math.max(0, s - 1));
  }

  async function submit() {
    const errs: ContactErr = {};
    if (!form.name.trim())     errs.name     = "Name is required.";
    if (!form.email.trim())    errs.email    = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "Enter a valid email.";
    if (!form.whatsapp.trim()) errs.whatsapp = "WhatsApp number is required.";
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setLoad(true);
    try { localStorage.setItem("hm_lead", JSON.stringify({ ...form, submittedAt: new Date().toISOString() })); } catch { /* noop */ }
    await new Promise(r => setTimeout(r, 1400));
    setLoad(false);
    router.push("/find-my-id/thank-you");
  }

  const nextLabel = step === 5 ? "Get My 6 Matches" : "Continue";

  return (
    <div ref={topRef} className="relative overflow-hidden"
      style={{
        borderRadius: 24,
        background: "linear-gradient(160deg, rgba(14,20,38,0.95) 0%, rgba(9,12,22,0.98) 100%)",
        border: "1px solid rgba(255,255,255,0.08)",
        backdropFilter: "blur(32px)",
        boxShadow: "0 32px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.06)",
      }}>

      {/* Gold accent line */}
      <div className="h-[1.5px] w-full"
        style={{ background: "linear-gradient(90deg, transparent 0%, rgba(200,136,31,0.6) 30%, rgba(232,168,63,0.8) 50%, rgba(200,136,31,0.6) 70%, transparent 100%)" }} />

      {/* Progress */}
      <div className="px-7 pt-7">
        <Progress step={step} />
      </div>

      {/* Step content */}
      <div className="px-7 pb-2">
        {step === 0 && <S1 form={form} set={setForm} />}
        {step === 1 && <S2 form={form} set={setForm} />}
        {step === 2 && <S3 form={form} set={setForm} />}
        {step === 3 && <S4 form={form} set={setForm} />}
        {step === 4 && <S5 form={form} set={setForm} />}
        {step === 5 && <S6 form={form} set={setForm} errors={errors} />}
      </div>

      {/* Footer */}
      <div className="px-7 pb-7">
        <NavBtns
          onBack={step > 0 ? back : undefined}
          onNext={next}
          nextLabel={nextLabel}
          disabled={!canAdvance(step, form)}
          loading={loading}
        />
        <div className="flex items-center justify-center gap-6 mt-6 flex-wrap">
          {[
            { Icon: ShieldCheck,     label: "CaseTrust Only" },
            { Icon: BadgeDollarSign, label: "100% Free" },
            { Icon: CheckCircle2,    label: "No Spam" },
            { Icon: Clock,           label: "24h Response" },
          ].map(({ Icon, label }) => (
            <div key={label} className="flex items-center gap-1.5">
              <Icon className="w-3 h-3" style={{ color: "rgba(200,136,31,0.35)" }} />
              <span className="text-[10px] font-semibold tracking-wide" style={{ color: "rgba(255,255,255,0.2)" }}>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
