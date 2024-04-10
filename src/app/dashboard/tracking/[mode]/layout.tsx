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
    <div className={cn("h-full flex flex-col p-4 sm:p-10")}>
      <TrackingHeader params={params} />
      <div className={cn("flex-1")}>{children}</div>
    </div>
  );
}
