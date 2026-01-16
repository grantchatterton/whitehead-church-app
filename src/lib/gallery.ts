import "server-only";

import type { GalleryImage } from "@/models/GalleryImage";

export async function getGalleryImages(): Promise<GalleryImage[]> {
  return [
    {
      id: 1,
      src: "/images/gallery/church.jpg",
      alt: "Church Image",
      caption: {
        title: "The Church",
        description: "Our beautiful church.",
      },
    },
    {
      id: 2,
      src: "/images/gallery/graveyard-1.jpg",
      alt: "Graveyard #1 Image",
      caption: {
        title: "The Graveyard",
        description: "Our peaceful graveyard.",
      },
    },
    {
      id: 3,
      src: "/images/gallery/graveyard-2.jpg",
      alt: "Graveyard #2 Image",
      caption: {
        title: "The Graveyard",
        description: "Our peaceful graveyard.",
      },
    },
    {
      id: 4,
      src: "/images/gallery/graveyard-3.jpg",
      alt: "Graveyard #3 Image",
      caption: {
        title: "The Graveyard",
        description: "Our peaceful graveyard.",
      },
    },
  ];
}
