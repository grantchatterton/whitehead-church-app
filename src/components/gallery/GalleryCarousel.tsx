"use client";

import { useState } from "react";

import Image from "next/image";

import Carousel from "react-bootstrap/Carousel";
import Spinner from "react-bootstrap/Spinner";

import type { IGalleryImage } from "@/models/GalleryImage";

type IGalleryImageWithId = IGalleryImage & { _id: string };

function GalleryCarouselItemContent({ image }: { image: IGalleryImageWithId }) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading && (
        <div className="d-flex justify-content-center align-items-center h-100 glass">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}
      <Image
        src={image.src}
        alt={image.alt || `Gallery Image ${image._id}`}
        fill
        className="border-2 border-white rounded"
        onLoad={() => setIsLoading(false)}
      />
    </>
  );
}

function CarouselArrowContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="border-2 border-white rounded-circle bg-dark bg-opacity-100 p-2">
      {children}
    </div>
  );
}

function CarouselLeftArrow({
  width,
  height,
}: {
  width: number;
  height: number;
}) {
  return (
    <CarouselArrowContainer>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        fill="currentColor"
        className="bi bi-chevron-left"
        viewBox="0 0 16 16"
      >
        <path
          fillRule="evenodd"
          d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"
        />
      </svg>
    </CarouselArrowContainer>
  );
}

function CarouselRightArrow({
  width,
  height,
}: {
  width: number;
  height: number;
}) {
  return (
    <CarouselArrowContainer>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        fill="currentColor"
        className="bi bi-chevron-right"
        viewBox="0 0 16 16"
      >
        <path
          fillRule="evenodd"
          d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"
        />
      </svg>
    </CarouselArrowContainer>
  );
}

export default function GalleryCarousel({
  galleryImages,
}: {
  galleryImages: IGalleryImageWithId[];
}) {
  const arrowWidth = 32;
  const arrowHeight = 32;

  return (
    <Carousel
      prevIcon={<CarouselLeftArrow width={arrowWidth} height={arrowHeight} />}
      nextIcon={<CarouselRightArrow width={arrowWidth} height={arrowHeight} />}
    >
      {galleryImages.map((image) => (
        <Carousel.Item
          key={image._id}
          style={{ height: "600px" }}
          className="position-relative"
        >
          <GalleryCarouselItemContent image={image} />
        </Carousel.Item>
      ))}
    </Carousel>
  );
}
