"use client";

import { useRouter } from "next/navigation";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default function EmailVerificationRequiredModal() {
  const router = useRouter();

  function handleClose() {
    router.back();
  }

  return (
    <Modal show centered backdrop="static" onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Email Verification Required</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Please verify your email address to continue. Check your inbox for a
          verification email.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-light" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
