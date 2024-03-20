"use client";

import React, { useRef, useState } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { useToast } from "./ui/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MenuItemSchema } from "@/schemas";
import { z } from "zod";
import { addMenuItem } from "@/actions/admin/addmenuitem";
import FormInput from "./FormInput";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";

const AddMenuItem = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const sheetTriggerRef = useRef<HTMLButtonElement | null>(null);
  const imageRef = useRef<HTMLInputElement>(null);

  const form = useForm<z.infer<typeof MenuItemSchema>>({
    resolver: zodResolver(MenuItemSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const fileRef = form.register("image");
  const handleSubmit = async (values: z.infer<typeof MenuItemSchema>) => {
    setIsSubmitting(true);

    const formImage = values.image[0];

    const formData = new FormData();
    formData.append("file", formImage);
    formData.append(
      "upload_preset",
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET as string
    );
    try {
      const cloudinaryResponse = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const imageData = await cloudinaryResponse.json();
      const image = imageData.url as string;

      values.image = image;

      const addMenuItemResponse = await addMenuItem(values);

      if (addMenuItemResponse.success) {
        if (sheetTriggerRef.current?.attributes[4].nodeValue === "open") {
          sheetTriggerRef.current?.click();
        }
        console.log(sheetTriggerRef.current?.attributes[4].nodeValue);
        toast({
          description: addMenuItemResponse.success,
        });
        setIsSubmitting(false);
        form.reset();
      } else {
        toast({
          description: addMenuItemResponse.error,
          variant: "destructive",
        });
        setIsSubmitting(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Sheet>
        <SheetTrigger
          ref={sheetTriggerRef}
          className="bg-transparent hover:bg-[#16a34a27] rounded-sm flex justify-start items-center space-x-1 text-primary px-4 py-2 border-2 border-primary transition-all duration-300 cursor-pointer"
        >
          Add a new dish
        </SheetTrigger>
        <SheetContent side={"right"} className="z-[100]">
          <SheetHeader>
            <SheetTitle className="mb-3">Details of the new recipe</SheetTitle>
            <SheetDescription>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(handleSubmit)}
                  className="max-w-md w-full flex flex-col gap-4"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => {
                      return (
                        <FormInput
                          formLabel="Name of the dish"
                          isRequired={true}
                          inputTsx={
                            <Input
                              disabled={isSubmitting ? true : false}
                              placeholder="Name of the dish"
                              type="text"
                              {...field}
                            />
                          }
                        />
                      );
                    }}
                  />
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormInput
                        formLabel="Dish Description"
                        isRequired={false}
                        inputTsx={
                          <Textarea
                            placeholder="Tell us somthing about your new dish"
                            disabled={isSubmitting ? true : false}
                            {...field}
                          />
                        }
                      />
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormInput
                        formLabel="Price"
                        isRequired={true}
                        inputTsx={
                          <Input
                            disabled={isSubmitting ? true : false}
                            placeholder="Price of dish"
                            type="number"
                            {...field}
                            onChange={(e) => field.onChange(+e.target.value)}
                          />
                        }
                      />
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="image"
                    render={() => (
                      <FormInput
                        formLabel="Dish image"
                        isRequired={true}
                        inputTsx={
                          <Input
                            disabled={isSubmitting ? true : false}
                            type="file"
                            {...fileRef}
                          />
                        }
                      />
                    )}
                  />
                  <Button
                    disabled={isSubmitting ? true : false}
                    type="submit"
                    className="w-1/2 px-4"
                  >
                    {isSubmitting ? "Adding..." : "Add to menu"}
                  </Button>
                </form>
              </Form>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default AddMenuItem;
