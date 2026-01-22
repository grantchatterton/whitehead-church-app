"use client";

import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Spinner from "react-bootstrap/Spinner";

interface OtpVerificationModalProps {
  show: boolean;
  onHide: () => void;
  onSubmit: (code: string, trustDevice: boolean) => Promise<void>;
  error?: string;
  loading?: boolean;
}

export default function OtpVerificationModal({
  show,
  onHide,
  onSubmit,
  error,
  loading = false,
}: OtpVerificationModalProps) {
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const code = formData.get("code") as string;
    const trustDevice = formData.get("trustDevice") === "on";

    onSubmit(code, trustDevice);
  }

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Two-Factor Authentication Required</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        <p>
          A one-time password (OTP) has been sent to your email. Please enter it
          to complete the sign-in process.
        </p>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="code">
            <Form.Label>One-Time Password (OTP)</Form.Label>
            <Form.Control
              type="text"
              name="code"
              placeholder="Enter OTP"
              required
            />
          </Form.Group>
          <Form.Group controlId="trustDevice" className="mt-2">
            <Form.Check
              type="checkbox"
              name="trustDevice"
              label="Trust this device for future sign-ins"
              defaultChecked={false}
            />
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            className="mt-3"
            disabled={loading}
          >
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
                Verifying...
              </>
            ) : (
              "Verify OTP"
            )}
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-light" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
