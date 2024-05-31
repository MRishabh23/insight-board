"use client";

import React from "react";
import Link from "next/link";
import { DuelSplit, DuelSplitTitle, DuelSplitSection } from "@/components/duel-split";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { useAuthForm } from "@/utils/schema";
import { AuthType } from "@/utils/types/common";
import { useSignInSubmitMutation } from "@/utils/mutation";

const SignIn = () => {
  const form = useAuthForm();
  const [showPassword, setShowPassword] = React.useState(false);
  const eyeCss = "h-5 w-5";
  const linkCss = "text-blue-600 hover:text-blue-500 underline text-sm";

  const { mutate: server_SignIn, isPending: signInPending } = useSignInSubmitMutation(form);

  const onSubmit = async (data: AuthType) => {
    server_SignIn(data);
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <DuelSplit>
      <DuelSplitSection className="hidden bg-black 1lg:flex">
        <DuelSplitTitle>JUSTRANSFORM</DuelSplitTitle>
      </DuelSplitSection>
      <DuelSplitSection>
        <div className="flex flex-col">
          <div>
            <div className="flex items-center justify-between font-bold 1lg:hidden">
              <p className="text-lg">JUSTRANSFORM</p>
              <span className="text-2xl">SignIn</span>
            </div>
            <p className="hidden text-2xl font-bold 1lg:block">Sign in</p>
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="mt-5 w-[340px] space-y-5 rounded-md border border-gray-200 p-3"
            >
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg" htmlFor="username">
                      Username
                    </FormLabel>
                    <FormControl id="username">
                      <Input type="text" required placeholder="Enter your username.." autoComplete="on" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel className="text-lg" htmlFor="password">
                        Password
                      </FormLabel>
                      <Link className={cn(linkCss)} href={`/forgot`}>
                        forgot password?
                      </Link>
                    </div>
                    <FormControl id="password">
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          required
                          placeholder="Enter your password.."
                          autoComplete="off"
                          {...field}
                        />
                        <div className="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-3 text-black">
                          {showPassword ? (
                            <LuEyeOff className={cn(eyeCss)} onClick={togglePassword} />
                          ) : (
                            <LuEye className={cn(eyeCss)} onClick={togglePassword} />
                          )}
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={signInPending} className="w-full capitalize">
                {signInPending ? "Processing..." : "Sign In"}
              </Button>
              <p>
                Doesn&apos;t have an account?
                <span className={cn("ml-1", linkCss)}>
                  <Link href="/signup">SignUp</Link>
                </span>
              </p>
            </form>
          </Form>
        </div>
      </DuelSplitSection>
    </DuelSplit>
  );
};

export default SignIn;
