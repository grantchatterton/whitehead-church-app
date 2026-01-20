import type { Metadata } from "next";

import AuthForm from "@/components/auth/AuthForm";

export const metadata: Metadata = {
  title: "Register | Whitehead Baptist Church",
  description: "Create a new account for Whitehead Baptist Church",
};

export default function RegisterPage() {
  return <AuthForm mode="register" />;
}
