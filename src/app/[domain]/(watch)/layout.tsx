import Navbar from "@/components/Platform/Navbar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex items-center justify-center w-screen h-screen bg-background">
      {children}
    </div>
  );
}
