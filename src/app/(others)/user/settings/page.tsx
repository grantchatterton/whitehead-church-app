import type { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import Container from "react-bootstrap/Container";

import LinkButton from "@/components/ui/LinkButton";
import { auth } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Settings",
  description: "Manage your login and security settings.",
};

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user;
  if (!user) {
    redirect("/login");
  }

  return (
    <Container className="my-4 text-center text-md-start">
      <h1 className="fs-2">Settings</h1>
      <hr />
      <h2 className="fs-3">Login & Security</h2>
      <p className="mb-3">Manage your login and security settings.</p>
      <LinkButton href="/user/settings/security">
        Go to Security Settings
      </LinkButton>
    </Container>
  );
}
