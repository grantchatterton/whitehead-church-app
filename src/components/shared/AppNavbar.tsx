"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

import AppNavbarItems from "./AppNavbarItems";
import CrossImage from "./CrossImage";

export default function AppNavbar({ title }: { title: string }) {
  const pathname = usePathname();
  if (pathname === "/") {
    return null;
  }

  return (
    <Navbar>
      <Container className="flex-column flex-md-row align-items-center">
        <Navbar.Brand as={Link} href="/" className="mb-2 mb-md-0">
          <CrossImage width={30} height={30} />{" "}
          <span className="fw-bold">{title}</span>
        </Navbar.Brand>
        <AppNavbarItems />
      </Container>
    </Navbar>
  );
}
