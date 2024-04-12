"use client";

import React from "react";
import { CgSpinnerAlt } from "react-icons/cg";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useGetUsername } from "@/hooks/get-username";

const Profile = () => {
  const { isPending, data, isError, error } = useGetUsername("profile");

  if (isPending) {
    return (
      <div className={cn("h-full flex flex-col justify-center items-center")}>
        <CgSpinnerAlt className="animate-spin text-lg mr-2" />
      </div>
    );
  }
  if (isError || error) {
    return (
      <div className={cn("h-full flex flex-col justify-center items-center")}>
        <p className={cn("text-red-500")}>Error: {error?.message}</p>
      </div>
    );
  }
  return (
    <div className={cn("h-full flex flex-col justify-center items-center")}>
      <Card className={cn("w-[360px] sm:w-[450px]")}>
        <CardHeader className={cn("border-b")}>
          <div className={cn("flex justify-between items-center")}>
            <p className={cn("text-2xl text-zinc-500 font-medium")}>
              User Profile
            </p>
            <Avatar>
              <AvatarFallback
                className={cn("bg-primary text-primary-foreground")}
              >
                {data?.data?.user?.username
                  ? data?.data?.user?.username.split("_")[2]
                    ? data?.data?.user?.username.split("_")[2].substring(0, 2)
                    : data?.data?.user?.username.split("_")[1].substring(0, 2)
                  : "U"}
              </AvatarFallback>
              <span className="sr-only">Toggle user menu</span>
            </Avatar>
          </div>
        </CardHeader>
        <CardContent className={cn("space-y-5 pt-6")}>
          <div className="flex  justify-between">
            <p className={cn("font-semibold text-zinc-500")}>username: </p>
            <p className={cn("text-blue-500")}>{data?.data?.user?.username}</p>
          </div>
          <div className="flex  justify-between">
            <p className={cn("font-semibold text-zinc-500")}>created: </p>
            <p className={cn("text-blue-500")}>{data?.data?.user?.createdAt}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
