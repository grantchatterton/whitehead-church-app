import type { Metadata } from "next";

import AuthForm from "@/components/auth/AuthForm";
import { isEmailSignupEnabled } from "@/lib/auth-config";

export const metadata: Metadata = {
  title: "Login",
  description: "Sign in to your Whitehead Baptist Church account",
};

export default function LoginPage() {
  const signupEnabled = isEmailSignupEnabled();

  return <AuthForm mode="login" allowSignup={signupEnabled} />;
}
