"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default function RegistrationSuccessModal() {
  const router = useRouter();

  function handleClose() {
    router.back();
  }

  return (
    <Modal show centered backdrop="static" onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Registration Successful</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Your account has been successfully created.</p>
      </Modal.Body>
      <Modal.Footer>
        <Link className="btn btn-outline-light" href="/login">
          Go to Login
        </Link>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
