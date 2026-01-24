import Stack from "react-bootstrap/Stack";

import AppNavbar from "@/components/ui/AppNavbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AppNavbar />
      <Stack as="main">{children}</Stack>
    </>
  );
}
