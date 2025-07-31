"use server";

import { revalidatePath } from "next/cache";

export async function revalidatePathGallery() {
  revalidatePath("/gallery");
  revalidatePath("/", "layout");
}
