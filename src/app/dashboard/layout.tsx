import Header from "@/components/header";
import Footer from "@/components/footer";

interface DashboardProps {
  children: React.ReactNode;
}

export default function DashboardLayout({
  children
}: Readonly<DashboardProps>) {
  return (
    <div className="h-full flex flex-col bg-primary text-primary-foreground">
      <Header />
      <>
        <main className="flex-1 p-4 sm:p-8 overflow-auto">{children}</main>
      </>
      <Footer />
    </div>
  );
}
