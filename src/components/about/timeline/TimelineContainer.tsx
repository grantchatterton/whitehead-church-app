"use client";

import { useState } from "react";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Pagination from "react-bootstrap/Pagination";
import Placeholder from "react-bootstrap/Placeholder";

import { format as dateFormat, parseISO } from "date-fns";

import type { TimelineEventDTO } from "@/models/TimelineEvent";

async function fetchTimelineEvents(): Promise<TimelineEventDTO[]> {
  const response = await fetch("/api/timeline");
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}

export default function TimelineContainer() {
  const [isShowing, setIsShowing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [timelineEvents, setTimelineEvents] = useState<
    TimelineEventDTO[] | null
  >(null);
  const [error, setError] = useState<string | null>(null);
  const [index, setIndex] = useState(0);

  async function handleClick() {
    setIsShowing(true);
    if (!timelineEvents) {
      setIsLoading(true);
      try {
        const data = await fetchTimelineEvents();
        setTimelineEvents(data);
      } catch (err) {
        console.error("Failed to fetch timeline events:", err);
        setError("An unexpected error occurred.");
      } finally {
        setIsLoading(false);
      }
    }
  }

  const currTimelineEvent =
    timelineEvents && index >= 0 && index < timelineEvents.length
      ? timelineEvents[index]
      : null;

  return (
    <>
      <Button
        variant="outline-light"
        onClick={handleClick}
        disabled={isShowing || isLoading}
        className="mb-4"
      >
        View History
      </Button>
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="p-4"
        show={isShowing}
        onHide={() => setIsShowing(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">History</Modal.Title>
        </Modal.Header>
        <Modal.Body className="overflow-auto" style={{ height: "40vh" }}>
          {isLoading ? (
            <>
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
            </>
          ) : error ? (
            <p>{error}</p>
          ) : currTimelineEvent ? (
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
            <p>No timeline events available.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Pagination className="my-0 mx-auto">
            <Pagination.Prev
              onClick={() => setIndex((prev) => Math.max(prev - 1, 0))}
              disabled={
                !timelineEvents || timelineEvents.length === 0 || index === 0
              }
            />
            {timelineEvents?.map((event, i) => (
              <Pagination.Item
                key={i}
                active={i === index}
                onClick={() => setIndex(i)}
              >
                {i + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next
              onClick={() =>
                setIndex((prev) =>
                  Math.min(
                    prev + 1,
                    timelineEvents ? timelineEvents.length - 1 : 0
                  )
                )
              }
              disabled={
                !timelineEvents ||
                timelineEvents.length === 0 ||
                index === timelineEvents.length - 1
              }
            />
          </Pagination>
        </Modal.Footer>
      </Modal>
    </>
  );
}
