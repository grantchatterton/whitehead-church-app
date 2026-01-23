import Container from "react-bootstrap/Container";

import AppNavbar from "@/components/shared/AppNavbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AppNavbar title="Whitehead Baptist Church" />
      <Container as="main" className="my-4 text-center text-md-start">
        {children}
      </Container>
    </>
  );
}
