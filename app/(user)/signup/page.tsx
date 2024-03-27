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
import { SignupSchema } from "@/schemas";
import { signup } from "@/actions/auth/signup";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import FormInput from "@/components/FormInput";
import { Textarea } from "@/components/ui/textarea";

const Signup = () => {
  const router = useRouter();
  const [creatingAccount, setCreatingAccount] = useState(false);
  const form = useForm<z.infer<typeof SignupSchema>>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
      address: "",
      passwordConfirm: "",
      contactNumber: "",
    },
  });

  const handleSubmit = async (values: z.infer<typeof SignupSchema>) => {
    setCreatingAccount(true);
    const response = await signup(values);
    if (response.success) {
      toast.success(response.success);
      setTimeout(() => {
        router.push("/login");
      }, 3000);
    } else {
      toast.error(response.error);
      setCreatingAccount(false);
    }
  };

  return (
    <>
      <div className="w-full h-screen flex flex-col justify-center items-center space-y-10">
        <Card className="w-[60%]">
          <CardHeader>
            <CardTitle>
              <p className="text-center text-4xl font-bold text-primary">
                Create an account
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
                  <div className="w-1/3 flex flex-col space-y-3.5">
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
                      name="address"
                      render={({ field }) => (
                        <FormInput
                          formLabel="Address"
                          isRequired={true}
                          inputTsx={
                            <Textarea
                              placeholder="Enter your full address"
                              disabled={creatingAccount ? true : false}
                              {...field}
                            />
                          }
                        />
                      )}
                    />
                  </div>
                  <div className="w-1/3 flex flex-col space-y-8">
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
                                placeholder="Confirm password"
                                type="password"
                                {...field}
                              />
                            }
                          />
                        );
                      }}
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
