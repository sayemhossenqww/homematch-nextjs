import { Metadata } from "next";
import LoginClient from "./LoginClient";

export const metadata: Metadata = {
  title: "Login | HomeMatch Singapore",
  description: "Sign in to your HomeMatch account to manage enquiries, saved firms, and project inspiration boards.",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return <LoginClient />;
}
