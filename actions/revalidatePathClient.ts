"use server";

import { revalidatePath } from "next/cache";

export const revalidatePathClient = async (path: string) => {
  console.log("revalidating...");
  revalidatePath(path);
};
