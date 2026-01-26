"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import Modal from "react-bootstrap/Modal";
import Pagination from "react-bootstrap/Pagination";

import { format as dateFormat, parseISO } from "date-fns";

import type { ITimelineEvent } from "@/models/TimelineEvent";

type TimelineModalProps = React.ComponentProps<typeof Modal> & {
  timelineEvents: ITimelineEvent[];
};

export default function TimelineModal({ timelineEvents }: TimelineModalProps) {
  const router = useRouter();
  const [currEventIndex, setCurrEventIndex] = useState(0);

  const currTimelineEvent =
    currEventIndex >= 0 && currEventIndex < (timelineEvents.length ?? 0)
      ? timelineEvents[currEventIndex]
      : null;

  return (
    <Modal show centered size="lg" onHide={() => router.back()}>
      <Modal.Header closeButton>
        <Modal.Title>History</Modal.Title>
      </Modal.Header>
      <Modal.Body className="overflow-auto" style={{ height: "40vh" }}>
        {currTimelineEvent ? (
          <>
            <h5>{currTimelineEvent.title}</h5>
            <p className="text-muted">
              {currTimelineEvent.dateDisplay ??
                dateFormat(
                  parseISO(currTimelineEvent.date.toString().split("T")[0]),
                  "PPP"
                )}
            </p>
            <p className="mb-0">{currTimelineEvent.description}</p>
          </>
        ) : (
          <p>No history available.</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Pagination className="my-0 mx-auto">
          <Pagination.Prev
            onClick={() => {
              setCurrEventIndex((prev) => Math.max(prev - 1, 0));
            }}
            disabled={currEventIndex <= 0}
          />
          {timelineEvents.map((event, i) => (
            <Pagination.Item
              key={i}
              active={i === currEventIndex}
              onClick={() => setCurrEventIndex(i)}
            >
              {i + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next
            onClick={() => {
              setCurrEventIndex((prev) =>
                Math.min(prev + 1, timelineEvents.length - 1)
              );
            }}
            disabled={currEventIndex >= timelineEvents.length - 1}
          />
        </Pagination>
      </Modal.Footer>
    </Modal>
  );
}
