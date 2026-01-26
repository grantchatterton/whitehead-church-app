import "server-only";

import { format as dateFormat } from "date-fns";

import GalleryImageModel, { type IGalleryImage } from "@/models/GalleryImage";
import ServiceTimeModel, { type IServiceTime } from "@/models/ServiceTime";
import StaffMemberModel, { type IStaffMember } from "@/models/StaffMember";
import TimelineEventModel, {
  type ITimelineEvent,
} from "@/models/TimelineEvent";

import dbConnect from "./mongodb";

function formatTime(time: string): string {
  return dateFormat(new Date(`1970-01-01T${time}:00`), "h:mm aa");
}

export async function getTimelineEvents(): Promise<
  Array<ITimelineEvent & { _id: string }>
> {
  await dbConnect();
  const timelineEvents = await TimelineEventModel.find({}, { __v: 0 })
    .sort({ date: 1 })
    .lean();
  return timelineEvents.map((event) => ({
    ...event,
    _id: event._id.toString(),
  }));
}

export async function getStaffMembers(): Promise<
  Array<IStaffMember & { _id: string }>
> {
  await dbConnect();
  const staffMembers = await StaffMemberModel.find({}, { __v: 0 })
    .sort({ order: 1 })
    .lean();
  return staffMembers.map((member) => ({
    ...member,
    _id: member._id.toString(),
  }));
}

export async function getGalleryImages(): Promise<
  Array<IGalleryImage & { _id: string }>
> {
  await dbConnect();
  const galleryImages = await GalleryImageModel.find({}, { __v: 0 })
    .sort({ order: 1 })
    .lean();
  return galleryImages.map((image) => ({
    ...image,
    _id: image._id.toString(),
  }));
}

export async function getServiceTimes({
  formatTimes = false,
}: { formatTimes?: boolean } = {}): Promise<
  Array<IServiceTime & { _id: string }>
> {
  await dbConnect();
  const serviceTimes = await ServiceTimeModel.find({}, { __v: 0 }).lean();
  return serviceTimes.map((serviceTime) => ({
    ...serviceTime,
    _id: serviceTime._id.toString(),
    startTime: formatTimes
      ? formatTime(serviceTime.startTime)
      : serviceTime.startTime,
    endTime: formatTimes
      ? formatTime(serviceTime.endTime)
      : serviceTime.endTime,
  }));
}

export async function getServiceTimeById(
  id: string,
  formatTimes = false
): Promise<(IServiceTime & { _id: string }) | null> {
  await dbConnect();

  const serviceTime = await ServiceTimeModel.findById(id, { __v: 0 }).lean();
  return serviceTime
    ? {
        ...serviceTime,
        _id: serviceTime._id.toString(),
        startTime: formatTimes
          ? formatTime(serviceTime.startTime)
          : serviceTime.startTime,
        endTime: formatTimes
          ? formatTime(serviceTime.endTime)
          : serviceTime.endTime,
      }
    : null;
}
