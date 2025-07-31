"use server";

import { revalidatePath } from "next/cache";

export async function revalidatePathContent() {
  revalidatePath("/");
  revalidatePath("/objectives");
  revalidatePath("/messageFromSecretary");
  revalidatePath("/messageFromPresident");
  revalidatePath("/messageFromChiefPatron");
  revalidatePath("/introduction");
  revalidatePath("/background");
}
