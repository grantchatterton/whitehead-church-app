"use client";

import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Spinner from "react-bootstrap/Spinner";
import Stack from "react-bootstrap/Stack";

interface EnableTwoFactorModalProps {
  show: boolean;
  loading: boolean;
  error?: string;
  onEnable: () => Promise<void>;
  onSkip: () => void;
}

export default function EnableTwoFactorModal({
  show,
  loading,
  error,
  onEnable,
  onSkip,
}: EnableTwoFactorModalProps) {
  return (
    <Modal show={show} onHide={onSkip} centered backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Enable Two-Factor Authentication</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="mb-2">
          Add an extra layer of security to your account by enabling two-factor
          authentication (2FA).
        </p>
        <p className="mb-0">
          When enabled, you&apos;ll enter a one-time code in addition to your
          password when signing in.
        </p>
        {error && (
          <Alert variant="danger" className="mt-3">
            {error}
          </Alert>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Stack direction="horizontal" gap={2}>
          <Button variant="secondary" onClick={onSkip} disabled={loading}>
            Skip for now
          </Button>
          <Button variant="outline-light" onClick={onEnable} disabled={loading}>
            {loading ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                  className="me-2"
                />
                Enabling...
              </>
            ) : (
              "Enable 2FA"
            )}
          </Button>
        </Stack>
      </Modal.Footer>
    </Modal>
  );
}
