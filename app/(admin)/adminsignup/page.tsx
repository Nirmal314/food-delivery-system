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
import { adminSignup } from "@/actions/auth/adminsignup";

import { Cuisine } from "@prisma/client";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import FormInput from "@/components/FormInput";

const Signup = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [creatingAccount, setCreatingAccount] = useState(false);
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
    const response = await adminSignup(values);
    if (response.success) {
      toast({
        description: response.success,
      });
      setTimeout(() => {
        router.push("/login");
      }, 3000);
    } else {
      toast({
        // @ts-ignore
        description: response.error,
        variant: "destructive",
      });
      setCreatingAccount(false);
    }
  };

  const renderCuisine = (cuisine: string) => {
    return cuisine
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
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
                  <div className="w-1/3 flex flex-col space-y-7">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => {
                        return (
                          <FormInput
                            formLabel="Full Name"
                            isRequired={true}
                            inputTsx={
                              <Input
                                disabled={creatingAccount ? true : false}
                                placeholder="Enter your full name"
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
                      name="email"
                      render={({ field }) => {
                        return (
                          <FormInput
                            formLabel="Email Address"
                            isRequired={true}
                            inputTsx={
                              <Input
                                disabled={creatingAccount ? true : false}
                                placeholder="Enter your email address"
                                type="email"
                                {...field}
                              />
                            }
                          />
                        );
                      }}
                    />
                    <FormField
                      control={form.control}
                      name="contactNumber"
                      render={({ field }) => {
                        return (
                          <FormInput
                            formLabel="Contact Number"
                            isRequired={true}
                            inputTsx={
                              <Input
                                disabled={creatingAccount ? true : false}
                                placeholder="Enter your contact number"
                                type="tele"
                                {...field}
                              />
                            }
                          />
                        );
                      }}
                    />
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => {
                        return (
                          <FormInput
                            formLabel="Password"
                            isRequired={true}
                            inputTsx={
                              <Input
                                disabled={creatingAccount ? true : false}
                                placeholder="Password"
                                type="password"
                                {...field}
                              />
                            }
                          />
                        );
                      }}
                    />
                    <FormField
                      control={form.control}
                      name="passwordConfirm"
                      render={({ field }) => {
                        return (
                          <FormInput
                            formLabel="Password confirm"
                            isRequired={true}
                            inputTsx={
                              <Input
                                disabled={creatingAccount ? true : false}
                                placeholder="Password confirm"
                                type="password"
                                {...field}
                              />
                            }
                          />
                        );
                      }}
                    />
                  </div>
                  <div className="w-1/3 flex flex-col space-y-2">
                    <FormField
                      control={form.control}
                      name="restaurantName"
                      render={({ field }) => {
                        return (
                          <FormInput
                            formLabel="Restaurant Name"
                            isRequired={true}
                            inputTsx={
                              <Input
                                disabled={creatingAccount ? true : false}
                                placeholder="Enter your restaurant's name"
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
                      name="restaurantPhone"
                      render={({ field }) => {
                        return (
                          <FormInput
                            formLabel="Contact Number"
                            isRequired={true}
                            inputTsx={
                              <Input
                                disabled={creatingAccount ? true : false}
                                placeholder="Enter restaurant contact number"
                                type="tele"
                                {...field}
                              />
                            }
                          />
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
                            disabled={creatingAccount ? true : false}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select cuisine type." />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {Object.values(Cuisine).map((c, i) => (
                                <SelectItem key={i} value={c}>
                                  {renderCuisine(c)}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage className="px-3 py-2 text-gray-50 bg-red-500 rounded-md" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormInput
                          formLabel="Restaurant Address"
                          isRequired={true}
                          inputTsx={
                            <Textarea
                              placeholder="Your restaurant's address"
                              disabled={creatingAccount ? true : false}
                              {...field}
                            />
                          }
                        />
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormInput
                          formLabel="Restaurant Description"
                          isRequired={false}
                          inputTsx={
                            <Textarea
                              placeholder="Tell us somthing about your restaurant"
                              disabled={creatingAccount ? true : false}
                              {...field}
                            />
                          }
                        />
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
