import type { Metadata } from "next";
import RegisterClient from "./RegisterClient";

export const metadata: Metadata = {
  title: "Create Account | HomeMatch Singapore",
  description: "Join HomeMatch — create a free account as a homeowner, interior design firm, or material brand. Singapore's most trusted renovation matching platform.",
  robots: { index: false, follow: false },
};

export default function RegisterPage() {
  return <RegisterClient />;
}
