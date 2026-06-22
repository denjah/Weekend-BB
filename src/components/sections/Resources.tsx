import { SubsectionBlock } from "../brand/SubsectionBlock";
import { SectionContent } from "../brand/SectionContent";

export const Resources = () => {
  return (
    <div className="px-8 py-12 md:px-16 max-w-[1440px] mx-auto">
      <div className="mb-16">
        <h1 className="text-5xl font-bold font-heading mb-4 text-text-primary">Ресурсы & Загрузки</h1>
        <p className="text-xl text-text-secondary max-w-2xl">
          Все необходимые файлы, архивы, шрифты и шаблоны в одном месте.
        </p>
      </div>

      <div className="space-y-24">
        <SubsectionBlock title="8.1 Архивы логотипов" status="pending">
          <SectionContent sectionId="resources-logos" title="Ожидаются материалы" description="Векторные (SVG, EPS, AI) и растровые (PNG, JPG) файлы." />
        </SubsectionBlock>
        <SubsectionBlock title="8.2 Архивы шрифтов" status="pending">
          <SectionContent sectionId="resources-fonts" title="Ожидаются материалы" description="OTF/TTF и веб-шрифты (WOFF2)." />
        </SubsectionBlock>
        <SubsectionBlock title="8.3 Шаблоны (Templates)" status="pending">
          <SectionContent sectionId="resources-templates" title="Ожидаются материалы" description="Файлы InDesign, Figma, Illustrator." />
        </SubsectionBlock>
      </div>
    </div>
  );
};

export default Resources;

