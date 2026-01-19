import "server-only";

import TimelineEventModel from "@/models/TimelineEvent";
import type { TimelineEvent } from "@/models/TimelineEvent";

import dbConnect from "./mongodb";

export async function getTimelineEvents(): Promise<TimelineEvent[]> {
  await dbConnect();
  return TimelineEventModel.find().sort({ date: 1 }).lean();
}
