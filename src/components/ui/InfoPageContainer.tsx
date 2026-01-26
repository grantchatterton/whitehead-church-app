import Container from "react-bootstrap/Container";

export default function InfoPageContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Container className="my-4 text-center text-md-start">{children}</Container>
  );
}
