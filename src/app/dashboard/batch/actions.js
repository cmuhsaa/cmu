"use server";

import { revalidatePath } from "next/cache";

export async function revalidatePathBatches() {
  revalidatePath("/dashboard/batch");
}
