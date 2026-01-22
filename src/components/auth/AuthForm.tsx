"use client";

import { type FormEvent, useState } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Stack from "react-bootstrap/Stack";

import { authClient, signIn, signUp } from "@/lib/auth-client";

import EmailVerificationModal from "./EmailVerificationModal";
import EnableTwoFactorModal from "./EnableTwoFactorModal";
import OtpVerificationModal from "./OtpVerificationModal";
import RegistrationSuccessModal from "./RegistrationSuccessModal";

interface AuthFormProps {
  mode: "register" | "login";
  allowSignup?: boolean;
}

export default function AuthForm({ mode, allowSignup = true }: AuthFormProps) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showRegistrationSuccessModal, setShowRegistrationSuccessModal] =
    useState(false);
  const [showEmailVerificationModal, setShowEmailVerificationModal] =
    useState(false);
  const [showEnableTwoFactorModal, setShowEnableTwoFactorModal] =
    useState(false);
  const [showOtpVerificationModal, setShowOtpVerificationModal] =
    useState(false);

  const [enableTwoFactorError, setEnableTwoFactorError] = useState("");
  const [enableTwoFactorLoading, setEnableTwoFactorLoading] = useState(false);

  const [otpError, setOtpError] = useState("");
  const [otpLoading, setOtpLoading] = useState(false);

  const isRegister = mode === "register";

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setError("");

    // Validation
    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    // Confirm password check
    if (isRegister && !confirmPassword) {
      setError("All fields are required");
      return;
    }

    // Password match check
    if (isRegister && password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // Password strength check (example: minimum 8 characters)
    if (password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    setLoading(true);

    if (isRegister) {
      await signUp.email(
        {
          email,
          password,
          name: email.split("@")[0], // Use email prefix as default name
        },
        {
          onSuccess() {
            setShowRegistrationSuccessModal(true);
          },
          onError(context) {
            setError(context.error.message || "Registration failed");
          },
        }
      );
    } else {
      await signIn.email(
        {
          email,
          password,
        },
        {
          onSuccess(context) {
            if (context.data.twoFactorRedirect) {
              authClient.twoFactor.sendOtp(
                {},
                {
                  onSuccess() {
                    setShowOtpVerificationModal(true);
                  },
                  onError(sendError) {
                    setError(sendError.error.message || "Failed to send OTP.");
                  },
                }
              );
            } else if (!context.data.user.twoFactorEnabled) {
              setShowEnableTwoFactorModal(true);
            }
          },
          onError(context) {
            // Handle unverified email
            if (context.error.status === 403) {
              setShowEmailVerificationModal(true);
            } else {
              setError(context.error.message || "Login failed");
            }
          },
        }
      );
    }

    setLoading(false);
  }

  async function handleOtpSubmit(code: string, trustDevice: boolean) {
    setOtpError("");
    setOtpLoading(true);

    await authClient.twoFactor.verifyOtp(
      {
        code,
        trustDevice,
      },
      {
        onSuccess() {
          // Redirect to home or dashboard after successful OTP verification
          router.push("/");
        },
        onError(context) {
          setOtpError(
            context.error.message || "Invalid OTP. Please try again."
          );
        },
      }
    );

    setOtpLoading(false);
  }

  async function handleEnableTwoFactor() {
    setEnableTwoFactorError("");
    setEnableTwoFactorLoading(true);

    await authClient.twoFactor.enable(
      { password },
      {
        onSuccess() {
          authClient.twoFactor.sendOtp(
            {},
            {
              onSuccess() {
                setShowEnableTwoFactorModal(false);
                setShowOtpVerificationModal(true);
              },
              onError() {
                setEnableTwoFactorError(
                  "Failed to enable two-factor authentication."
                );
              },
            }
          );
        },
        onError(context) {
          setEnableTwoFactorError(
            context.error.message ||
              "Failed to enable two-factor authentication."
          );
        },
      }
    );

    setEnableTwoFactorLoading(false);
  }

  function handleSkipEnableTwoFactor() {
    router.push("/");
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
                name="email"
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
                name="password"
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
                  name="confirmPassword"
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

      <RegistrationSuccessModal
        show={showRegistrationSuccessModal}
        onHide={() => setShowRegistrationSuccessModal(false)}
      />

      <EmailVerificationModal
        show={showEmailVerificationModal}
        onHide={() => setShowEmailVerificationModal(false)}
      />

      <EnableTwoFactorModal
        show={showEnableTwoFactorModal}
        loading={enableTwoFactorLoading}
        error={enableTwoFactorError}
        onEnable={handleEnableTwoFactor}
        onSkip={handleSkipEnableTwoFactor}
      />

      <OtpVerificationModal
        show={showOtpVerificationModal}
        onHide={() => {
          setShowOtpVerificationModal(false);
          setOtpError("");
          setOtpLoading(false);
        }}
        onSubmit={handleOtpSubmit}
        error={otpError}
        loading={otpLoading}
      />
    </Container>
  );
}
