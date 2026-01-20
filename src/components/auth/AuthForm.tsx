"use client";

import { type FormEvent, useState } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Stack from "react-bootstrap/Stack";

import { signIn, signUp } from "@/lib/auth-client";

interface AuthFormProps {
  mode: "register" | "login";
  allowSignup?: boolean;
}

export default function AuthForm({ mode, allowSignup = true }: AuthFormProps) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const isRegister = mode === "register";

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setError("");
    setSuccess(false);

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

    try {
      if (isRegister) {
        const result = await signUp.email({
          email,
          password,
          name: email.split("@")[0], // Use email prefix as default name
        });

        if (result.error) {
          setError(result.error.message || "Registration failed");
        } else {
          setSuccess(true);
          setEmail("");
          setPassword("");
          setConfirmPassword("");

          // Redirect to home page after successful registration
          setTimeout(() => {
            router.push("/");
          }, 2000);
        }
      } else {
        const result = await signIn.email({
          email,
          password,
        });

        if (result.error) {
          setError(result.error.message || "Login failed");
        } else {
          setSuccess(true);
          setEmail("");
          setPassword("");

          // Redirect to home page after successful login
          setTimeout(() => {
            router.push("/");
          }, 2000);
        }
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : `An error occurred during ${isRegister ? "registration" : "login"}`
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container className="py-5">
      <div
        className="mx-auto glass p-5"
        style={{
          maxWidth: "500px",
          border: "1px solid #495057",
          borderRadius: "8px",
        }}
      >
        <h1 className="mb-4 text-center">
          {isRegister ? "Create Account" : "Sign In"}
        </h1>

        {error && (
          <Alert variant="danger" dismissible onClose={() => setError("")}>
            {error}
          </Alert>
        )}

        {success && (
          <Alert variant="success">
            {isRegister ? "Account created" : "Logged in"} successfully!
            Redirecting...
          </Alert>
        )}

        <Form onSubmit={handleSubmit}>
          <Stack gap={3}>
            <Form.Group>
              <Form.Label htmlFor="email">Email Address</Form.Label>
              <Form.Control
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                required
              />
            </Form.Group>

            <Form.Group>
              <Form.Label htmlFor="password">Password</Form.Label>
              <Form.Control
                id="password"
                type="password"
                placeholder={
                  isRegister
                    ? "Enter password (minimum 8 characters)"
                    : "Enter your password"
                }
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
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
    </Container>
  );
}
