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
import { cn } from "@/lib/utils";
import Link from "next/link";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import axios from "axios";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { useMutation } from "@tanstack/react-query";

interface AuthProp {
  title: string;
  switchTitle?: string;
  switchRoute?: string;
  postRoute: string;
  pushRoute: string;
}

interface SubmitProp {
  username: string;
  password: string;
}

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string(),
});

const AuthForm = ({
  title,
  switchTitle,
  switchRoute,
  postRoute,
  pushRoute,
}: AuthProp) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const router = useRouter();
  const [showPassword, setShowPassword] = React.useState(false);
  const eyeCss = "h-5 w-5";
  const custDivCss = "text-white text-sm flex justify-between items-center";
  const custLinkCss =
    "bg-primary rounded-md flex justify-center items-center hover:bg-primary/90 h-10 px-4 py-2";

  const mutateSubmit = useMutation({
    mutationFn: (data: SubmitProp) => {
      return axios({
        method: "post",
        url: `/api/users/${postRoute}`,
        data: data,
      });
    },
    onSettled: async (_, error: any) => {
      if (error) {
        toast.error(`Uh oh! Something went wrong, ${title} failed.`, {
          description: error?.response?.data?.error
            ? error?.response?.data?.error
            : error.message,
        });
      } else {
        toast.success(`${title} Successful.`);
        form.reset({ username: "", password: "" });
        router.push(pushRoute);
      }
    },
  });

  const onSubmit = async (data: SubmitProp) => {
    mutateSubmit.mutate(data);
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex flex-col">
      <div>
        <div className="1lg:hidden flex justify-between items-center font-bold">
          <p className="text-lg">JUSTRANSFORM</p>
          <span className="text-2xl">
            {title === "Sign up" ? "SignUp" : "Reset"}
          </span>
        </div>
        <p className="hidden 1lg:block text-2xl font-bold">{title}</p>
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
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={cn("text-lg")} htmlFor="password">
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
            disabled={mutateSubmit.isPending}
            className={cn("w-full capitalize")}
          >
            {mutateSubmit.isPending ? "Processing..." : title}
          </Button>
          {title.includes("Reset") ? (
            <div className={cn(custDivCss)}>
              <Link className={cn(custLinkCss, "w-[48%]")} href={`/signin`}>
                Sign In
              </Link>
              <Link className={cn(custLinkCss, "w-[48%]")} href={`/signup`}>
                Sign Up
              </Link>
            </div>
          ) : (
            <p>
              Already have an account?
              <span
                className={cn(
                  "ml-2 text-blue-600 hover:text-blue-500 underline"
                )}
              >
                <Link href={`/${switchRoute}`}>{switchTitle}</Link>
              </span>
            </p>
          )}
        </form>
      </Form>
    </div>
  );
};

export default React.memo(AuthForm);
