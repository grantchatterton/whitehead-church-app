import type { Metadata } from "next";

import AuthForm from "@/components/ui/AuthForm";
import { isEmailSignupEnabled } from "@/lib/auth-config";

export const metadata: Metadata = {
  title: "Login",
  description: "Sign in to your Whitehead Baptist Church account",
};

export default function LoginPage() {
  return <AuthForm mode="login" allowSignup={isEmailSignupEnabled()} />;
}
