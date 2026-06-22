import { SubsectionBlock } from "../brand/SubsectionBlock";
import { SectionContent } from "../brand/SectionContent";

export const BrandIdentity = () => {
  return (
    <div className="px-8 py-12 md:px-16 max-w-[1440px] mx-auto">
      <div className="mb-16">
        <h1 className="text-5xl font-bold font-heading mb-4 text-text-primary">Brand Identity</h1>
        <p className="text-xl text-text-secondary max-w-2xl">
          Фундамент бренда Weekend Billiard: миссия, ценности, позиционирование и характер.
        </p>
      </div>

      <div className="space-y-24">
        <SubsectionBlock 
          title="1.1 Миссия и видение" 
          description="Глобальная цель компании и её место на рынке бильярдного оборудования."
          status="pending"
        >
          <SectionContent 
            sectionId="mission-vision"
            title="Загрузите текстовые материалы"
            description="Word/PDF с описанием миссии и видения компании." 
          />
        </SubsectionBlock>

        <SubsectionBlock 
          title="1.2 Ценности бренда" 
          description="Ключевые принципы, которыми мы руководствуемся в работе и коммуникации."
          status="pending"
        >
          <SectionContent 
            sectionId="brand-values"
            title="Ожидаются материалы"
            description="Необходимо сформулировать 3-5 ключевых ценностей бренда." 
          />
        </SubsectionBlock>

        <SubsectionBlock 
          title="1.3 Позиционирование" 
          description="Как мы отстраиваемся от конкурентов и какую нишу занимаем."
          status="pending"
        >
          <SectionContent 
            sectionId="brand-positioning"
            title="Ожидаются материалы"
            description="Загрузите стратегию позиционирования." 
          />
        </SubsectionBlock>

        <SubsectionBlock 
          title="1.4 Tone of Voice" 
          description="Голос бренда: как мы общаемся с клиентами, партнерами и аудиторией."
          status="pending"
        >
          <SectionContent 
            sectionId="tone-of-voice"
            title="Ожидаются материалы"
            description="Загрузите гайд по тональности текстов." 
          />
        </SubsectionBlock>
      </div>
    </div>
  );
};

export default BrandIdentity;

