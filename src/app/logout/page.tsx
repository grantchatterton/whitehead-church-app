"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import Alert from "react-bootstrap/Alert";
import Container from "react-bootstrap/Container";
import Spinner from "react-bootstrap/Spinner";
import Stack from "react-bootstrap/Stack";

import { signOut } from "@/lib/auth-client";

export default function LogoutPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function handleLogout() {
      try {
        await signOut();

        // Redirect to home page after successful logout
        setTimeout(() => {
          router.push("/");
        }, 1500);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An error occurred during logout"
        );
        setLoading(false);
      }
    }

    handleLogout();
  }, [router]);

  return (
    <Container className="py-5">
      <div
        className="mx-auto glass"
        style={{
          maxWidth: "500px",
          border: "1px solid #495057",
          borderRadius: "8px",
          padding: "2rem",
          textAlign: "center",
        }}
      >
        <h1 className="mb-4">Logout</h1>

        {error && (
          <Alert variant="danger" dismissible onClose={() => setError("")}>
            {error}
          </Alert>
        )}

        {loading && (
          <Stack gap={3} className="align-items-center">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Signing out...</span>
            </Spinner>
            <p className="text-muted">Signing you out...</p>
          </Stack>
        )}

        {!loading && !error && (
          <p className="text-success">You have been signed out successfully!</p>
        )}
      </div>
    </Container>
  );
}
