"use client";

import { type FormEvent, useState } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
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
  const [showRegistrationSuccessModal, setShowRegistrationSuccessModal] =
    useState(false);
  const [showEmailVerificationModal, setShowEmailVerificationModal] =
    useState(false);

  const isRegister = mode === "register";

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setError("");

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
            setShowRegistrationSuccessModal(true);
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
              setShowEmailVerificationModal(true);
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

      {/* Registration Success Modal */}
      <Modal
        show={showRegistrationSuccessModal}
        onHide={() => setShowRegistrationSuccessModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Successfully Registered</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Please proceed to the login page to continue.</p>
        </Modal.Body>
        <Modal.Footer>
          <Link className="btn btn-outline-light" href="/login">
            Go to Login
          </Link>
        </Modal.Footer>
      </Modal>

      {/* Email Verification Required Modal */}
      <Modal
        show={showEmailVerificationModal}
        onHide={() => setShowEmailVerificationModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Email Verification Required</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Your email address is not verified. Please check your inbox for a
            link to do so.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="outline-light"
            onClick={() => setShowEmailVerificationModal(false)}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
