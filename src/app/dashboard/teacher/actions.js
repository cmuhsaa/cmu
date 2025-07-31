"use server";

import { revalidatePath } from "next/cache";

export async function revalidatePathTeacher(id = "") {
  revalidatePath("/", "layout");
  if (id) revalidatePath(`/teacher/${id}`);
}
