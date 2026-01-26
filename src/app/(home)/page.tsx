import type { Metadata } from "next";

import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Row from "react-bootstrap/Row";
import Stack from "react-bootstrap/Stack";

import { AppNavbarItems } from "@/components/ui/AppNavbar";
import CrossImage from "@/components/ui/images/CrossImage";

import ServiceTimesList from "../../components/ui/lists/ServiceTimesList";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Welcome to Whitehead Baptist Church, located in the Blue Ridge Mountains of North Carolina. Join us for worship and fellowship.",
};

const address = "5444 Pine Swamp Rd, Sparta, North Carolina, 28675";

const appTitle = process.env.NEXT_PUBLIC_APP_TITLE!;

export default function Page() {
  return (
    <Container className="my-auto">
      <Stack
        direction="horizontal"
        className="justify-content-center p-2"
        gap={2}
      >
        <CrossImage width={96} height={96} />
        <h1 className="fw-bold text-center mb-0">{appTitle}</h1>
      </Stack>
      <Navbar className="justify-content-center mt-3">
        <AppNavbarItems />
      </Navbar>
      <hr className="mt-0" />
      <Row className="mx-auto">
        <Col className="text-center mb-4 mb-md-0" md={6}>
          <h3 className="mb-2">Location</h3>
          <a
            className="mb-0"
            href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`}
            target="_blank"
          >
            {address}
          </a>
        </Col>
        <Col className="text-center" md={6}>
          <h3 className="mb-2">Service Times</h3>
          <ServiceTimesList />
        </Col>
      </Row>
    </Container>
  );
}
