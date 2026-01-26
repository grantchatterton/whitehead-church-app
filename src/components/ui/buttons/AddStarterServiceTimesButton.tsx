"use client";

import { startTransition, useActionState } from "react";

import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

import { addStarterServiceTimes } from "@/lib/actions";

type AddStarterServiceTimesButtonProps = Omit<
  React.ComponentProps<typeof Button>,
  "onClick" | "children" | "disabled"
>;

export default function AddStarterServiceTimesButton({
  ...props
}: AddStarterServiceTimesButtonProps) {
  const [state, action, pending] = useActionState(addStarterServiceTimes, null);

  return (
    <Button
      variant="outline-light"
      onClick={() => startTransition(action)}
      disabled={pending}
      {...props}
    >
      {pending ? (
        <>
          <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
          />{" "}
          Adding Starter Service Times...
        </>
      ) : (
        "Add Starter Service Times"
      )}
    </Button>
  );
}
