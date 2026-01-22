import "server-only";

import type { TimelineEventDTO } from "@/models/TimelineEvent";
import TimelineEventModel from "@/models/TimelineEvent";

import dbConnect from "./mongodb";

export async function getTimelineEvents(): Promise<TimelineEventDTO[]> {
  await dbConnect();
  const timelineEvents = await TimelineEventModel.find()
    .sort({ date: 1 })
    .lean();
  return timelineEvents.map((event) => ({
    _id: event._id.toString(),
    title: event.title,
    description: event.description,
    date: event.date.toString(),
    dateDisplay: event.dateDisplay,
  }));
}
