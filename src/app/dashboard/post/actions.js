"use server";

import { revalidatePath } from "next/cache";

export async function revalidatePathPost(id = "") {
  revalidatePath("/post");
  revalidatePath("/");
  if (id) revalidatePath(`/post/${id}`);
}
