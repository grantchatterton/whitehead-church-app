"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Spinner from "react-bootstrap/Spinner";

import ServiceTimeForm, {
  ServiceTimeFormSkeleton,
} from "@/components/ui/forms/ServiceTimeForm";
import type { IServiceTime } from "@/models/ServiceTime";

type ServiceTimeModalProps = {
  title: string;
  submitAction: (
    formState: FormState,
    formData: FormData
  ) => Promise<FormState>;
  submitLabel?: string;
  serviceTimePromise?: Promise<(IServiceTime & { _id: string }) | null>;
  show?: boolean;
  onHide?: () => void;
};

export default function ServiceTimeModal({
  title,
  submitAction,
  submitLabel = "Save",
  serviceTimePromise,
  show = true,
  onHide,
}: ServiceTimeModalProps) {
  const router = useRouter();

  const [pending, setPending] = useState(false);

  function handleClose() {
    onHide?.();
    router.back();
  }

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {serviceTimePromise ? (
          <ServiceTimeForm
            submitAction={submitAction}
            serviceTimePromise={serviceTimePromise}
            onPendingChange={setPending}
          />
        ) : (
          <ServiceTimeForm
            submitAction={submitAction}
            onPendingChange={setPending}
          />
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button
          type="submit"
          form="serviceTimeForm"
          variant="primary"
          disabled={pending}
        >
          {pending ? (
            <>
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
                className="me-2"
              />
              Saving...
            </>
          ) : (
            submitLabel
          )}
        </Button>
        <Button variant="secondary" onClick={handleClose} disabled={pending}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
