import { getTimelineEvents } from "@/lib/data";

import TimelineModal from "./_components/TimelineModal";

export default function Page() {
  const timelineEventsPromise = getTimelineEvents();
  return <TimelineModal timelineEventsPromise={timelineEventsPromise} />;
}
