import "server-only";

import type { ServiceTime } from "@/models/ServiceTime";

export async function getServiceTimes(): Promise<ServiceTime[]> {
  return [
    {
      id: 1,
      name: "Sunday School",
      startTime: "10:00 AM",
      endTime: "11:00 AM",
    },
    {
      id: 2,
      name: "Sunday Service",
      startTime: "11:00 AM",
      endTime: "12:00 PM",
    },
  ];
}
