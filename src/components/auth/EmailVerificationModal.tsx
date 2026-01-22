"use client";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

interface EmailVerificationModalProps {
  show: boolean;
  onHide: () => void;
}

export default function EmailVerificationModal({
  show,
  onHide,
}: EmailVerificationModalProps) {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Email Verification Required</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Your email address is not verified. Please check your inbox for a link
          to do so.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-light" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
