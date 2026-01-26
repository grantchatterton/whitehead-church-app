import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import dbConnect from "@/lib/mongodb";
import ServiceTimeModel from "@/models/ServiceTime";

export async function GET(
  _req: NextRequest,
  ctx: RouteContext<"/api/service-times/[id]">
) {
  const { id } = await ctx.params;

  await dbConnect();

  const serviceTime = await ServiceTimeModel.findById(id).lean();
  if (!serviceTime) {
    return NextResponse.json(
      { message: "Service time not found." },
      { status: 404 }
    );
  }
  return NextResponse.json(serviceTime);
}
