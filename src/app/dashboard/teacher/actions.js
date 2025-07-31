"use server";

import { revalidatePath } from "next/cache";

export async function revalidatePathTeacher(id = "") {
  revalidatePath("/teacher");
  revalidatePath("/");
  if (id) revalidatePath(`/teacher/${id}`);
}
