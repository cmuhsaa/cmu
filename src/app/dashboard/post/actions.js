"use server";

import { revalidatePath } from "next/cache";

export async function revalidatePathPost(id = "") {
  revalidatePath("/post");
  revalidatePath("/", "layout");
  if (id) revalidatePath(`/post/${id}`);
}
