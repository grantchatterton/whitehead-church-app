import Image from "next/image";

import crossImage from "@public/images/cross.png";

export default function CrossImage({
  width = 192,
  height = 192,
  className,
}: {
  width?: number;
  height?: number;
  className?: string;
}) {
  return (
    <Image
      src={crossImage}
      alt="Church Cross"
      width={width}
      height={height}
      className={className}
      loading="eager"
    />
  );
}
