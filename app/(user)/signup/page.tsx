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
import { useToast } from "@/components/ui/use-toast";

const Signup = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [creatingAccount, setCreatingAccount] = useState(false);
  const form = useForm<z.infer<typeof SignupSchema>>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
      passwordConfirm: "",
      contactNumber: "",
    },
  });

  const handleSubmit = async (values: z.infer<typeof SignupSchema>) => {
    setCreatingAccount(true);
    const response = await signup(values);
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

  return (
    <>
      <div className="w-full h-screen flex flex-col justify-center items-center space-y-10">
        <Card className="w-[30%]">
          <CardHeader>
            <CardTitle>
              <p className="text-center text-4xl font-bold text-primary">
                Create an account
              </p>
            </CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center items-center">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="max-w-md w-full flex flex-col gap-4"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
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
                  name="name"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
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
                  name="contactNumber"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Contact Number</FormLabel>
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
                        <FormLabel>Password</FormLabel>
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
                        <FormLabel>Password confirm</FormLabel>
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
                <Button
                  disabled={creatingAccount ? true : false}
                  type="submit"
                  className="w-full"
                >
                  {creatingAccount ? "Creating account..." : "Create account"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Signup;
