"use client";

import { useActionState } from "react";

import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import type { IServiceTime } from "@/models/ServiceTime";

const initialState: FormState = {};

export default function ServiceTimeForm({
  submitAction,
  serviceTime,
}: {
  submitAction: (
    formState: FormState,
    formData: FormData
  ) => Promise<FormState>;
  serviceTime?: IServiceTime & { _id?: string };
}) {
  const [state, formAction, pending] = useActionState(
    submitAction,
    initialState
  );

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
      <Form action={formAction}>
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
        <Button type="submit" disabled={pending}>
          {pending ? "Saving..." : "Save"}
        </Button>
      </Form>
    </>
  );
}
