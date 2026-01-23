"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

interface AppModalProps {
  title: string;
  message: string;
  link?: {
    href: string;
    text: string;
  };
}

export default function AppModal({ title, message, link }: AppModalProps) {
  const router = useRouter();

  function handleClose() {
    router.back();
  }

  return (
    <Modal show centered backdrop="static" onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{message}</p>
      </Modal.Body>
      <Modal.Footer>
        {link && (
          <Link className="btn btn-outline-light" href={link.href}>
            {link.text}
          </Link>
        )}
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
