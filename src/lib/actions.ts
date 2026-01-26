"use server";

import { refresh } from "next/cache";
import { redirect } from "next/navigation";

import dbConnect from "@/lib/mongodb";
import ServiceTimeModel from "@/models/ServiceTime";
import { ServiceTimeSchema } from "@/schemas/ServiceTime";

import { verifyUserAdmin } from "./auth-session";

export async function addStarterServiceTimes() {
  if (!(await verifyUserAdmin())) {
    redirect("/login");
  }

  try {
    await dbConnect();

    const existingCount = await ServiceTimeModel.countDocuments();
    if (existingCount > 0) {
      return;
    }

    const starterServiceTimes = [
      {
        name: "Sunday Morning Service",
        days: ["Sunday"],
        startTime: "09:00",
        endTime: "10:30",
      },
      {
        name: "Wednesday Evening Service",
        days: ["Wednesday"],
        startTime: "19:00",
        endTime: "20:30",
      },
    ];
    await ServiceTimeModel.insertMany(starterServiceTimes);
  } catch (error) {
    console.error("Error adding starter service times:", error);
  }

  refresh();
}

export async function createServiceTime(
  state: FormState,
  formData: FormData
): Promise<FormState> {
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

  refresh();
  return {
    status: "success",
    message: "Service time created successfully.",
  };
}

export async function deleteServiceTime(id: string): Promise<FormState> {
  if (!(await verifyUserAdmin())) {
    redirect("/login");
  }

  try {
    await dbConnect();
    await ServiceTimeModel.deleteOne({ _id: id });
  } catch (error) {
    console.error("Error deleting service time:", error);
    return { status: "error", message: "Failed to delete service time." };
  }

  refresh();
  return { status: "success" };
}

export async function editServiceTime(
  state: FormState,
  formData: FormData
): Promise<FormState> {
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

  refresh();
  return { status: "success", message: "Service time updated successfully." };
}
