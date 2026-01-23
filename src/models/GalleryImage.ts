import "server-only";

import mongoose from "mongoose";

export interface GalleryImage extends mongoose.Document {
  src: string; // URL or path to the image
  alt: string;
  caption: {
    title: string;
    description: string;
  };
}

export type GalleryImageDTO = Pick<GalleryImage, "src" | "alt" | "caption"> & {
  _id: string;
};

const GalleryImageSchema = new mongoose.Schema<GalleryImage>({
  src: { type: String, required: true },
  alt: { type: String, required: true },
  caption: {
    title: { type: String, required: true },
    description: { type: String, required: true },
  },
});

export default (mongoose.models.GalleryImage as mongoose.Model<GalleryImage>) ||
  mongoose.model<GalleryImage>("GalleryImage", GalleryImageSchema);
