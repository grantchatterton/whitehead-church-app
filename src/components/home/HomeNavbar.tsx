import Navbar from "react-bootstrap/Navbar";
import Stack from "react-bootstrap/Stack";

import AppNavbarItems from "@/components/shared/AppNavbarItems";
import CrossImage from "@/components/shared/CrossImage";
import { title } from "@/lib/config";

export default function HomeNavbar() {
  return (
    <>
      <Stack direction="horizontal" className="justify-content-center" gap={2}>
        <CrossImage width={96} height={96} />
        <h1 className="fw-bold">{title}</h1>
      </Stack>
      <Navbar className="justify-content-center mt-3">
        <AppNavbarItems />
      </Navbar>
    </>
  );
}
