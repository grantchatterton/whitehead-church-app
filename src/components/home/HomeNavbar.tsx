import Navbar from "react-bootstrap/Navbar";
import Stack from "react-bootstrap/Stack";

import AppNavbarItems from "@/components/shared/AppNavbarItems";
import CrossImage from "@/components/shared/CrossImage";

const title = "Whitehead Baptist Church";

export default function HomeNavbar() {
  return (
    <>
      <Stack direction="horizontal" className="justify-content-center p-2" gap={2}>
        <CrossImage width={96} height={96} />
        <h1 className="fw-bold mb-0">{title}</h1>
      </Stack>
      <Navbar className="justify-content-center mt-3">
        <AppNavbarItems />
      </Navbar>
    </>
  );
}
