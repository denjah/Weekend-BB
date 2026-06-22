import { NavLink } from "react-router-dom";
import { Logo } from "./Logo";
import { ThemeSwitcher } from "./ThemeSwitcher";

const sections = [
  { id: "brand-identity", num: "1", title: "Brand Identity", dotColor: "bg-[#E0E0E0]" },
  { id: "visual-system", num: "2", title: "Visual System", dotColor: "bg-[#B3B3B3]" },
  { id: "logobook", num: "3", title: "Логотип & Logobook", dotColor: "bg-[#FFFFFF]" },
  { id: "marketing", num: "4", title: "Marketing Assets", dotColor: "bg-[#666666]" },
  { id: "corporate", num: "5", title: "Деловая документация", dotColor: "bg-[#808080]" },
  { id: "digital", num: "6", title: "Digital Presence", dotColor: "bg-[#4D4D4D]" },
  { id: "physical", num: "7", title: "Физические носители", dotColor: "bg-[#333333]" },
  { id: "resources", num: "8", title: "Ресурсы & Загрузки", dotColor: "bg-[#999999]" },
];

export const Sidebar = () => {
  return (
    <aside className="fixed left-0 top-0 bottom-0 w-64 bg-bg-secondary border-r border-border-subtle flex flex-col z-50">
      <div className="p-6 flex items-center gap-3 border-b border-border-subtle">
        <Logo />
        <div className="flex flex-col">
          <span className="font-bold text-sm text-text-primary tracking-wide">Brandbook</span>
          <span className="text-xs text-text-secondary">2026 Edition</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto py-6 flex flex-col gap-8 px-4">
        
        <div className="flex flex-col gap-2">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                isActive ? "bg-text-primary/10 text-text-primary" : "text-text-secondary hover:bg-text-primary/5 hover:text-text-primary"
              }`
            }
          >
            <div className="w-2 h-2 rounded-full bg-accent-primary shadow-coin" />
            <span className="text-sm font-medium">Главная</span>
          </NavLink>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-xs font-mono text-text-tertiary mb-2 px-3 uppercase tracking-widest">
            Разделы
          </span>
          {sections.map((sec) => (
            <NavLink
              key={sec.id}
              to={`/${sec.id}`}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                  isActive ? "bg-text-primary/10 text-text-primary" : "text-text-secondary hover:bg-text-primary/5 hover:text-text-primary"
                }`
              }
            >
              <div className={`w-1.5 h-1.5 rounded-full ${sec.dotColor}`} />
              <span className="text-sm font-medium">
                {sec.num}. {sec.title}
              </span>
            </NavLink>
          ))}
        </div>
      </div>

      <div className="p-4 border-t border-border-subtle flex flex-col gap-4">
        <ThemeSwitcher />
        <div className="text-xs text-text-tertiary font-mono px-2">
          v1.0 · Июнь 2026
        </div>
      </div>
    </aside>
  );
};
