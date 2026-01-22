"use client";

import Link from "next/link";

import Modal from "react-bootstrap/Modal";

interface RegistrationSuccessModalProps {
  show: boolean;
  onHide: () => void;
}

export default function RegistrationSuccessModal({
  show,
  onHide,
}: RegistrationSuccessModalProps) {
  return (
    <Modal show={show} onHide={onHide} centered>
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
  );
}
