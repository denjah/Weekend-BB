import { SubsectionBlock } from "../brand/SubsectionBlock";
import { PlaceholderBlock } from "../brand/PlaceholderBlock";

export const VisualSystem = () => {
  return (
    <div className="px-8 py-12 md:px-16 max-w-[1440px] mx-auto">
      <div className="mb-16">
        <h1 className="text-5xl font-bold font-heading mb-4 text-text-primary">Visual System</h1>
        <p className="text-xl text-text-secondary max-w-2xl">
          Цветовые палитры, типографика, сетки и визуальный язык бренда.
        </p>
      </div>

      <div className="space-y-24">
        <SubsectionBlock title="2.1 Цветовая палитра" status="pending">
          <PlaceholderBlock title="Ожидаются материалы" description="Загрузите описание базовых и акцентных цветов." />
        </SubsectionBlock>
        <SubsectionBlock title="2.2 Типографика" status="pending">
          <PlaceholderBlock title="Ожидаются материалы" description="Загрузите шрифтовые файлы и правила использования." />
        </SubsectionBlock>
        <SubsectionBlock title="2.3 Иконография" status="pending">
          <PlaceholderBlock title="Ожидаются материалы" description="Загрузите набор фирменных иконок (SVG)." />
        </SubsectionBlock>
        <SubsectionBlock title="2.4 Фотостиль" status="pending">
          <PlaceholderBlock title="Ожидаются материалы" description="Референсы и гайдлайны по подбору фотографий." />
        </SubsectionBlock>
        <SubsectionBlock title="2.5 Паттерны и текстуры" status="pending">
          <PlaceholderBlock title="Ожидаются материалы" description="Фирменные графические элементы и фоны." />
        </SubsectionBlock>
        <SubsectionBlock title="2.6 Сетка и композиция" status="pending">
          <PlaceholderBlock title="Ожидаются материалы" description="Принципы верстки и отступов." />
        </SubsectionBlock>
      </div>
    </div>
  );
};

export default VisualSystem;
