import { SubsectionBlock } from "../brand/SubsectionBlock";
import { PlaceholderBlock } from "../brand/PlaceholderBlock";

export const Corporate = () => {
  return (
    <div className="px-8 py-12 md:px-16 max-w-[1440px] mx-auto">
      <div className="mb-16">
        <h1 className="text-5xl font-bold font-heading mb-4 text-text-primary">Деловая документация</h1>
        <p className="text-xl text-text-secondary max-w-2xl">
          Оформление официальных бланков, презентаций и корпоративных стандартов.
        </p>
      </div>

      <div className="space-y-24">
        <SubsectionBlock title="5.1 Визитные карточки" status="pending">
          <PlaceholderBlock title="Ожидаются материалы" description="Макеты корпоративных и персональных визиток." />
        </SubsectionBlock>
        <SubsectionBlock title="5.2 Фирменные бланки" status="pending">
          <PlaceholderBlock title="Ожидаются материалы" description="Шаблоны документов (Word/PDF)." />
        </SubsectionBlock>
        <SubsectionBlock title="5.3 Конверты и папки" status="pending">
          <PlaceholderBlock title="Ожидаются материалы" description="Макеты печатной продукции." />
        </SubsectionBlock>
        <SubsectionBlock title="5.4 Шаблоны презентаций" status="pending">
          <PlaceholderBlock title="Ожидаются материалы" description="PowerPoint и Keynote шаблоны." />
        </SubsectionBlock>
      </div>
    </div>
  );
};

export default Corporate;

