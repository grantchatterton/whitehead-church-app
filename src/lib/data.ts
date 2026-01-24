import "server-only";

import GalleryImageModel, { type IGalleryImage } from "@/models/GalleryImage";
import ServiceTimeModel, { type IServiceTime } from "@/models/ServiceTime";
import StaffMemberModel, { type IStaffMember } from "@/models/StaffMember";
import TimelineEventModel, {
  type ITimelineEvent,
} from "@/models/TimelineEvent";

import dbConnect from "./mongodb";

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
  const galleryImages = await GalleryImageModel.find()
    .sort({ order: 1 })
    .lean();
  return galleryImages.map((image) => ({
    ...image,
    _id: image._id.toString(),
  }));
}

export async function getServiceTimes(): Promise<
  Array<IServiceTime & { _id: string }>
> {
  await dbConnect();
  const serviceTimes = await ServiceTimeModel.find({}, { __v: 0 })
    .sort({ name: 1 })
    .lean();
  return serviceTimes.map((serviceTime) => ({
    ...serviceTime,
    _id: serviceTime._id.toString(),
  }));
}
