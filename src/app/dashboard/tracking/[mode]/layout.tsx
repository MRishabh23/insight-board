import { cn } from "@/lib/utils";
import TrackingHeader from "@/components/tracking-header";

interface TrackingProps {
  children: React.ReactNode;
  params: {
    mode: string;
  };
}

export default function TrackingLayout({
  children,
  params,
}: Readonly<TrackingProps>) {
  return (
    <div className={cn("h-full flex flex-col")}>
      <TrackingHeader params={params} />
      <div className={cn("flex-1 pb-4 sm:pb-8")}>{children}</div>
    </div>
  );
}
