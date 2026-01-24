"use client";

import Container from "react-bootstrap/Container";
import Stack from "react-bootstrap/Stack";

import LinkButton from "@/components/ui/LinkButton";
import { useSession } from "@/lib/auth-client";

const appTitle = process.env.NEXT_PUBLIC_APP_TITLE!;

export default function AppFooter() {
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <footer className="footer text-center mt-auto">
      <Container>
        <p className="mb-0">
          &copy; {new Date().getFullYear()} {appTitle}. All rights reserved.
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
            <Stack
              direction="horizontal"
              gap={2}
              className="justify-content-center mb-2"
            >
              <LinkButton href="/user/settings">Settings</LinkButton>
              <LinkButton href="/logout">Sign Out</LinkButton>
            </Stack>
          </>
        )}
      </Container>
    </footer>
  );
}
