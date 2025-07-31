"use server";

import { revalidatePath } from "next/cache";

export async function revalidatePathNotice(id = "") {
  revalidatePath("/notice");
  revalidatePath("/", "layout");
  if (id) revalidatePath(`/notice/${id}`);
}
