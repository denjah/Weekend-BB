import { SubsectionBlock } from "../brand/SubsectionBlock";
import { PlaceholderBlock } from "../brand/PlaceholderBlock";
import { CommentThread } from "../brand/CommentThread";
// ...
// Mock data until real API is hooked up
const mockComments = [
  { id: '1', author: 'Art Director', text: 'Нужно добавить больше примеров tone of voice для соцсетей.', timestamp: new Date().toISOString() }
];

export const BrandIdentity = () => {
  // We will eventually pull data from useBrandStore, for now using static structure
  const handleUpload = (file: File) => {
    console.log("Uploading file:", file.name);
    // TODO: implement upload API call
  };

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
          <PlaceholderBlock 
            title="Раздел пуст" 
            description="Загрузите текстовые материалы (Word/PDF) с описанием миссии и видения компании." 
            onUpload={handleUpload}
          />
          <CommentThread comments={mockComments} />
        </SubsectionBlock>

        <SubsectionBlock 
          title="1.2 Ценности бренда" 
          description="Ключевые принципы, которыми мы руководствуемся в работе и коммуникации."
          status="pending"
        >
          <PlaceholderBlock 
            title="Ожидаются материалы" 
            description="Необходимо сформулировать 3-5 ключевых ценностей бренда." 
            onUpload={handleUpload}
          />
        </SubsectionBlock>

        <SubsectionBlock 
          title="1.3 Позиционирование" 
          description="Как мы отстраиваемся от конкурентов и какую нишу занимаем."
          status="pending"
        >
          <PlaceholderBlock 
            title="Ожидаются материалы" 
            description="Загрузите стратегию позиционирования." 
          />
        </SubsectionBlock>

        <SubsectionBlock 
          title="1.4 Tone of Voice" 
          description="Голос бренда: как мы общаемся с клиентами, партнерами и аудиторией."
          status="pending"
        >
          <PlaceholderBlock 
            title="Ожидаются материалы" 
            description="Загрузите гайд по тональности текстов." 
          />
        </SubsectionBlock>
      </div>
    </div>
  );
};

export default BrandIdentity;

