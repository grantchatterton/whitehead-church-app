import Container from "react-bootstrap/Container";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Container as="main" className="mt-auto">
      {children}
    </Container>
  );
}
