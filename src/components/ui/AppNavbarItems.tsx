"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import Nav from "react-bootstrap/Nav";

const items = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/gallery", label: "Gallery" },
];

export default function AppNavbarItems() {
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
