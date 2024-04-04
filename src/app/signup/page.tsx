"use client";

import {
  DuelSplit,
  DuelSplitTitle,
  DuelSplitSection,
} from "@/components/duelSplit";
import { cn } from "@/lib/utils";
import React from "react";
import AuthForm from "@/components/authForm";

const SignUp = () => {
  return (
    <DuelSplit>
      <DuelSplitSection className={cn("1lg:flex hidden bg-black")}>
        <DuelSplitTitle>JUSTRANSFORM</DuelSplitTitle>
      </DuelSplitSection>
      <DuelSplitSection>
        <AuthForm
          title="Sign up"
          switchTitle="SignIn"
          switchRoute="signin"
          postRoute="signup"
          pushRoute="/signin"
        />
      </DuelSplitSection>
    </DuelSplit>
  );
};

export default SignUp;
