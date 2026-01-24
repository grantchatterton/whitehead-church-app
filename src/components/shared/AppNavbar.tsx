"use client";

import Link from "next/link";

import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

import AppNavbarItems from "./AppNavbarItems";
import CrossImage from "./CrossImage";

const appTitle = process.env.NEXT_PUBLIC_APP_TITLE!;

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
