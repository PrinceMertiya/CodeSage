import Sidebar from "./Sidebar";
import TopNavbar from "./Topnavbar";
import PageContainer from "./PageContainer";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-[#030712] text-white">
      <Sidebar />

      <div className="lg:pl-72">
        <TopNavbar />

        <PageContainer>{children}</PageContainer>
      </div>
    </div>
  );
}