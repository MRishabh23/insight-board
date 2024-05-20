"use client";

import React from "react";
import Link from "next/link";
import {
  DuelSplit,
  DuelSplitTitle,
  DuelSplitSection,
} from "@/components/duel-split";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { useAuthForm } from "@/utils/schema";
import { AuthType } from "@/utils/types/common";
import { useResetSubmitMutation } from "@/utils/mutation";

const Forgot = () => {
  const form = useAuthForm();
  const [showPassword, setShowPassword] = React.useState(false);
  const eyeCss = "h-5 w-5";
  const linkCss = "text-blue-600 hover:text-blue-500 underline text-sm";
  const custDivCss = "text-white text-sm flex justify-between items-center";
  const custLinkCss =
    "bg-primary rounded-md flex justify-center items-center hover:bg-primary/90 h-10 px-4 py-2";

  const { mutate: server_reset, isPending: resetPending } =
    useResetSubmitMutation(form);

  const onSubmit = async (data: AuthType) => {
    server_reset(data);
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <DuelSplit>
      <DuelSplitSection className={cn("1lg:flex hidden bg-black")}>
        <DuelSplitTitle>JUSTRANSFORM</DuelSplitTitle>
      </DuelSplitSection>
      <DuelSplitSection>
        <div className="flex flex-col">
          <div>
            <div className="1lg:hidden flex justify-between items-center font-bold">
              <p className="text-lg">JUSTRANSFORM</p>
              <span className="text-2xl">Reset</span>
            </div>
            <p className="hidden 1lg:block text-2xl font-bold">
              Reset Password
            </p>
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
                      <Input
                        type="text"
                        required
                        placeholder="Enter your username.."
                        autoComplete="on"
                        {...field}
                      />
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
                    <FormLabel className="text-lg" htmlFor="password">
                      Password
                    </FormLabel>
                    <FormControl id="password">
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          required
                          placeholder="Enter your password.."
                          autoComplete="off"
                          {...field}
                        />
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-black cursor-pointer">
                          {showPassword ? (
                            <LuEyeOff
                              className={cn(eyeCss)}
                              onClick={togglePassword}
                            />
                          ) : (
                            <LuEye
                              className={cn(eyeCss)}
                              onClick={togglePassword}
                            />
                          )}
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                disabled={resetPending}
                className="w-full capitalize"
              >
                {resetPending ? "Processing..." : "Reset Password"}
              </Button>
              <div className={cn(custDivCss)}>
                <Link className={cn(custLinkCss, "w-[48%]")} href={`/signin`}>
                  Sign In
                </Link>
                <Link className={cn(custLinkCss, "w-[48%]")} href={`/signup`}>
                  Sign Up
                </Link>
              </div>
            </form>
          </Form>
        </div>
      </DuelSplitSection>
    </DuelSplit>
  );
};

export default Forgot;
