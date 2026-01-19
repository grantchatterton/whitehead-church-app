import type { Metadata } from "next";

import GalleryCarousel from "@/components/gallery/GalleryCarousel";
import { getGalleryImages } from "@/lib/gallery";
import { title as siteTitle } from "@/lib/config";

export const metadata: Metadata = {
  title: `Gallery | ${siteTitle}`,
};

export default async function Page() {
  const galleryImages = await getGalleryImages();

  return (
    <>
      <h1>Gallery</h1>
      <hr className="my-3" />
      <p>
        Welcome to our gallery! Here you&apos;ll find a curated selection of
        images showcasing our church and much more.
      </p>
      <GalleryCarousel galleryImages={galleryImages} />
    </>
  );
}
