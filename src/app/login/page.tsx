import type { Metadata } from "next";

import AuthForm from "@/components/auth/AuthForm";
import { isEmailSignupDisabled } from "@/lib/auth-config";

export const metadata: Metadata = {
  title: "Login | Whitehead Baptist Church",
  description: "Sign in to your Whitehead Baptist Church account",
};

export default function LoginPage() {
  const signupDisabled = isEmailSignupDisabled();

  return <AuthForm mode="login" allowSignup={!signupDisabled} />;
}
