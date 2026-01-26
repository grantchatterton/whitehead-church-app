import { Metadata } from "next";

import Container from "react-bootstrap/Container";

export const metadata: Metadata = {
  title: "Admin",
  description: "Admin Dashboard",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Container className="my-4 text-center text-md-start">{children}</Container>
  );
}
