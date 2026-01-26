import { redirect } from "next/navigation";

import InfoPage from "@/components/ui/InfoPage";
import LinkButton from "@/components/ui/LinkButton";
import { verifyUserAdmin } from "@/lib/auth-session";

export default async function Page() {
  if (!(await verifyUserAdmin())) {
    redirect("/login");
  }

  return (
    <InfoPage title="Admin Dashboard">
      <p>Welcome to the admin dashboard.</p>
      <LinkButton href="/admin/service-times">Manage Service Times</LinkButton>
    </InfoPage>
  );
}
