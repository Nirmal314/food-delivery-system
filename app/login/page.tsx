"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import google from "@/public/google.png";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Image from "next/image";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { useState } from "react";

const formSchema = z.object({
  emailAddress: z.string().email(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
});
const Signin = () => {
  const [logging, setLogging] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      emailAddress: "",
      password: "",
    },
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    console.log({ values });
  };

  const handleGoogleLogin = () => {
    setLogging(true);
    signIn("google", {
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
    });
  };

  return (
    <>
      <div className="w-full h-screen flex flex-col justify-center items-center space-y-10">
        <Card className="w-[30%]">
          <CardHeader>
            <CardTitle>
              <p className="text-center text-4xl font-bold text-primary">
                Login to your account
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
                  name="emailAddress"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="example@mail.com"
                            type="email"
                            disabled={logging ? true : false}
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
                            placeholder="********"
                            type="password"
                            disabled={logging ? true : false}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="px-3 py-2 text-gray-50 bg-red-500 rounded-md" />
                      </FormItem>
                    );
                  }}
                />
                <Button
                  disabled={logging ? true : false}
                  type="submit"
                  className="w-full"
                >
                  Submit
                </Button>
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t"></span>
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                      Or continue with
                    </span>
                  </div>
                </div>
                <Button
                  type="button"
                  onClick={() => handleGoogleLogin()}
                  variant={"outline"}
                  className="w-full flex space-x-3"
                >
                  <Image src={google} width={30} height={30} alt="google" />
                  <span>
                    {!logging ? "Continue with Google" : "Logging in..."}
                  </span>
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Signin;
