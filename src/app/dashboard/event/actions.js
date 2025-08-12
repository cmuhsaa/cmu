"use server";

import { revalidatePath } from "next/cache";

export async function revalidatePathEvent(id) {
  if (id) revalidatePath(`/event/${id}`);
  revalidatePath("/event");
  revalidatePath("/", "layout");
}
