import { NextResponse } from "next/server";

import { getTimelineEvents } from "@/lib/timeline";

export async function GET() {
  const events = await getTimelineEvents();
  return NextResponse.json(events);
}
