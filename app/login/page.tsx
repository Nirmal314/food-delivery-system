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
import { useEffect, useState } from "react";
import { LoginSchema } from "@/schemas";
import { login } from "@/actions/login";
import { useToast } from "@/components/ui/use-toast";
import { useRouter, useSearchParams } from "next/navigation";

const Signin = () => {
  const [credentialsLoggingIn, setCredentialsLoggingIn] = useState(false);
  const [googleLoggingIn, setGoogleLoggingIn] = useState(false);
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const urlError = () => {
    if (searchParams.get("error")) {
      switch (searchParams.get("error")) {
        case "OAuthAccountNotLinked":
          return "Another account already exists with the same email address.";

        default:
          return "Unexpected OAuth error occured, Please try again.";
      }
    }
  };

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (values: z.infer<typeof LoginSchema>) => {
    setCredentialsLoggingIn(true);
    const response = await login(values);

    if (response) {
      if (response.success) {
        toast({
          description: response.success,
        });
      } else if (response.error) {
        toast({
          description: response.error,
          variant: "destructive",
        });

        setCredentialsLoggingIn(false);
      }
    }
  };

  const handleGoogleLogin = () => {
    setGoogleLoggingIn(true);

    signIn("google", {
      callbackUrl: "/",
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
                  name="email"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="example@mail.com"
                            type="email"
                            disabled={
                              googleLoggingIn || credentialsLoggingIn
                                ? true
                                : false
                            }
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
                            disabled={
                              googleLoggingIn || credentialsLoggingIn
                                ? true
                                : false
                            }
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="px-3 py-2 text-gray-50 bg-red-500 rounded-md" />
                      </FormItem>
                    );
                  }}
                />
                {urlError() && (
                  <p className="text-md text-gray-50 bg-red-500 rounded-md p-5">
                    {urlError()}
                  </p>
                )}
                <Button
                  disabled={
                    googleLoggingIn || credentialsLoggingIn ? true : false
                  }
                  type="submit"
                  className="w-full"
                >
                  {credentialsLoggingIn ? "Logging in..." : "Login"}
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
                  disabled={
                    googleLoggingIn || credentialsLoggingIn ? true : false
                  }
                  onClick={() => handleGoogleLogin()}
                  variant={"outline"}
                  className="w-full flex space-x-3"
                >
                  <Image src={google} width={30} height={30} alt="google" />
                  <span>
                    {!googleLoggingIn
                      ? "Continue with Google"
                      : "Logging in..."}
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
