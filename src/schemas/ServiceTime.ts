import * as z from "zod";

const TimeSchema = z
  .string()
  .regex(/^\d{2}:\d{2}$/, "Time must be in HH:MM format");

export const ServiceTimeSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Service name is required"),
  days: z
    .array(
      z.enum([
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ])
    )
    .min(1, "At least one day must be selected"),
  startTime: TimeSchema,
  endTime: TimeSchema,
});

export type ServiceTime = z.infer<typeof ServiceTimeSchema>;
