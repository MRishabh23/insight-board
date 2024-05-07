"use client";

import {
  DuelSplit,
  DuelSplitTitle,
  DuelSplitSection,
} from "@/components/duelSplit";
import React from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { toast } from "sonner";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { useSignInForm } from "@/utils/schema";
import { SignInType } from "@/utils/types/AuthType";
import { useSignInSubmitMutation } from "@/utils/mutation";

const SignIn = () => {
  const form = useSignInForm();
  const [showPassword, setShowPassword] = React.useState(false);
  const [showContinue, setShowContinue] = React.useState(true);
  const [continueLoad, setContinueLoad] = React.useState(false);
  const eyeCss = "h-5 w-5";
  const linkCss = "text-blue-600 hover:text-blue-500 underline text-sm";

  const mutateSignIn = useSignInSubmitMutation(form);

  const onSubmit = async (data: SignInType) => {
    mutateSignIn.mutate(data);
  };

  const handleContinue = () => {
    setContinueLoad(true);
    setTimeout(() => {
      if (
        form.getValues("username") !== process.env.NEXT_PUBLIC_ADMIN_USERNAME!
      ) {
        toast.error(`Uh oh! Invalid Admin Credentials.`, {
          description: "In case of any changes, please contact support.",
        });
        setContinueLoad(false);
        return;
      }
      setShowContinue(false);
      setContinueLoad(false);
    }, 1000);
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
              <span className="text-2xl">SignIn</span>
            </div>
            <p className="hidden 1lg:block text-2xl font-bold">Sign in</p>
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className={cn(
                "mt-5 w-[340px] space-y-5 rounded-md border border-gray-200 p-3"
              )}
            >
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg" htmlFor="role">
                      Role
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl id="role">
                        <SelectTrigger>
                          <SelectValue placeholder="Select a role..." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="user">User</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {form.watch("role") === "user" ? (
                <>
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
                            className={cn("")}
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
                          <div className={cn("relative")}>
                            <Input
                              className={cn("")}
                              type={showPassword ? "text" : "password"}
                              required
                              placeholder="Enter your password.."
                              autoComplete="off"
                              {...field}
                            />
                            <div
                              className={cn(
                                "absolute inset-y-0 right-0 pr-3 flex items-center text-black cursor-pointer"
                              )}
                            >
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
                    disabled={mutateSignIn.isPending}
                    className="w-full capitalize"
                  >
                    {mutateSignIn.isPending ? "Processing..." : "Sign In"}
                  </Button>
                </>
              ) : (
                <>
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className={cn("text-lg")} htmlFor="username">
                          Username
                        </FormLabel>

                        <FormControl id="username">
                          <Input
                            className={cn("")}
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
                  {showContinue && (
                    <Button
                      type="button"
                      disabled={continueLoad}
                      onClick={handleContinue}
                      className="w-full capitalize"
                    >
                      {continueLoad ? "Processing..." : "Continue"}
                    </Button>
                  )}
                  {!showContinue && (
                    <>
                      <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <div className="flex justify-between items-center">
                              <FormLabel className="text-lg" htmlFor="password">
                                Password
                              </FormLabel>
                              <Link className={cn(linkCss)} href={`/forgot`}>
                                forgot password?
                              </Link>
                            </div>
                            <FormControl id="password">
                              <div className={cn("relative")}>
                                <Input
                                  className={cn("")}
                                  type={showPassword ? "text" : "password"}
                                  required
                                  placeholder="Enter your password.."
                                  autoComplete="off"
                                  {...field}
                                />
                                <div
                                  className={cn(
                                    "absolute inset-y-0 right-0 pr-3 flex items-center text-black cursor-pointer"
                                  )}
                                >
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
                        disabled={mutateSignIn.isPending}
                        className="w-full capitalize"
                      >
                        {mutateSignIn.isPending ? "Processing..." : "Sign In"}
                      </Button>
                      <p>
                        Doesn&apos;t have an account?
                        <span className={cn("ml-1", linkCss)}>
                          <Link href="/signup">SignUp</Link>
                        </span>
                      </p>
                    </>
                  )}
                </>
              )}
            </form>
          </Form>
        </div>
      </DuelSplitSection>
    </DuelSplit>
  );
};

export default SignIn;
