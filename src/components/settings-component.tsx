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
import { useSignOutSubmitMutation } from "@/utils/mutation";

const SettingsComponent = () => {
  const signOutMutate = useSignOutSubmitMutation();
  const signOut = async () => {
    signOutMutate.mutate();
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
