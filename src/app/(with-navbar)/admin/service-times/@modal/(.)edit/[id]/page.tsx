import { redirect } from "next/navigation";

import ServiceTimeModal from "@/components/ui/modals/ServiceTimeModal";
import { editServiceTime } from "@/lib/actions";
import { verifyUserAdmin } from "@/lib/auth-session";
import { getServiceTimeById } from "@/lib/data";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  if (!(await verifyUserAdmin())) {
    redirect("/login");
  }

  return (
    <ServiceTimeModal
      title="Edit Service Time"
      submitAction={editServiceTime}
      submitLabel="Save"
      serviceTimePromise={getServiceTimeById(id)}
    />
  );
}
