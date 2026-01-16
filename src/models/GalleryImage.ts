export interface GalleryImage {
  id: number;
  src: string; // URL or path to the image
  alt: string;
  caption: {
    title: string;
    description: string;
  };
}
