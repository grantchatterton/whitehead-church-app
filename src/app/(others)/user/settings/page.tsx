import { headers } from "next/headers";

import Container from "react-bootstrap/Container";

import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

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
      <h1 className="fs-2">User Settings</h1>
      <hr />
      <p>This is the user settings page.</p>
    </Container>
  );
}
