"use client";

import { useActionState, useCallback, useEffect, useState } from "react";

import { useParams, useRouter } from "next/navigation";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Spinner from "react-bootstrap/Spinner";

import { deleteServiceTime } from "@/lib/actions";

export default function Page() {
  const { id } = useParams<{ id: string }>();

  const router = useRouter();

  const [state, action, pending] = useActionState(
    deleteServiceTime.bind(null, id),
    {}
  );

  const [show, setShow] = useState(true);

  const handleClose = useCallback(() => {
    setShow(false);
    router.back();
  }, [router]);

  useEffect(() => {
    (() => {
      if (state.status === "success") {
        handleClose();
      }
    })();
  }, [state, handleClose]);

  return (
    <Modal centered show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Service Time</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Are you sure you want to delete this service time?</p>
      </Modal.Body>
      <Modal.Footer>
        <Form action={action}>
          <Button variant="danger" type="submit" disabled={pending}>
            {pending ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />{" "}
                Deleting...
              </>
            ) : (
              "Delete"
            )}
          </Button>
        </Form>
      </Modal.Footer>
    </Modal>
  );
}
