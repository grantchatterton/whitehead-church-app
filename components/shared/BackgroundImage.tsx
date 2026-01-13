import Image from "next/image";

import backgroundImage from "@/public/images/background.jpg";

export default function BackgroundImage() {
  return (
    <Image
      src={backgroundImage}
      alt="Background"
      fill
      className="background-image"
      loading="eager"
    />
  );
}
