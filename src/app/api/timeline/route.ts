import { NextResponse } from "next/server";

import dbConnect from "@/lib/mongodb";
import TimelineEventModel from "@/models/TimelineEvent";

export async function GET() {
  await dbConnect();
  const data = await TimelineEventModel.find().sort({ date: 1 }).lean();
  return NextResponse.json(data);
}
