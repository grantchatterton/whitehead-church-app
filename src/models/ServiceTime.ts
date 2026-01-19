import "server-only";

import mongoose from "mongoose";

export interface ServiceTime extends mongoose.Document {
  name: string;
  days: string[]; // e.g., ["Sunday", "Wednesday"]
  startTime: string; // e.g., "10:00 AM"
  endTime: string; // e.g., "11:30 AM"
}

export type ServiceTimeDTO = Pick<
  ServiceTime,
  "name" | "days" | "startTime" | "endTime"
> & { _id: string };

const ServiceTimeSchema = new mongoose.Schema<ServiceTime>({
  name: { type: String, required: true },
  days: {
    type: [String],
    required: true,
    enum: [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],
  },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
});

export default mongoose.models.ServiceTime ||
  mongoose.model<ServiceTime>("ServiceTime", ServiceTimeSchema);
