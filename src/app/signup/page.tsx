"use client";

import {
  DuelSplit,
  DuelSplitTitle,
  DuelSplitSection,
} from "@/components/duelSplit";
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
import React from "react";
import Link from "next/link";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import { AiOutlineLoading } from "react-icons/ai";

interface SignUpProp {
  username: string;
  password: string;
}

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string(),
});

const SignUp = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const router = useRouter();
  const [btnLoad, setBtnLoad] = React.useState(false);
  const { toast } = useToast();

  const onSubmit = async (data: SignUpProp) => {
    try {
      setBtnLoad(true);
      const response = await axios.post("/api/users/signup", data);
      toast({
        description: "Sign up Successful.",
      });
      router.push("/signin");
    } catch (error: any) {
      toast({
        title: "Uh oh! Something went wrong, Sign up failed.",
        description: error?.response?.data?.error,
        variant: "destructive",
      });
    } finally {
      setBtnLoad(false);
    }
  };

  return (
    <DuelSplit>
      <DuelSplitSection className={cn("1lg:flex hidden bg-black")}>
        <DuelSplitTitle>JUSTRANSFORM</DuelSplitTitle>
      </DuelSplitSection>
      <DuelSplitSection>
        <div className="flex flex-col">
          <div>
            <h3 className="text-2xl font-bold">Sign Up!!</h3>
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
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={cn("text-lg")}>Username</FormLabel>
                    <FormControl>
                      <Input
                        className={cn("")}
                        required
                        placeholder="Enter your username.."
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
                    <FormLabel className={cn("text-lg")}>Password</FormLabel>
                    <FormControl>
                      <Input
                        className={cn("")}
                        type="password"
                        required
                        placeholder="Enter your password.."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                disabled={btnLoad ? true : false}
                className={cn("w-full")}
              >
                {btnLoad ? (
                  <>
                    <AiOutlineLoading className="mr-1 animate-spin text-lg" />{" "}
                    Sign Up
                  </>
                ) : (
                  "Sign Up"
                )}
              </Button>
              <p>
                Already have an account ?{" "}
                <span className={cn("text-blue-600 underline")}>
                  <Link href={"/signin"}>SignIn</Link>
                </span>
              </p>
            </form>
          </Form>
        </div>
      </DuelSplitSection>
    </DuelSplit>
  );
};

export default SignUp;
