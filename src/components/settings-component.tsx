"use client";

import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { cn } from "@/lib/utils";
import { CircleUser } from "lucide-react";
import Link from "next/link";
import axios from "axios";
import {toast} from "sonner";
import { useRouter } from "next/navigation";

const SettingsComponent = () => {
  const router = useRouter();
  const signOut = async () => {
    try {
      await axios.get("/api/users/signout");
      toast.success('Sign out successful');
      router.push("/signin");
    } catch (error: any) {
      toast.error('Uh oh! Something went wrong, Sign out failed.',{
        description: error?.response?.data?.error
          ? error?.response?.data?.error
          : error.message
      });
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div>
          <Avatar className={cn("cursor-pointer")}>
            <AvatarFallback className={cn("bg-white")}>
              <CircleUser className="text-primary" />
            </AvatarFallback>
            <span className="sr-only">Toggle user menu</span>
          </Avatar>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link href="/dashboard/profile">
          <DropdownMenuItem className={cn("cursor-pointer")}>Profile</DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={signOut} className={cn("cursor-pointer")}>
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SettingsComponent;
