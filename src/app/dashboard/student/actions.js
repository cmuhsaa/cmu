"use server";

import { revalidatePath } from "next/cache";

export async function revalidatePathStudent(id = "") {
  revalidatePath("/student");
  revalidatePath("/", "layout");
  if (id) revalidatePath(`/student/${id}`);
}
