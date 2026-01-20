"use client";

import Link from "next/link";

import Container from "react-bootstrap/Container";
import Stack from "react-bootstrap/Stack";

import { useSession } from "@/lib/auth-client";

export default function AppFooter({ title }: { title: string }) {
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <footer className="footer text-center mt-auto">
      <Container>
        <p className="mb-0">
          &copy; {new Date().getFullYear()} {title}. All rights reserved.
        </p>
        {/* <p className="mb-0">
          Made with ❤️ by{" "}
          <a
            href="https://grantchatterton.com"
            target="_blank"
          >
            Grant Chatterton
          </a>
        </p> */}
        {user && (
          <>
            <p className="mb-2">
              Signed in as <strong>{user.email}</strong>
            </p>
            <Link href="/logout" className="btn btn-outline-light">
              Sign Out
            </Link>
          </>
        )}
      </Container>
    </footer>
  );
}
