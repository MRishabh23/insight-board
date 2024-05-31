import { cn } from "@/lib/utils";

interface DemoSection {
  children: React.ReactNode;
  className?: string;
}

export default function Demo() {
  return (
    <div className="h-full w-full bg-primary">
      <main className="flex h-full flex-col gap-4 p-10 1lg:flex-row">
        <DemoSection className="h-1/5 1lg:h-full 1lg:w-1/3">
          <div>
            <p>Hello...</p>
          </div>
        </DemoSection>
        <DemoSection className="flex-1">
          <div>
            <p>world...</p>
          </div>
        </DemoSection>
      </main>
    </div>
  );
}

const DemoSection = ({ children, className }: DemoSection) => {
  return <div className={cn("h-1/5 rounded-md bg-white 1lg:h-full 1lg:w-1/3", className)}>{children}</div>;
};
