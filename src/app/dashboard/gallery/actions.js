"use server";

import { revalidatePath } from "next/cache";

export async function revalidatePathGallery(id) {
  revalidatePath("/gallery");
  revalidatePath("/", "layout");
  if (id) revalidatePath(`/gallery/${id}`);
}
