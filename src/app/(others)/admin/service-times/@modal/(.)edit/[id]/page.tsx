import { revalidatePath } from "next/cache";
import { notFound, redirect } from "next/navigation";

import ServiceTimeForm from "@/components/ui/forms/ServiceTimeForm";
import WrapperModal from "@/components/ui/modals/WrapperModal";
import { verifyUserAdmin } from "@/lib/auth-session";
import dbConnect from "@/lib/mongodb";
import ServiceTimeModel from "@/models/ServiceTime";
import { ServiceTimeSchema } from "@/schemas/ServiceTime";

async function editServiceTime(
  state: FormState,
  formData: FormData
): Promise<FormState> {
  "use server";

  if (!(await verifyUserAdmin())) {
    redirect("/login");
  }

  const rawFormData = {
    id: formData.get("id") as string,
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
    await ServiceTimeModel.updateOne(
      { _id: validatedFormData.data.id },
      {
        name: validatedFormData.data.name,
        days: validatedFormData.data.days,
        startTime: validatedFormData.data.startTime,
        endTime: validatedFormData.data.endTime,
      }
    );
  } catch (error) {
    return { status: "error", message: (error as Error).message };
  }

  revalidatePath("/admin/service-times");

  return { status: "success", message: "Service time updated successfully." };
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

  await dbConnect();
  const serviceTime = await ServiceTimeModel.findById(id).lean();
  if (!serviceTime) {
    notFound();
  }

  const serviceTimeWithStringId = {
    ...serviceTime,
    _id: serviceTime._id.toString(),
  };

  return (
    <WrapperModal title="Edit Service Time">
      <ServiceTimeForm
        submitAction={editServiceTime}
        serviceTime={serviceTimeWithStringId}
      />
    </WrapperModal>
  );
}
