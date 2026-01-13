"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import Nav from "react-bootstrap/Nav";

export default function AppNavbarItems() {
  const pathname = usePathname();

  const items = [
    { id: 1, href: "/", label: "Home" },
    { id: 2, href: "/about", label: "About" },
    { id: 3, href: "/gallery", label: "Gallery" },
  ];

  return (
    <Nav className="gap-3" activeKey={pathname}>
      {items.map((item) => (
        <Nav.Link key={item.id} as={Link} href={item.href} eventKey={item.href}>
          {item.label}
        </Nav.Link>
      ))}
    </Nav>
  );
}
