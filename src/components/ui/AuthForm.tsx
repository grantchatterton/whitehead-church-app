"use client";

import { type FormEvent, useState } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Stack from "react-bootstrap/Stack";

import { signIn, signUp } from "@/lib/auth-client";

interface AuthFormContainerProps {
  title: string;
  isRegister?: boolean;
  allowSignup?: boolean;
  children: React.ReactNode;
}

function AuthFormContainer({
  title,
  isRegister,
  allowSignup,
  children,
}: AuthFormContainerProps) {
  return (
    <div
      className="mx-auto glass p-5"
      style={{
        maxWidth: "500px",
        border: "1px solid #495057",
        borderRadius: "8px",
      }}
    >
      <h1 className="mb-4 text-center">{title}</h1>
      {children}
      <p className="mt-4 text-center">
        {isRegister ? (
          <>
            Already have an account? <Link href="/login">Sign in here</Link>
          </>
        ) : (
          <>
            {allowSignup && (
              <>
                Don&apos;t have an account?{" "}
                <Link href="/register">Register here</Link>
              </>
            )}
          </>
        )}
      </p>
    </div>
  );
}

interface AuthFormProps {
  mode: "register" | "login";
  allowSignup?: boolean;
}

export default function AuthForm({ mode, allowSignup = true }: AuthFormProps) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isRegister = mode === "register";
  if (isRegister && !allowSignup) {
    return (
      <AuthFormContainer
        title="Registration Disabled"
        isRegister={isRegister}
        allowSignup={allowSignup}
      >
        <Alert variant="danger">
          New user registrations are currently disabled. Please contact the
          administrator for assistance.
        </Alert>
      </AuthFormContainer>
    );
  }

  function showEmailVerificationModal() {
    router.push("/login/email-verification-required");
  }

  function showRegistrationSuccessModal() {
    router.push("/register/registration-success");
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setError("");

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    // Validation
    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    if (isRegister && !confirmPassword) {
      setError("All fields are required");
      return;
    }

    if (isRegister && password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    setLoading(true);

    if (isRegister) {
      await signUp.email({
        email,
        password,
        name: email.split("@")[0], // Use email prefix as default name
        fetchOptions: {
          onSuccess() {
            showRegistrationSuccessModal();
          },
          onError(context) {
            setError(context.error.message || "Registration failed");
          },
        },
      });
    } else {
      await signIn.email({
        email,
        password,
        fetchOptions: {
          onSuccess() {
            router.push("/");
          },
          onError(context) {
            // If email is not verified, show verification modal
            if (context.error.status === 403) {
              showEmailVerificationModal();
            } else {
              setError(context.error.message || "Login failed");
            }
          },
        },
      });
    }

    setLoading(false);
  }

  return (
    <AuthFormContainer
      title={isRegister ? "Create Account" : "Sign In"}
      isRegister={isRegister}
      allowSignup={allowSignup}
    >
      {error && (
        <Alert variant="danger" dismissible onClose={() => setError("")}>
          {error}
        </Alert>
      )}

      <Form onSubmit={handleSubmit}>
        <Stack gap={3}>
          <Form.Group>
            <Form.Label htmlFor="email">Email Address</Form.Label>
            <Form.Control
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email"
              disabled={loading}
              required
            />
          </Form.Group>

          <Form.Group>
            <Form.Label htmlFor="password">Password</Form.Label>
            <Form.Control
              id="password"
              type="password"
              name="password"
              placeholder={
                isRegister
                  ? "Enter password (minimum 8 characters)"
                  : "Enter your password"
              }
              disabled={loading}
              required
            />
            {isRegister && (
              <Form.Text className="d-block mt-2">
                Password must be at least 8 characters long
              </Form.Text>
            )}
          </Form.Group>

          {isRegister && (
            <Form.Group>
              <Form.Label htmlFor="confirmPassword">
                Confirm Password
              </Form.Label>
              <Form.Control
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                placeholder="Confirm your password"
                disabled={loading}
                required
              />
            </Form.Group>
          )}

          <Button
            variant="outline-light"
            type="submit"
            disabled={loading}
            className="mt-2"
          >
            {loading
              ? isRegister
                ? "Creating Account..."
                : "Signing In..."
              : isRegister
                ? "Create Account"
                : "Sign In"}
          </Button>
        </Stack>
      </Form>
    </AuthFormContainer>
  );
}
