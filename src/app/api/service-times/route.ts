import { NextResponse } from "next/server";

import dbConnect from "@/lib/mongodb";
import ServiceTimeModel from "@/models/ServiceTime";

export async function GET() {
  await dbConnect();
  const serviceTimes = await ServiceTimeModel.find().lean();
  return NextResponse.json(serviceTimes);
}
