import { cn } from "@/lib/utils";
import TrackingHeader from "@/components/tracking-header";

interface TrackingProps {
  children: React.ReactNode;
}

export default function TrackingLayout({ children}: Readonly<TrackingProps>) {
  return (
    <div className={cn("h-full flex flex-col p-4 sm:p-10")}>
      <TrackingHeader/>
      <div className={cn("flex-1")}>{children}</div>
    </div>
  );
}
