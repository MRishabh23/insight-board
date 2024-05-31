import Header from "@/components/header";
import Footer from "@/components/footer";

export type DashboardProps = {
  children: React.ReactNode;
};

export default function DashboardLayout({ children }: Readonly<DashboardProps>) {
  return (
    <div className="flex h-full flex-col bg-primary text-primary-foreground">
      <Header />
      <>
        <main className="flex-1 overflow-auto p-4 sm:p-8">{children}</main>
      </>
      <Footer />
    </div>
  );
}
