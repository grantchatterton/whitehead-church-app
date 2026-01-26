"use client";

import { useRouter } from "next/navigation";

import Modal from "react-bootstrap/Modal";

type WrapperModalProps = React.ComponentProps<typeof Modal> & {
  title: string;
};

export default function WrapperModal({
  title,
  children,
  ...props
}: WrapperModalProps) {
  const router = useRouter();

  function handleClose() {
    router.back();
  }

  return (
    <Modal show centered onHide={handleClose} {...props}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
    </Modal>
  );
}
