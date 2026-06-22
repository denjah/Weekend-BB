import { SubsectionBlock } from "../brand/SubsectionBlock";
import { SectionContent } from "../brand/SectionContent";
import { LogobookViewer } from "../brand/LogobookViewer";

export const LogoUsage = () => {
  return (
    <div className="px-8 py-12 md:px-16 max-w-[1440px] mx-auto">
      <div className="mb-16">
        <h1 className="text-5xl font-bold font-heading mb-4 text-text-primary">Логотип & Logobook</h1>
        <p className="text-xl text-text-secondary max-w-2xl">
          Правила использования фирменного логотипа и его вариаций.
        </p>
      </div>

      <div className="space-y-24">
        <SubsectionBlock title="3.1 Основная версия логотипа" status="pending">
          <SectionContent sectionId="logo-main" title="Ожидаются материалы" description="Загрузите файлы основной версии логотипа." />
        </SubsectionBlock>
        <SubsectionBlock title="3.2 Монохромная и инверсная версии" status="pending">
          <SectionContent sectionId="logo-monochrome" title="Ожидаются материалы" description="Загрузите ч/б версии." />
        </SubsectionBlock>
        <SubsectionBlock title="3.3 Охранное поле" status="pending">
          <SectionContent sectionId="logo-clearspace" title="Ожидаются материалы" description="Гайдлайны по минимальным отступам." />
        </SubsectionBlock>
        <SubsectionBlock title="3.4 Недопустимое использование" status="pending">
          <SectionContent sectionId="logo-misuse" title="Ожидаются материалы" description="Примеры того, как нельзя использовать логотип." />
        </SubsectionBlock>
      </div>

      <LogobookViewer />
    </div>
  );
};

export default LogoUsage;

