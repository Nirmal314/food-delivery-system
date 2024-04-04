"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

const extractPublicId = (url: string): string => {
  const urlParts = url.split("/");

  const fileName = urlParts[urlParts.length - 1];

  return fileName.split(".")[0];
};

type EditMenuItem = {
  name?: string;
  description?: string;
  price?: number;
  image?: string;
};

export const updateMenuItem = async (id: string, values: EditMenuItem) => {
  const data: EditMenuItem = {};

  if (values.name) {
    data.name = values.name;
  }

  if (values.description || values.description === "") {
    data.description = values.description;
  }

  if (values.price) {
    data.price = values.price;
  }

  if (values.image) {
    data.image = values.image;
  }

  try {
    if (data.image) {
      const oldImage = await db.menuItem.findUnique({
        where: {
          id: id,
        },
      });

      const oldImagePublicId = extractPublicId(oldImage?.image!);

      const cres = await fetch("http://localhost:3000/api/deletecloudinary", {
        method: "POST",
        body: JSON.stringify({ selectedImages: oldImagePublicId }),
      });
    }

    const updatedMenuitem = await db.menuItem.update({
      where: {
        id: id,
      },

      data: data,
    });

    revalidatePath("/menu");
  } catch (e) {
    console.log(e);
    return { error: "Something went wrong." };
  }

  return { success: "Food item updated!" };
};
