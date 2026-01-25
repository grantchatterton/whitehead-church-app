import "server-only";

import mongoose from "mongoose";

export interface IServiceTime {
  name: string;
  days: string[]; // e.g., ["Sunday", "Wednesday"]
  startTime: string; // e.g., "10:00 AM"
  endTime: string; // e.g., "11:30 AM"
  createdAt: Date;
  updatedAt: Date;
}

const ServiceTimeSchema = new mongoose.Schema<IServiceTime>(
  {
    name: { type: String, required: true, unique: true },
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
  },
  { timestamps: true }
);

export default (mongoose.models.ServiceTime as mongoose.Model<IServiceTime>) ||
  mongoose.model<IServiceTime>("ServiceTime", ServiceTimeSchema);
