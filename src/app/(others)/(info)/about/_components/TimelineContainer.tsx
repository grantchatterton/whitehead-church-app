"use client";

import { useState } from "react";

import Button from "react-bootstrap/Button";

import type { ITimelineEvent } from "@/models/TimelineEvent";

import TimelineModal from "./TimelineModal";

type TimelineContainerProps = {
  timelineEvents: ITimelineEvent[];
};

export default function TimelineContainer({
  timelineEvents,
}: TimelineContainerProps) {
  const [showTimelineModal, setShowTimelineModal] = useState(false);

  return (
    <>
      <Button
        variant="outline-light"
        className="mb-4"
        onClick={() => setShowTimelineModal(true)}
      >
        View History
      </Button>
      <TimelineModal
        show={showTimelineModal}
        onHide={() => setShowTimelineModal(false)}
        timelineEvents={timelineEvents}
      />
    </>
  );
}
