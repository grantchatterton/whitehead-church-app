import type { Metadata } from "next";

import GalleryCarousel from "@/components/gallery/GalleryCarousel";
import { getGalleryImages } from "@/lib/data";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Browse our photo gallery showcasing Whitehead Baptist Church and our community. View images of our church, events, and the beautiful Blue Ridge Mountains setting.",
};

export default async function Page() {
  const galleryImages = await getGalleryImages();

  return (
    <>
      <h1 className="fs-2">Gallery</h1>
      <hr className="my-3" />
      <p>
        Welcome to our gallery! Here you&apos;ll find a curated selection of
        images showcasing our church and much more.
      </p>
      <GalleryCarousel galleryImages={galleryImages} />
    </>
  );
}
