import type { Metadata } from "next";

import AuthForm from "@/components/ui/AuthForm";
import { isEmailSignupEnabled } from "@/lib/auth-config";

export const metadata: Metadata = {
  title: "Register",
  description: "Create a new account for Whitehead Baptist Church",
};

export default function RegisterPage() {
  return <AuthForm mode="register" allowSignup={isEmailSignupEnabled()} />;
}
