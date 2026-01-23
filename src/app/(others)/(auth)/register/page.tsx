import type { Metadata } from "next";
import Link from "next/link";

import AuthForm from "@/components/auth/AuthForm";
import { isEmailSignupDisabled } from "@/lib/auth-config";

export const metadata: Metadata = {
  title: "Register",
  description: "Create a new account for Whitehead Baptist Church",
};

export default function RegisterPage() {
  if (isEmailSignupDisabled()) {
    return (
      <div className="text-center">
        <h1 className="mb-4">Registration Disabled</h1>
        <p className="mb-4">
          Email registration is currently disabled. Please contact the church
          office for assistance.
        </p>
        <Link href="/" className="btn btn-outline-light">
          Return to Home
        </Link>
      </div>
    );
  }

  return <AuthForm mode="register" />;
}
