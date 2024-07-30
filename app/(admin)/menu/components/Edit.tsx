import React, { Suspense, useEffect, useRef, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Form, FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import FormInput from "@/components/FormInput";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import EditMenuItemLoading from "@/components/LoadingSkeletons/EditMenuItemLoading";
import { Button } from "@/components/ui/button";
import { MenuItemSchemaWithImageString } from "@/schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Row } from "@tanstack/react-table";
import { MenuItem } from "@/typings";
import { Session } from "next-auth";
import { toast } from "sonner";
import { z } from "zod";
import { getMenuItemsByMenuId } from "@/actions/user/menu-items/get-menuitems-by-menuid";
import { updateMenuItem } from "@/actions/admin/menu-items/update";
import { Edit2 } from "lucide-react";

type EditProps = {
  row: Row<MenuItem>;
  session: Session | null;
};

const Edit = ({ row, session }: EditProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const sheetTriggerRef = useRef<HTMLButtonElement | null>(null);

  const form = useForm<z.infer<typeof MenuItemSchemaWithImageString>>({
    resolver: zodResolver(MenuItemSchemaWithImageString),
    defaultValues: {
      name: "",
      description: "",
      image: null,
    },
  });

  const fileRef = form.register("image");

  const setPrevMenuItem = async () => {
    form.setValue("name", row.getValue("name"));
    form.setValue("description", row.getValue("description"));
    form.setValue("price", row.getValue("price"));
  };

  const [isImgLoading, setIsImgLoading] = useState(true);

  useEffect(() => {
    setIsImgLoading(true);
  }, [row.getValue("image")]);

  const handleLoad = () => {
    setIsImgLoading(false);
  };

  type EditMenuItem = {
    name?: string;
    description?: string;
    price?: number;
    image?: string;
  };

  type Response = {
    success?: string;
    error?: string;
  };

  const handleResponse = (res: Response) => {
    if (res.success) {
      if (sheetTriggerRef.current?.attributes[4].nodeValue === "open") {
        sheetTriggerRef.current?.click();
      }
      toast.success(res.success, {
        position: "bottom-center",
      });
      setIsSubmitting(false);
      form.reset();
    } else {
      toast.error(res.error, {
        position: "bottom-center",
      });
      setIsSubmitting(false);
    }
  };

  const updateWithImage = async (formData: FormData) => {
    setIsSubmitting(true);

    const prevName = row.getValue("name");
    const prevDescription = row.getValue("description");
    const prevPrice = row.getValue("price");

    const newValues = form.getValues();

    const newName = newValues.name;
    const newDescription = newValues.description;
    const newPrice = newValues.price;

    const index = parseInt(row.id);

    try {
      const menuItems: MenuItem[] | null = await getMenuItemsByMenuId(
        session?.user.menuId!
      );

      const menuItemToEdit = (menuItems as MenuItem[])[index].id;

      const cloudinaryResponse = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const imageData = await cloudinaryResponse.json();
      const image = imageData.url as string;

      const newValuesForUpdate: EditMenuItem = {
        name: prevName !== newName ? newName : undefined,
        description:
          prevDescription !== newDescription ? newDescription : undefined,
        price: prevPrice !== newPrice ? newPrice : undefined,
        image,
      };

      const res = await updateMenuItem(
        menuItemToEdit as string,
        newValuesForUpdate
      );

      handleResponse(res);
    } catch (error) {
      console.log(error);
    }
  };
  const updateWithoutImage = async () => {
    setIsSubmitting(true);

    const prevName = row.getValue("name");
    const prevDescription = row.getValue("description");
    const prevPrice = row.getValue("price");

    const newValues = form.getValues();

    const newName = newValues.name;
    const newDescription = newValues.description;
    const newPrice = newValues.price;

    const newValuesForUpdate: EditMenuItem = {
      name: prevName !== newName ? newName : undefined,
      description:
        prevDescription !== newDescription ? newDescription : undefined,
      price: prevPrice !== newPrice ? newPrice : undefined,
    };

    const index = parseInt(row.id);
    const menuItems: MenuItem[] | null = await getMenuItemsByMenuId(
      session?.user.menuId!
    );
    // @ts-ignore
    const menuItemToEdit = menuItems[index].id;

    const res = await updateMenuItem(
      menuItemToEdit as string,
      newValuesForUpdate
    );

    handleResponse(res);
  };

  const handleSubmit = async (values: EditMenuItem) => {
    if (values.description === "") {
      toast.warning("Continuing without description...", {
        position: "bottom-center",
      });
    }

    const image = values.image?.[0];

    if (image) {
      const formData = new FormData();
      formData.append("file", image);
      formData.append(
        "upload_preset",
        process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET as string
      );

      updateWithImage(formData);
    } else {
      updateWithoutImage();
    }
  };
  return (
    <>
      <Sheet>
        <Button
          className="bg-transparent w-24 flex justify-start hover:bg-[#16a34a27] rounded-sm space-x-1 px-2 py-1 text-primary border-2 border-primary transition-all duration-300 cursor-pointer"
          asChild
          onClick={setPrevMenuItem}
        >
          <SheetTrigger ref={sheetTriggerRef} className="!px-2 !py-1">
            <Edit2 />
            <span>Edit</span>
          </SheetTrigger>
        </Button>
        <SheetContent side={"right"} className="z-[100]">
          <SheetHeader>
            <SheetTitle className="mb-3">
              Update {row.getValue("name")}
            </SheetTitle>
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
                          formLabel="New dish name"
                          isRequired={false}
                          inputTsx={
                            <Input
                              disabled={isSubmitting ? true : false}
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
                        formLabel="New description"
                        isRequired={false}
                        inputTsx={
                          <Textarea
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
                        formLabel="New price"
                        isRequired={false}
                        inputTsx={
                          <Input
                            disabled={isSubmitting ? true : false}
                            type="number"
                            {...field}
                            onChange={(e) => field.onChange(+e.target.value)}
                          />
                        }
                      />
                    )}
                  />

                  <FormInput
                    formLabel="Current image"
                    isRequired={false}
                    inputTsx={
                      <div className="rounded-lg w-72 h-48 relative">
                        {isImgLoading && <EditMenuItemLoading />}
                        <Suspense fallback={<EditMenuItemLoading />}>
                          <Image
                            src={row.getValue("image")}
                            width={288}
                            height={192}
                            className={`absolute object-cover rounded-lg w-72 h-48`}
                            alt="food-image"
                            onLoad={handleLoad}
                          />
                        </Suspense>
                      </div>
                    }
                  />

                  <FormField
                    control={form.control}
                    name="image"
                    render={() => (
                      <FormInput
                        formLabel="New image"
                        isRequired={false}
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
                    {isSubmitting ? "Updating..." : "Update"}
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

export default Edit;
