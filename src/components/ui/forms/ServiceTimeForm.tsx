"use client";

import { use, useActionState, useEffect } from "react";

import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Placeholder from "react-bootstrap/Placeholder";

import type { IServiceTime } from "@/models/ServiceTime";

export function ServiceTimeFormSkeleton() {
  return (
    <Form>
      <Form.Group className="mb-3" controlId="name">
        <Form.Label>Service Name</Form.Label>
        <Placeholder className="form-control" animation="glow">
          <Placeholder xs={12} />
        </Placeholder>
      </Form.Group>
      <Form.Group className="mb-3" controlId="days">
        <Form.Label>Days</Form.Label>
        <div>
          {[...Array(7)].map((_, index) => (
            <Placeholder key={index} className="form-check" animation="glow">
              <Placeholder xs={2} />
            </Placeholder>
          ))}
        </div>
      </Form.Group>
      <Form.Group className="mb-3" controlId="startTime">
        <Form.Label>Start Time</Form.Label>
        <Placeholder className="form-control" animation="glow">
          <Placeholder xs={12} />
        </Placeholder>
      </Form.Group>
      <Form.Group className="mb-3" controlId="endTime">
        <Form.Label>End Time</Form.Label>
        <Placeholder className="form-control" animation="glow">
          <Placeholder xs={12} />
        </Placeholder>
      </Form.Group>
    </Form>
  );
}

type ServiceTimeFormProps = React.ComponentProps<typeof Form> & {
  submitAction: (
    formState: FormState,
    formData: FormData
  ) => Promise<FormState>;
  serviceTimePromise?: Promise<(IServiceTime & { _id: string }) | null>;
  onPendingChange?: (pending: boolean) => void;
};

export default function ServiceTimeForm({
  submitAction,
  serviceTimePromise,
  onPendingChange,
  ...props
}: ServiceTimeFormProps) {
  const serviceTime = serviceTimePromise ? use(serviceTimePromise) : null;

  const [state, formAction, pending] = useActionState(submitAction, {});

  useEffect(() => {
    onPendingChange?.(pending);
  }, [pending, onPendingChange]);

  return (
    <>
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
      <Form action={formAction} id="serviceTimeForm" {...props}>
        {serviceTime?._id && (
          <Form.Control
            type="hidden"
            name="id"
            defaultValue={serviceTime._id}
          />
        )}
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Service Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            defaultValue={serviceTime?.name || ""}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="days">
          <Form.Label>Days</Form.Label>
          <div>
            {[
              "Sunday",
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
            ].map((day) => (
              <Form.Check
                key={day}
                id={`day-${day}`}
                type="checkbox"
                name="days"
                value={day}
                label={day}
                defaultChecked={serviceTime?.days.includes(day) ?? false}
              />
            ))}
          </div>
        </Form.Group>
        <Form.Group className="mb-3" controlId="startTime">
          <Form.Label>Start Time</Form.Label>
          <Form.Control
            type="time"
            name="startTime"
            defaultValue={serviceTime?.startTime || ""}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="endTime">
          <Form.Label>End Time</Form.Label>
          <Form.Control
            type="time"
            name="endTime"
            defaultValue={serviceTime?.endTime || ""}
            required
          />
        </Form.Group>
      </Form>
    </>
  );
}
