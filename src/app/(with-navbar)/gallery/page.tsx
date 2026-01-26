import type { Metadata } from "next";

import InfoPage from "@/components/ui/InfoPage";
import { getGalleryImages } from "@/lib/data";

import GalleryCarousel from "./_components/GalleryCarousel";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Browse our photo gallery showcasing Whitehead Baptist Church and our community. View images of our church, events, and the beautiful Blue Ridge Mountains setting.",
};

export default async function Page() {
  const galleryImages = await getGalleryImages();

  return (
    <InfoPage title="Gallery">
      <p>
        Welcome to our gallery! Here you&apos;ll find a curated selection of
        images showcasing our church and much more.
      </p>
      <GalleryCarousel galleryImages={galleryImages} />
    </InfoPage>
  );
}
