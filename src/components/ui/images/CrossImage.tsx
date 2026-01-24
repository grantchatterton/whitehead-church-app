import Image from "next/image";

import crossImage from "@public/images/cross.png";

type CrossImageProps = Omit<React.ComponentProps<typeof Image>, "src" | "alt">;

export default function CrossImage({
  width = 192,
  height = 192,
  loading = "eager",
  ...props
}: CrossImageProps) {
  return (
    <Image
      src={crossImage}
      alt="Church Cross"
      width={width}
      height={height}
      loading={loading}
      {...props}
    />
  );
}
