import { useState } from "react";
import { LogobookViewer } from "../brand/LogobookViewer";
import logobookData from "../../data/logobook.json";


export const LogoUsage = () => {
  const [activeSection, setActiveSection] = useState(logobookData[0].id);

  return (
    <div className="px-8 py-12 md:px-16 max-w-[1440px] mx-auto">
      <div className="mb-16">
        <h1 className="text-5xl font-bold font-heading mb-4 text-text-primary">Logobook</h1>
        <p className="text-xl text-text-secondary max-w-2xl mb-8">
          Правила использования фирменного логотипа и его вариаций.
        </p>

        <div className="flex flex-wrap gap-4">
          {logobookData.map((sec: any) => (
            <button
              key={sec.id}
              onClick={() => setActiveSection(sec.id)}
              className={`px-6 py-3 rounded-xl whitespace-nowrap text-sm font-medium transition-all duration-300 border ${
                activeSection === sec.id 
                  ? "bg-accent-primary text-bg-primary border-accent-primary shadow-[0_0_15px_rgba(var(--color-accent-primary),0.3)]" 
                  : "bg-bg-secondary text-text-secondary hover:text-accent-primary hover:border-accent-primary border-border-subtle"
              }`}
            >
              {sec.index}: {sec.title}
            </button>
          ))}
        </div>
      </div>

      <LogobookViewer activeSection={activeSection} />
    </div>
  );
};

export default LogoUsage;

