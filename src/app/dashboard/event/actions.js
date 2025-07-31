"use server";

import { revalidatePath } from "next/cache";

export async function revalidatePathEvent() {
  revalidatePath("/event");
  revalidatePath("/");
}
