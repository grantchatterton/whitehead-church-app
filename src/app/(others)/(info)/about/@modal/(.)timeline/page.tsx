import TimelineModal from "@/components/about/timeline/TimelineModal";
import { getTimelineEvents } from "@/lib/data";

export default function Page() {
  const timelineEventsPromise = getTimelineEvents();
  return <TimelineModal timelineEventsPromise={timelineEventsPromise} />;
}
