"use server";

import { revalidatePath } from "next/cache";

export async function revalidatePathTeacher(id = "") {
  revalidatePath("/teacher");
  revalidatePath("/", "layout");
  if (id) revalidatePath(`/teacher/${id}`);
}
