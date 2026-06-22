import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { useAppStore } from "../store/useAppStore";
import { ParticleBackground } from "./effects/ParticleBackground";

export const Layout = () => {
  return (
    <div className="flex bg-bg-primary text-text-primary min-h-screen font-body transition-colors duration-300">
      <Sidebar />
      <div className="flex-1 ml-64 flex flex-col min-h-screen relative overflow-hidden">
        <Header />
        <main className="flex-1 relative z-10 overflow-y-auto">
          <ParticleBackground />
          <Outlet />
        </main>
      </div>
    </div>
  );
};

