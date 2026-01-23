import Container from "react-bootstrap/Container";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Container as="main" className="my-4 text-center text-md-start">
      {children}
    </Container>
  );
}
