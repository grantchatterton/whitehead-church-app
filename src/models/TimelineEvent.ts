import "server-only";

import mongoose from "mongoose";

export interface TimelineEvent extends mongoose.Document {
  title: string;
  date: Date;
  dateDisplay?: string;
  description: string;
}

export type TimelineEventDTO = Pick<
  TimelineEvent,
  "title" | "dateDisplay" | "description"
> & { _id: string; date: string };

const TimelineEventSchema = new mongoose.Schema<TimelineEvent>({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  dateDisplay: { type: String, required: false },
  description: { type: String, required: true },
});

export default (mongoose.models
  .TimelineEvent as mongoose.Model<TimelineEvent>) ||
  mongoose.model<TimelineEvent>("TimelineEvent", TimelineEventSchema);
