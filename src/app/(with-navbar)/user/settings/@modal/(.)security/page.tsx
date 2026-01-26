"use client";

import React, { useState } from "react";

import { useRouter } from "next/navigation";

import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Spinner from "react-bootstrap/Spinner";
import Stack from "react-bootstrap/Stack";

import type { ErrorContext } from "better-auth/client";

import { authClient, useSession } from "@/lib/auth-client";

export default function Page() {
  const router = useRouter();
  const { data: session } = useSession();

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const user = session?.user;

  function handleClose() {
    router.back();
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");

    const formData = new FormData(event.currentTarget);
    const twoFactorAuth = formData.get("twoFactorAuth") === "on";
    const password = formData.get("password") as string;

    if (!password) {
      setError("Please enter your current password.");
      return;
    }

    setLoading(true);

    const fetchOptions = {
      onSuccess() {
        setMessage("Security settings updated successfully.");
      },
      onError(context: ErrorContext) {
        setError(context.error.message);
      },
    };

    if (twoFactorAuth) {
      await authClient.twoFactor.enable({
        password,
        fetchOptions,
      });
    } else {
      await authClient.twoFactor.disable({
        password,
        fetchOptions,
      });
    }

    setLoading(false);
  }

  return (
    <Modal show centered onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Security Settings</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {message && (
          <Alert variant="success" dismissible onClose={() => setMessage("")}>
            {message}
          </Alert>
        )}
        {error && (
          <Alert variant="danger" dismissible onClose={() => setError("")}>
            {error}
          </Alert>
        )}
        <Form id="securityForm" onSubmit={handleSubmit}>
          <Form.Group controlId="twoFactorAuth" className="mb-3">
            <Form.Check
              type="checkbox"
              name="twoFactorAuth"
              label="Two-Factor Authentication"
              defaultChecked={user?.twoFactorEnabled || false}
            />
          </Form.Group>
          <Form.Group controlId="password" className="mb-3">
            <Form.Control
              type="password"
              name="password"
              placeholder="Enter your current password"
              required
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="outline-light"
          type="submit"
          form="securityForm"
          disabled={loading || !user}
        >
          {loading ? (
            <Stack
              direction="horizontal"
              gap={2}
              className="align-items-center"
            >
              <Spinner animation="border" size="sm" />
              Saving Changes...
            </Stack>
          ) : (
            "Save Changes"
          )}
        </Button>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
