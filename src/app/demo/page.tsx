import { cn } from "@/lib/utils";

interface DemoSection {
  children: React.ReactNode;
  className?: string;
}

export default function Demo() {
  return (
    <div className="bg-primary h-full w-full">
      <main className="flex flex-col 1lg:flex-row h-full p-10 gap-4">
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
  return (
    <div
      className={cn(
        "h-1/5 1lg:h-full 1lg:w-1/3 bg-white rounded-md",
        className
      )}
    >
      {children}
    </div>
  );
};
