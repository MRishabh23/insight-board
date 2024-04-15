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
import { AiOutlineLoading } from "react-icons/ai";
import { LuEye, LuEyeOff } from "react-icons/lu";

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
  const switchPara = switchTitle?.includes("SignIn")
    ? "Already have an account ?"
    : "Doesn't have an account ?";
  const router = useRouter();
  const [btnLoad, setBtnLoad] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const eyeCss = "h-5 w-5";
  const custDivCss = "text-white text-sm flex justify-between items-center";
  const custLinkCss =
    "bg-primary rounded-md flex justify-center items-center hover:bg-primary/90 h-10 px-4 py-2";

  const onSubmit = async (data: SubmitProp) => {
    try {
      setBtnLoad(true);
      await axios.post(`/api/users/${postRoute}`, data);
      toast.success(`${title} Successful.`);
      router.push(pushRoute);
    } catch (error: any) {
      toast.error(`Uh oh! Something went wrong, ${title} failed.`,{
        description: error?.response?.data?.error ? error?.response?.data?.error : error.message
      });
    } finally {
      setBtnLoad(false);
      form.reset({ username: "", password: "" });
    }
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex flex-col">
      <div>
        <h3 className="text-2xl font-bold">{title} !!</h3>
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
            disabled={btnLoad ? true : false}
            className={cn("w-full capitalize")}
          >
            {btnLoad ? (
              <>
                <AiOutlineLoading className="mr-2 animate-spin text-lg" />{" "}
                {title}
              </>
            ) : (
              title
            )}
          </Button>
          {title === "Sign in" && (
            <div className={cn(custDivCss)}>
              <Link className={cn(custLinkCss, "w-full")} href={`/forgot`}>
                Forgot Password
              </Link>
            </div>
          )}
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
              {switchPara}{" "}
              <span className={cn("text-blue-600 underline")}>
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
