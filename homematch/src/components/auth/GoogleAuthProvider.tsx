"use client";
import { GoogleOAuthProvider } from "@react-oauth/google";

const CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? "";

/**
 * Wraps children with GoogleOAuthProvider.
 * If NEXT_PUBLIC_GOOGLE_CLIENT_ID is not set, renders children as-is
 * (Google buttons will be disabled/hidden at the component level).
 */
export default function GoogleAuthProvider({ children }: { children: React.ReactNode }) {
  if (!CLIENT_ID) return <>{children}</>;
  return <GoogleOAuthProvider clientId={CLIENT_ID}>{children}</GoogleOAuthProvider>;
}

/** True when the Google client ID env var is configured. */
export const googleEnabled = Boolean(CLIENT_ID);
