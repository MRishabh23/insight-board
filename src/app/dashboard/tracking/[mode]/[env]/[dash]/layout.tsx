import TrackingDashHeader from "@/components/tracking-dash-header";
import TrackingEnvHeader from "@/components/tracking-env-header";
import { cn } from "@/lib/utils";

interface EnvProps {
  children: React.ReactNode;
  params: {
    mode: string;
    env: string;
    dash: string;
  };
}

export default function DashLayout({ children, params }: EnvProps) {
  return (
    <div className={cn("h-full flex flex-col")}>
      <TrackingEnvHeader params={params} />
      <TrackingDashHeader params={params}/>
      <div className={cn("flex-1 py-10")}>{children}</div>
    </div>
  );
}
