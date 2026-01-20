import { Metadata } from "next";

import AuthForm from "@/components/auth/AuthForm";

export const metadata: Metadata = {
  title: "Login | Whitehead Baptist Church",
  description: "Sign in to your Whitehead Baptist Church account",
};

export default function LoginPage() {
  return <AuthForm mode="login" />;
}
