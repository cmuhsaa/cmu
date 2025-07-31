"use server";

import { revalidatePath } from "next/cache";

export async function revalidatePathNotice(id = "") {
  revalidatePath("/notice");
  revalidatePath("/");
  if (id) revalidatePath(`/notice/${id}`);
}
