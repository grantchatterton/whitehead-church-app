import TimelineModal from "@/components/about/timeline/TimelineModal";
import { getTimelineEvents } from "@/lib/data";

export default function Page() {
  return <TimelineModal timelineEventsPromise={getTimelineEvents()} />;
}
