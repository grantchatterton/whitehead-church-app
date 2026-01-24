import "server-only";

import mongoose from "mongoose";

export interface IGalleryImage {
  src: string; // URL or path to the image
  alt: string;
  caption: {
    title: string;
    description: string;
  };
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const GalleryImageSchema = new mongoose.Schema<IGalleryImage>(
  {
    src: { type: String, required: true },
    alt: { type: String, required: true },
    caption: {
      title: { type: String, required: true },
      description: { type: String, required: true },
    },
    order: { type: Number, required: true },
  },
  { timestamps: true }
);

export default (mongoose.models
  .GalleryImage as mongoose.Model<IGalleryImage>) ||
  mongoose.model<IGalleryImage>("GalleryImage", GalleryImageSchema);
