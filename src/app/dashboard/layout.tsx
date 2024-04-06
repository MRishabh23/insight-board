import { cn } from "@/lib/utils";
import Header from "@/components/header";
import Footer from "@/components/footer";

interface DashboardProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: Readonly<DashboardProps>) {
  return (
    <div className={cn("h-screen flex flex-col bg-primary text-primary-foreground")}>
      <Header />
      <main className={cn("flex-1")}>{children}</main>
      <Footer />
    </div>
  );
}
