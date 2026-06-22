import { SubsectionBlock } from "../brand/SubsectionBlock";
import { SectionContent } from "../brand/SectionContent";

export const Physical = () => {
  return (
    <div className="px-8 py-12 md:px-16 max-w-[1440px] mx-auto">
      <div className="mb-16">
        <h1 className="text-5xl font-bold font-heading mb-4 text-text-primary">Физические носители</h1>
        <p className="text-xl text-text-secondary max-w-2xl">
          Оформление транспорта, вывесок, униформы и навигации.
        </p>
      </div>

      <div className="space-y-24">
        <SubsectionBlock title="7.1 Брендирование транспорта" status="pending">
          <SectionContent sectionId="physical-transport" title="Ожидаются материалы" description="Макеты оклейки автомобилей." />
        </SubsectionBlock>
        <SubsectionBlock title="7.2 Униформа сотрудников" status="pending">
          <SectionContent sectionId="physical-uniform" title="Ожидаются материалы" description="Футболки, кепки, бейджи." />
        </SubsectionBlock>
        <SubsectionBlock title="7.3 Оформление интерьера" status="pending">
          <SectionContent sectionId="physical-interior" title="Ожидаются материалы" description="Вывески, таблички, навигация в офисе и магазинах." />
        </SubsectionBlock>
      </div>
    </div>
  );
};

export default Physical;

