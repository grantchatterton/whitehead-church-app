import type { Metadata } from "next";

import AuthForm from "@/components/auth/AuthForm";

export const metadata: Metadata = {
  title: "Login | Whitehead Baptist Church",
  description: "Sign in to your Whitehead Baptist Church account",
};

export default function LoginPage() {
  // Check if email signup is allowed (defaults to true if not set)
  // This is a server component, so accessing process.env is safe
  const allowEmailSignup =
    process.env.BETTER_AUTH_ALLOW_EMAIL_SIGNUP !== "false";

  return <AuthForm mode="login" allowSignup={allowEmailSignup} />;
}
