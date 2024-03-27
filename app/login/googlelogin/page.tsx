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
import { useState } from "react";
import { GoogleLoginSchema } from "@/schemas";
import { login } from "@/actions/auth/login";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import FormInput from "@/components/FormInput";
import { Textarea } from "@/components/ui/textarea";
import { googleLogin } from "@/actions/auth/googlelogin";

const page = () => {
  const [googleLoggingIn, setGoogleLoggingIn] = useState(false);
  const form = useForm<z.infer<typeof GoogleLoginSchema>>({
    resolver: zodResolver(GoogleLoginSchema),
    defaultValues: {
      address: "",
      contactNumber: "",
    },
  });

  const handleGoogleLogin = async (
    values: z.infer<typeof GoogleLoginSchema>
  ) => {
    setGoogleLoggingIn(true);
    const response = await googleLogin(values);
    console.log(response);
    // router.push("/login/googlelogin");
    // // signIn("google", {
    // //   callbackUrl: "/",
    // // });
    // setGoogleLoggingIn(false);
  };
  return (
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
              onSubmit={form.handleSubmit(handleGoogleLogin)}
              className="max-w-md w-full flex flex-col gap-4"
            >
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
                        disabled={googleLoggingIn ? true : false}
                        {...field}
                      />
                    }
                  />
                )}
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
                          disabled={googleLoggingIn ? true : false}
                          placeholder="Enter your contact number"
                          type="tele"
                          {...field}
                        />
                      }
                    />
                  );
                }}
              />

              <Button
                disabled={googleLoggingIn ? true : false}
                variant={"outline"}
                className="w-full flex space-x-3"
              >
                <Image src={google} width={30} height={30} alt="google" />
                <span>
                  {!googleLoggingIn ? "Log in with google" : "Logging in..."}
                </span>
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default page;
