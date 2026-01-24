"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import CrossImage from "./images/CrossImage";

const appTitle = process.env.NEXT_PUBLIC_APP_TITLE!;

const items = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/gallery", label: "Gallery" },
];

export function AppNavbarItems() {
  const pathname = usePathname();

  return (
    <Nav className="gap-3" activeKey={pathname}>
      {items.map((item) => (
        <Nav.Link
          key={item.href}
          as={Link}
          href={item.href}
          eventKey={item.href}
        >
          {item.label}
        </Nav.Link>
      ))}
    </Nav>
  );
}

export default function AppNavbar() {
  return (
    <Navbar>
      <Container className="flex-column flex-md-row align-items-center">
        <Navbar.Brand as={Link} href="/" className="mb-2 mb-md-0">
          <CrossImage width={30} height={30} />{" "}
          <span className="fw-bold">{appTitle}</span>
        </Navbar.Brand>
        <AppNavbarItems />
      </Container>
    </Navbar>
  );
}
