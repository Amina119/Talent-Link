import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import ToastHost from "./ui/Toast";

export default function AppShell() {
  return (
    <div className="min-h-screen text-white">
      <ToastHost />
      <div className="mx-auto flex max-w-7xl gap-6 p-6">
        <Sidebar />
        <main className="flex-1 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
          <Topbar />
          <div className="mt-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
