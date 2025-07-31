"use server";

import { revalidatePath } from "next/cache";

export async function revalidatePathEvent(id = "") {
  revalidatePath("/event");
  revalidatePath("/");
  if (id) revalidatePath(`/event/${id}`);
}
