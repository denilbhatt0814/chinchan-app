import BrandDashboardSideNav from "@/components/AppDashboard/Brand/BrandDashboardSideNav";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex w-full min-h-screen h-full">
      <BrandDashboardSideNav />
      {children}
    </div>
  );
}
