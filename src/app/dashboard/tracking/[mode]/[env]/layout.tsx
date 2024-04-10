import { cn } from "@/lib/utils";

interface EnvProps {
  children: React.ReactNode;
}

export default function EnvLayout({ children }: EnvProps) {
  return (
    <div className={cn("h-full flex flex-col")}>
      <div className={cn("flex-1 mt-6")}>{children}</div>
    </div>
  );
}
