import type { Metadata } from "next";

import Link from "next/link";

import Container from "react-bootstrap/Container";

import AuthForm from "@/components/auth/AuthForm";
import { isEmailSignupAllowed } from "@/lib/auth-config";

export const metadata: Metadata = {
  title: "Register | Whitehead Baptist Church",
  description: "Create a new account for Whitehead Baptist Church",
};

export default function RegisterPage() {
  const allowEmailSignup = isEmailSignupAllowed();

  if (!allowEmailSignup) {
    return (
      <Container className="py-5">
        <div
          className="mx-auto glass p-5 text-center"
          style={{
            maxWidth: "500px",
            border: "1px solid #495057",
            borderRadius: "8px",
          }}
        >
          <h1 className="mb-4">Registration Unavailable</h1>
          <p className="mb-4">
            New account registration is currently disabled. Please contact the
            church administrator if you need assistance.
          </p>
          <Link href="/login" className="btn btn-outline-light">
            Go to Sign In
          </Link>
        </div>
      </Container>
    );
  }

  return <AuthForm mode="register" />;
}
