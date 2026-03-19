// ─── Shared auth utilities ─────────────────────────────────────────────────────
// When integrating a real backend, replace localStorage calls with API calls:
//   POST /api/auth/login    → returns { user, token }
//   POST /api/auth/register → returns { user, token }
//   POST /api/auth/google   → accepts Google access_token, returns { user, token }

export interface HmUser {
  id: string;
  email: string;
  name: string;
  picture?: string;
  phone?: string;
  role: "homeowner" | "firm" | "brand";
  authProvider: "email" | "google";
  loginAt: string;
  profile?: Record<string, string>;
  needsOnboarding?: boolean;
}

/** Decode a Google ID-token JWT payload (client-side, no signature check needed). */
export function decodeGoogleJwt(credential: string): Record<string, string> {
  try {
    const [, payload] = credential.split(".");
    const padded = payload.replace(/-/g, "+").replace(/_/g, "/");
    const json   = atob(padded);
    // Handle multi-byte characters
    const decoded = decodeURIComponent(
      Array.from(json)
        .map(c => "%" + c.charCodeAt(0).toString(16).padStart(2, "0"))
        .join("")
    );
    return JSON.parse(decoded);
  } catch {
    return {};
  }
}

/** Persist user to localStorage and notify AuthProvider via custom event. */
export function persistUser(user: HmUser): void {
  try {
    localStorage.setItem("hm_user", JSON.stringify(user));
    if (typeof window !== "undefined") window.dispatchEvent(new Event("hm-auth-change"));
  } catch { /* noop */ }
}

/** Read the currently stored user (null if not logged in). */
export function getStoredUser(): HmUser | null {
  try {
    const raw = localStorage.getItem("hm_user");
    return raw ? (JSON.parse(raw) as HmUser) : null;
  } catch {
    return null;
  }
}

/** Clear session. */
export function clearUser(): void {
  try {
    localStorage.removeItem("hm_user");
    localStorage.removeItem("hm_remember");
    if (typeof window !== "undefined") window.dispatchEvent(new Event("hm-auth-change"));
  } catch { /* noop */ }
}
