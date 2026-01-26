import Container from "react-bootstrap/Container";

import AppNavbar from "@/components/ui/AppNavbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AppNavbar />
      <Container className="my-4 text-center text-md-start">
        {children}
      </Container>
    </>
  );
}
