import { NextResponse } from "next/server";

import { getTimelineEvents } from "@/lib/data";

export async function GET() {
  const data = await getTimelineEvents();
  return NextResponse.json(data);
}
