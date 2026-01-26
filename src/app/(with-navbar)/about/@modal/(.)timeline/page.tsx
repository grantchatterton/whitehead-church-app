import TimelineModal from "@/components/ui/modals/TimelineModal";
import { getTimelineEvents } from "@/lib/data";

export default async function TimelineInterceptor() {
  const timelineEvents = await getTimelineEvents();
  return <TimelineModal timelineEvents={timelineEvents} />;
}
