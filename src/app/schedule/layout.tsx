import { Sidebar } from "../../components/_layout/sidebar";
import { MobileSidebar } from "../../components/_layout/mobile-sidebar";
import TopBar from "../../components/_layout/topbar";
import { Toaster } from "@/components/ui/toaster";
const ScheduleLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full">
      <MobileSidebar />
      <div className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50">
        <Sidebar />
      </div>
      <main className="md:pl-56 h-full">
        <TopBar />
        {children}
      </main>
      <Toaster />
    </div>
  );
};

export default ScheduleLayout;
