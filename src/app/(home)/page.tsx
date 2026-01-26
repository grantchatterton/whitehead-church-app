import type { Metadata } from "next";
import { headers } from "next/headers";

import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Row from "react-bootstrap/Row";
import Stack from "react-bootstrap/Stack";

import { AppNavbarItems } from "@/components/ui/AppNavbar";
import LinkButton from "@/components/ui/LinkButton";
import CrossImage from "@/components/ui/images/CrossImage";
import { auth } from "@/lib/auth";
import { getServiceTimes } from "@/lib/data";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Welcome to Whitehead Baptist Church, located in the Blue Ridge Mountains of North Carolina. Join us for worship and fellowship.",
};

const appTitle = process.env.NEXT_PUBLIC_APP_TITLE!;
const address = "5444 Pine Swamp Rd, Sparta, North Carolina, 28675";

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user;
  const isAdmin = user?.role?.includes("admin") || false;

  const serviceTimes = await getServiceTimes({ formatTimes: true });

  return (
    <Stack as="main">
      <Container className="m-auto py-4">
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
            {isAdmin && (
              <LinkButton href="/admin/service-times" className="mb-2">
                Manage Service Times
              </LinkButton>
            )}
            <ul className="list-unstyled mb-0">
              {serviceTimes.map((service) => (
                <li key={service._id}>
                  {service.name} ({service.days.join(", ")}):{" "}
                  {service.startTime} - {service.endTime}
                </li>
              ))}
            </ul>
          </Col>
        </Row>
      </Container>
    </Stack>
  );
}
