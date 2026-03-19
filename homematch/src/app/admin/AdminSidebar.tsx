"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Users, Building2, Package, Image, BookOpen,
  FileText, Calculator, Palette, LogOut, ChevronRight, Inbox,
  MessageSquare, CheckSquare, GitCompare,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const NAV = [
  {
    group: "Overview",
    items: [
      { href: "/admin",         label: "Dashboard",    Icon: LayoutDashboard },
    ],
  },
  {
    group: "Leads",
    items: [
      { href: "/admin/leads",     label: "FindMyID Requests", Icon: Inbox },
      { href: "/admin/enquiries", label: "Firm Enquiries",    Icon: MessageSquare },
      { href: "/admin/contacts",  label: "Contact Messages",  Icon: FileText },
    ],
  },
  {
    group: "Content",
    items: [
      { href: "/admin/firms",        label: "Firms",         Icon: Building2 },
      { href: "/admin/vendors",      label: "Vendors",       Icon: Package },
      { href: "/admin/inspirations", label: "Inspirations",  Icon: Image },
      { href: "/admin/articles",     label: "Articles",      Icon: BookOpen },
    ],
  },
  {
    group: "Tools",
    items: [
      { href: "/admin/tools/calculator", label: "Budget Calculator", Icon: Calculator },
      { href: "/admin/tools/quiz",       label: "Style Quiz",        Icon: Palette },
      { href: "/admin/tools/checklist",  label: "Checklist",         Icon: CheckSquare },
      { href: "/admin/tools/compare",    label: "Compare",           Icon: GitCompare },
    ],
  },
  {
    group: "Users",
    items: [
      { href: "/admin/users", label: "All Users", Icon: Users },
    ],
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router   = useRouter();

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
  }

  return (
    <aside className="w-60 shrink-0 h-screen sticky top-0 flex flex-col overflow-y-auto"
      style={{ background: "rgba(10,14,26,0.98)", borderRight: "1px solid rgba(255,255,255,0.07)" }}>

      {/* Logo */}
      <div className="px-5 py-5 border-b" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
        <Link href="/admin" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
            style={{ background: "linear-gradient(135deg,#c8881f,#e8a83f)" }}>
            <span className="text-white font-black text-sm">H</span>
          </div>
          <div>
            <p className="text-white font-black text-sm leading-none">HomeMatch</p>
            <p className="text-[10px] text-white/35 mt-0.5 font-medium uppercase tracking-widest">Admin</p>
          </div>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-5">
        {NAV.map(({ group, items }) => (
          <div key={group}>
            <p className="text-[10px] font-black uppercase tracking-widest text-white/25 px-2 mb-1.5">{group}</p>
            <div className="space-y-0.5">
              {items.map(({ href, label, Icon }) => {
                const active = href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);
                return (
                  <Link key={href} href={href}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group",
                      active
                        ? "text-white"
                        : "text-white/45 hover:text-white/80 hover:bg-white/[0.04]"
                    )}
                    style={active ? {
                      background: "rgba(200,136,31,0.12)",
                      border: "1px solid rgba(200,136,31,0.2)",
                    } : {}}>
                    <Icon className={cn("w-4 h-4 shrink-0", active ? "text-[#c8881f]" : "text-white/30 group-hover:text-white/55")} />
                    <span className="flex-1">{label}</span>
                    {active && <ChevronRight className="w-3 h-3 text-[#c8881f]/60" />}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-3 pb-4 border-t pt-3" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
        <Link href="/" target="_blank"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-white/40 hover:text-white/70 hover:bg-white/[0.04] transition-all mb-1">
          <ChevronRight className="w-4 h-4 rotate-180" />
          View Site
        </Link>
        <button onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-red-400/60 hover:text-red-400 hover:bg-red-500/[0.06] transition-all">
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
