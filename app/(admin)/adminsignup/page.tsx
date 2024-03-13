"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AdminSignupSchema } from "@/schemas";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { adminSignup } from "@/actions/adminsignup";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Cuisine } from "@prisma/client";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Signup = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [creatingAccount, setCreatingAccount] = useState(false);
  const [cuisine, setCuisine] = useState("");
  const form = useForm<z.infer<typeof AdminSignupSchema>>({
    resolver: zodResolver(AdminSignupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordConfirm: "",
      contactNumber: "",
      restaurantName: "",
      restaurantPhone: "",
      cuisine: "",
      address: "",
      description: "",
    },
  });

  const handleSubmit = async (values: z.infer<typeof AdminSignupSchema>) => {
    setCreatingAccount(true);
    // const response = await adminSignup(values);
    // if (response.success) {
    //   toast({
    //     description: response.success,
    //   });
    //   setTimeout(() => {
    //     router.push("/adminlogin");
    //   }, 3000);
    // } else {
    //   toast({
    //     // @ts-ignore
    //     description: response.error,
    //     variant: "destructive",
    //   });
    //   setCreatingAccount(false);
    // }
  };

  return (
    <>
      <div className="w-full h-screen flex flex-col justify-center items-center space-y-10">
        <Card className="w-[80%]">
          <CardHeader>
            <CardTitle>
              <p className="text-center text-4xl font-bold text-primary">
                Create your admin account
              </p>
            </CardTitle>
          </CardHeader>
          <CardContent className="flex w-full justify-center items-center">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="w-full h-3/4 flex flex-col gap-4"
              >
                <div className="flex justify-evenly p-4 w-full">
                  <div className="w-1/3 flex flex-col">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => {
                        return (
                          <FormItem>
                            <FormLabel>
                              Full Name
                              <span className="ml-1 text-red-700">*</span>
                            </FormLabel>
                            <FormControl>
                              <Input
                                disabled={creatingAccount ? true : false}
                                placeholder="Enter your full name"
                                type="text"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage className="px-3 py-2 text-gray-50 bg-red-500 rounded-md" />
                          </FormItem>
                        );
                      }}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => {
                        return (
                          <FormItem>
                            <FormLabel>
                              Email Address
                              <span className="ml-1 text-red-700">*</span>
                            </FormLabel>
                            <FormControl>
                              <Input
                                disabled={creatingAccount ? true : false}
                                placeholder="Enter your email address"
                                type="email"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage className="px-3 py-2 text-gray-50 bg-red-500 rounded-md" />
                          </FormItem>
                        );
                      }}
                    />
                    <FormField
                      control={form.control}
                      name="contactNumber"
                      render={({ field }) => {
                        return (
                          <FormItem>
                            <FormLabel>
                              Contact Number
                              <span className="ml-1 text-red-700">*</span>
                            </FormLabel>
                            <FormControl>
                              <Input
                                disabled={creatingAccount ? true : false}
                                placeholder="Enter your contact number"
                                type="tele"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage className="px-3 py-2 text-gray-50 bg-red-500 rounded-md" />
                          </FormItem>
                        );
                      }}
                    />
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => {
                        return (
                          <FormItem>
                            <FormLabel>
                              Password
                              <span className="ml-1 text-red-700">*</span>
                            </FormLabel>
                            <FormControl>
                              <Input
                                disabled={creatingAccount ? true : false}
                                placeholder="Password"
                                type="password"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage className="px-3 py-2 text-gray-50 bg-red-500 rounded-md" />
                          </FormItem>
                        );
                      }}
                    />
                    <FormField
                      control={form.control}
                      name="passwordConfirm"
                      render={({ field }) => {
                        return (
                          <FormItem>
                            <FormLabel>
                              Password confirm
                              <span className="ml-1 text-red-700">*</span>
                            </FormLabel>
                            <FormControl>
                              <Input
                                disabled={creatingAccount ? true : false}
                                placeholder="Password confirm"
                                type="password"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage className="px-3 py-2 text-gray-50 bg-red-500 rounded-md" />
                          </FormItem>
                        );
                      }}
                    />
                  </div>
                  <div className="w-1/3 flex flex-col">
                    <FormField
                      control={form.control}
                      name="restaurantName"
                      render={({ field }) => {
                        return (
                          <FormItem>
                            <FormLabel>
                              Restaurant Name
                              <span className="ml-1 text-red-700">*</span>
                            </FormLabel>
                            <FormControl>
                              <Input
                                disabled={creatingAccount ? true : false}
                                placeholder="Enter your restaurant's name"
                                type="text"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage className="px-3 py-2 text-gray-50 bg-red-500 rounded-md" />
                          </FormItem>
                        );
                      }}
                    />
                    <FormField
                      control={form.control}
                      name="restaurantPhone"
                      render={({ field }) => {
                        return (
                          <FormItem>
                            <FormLabel>
                              Contact Number
                              <span className="ml-1 text-red-700">*</span>
                            </FormLabel>
                            <FormControl>
                              <Input
                                disabled={creatingAccount ? true : false}
                                placeholder="Enter restaurant contact number"
                                type="tele"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage className="px-3 py-2 text-gray-50 bg-red-500 rounded-md" />
                          </FormItem>
                        );
                      }}
                    />

                    <FormField
                      control={form.control}
                      name="cuisine"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Cuisine Type
                            <span className="ml-1 text-red-700">*</span>
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select cuisine type." />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {Object.values(Cuisine).map((c, i) => (
                                <SelectItem key={i} value={c}>
                                  {c
                                    .split("_")
                                    .map(
                                      (word) =>
                                        word.charAt(0).toUpperCase() +
                                        word.slice(1).toLowerCase()
                                    )
                                    .join(" ")}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* <FormField
                      control={form.control}
                      name="cuisine"
                      render={({ field }) => {
                        return (
                          <FormItem>
                            <FormLabel>
                              Cuisine Type
                              <span className="ml-1 text-red-700">*</span>
                            </FormLabel>
                            <FormControl>
                              <DropdownMenu>
                                <DropdownMenuTrigger
                                  asChild
                                  className="flex justify-start"
                                >
                                  <Button variant={"outline"}>
                                    {cuisine === "" ? "Cuisine Type" : cuisine}
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56">
                                  <DropdownMenuRadioGroup
                                    // onValueChange={setCuisine}
                                    onValueChange={field.onChange}
                                  >
                                    {Object.values(Cuisine).map((c, i) => (
                                      <DropdownMenuRadioItem
                                        onClick={() =>
                                          setCuisine(
                                            c
                                              .split("_")
                                              .map(
                                                (word) =>
                                                  word.charAt(0).toUpperCase() +
                                                  word.slice(1).toLowerCase()
                                              )
                                              .join(" ")
                                          )
                                        }
                                        key={i}
                                        value={c}
                                      >
                                        {c
                                          .split("_")
                                          .map(
                                            (word) =>
                                              word.charAt(0).toUpperCase() +
                                              word.slice(1).toLowerCase()
                                          )
                                          .join(" ")}
                                      </DropdownMenuRadioItem>
                                    ))}
                                  </DropdownMenuRadioGroup>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </FormControl>
                            <FormMessage className="px-3 py-2 text-gray-50 bg-red-500 rounded-md" />
                          </FormItem>
                        );
                      }}
                    /> */}
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Restaurant Address{" "}
                            <span className="ml-1 text-red-700">*</span>{" "}
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Your restaurant's address"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="px-3 py-2 text-gray-50 bg-red-500 rounded-md" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Restaurant Description</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Tell us somthing about your restaurant"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="px-3 py-2 text-gray-50 bg-red-500 rounded-md" />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className="flex justify-center w-full">
                  <Button
                    disabled={creatingAccount ? true : false}
                    type="submit"
                    className="w-1/2"
                  >
                    {creatingAccount ? "Creating account..." : "Create account"}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Signup;
