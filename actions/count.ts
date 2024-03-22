"use server";

import { revalidateTag } from "next/cache";

export const updateCountInDb = async (amount: number) => {
  if (!amount) return;

  await fetch("http://localhost:3000/api/count", {
    method: "POST",
    cache: "no-cache",
    body: JSON.stringify({ amount }),
  });

  revalidateTag("count");
};
