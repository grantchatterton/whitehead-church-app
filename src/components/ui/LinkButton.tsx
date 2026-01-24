import Link from "next/link";

import clsx from "clsx";

type LinkButtonProps = React.ComponentProps<typeof Link>;

export default function LinkButton({ className, ...props }: LinkButtonProps) {
  return (
    <Link className={clsx("btn btn-outline-light", className)} {...props} />
  );
}
