import * as React from "react";

import { cn } from "@/lib/utils";

const DuelSplit = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("flex h-screen xl:border xl:border-black/70 xl:rounded-md xl:overflow-hidden", className)} {...props} />,
);
DuelSplit.displayName = "DuelSplit";

const DuelSplitTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn("text-4xl font-semibold uppercase leading-none tracking-wider text-white", className)}
      {...props}
    />
  ),
);
DuelSplitTitle.displayName = "DuelSplitTitle";

const DuelSplitSection = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-1 items-center justify-center", className)} {...props} />
  ),
);
DuelSplitSection.displayName = "DuelSplitSection";

export { DuelSplit, DuelSplitTitle, DuelSplitSection };
