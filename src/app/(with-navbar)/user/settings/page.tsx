import type { Metadata } from "next";
import { redirect } from "next/navigation";

import LinkButton from "@/components/ui/LinkButton";
import { verifySession } from "@/lib/auth-session";

export const metadata: Metadata = {
  title: "Settings",
  description: "Manage your login and security settings.",
};

export default async function Page() {
  if (!(await verifySession())) {
    redirect("/login");
  }

  return (
    <>
      <h1 className="fs-2">Settings</h1>
      <hr />
      <h2 className="fs-3">Login & Security</h2>
      <p className="mb-3">Manage your login and security settings.</p>
      <LinkButton href="/user/settings/security">
        Go to Security Settings
      </LinkButton>
    </>
  );
}
