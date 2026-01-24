"use client";


import Container from "react-bootstrap/Container";
import Stack from "react-bootstrap/Stack";

import LinkButton from "@/components/shared/LinkButton";
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
            <Stack
              direction="horizontal"
              gap={2}
              className="justify-content-center mb-2"
            >
              <LinkButton href="/logout">
                Sign Out
              </LinkButton>
            </Stack>
          </>
        )}
      </Container>
    </footer>
  );
}
