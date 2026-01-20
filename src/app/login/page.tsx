import type { Metadata } from "next";

import AuthForm from "@/components/auth/AuthForm";
import { isEmailSignupAllowed } from "@/lib/auth-config";

export const metadata: Metadata = {
  title: "Login | Whitehead Baptist Church",
  description: "Sign in to your Whitehead Baptist Church account",
};

export default function LoginPage() {
  const allowEmailSignup = isEmailSignupAllowed();

  return <AuthForm mode="login" allowSignup={allowEmailSignup} />;
}
