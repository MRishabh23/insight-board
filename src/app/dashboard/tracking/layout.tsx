import { cn } from "@/lib/utils";
import TrackingHeader from "@/components/tracking-header";

interface TrackingProps {
  children: React.ReactNode;
}

export default function TrackingLayout({ children }: Readonly<TrackingProps>) {
  return (
    <div className={cn("h-full flex flex-col p-10")}>
      <TrackingHeader/>
      <div className={cn("mt-10 flex gap-4")}>
        <div>Env selection</div>
        <div>Mode selection</div>
        <div>dashboard selection</div>
      </div>
      <div className={cn("flex-1 mt-14")}>{children}</div>
    </div>
  );
}
