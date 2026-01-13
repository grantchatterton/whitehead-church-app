import GalleryCarousel from "@/components/gallery/GalleryCarousel";
import { getGalleryImages } from "@/lib/gallery";

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
