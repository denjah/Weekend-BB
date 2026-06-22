import { SubsectionBlock } from "../brand/SubsectionBlock";
import { SectionContent } from "../brand/SectionContent";

export const Digital = () => {
  return (
    <div className="px-8 py-12 md:px-16 max-w-[1440px] mx-auto">
      <div className="mb-16">
        <h1 className="text-5xl font-bold font-heading mb-4 text-text-primary">Digital Presence</h1>
        <p className="text-xl text-text-secondary max-w-2xl">
          Сайт, мобильные интерфейсы и цифровые каналы коммуникации.
        </p>
      </div>

      <div className="space-y-24">
        <SubsectionBlock title="6.1 UI Kit и веб-дизайн" status="pending">
          <SectionContent sectionId="digital-ui-kit" title="Ожидаются материалы" description="Кнопки, инпуты, карточки и состояния элементов." />
        </SubsectionBlock>
        <SubsectionBlock title="6.2 Email рассылки" status="pending">
          <SectionContent sectionId="digital-emails" title="Ожидаются материалы" description="Шаблоны писем." />
        </SubsectionBlock>
        <SubsectionBlock title="6.3 Подписи для email" status="pending">
          <SectionContent sectionId="digital-signatures" title="Ожидаются материалы" description="Корпоративные подписи сотрудников." />
        </SubsectionBlock>
      </div>
    </div>
  );
};

export default Digital;

