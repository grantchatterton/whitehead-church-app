"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

import { authClient } from "@/lib/auth-client";

export default function TwoFactorModal({
  onVerified,
  onCancelled,
}: {
  onVerified: () => void;
  onCancelled?: () => void;
}) {
  const router = useRouter();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleClose() {
    if (onCancelled) {
      onCancelled();
    } else {
      router.back();
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setError("");

    const formData = new FormData(e.currentTarget);
    const code = formData.get("twoFactorCode") as string;

    if (!code) {
      setError("Please enter the two-factor code.");
      return;
    }

    setLoading(true);

    await authClient.twoFactor.verifyOtp({
      code,
      fetchOptions: {
        onSuccess() {
          onVerified();
        },
        onError(context) {
          setError(
            context.error.message || "Failed to verify two-factor code."
          );
        },
      },
    });

    setLoading(false);
  }

  return (
    <Modal show centered backdrop="static" onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Two-Factor Authentication Required</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && (
          <Alert variant="danger" dismissible onClose={() => setError("")}>
            {error}
          </Alert>
        )}
        <p>
          A code has been sent to your email. Please enter it below to continue.
        </p>
        <Form id="twoFactorForm" onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Two-Factor Code</Form.Label>
            <Form.Control
              type="text"
              name="twoFactorCode"
              placeholder="Enter code"
              required
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          type="submit"
          variant="outline-light"
          form="twoFactorForm"
          disabled={loading}
        >
          Verify
        </Button>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
