import "server-only";

import mongoose from "mongoose";

export interface ITimelineEvent {
  title: string;
  date: Date;
  description: string;
  dateDisplay?: string;
  createdAt: Date;
  updatedAt: Date;
}

const TimelineEventSchema = new mongoose.Schema<ITimelineEvent>(
  {
    title: { type: String, required: true },
    date: { type: Date, required: true },
    description: { type: String, required: true },
    dateDisplay: { type: String, required: false },
  },
  { timestamps: true }
);

export default (mongoose.models
  .TimelineEvent as mongoose.Model<ITimelineEvent>) ||
  mongoose.model<ITimelineEvent>("TimelineEvent", TimelineEventSchema);
