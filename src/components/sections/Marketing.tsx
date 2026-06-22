import { SubsectionBlock } from "../brand/SubsectionBlock";
import { SectionContent } from "../brand/SectionContent";

export const Marketing = () => {
  return (
    <div className="px-8 py-12 md:px-16 max-w-[1440px] mx-auto">
      <div className="mb-16">
        <h1 className="text-5xl font-bold font-heading mb-4 text-text-primary">Marketing Assets</h1>
        <p className="text-xl text-text-secondary max-w-2xl">
          Маркетинговые материалы, баннеры, сувенирная продукция и POSM.
        </p>
      </div>

      <div className="space-y-24">
        <SubsectionBlock title="4.1 Социальные сети" status="pending">
          <SectionContent sectionId="marketing-social" title="Ожидаются материалы" description="Шаблоны постов и сторис." />
        </SubsectionBlock>
        <SubsectionBlock title="4.2 Рекламные баннеры" status="pending">
          <SectionContent sectionId="marketing-banners" title="Ожидаются материалы" description="Гайдлайны по созданию баннеров." />
        </SubsectionBlock>
        <SubsectionBlock title="4.3 POS-материалы" status="pending">
          <SectionContent sectionId="marketing-pos" title="Ожидаются материалы" description="Оформление мест продаж." />
        </SubsectionBlock>
        <SubsectionBlock title="4.4 Мерч и сувенирка" status="pending">
          <SectionContent sectionId="marketing-merch" title="Ожидаются материалы" description="Примеры нанесения логотипа на продукцию." />
        </SubsectionBlock>
        <SubsectionBlock title="4.5 Фотоархив мероприятий" status="pending">
          <SectionContent sectionId="marketing-photos" title="Ожидаются материалы" description="Доступ к библиотеке фото." />
        </SubsectionBlock>
      </div>
    </div>
  );
};

export default Marketing;

