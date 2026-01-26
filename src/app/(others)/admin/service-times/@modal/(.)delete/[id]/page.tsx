import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { verifyUserAdmin } from "@/lib/auth-session";
import dbConnect from "@/lib/mongodb";
import ServiceTimeModel from "@/models/ServiceTime";

import DeleteServiceTimeForm from "./_components/DeleteServiceTimeForm";

async function deleteServiceTime(
  state: FormState,
  formData: FormData
): Promise<FormState> {
  "use server";

  if (!(await verifyUserAdmin())) {
    redirect("/login");
  }

  try {
    await dbConnect();
    await ServiceTimeModel.deleteOne({ _id: formData.get("id") });
  } catch (error) {
    console.error("Error deleting service time:", error);
    return { status: "error", message: "Failed to delete service time." };
  }

  revalidatePath("/admin/service-times");

  return { status: "success" };
}

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
    <DeleteServiceTimeForm
      submitAction={deleteServiceTime}
      serviceTimeId={id}
    />
  );
}
