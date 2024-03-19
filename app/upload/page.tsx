"use client";

import FormInput from "@/components/FormInput";
import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import cloudinary from "@/lib/cloudinary";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const page = () => {
  const MenuItemSchema = z.object({
    image: z.any(),
  });
  const form = useForm<z.infer<typeof MenuItemSchema>>({
    resolver: zodResolver(MenuItemSchema),
  });

  const fileRef = form.register("image");

  const handleSubmit = async (values: z.infer<typeof MenuItemSchema>) => {
    const image = values.image[0] as File;
    const arrayBuffer = await image.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // cloudinary.api.resources().then((result) => console.log(result));
    // console.log(cloudinary);

    // await new Promise((resolve, reject) => {
    //   cloudinary.uploader
    //     .upload_stream(
    //       {
    //         tags: ["nextjs-server-actions-upload-sneakers"],
    //         upload_preset: "nextjs-server-actions-upload",
    //       },
    //       function (error, result) {
    //         if (error) {
    //           reject(error);
    //           return;
    //         }
    //         resolve(result);
    //       }
    //     )
    //     .end(buffer);
    // });
  };
  return (
    <div className="flex flex-col w-full h-screen justify-center items-center">
      <div className="flex flex-col space-y-4 w-56">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            // action={handleAction}
            className="max-w-md w-full flex flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="image"
              render={() => (
                <FormInput
                  formLabel="Dish image"
                  isRequired={true}
                  inputTsx={<Input {...fileRef} type="file" />}
                />
              )}
            />
            <Button type="submit">Add</Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default page;
