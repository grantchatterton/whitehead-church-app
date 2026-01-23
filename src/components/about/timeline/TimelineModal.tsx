"use client";

import { Suspense, use, useState } from "react";

import { useRouter } from "next/navigation";

import Modal from "react-bootstrap/Modal";
import Pagination from "react-bootstrap/Pagination";
import Placeholder from "react-bootstrap/Placeholder";

import { format as dateFormat, parseISO } from "date-fns";

import type { TimelineEventDTO } from "@/models/TimelineEvent";

function TimelineModalBody({ children }: { children: React.ReactNode }) {
  return (
    <Modal.Body className="overflow-auto" style={{ height: "40vh" }}>
      {children}
    </Modal.Body>
  );
}

function TimelineModalFooter({ children }: { children: React.ReactNode }) {
  return (
    <Modal.Footer>
      <Pagination className="my-0 mx-auto">{children}</Pagination>
    </Modal.Footer>
  );
}

function TimelineModalContentSkeleton() {
  return (
    <>
      <TimelineModalBody>
        <Placeholder as="h5" animation="glow">
          <Placeholder xs={4} />
        </Placeholder>
        <Placeholder as="p" animation="glow">
          <Placeholder xs={3} />
        </Placeholder>
        <Placeholder as="p" animation="glow">
          <Placeholder xs={12} /> <Placeholder xs={10} />{" "}
          <Placeholder xs={11} />
          <Placeholder xs={8} /> <Placeholder xs={9} />
        </Placeholder>
      </TimelineModalBody>
      <TimelineModalFooter>
        <Pagination.Prev disabled />
        <Pagination.Item active>1</Pagination.Item>
        <Pagination.Next disabled />
      </TimelineModalFooter>
    </>
  );
}

function TimelineModalContent({
  timelineEventsPromise,
}: {
  timelineEventsPromise: Promise<TimelineEventDTO[]>;
}) {
  const timelineEvents = use(timelineEventsPromise);

  const [currEventIndex, setCurrEventIndex] = useState(0);

  const currTimelineEvent =
    currEventIndex >= 0 && currEventIndex < timelineEvents.length
      ? timelineEvents[currEventIndex]
      : null;

  return (
    <>
      <TimelineModalBody>
        {currTimelineEvent ? (
          <>
            <h5>{currTimelineEvent.title}</h5>
            <p className="text-muted">
              {currTimelineEvent.dateDisplay ??
                dateFormat(
                  parseISO(currTimelineEvent.date.split("T")[0]),
                  "PPP"
                )}
            </p>
            <p className="mb-0">{currTimelineEvent.description}</p>
          </>
        ) : (
          <p>No history available.</p>
        )}
      </TimelineModalBody>
      <TimelineModalFooter>
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
      </TimelineModalFooter>
    </>
  );
}

export default function TimelineModal({
  timelineEventsPromise,
}: {
  timelineEventsPromise: Promise<TimelineEventDTO[]>;
}) {
  const router = useRouter();

  function handleClose() {
    router.back();
  }

  return (
    <Modal show centered onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>History</Modal.Title>
      </Modal.Header>
      <Suspense fallback={<TimelineModalContentSkeleton />}>
        <TimelineModalContent timelineEventsPromise={timelineEventsPromise} />
      </Suspense>
    </Modal>
  );
}
