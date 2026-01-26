import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import ServiceTimeForm from "@/components/ui/forms/ServiceTimeForm";
import WrapperModal from "@/components/ui/modals/WrapperModal";
import { verifyUserAdmin } from "@/lib/auth-session";
import dbConnect from "@/lib/mongodb";
import ServiceTimeModel from "@/models/ServiceTime";
import { ServiceTimeSchema } from "@/schemas/ServiceTime";

async function createServiceTime(
  state: FormState,
  formData: FormData
): Promise<FormState> {
  "use server";

  if (!(await verifyUserAdmin())) {
    redirect("/login");
  }

  const rawFormData = {
    name: formData.get("name") as string,
    days: formData.getAll("days") as string[],
    startTime: formData.get("startTime") as string,
    endTime: formData.get("endTime") as string,
  };
  const validatedFormData = ServiceTimeSchema.safeParse(rawFormData);
  if (!validatedFormData.success) {
    return {
      status: "error",
      message: validatedFormData.error.issues[0].message,
    };
  }

  try {
    await dbConnect();
    await ServiceTimeModel.create({
      name: validatedFormData.data.name,
      days: validatedFormData.data.days,
      startTime: validatedFormData.data.startTime,
      endTime: validatedFormData.data.endTime,
    });
  } catch (error) {
    console.error("Error creating service time:", error);
    return { status: "error", message: "Failed to create service time." };
  }

  revalidatePath("/admin/service-times");

  return {
    status: "success",
    message: "Service time created successfully.",
  };
}

export default async function Page() {
  if (!(await verifyUserAdmin())) {
    redirect("/login");
  }

  return (
    <WrapperModal title="Create Service Time">
      <ServiceTimeForm submitAction={createServiceTime} />
    </WrapperModal>
  );
}
