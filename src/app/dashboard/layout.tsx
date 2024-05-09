import DashboardLayoutComponent from "@/components/dashboard-layout-component";

export type DashboardProps = {
  children: React.ReactNode;
};

export default function DashboardLayout({
  children,
}: Readonly<DashboardProps>) {
  return (
    <>
      <DashboardLayoutComponent>{children}</DashboardLayoutComponent>
    </>
  );
}
