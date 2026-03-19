import type { Metadata } from "next";
import { createAdminClient } from "@/lib/supabase/admin";
import { Clock, Shield } from "lucide-react";

export const metadata: Metadata = { title: "All Users" };

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-SG", { day: "numeric", month: "short", year: "numeric" });
}

export default async function UsersAdminPage() {
  const supabase = createAdminClient();

  // Use admin client to list all auth users
  const { data: { users }, error } = await supabase.auth.admin.listUsers({ perPage: 100 });

  // Also get profiles
  const { data: profiles } = await supabase
    .from("profiles")
    .select("id, full_name, avatar_url, role");

  const profileMap = new Map((profiles ?? []).map(p => [p.id, p]));

  if (error) {
    return (
      <div className="p-8">
        <p className="text-sm text-red-400">Error loading users: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <p className="text-[11px] font-black uppercase tracking-widest text-[#4ade80] mb-1">Users</p>
        <h1 className="text-2xl font-extrabold text-white">All Users</h1>
        <p className="text-sm text-white/40 mt-1">{users?.length ?? 0} registered users</p>
      </div>

      <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
        <div className="grid gap-4 px-5 py-3 text-[10px] font-black uppercase tracking-widest text-white/25"
          style={{ gridTemplateColumns: "2.5fr 2fr 1.5fr 1fr 1fr", background: "rgba(255,255,255,0.03)", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
          <span>User</span>
          <span>Email</span>
          <span>Provider</span>
          <span>Role</span>
          <span>Joined</span>
        </div>

        {!users || users.length === 0 ? (
          <div className="py-16 text-center text-sm text-white/25">No users found.</div>
        ) : (
          <div className="divide-y" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
            {users.map((user) => {
              const profile = profileMap.get(user.id);
              const provider = user.app_metadata?.provider ?? "email";
              const isAdmin = profile?.role === "admin";

              return (
                <div key={user.id}
                  className="grid gap-4 px-5 py-4 items-center"
                  style={{ gridTemplateColumns: "2.5fr 2fr 1.5fr 1fr 1fr" }}>

                  <div className="flex items-center gap-3 min-w-0">
                    {profile?.avatar_url ? (
                      <img src={profile.avatar_url} alt="" className="w-8 h-8 rounded-full object-cover shrink-0" />
                    ) : (
                      <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-black text-white"
                        style={{ background: "rgba(200,136,31,0.2)" }}>
                        {(profile?.full_name ?? user.email ?? "?")[0].toUpperCase()}
                      </div>
                    )}
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-white truncate">
                        {profile?.full_name ?? "No name"}
                      </p>
                      <p className="text-[10px] text-white/30 truncate font-mono">{user.id.slice(0, 12)}…</p>
                    </div>
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs text-white/60 truncate">{user.email ?? "—"}</p>
                    {user.email_confirmed_at && (
                      <p className="text-[10px] text-[#4ade80]/60 mt-0.5">✓ Verified</p>
                    )}
                  </div>

                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-lg capitalize"
                      style={{
                        background: provider === "google" ? "rgba(66,133,244,0.15)" : "rgba(255,255,255,0.07)",
                        color: provider === "google" ? "#4285f4" : "rgba(255,255,255,0.45)",
                      }}>
                      {provider}
                    </span>
                  </div>

                  <div>
                    {isAdmin ? (
                      <div className="flex items-center gap-1">
                        <Shield className="w-3 h-3 text-[#c8881f]" />
                        <span className="text-[10px] font-black text-[#c8881f] uppercase">Admin</span>
                      </div>
                    ) : (
                      <span className="text-[10px] text-white/30">User</span>
                    )}
                  </div>

                  <div className="flex items-center gap-1 text-[10px] text-white/25">
                    <Clock className="w-2.5 h-2.5" />
                    {fmtDate(user.created_at)}
                  </div>

                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
