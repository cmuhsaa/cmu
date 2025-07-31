"use server";

import { revalidatePath } from "next/cache";

export async function revalidatePathStudent(id = "") {
  revalidatePath("/dashboard/student/request");
  revalidatePath("/", "layout");
  if (id) revalidatePath(`/student/${id}`);
}
