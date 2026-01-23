import "server-only";

import GalleryImageModel from "@/models/GalleryImage";
import type { GalleryImageDTO } from "@/models/GalleryImage";
import type { ServiceTimeDTO } from "@/models/ServiceTime";
import ServiceTimeModel from "@/models/ServiceTime";
import type { TimelineEventDTO } from "@/models/TimelineEvent";
import TimelineEventModel from "@/models/TimelineEvent";

import dbConnect from "./mongodb";

export async function getTimelineEvents(): Promise<TimelineEventDTO[]> {
  await dbConnect();
  const timelineEvents = await TimelineEventModel.find()
    .sort({ date: 1 })
    .lean();
  return timelineEvents.map((event) => ({
    _id: event._id.toString(),
    title: event.title,
    description: event.description,
    date: event.date.toString(),
    dateDisplay: event.dateDisplay,
  }));
}

export async function getGalleryImages(): Promise<GalleryImageDTO[]> {
  await dbConnect();
  const galleryImages = await GalleryImageModel.find()
    .sort({ order: 1 })
    .lean();
  return galleryImages.map((image) => ({
    _id: image._id.toString(),
    src: image.src,
    alt: image.alt,
    caption: image.caption,
    order: image.order,
  }));
}

export async function getServiceTimes(): Promise<ServiceTimeDTO[]> {
  await dbConnect();
  const serviceTimes = await ServiceTimeModel.find().sort({ name: 1 }).lean();
  return serviceTimes.map((serviceTime) => ({
    _id: serviceTime._id.toString(),
    name: serviceTime.name,
    days: serviceTime.days,
    startTime: serviceTime.startTime,
    endTime: serviceTime.endTime,
  }));
}
