"use server";

import { revalidatePath } from "next/cache";

export async function revalidatePathGallery(id = "") {
  revalidatePath("/gallery");
  revalidatePath("/");
  if (id) revalidatePath(`/gallery/${id}`);
}
