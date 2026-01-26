"use client";

import { useActionState, useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import WrapperModal from "@/components/ui/modals/WrapperModal";

export default function DeleteServiceTimeForm({
  submitAction,
  serviceTimeId,
}: {
  submitAction: (state: FormState, data: FormData) => Promise<FormState>;
  serviceTimeId: string;
}) {
  const router = useRouter();

  const [state, formAction, pending] = useActionState(submitAction, {});

  useEffect(() => {
    if (state.status === "success") {
      router.back();
    }
  }, [state, router]);

  return (
    <WrapperModal title="Delete Service Time">
      {state.message && (
        <Alert
          className="mb-3"
          dismissible
          variant={
            state.status === "error"
              ? "danger"
              : state.status === "success"
                ? "success"
                : "info"
          }
        >
          {state.message}
        </Alert>
      )}
      <p>Are you sure you want to delete this service time?</p>
      <Form action={formAction}>
        <Form.Control type="hidden" name="id" value={serviceTimeId} />
        <Button type="submit" disabled={pending} variant="danger">
          Delete
        </Button>
      </Form>
    </WrapperModal>
  );
}
