import "server-only";

import mongoose from "mongoose";

export interface GalleryImage extends mongoose.Document {
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

export type GalleryImageDTO = Pick<
  GalleryImage,
  "src" | "alt" | "caption" | "order"
> & {
  _id: string;
};

const GalleryImageSchema = new mongoose.Schema<GalleryImage>(
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

export default (mongoose.models.GalleryImage as mongoose.Model<GalleryImage>) ||
  mongoose.model<GalleryImage>("GalleryImage", GalleryImageSchema);
