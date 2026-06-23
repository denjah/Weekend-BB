import { useState } from "react";
import logobookData from "../../data/logobook.json";

interface LogobookViewerProps {
  activeSection: string;
}

export const LogobookViewer = ({ activeSection }: LogobookViewerProps) => {
  const [cardData, setCardData] = useState<Record<string, { comment: string, file: File | null }>>({});

  const section = logobookData.find(s => s.id === activeSection) || logobookData[0];

  return (
    <div className="mt-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {section.cards.map((card: any, i: number) => {
          // Делаем некоторые карточки двойными для динамики (например, каждую 5-ю и некоторые другие)
          const isDouble = i % 5 === 0 || i % 7 === 3;
          const data = cardData[card.id] || { comment: '', file: null };
          const hasFile = !!data.file;
          
          return (
            <div 
              key={card.id} 
              className={`border rounded-xl overflow-hidden transition-colors flex flex-col group ${
                isDouble ? "md:col-span-2 lg:col-span-2 xl:col-span-2" : "col-span-1"
              } ${
                hasFile 
                  ? "border-accent-primary bg-accent-primary/5 shadow-[0_0_15px_rgba(var(--color-accent-primary),0.1)]" 
                  : "bg-bg-secondary border-border-subtle hover:border-text-secondary"
              }`}
            >
              <div className="aspect-[4/3] bg-black/40 p-6 flex flex-col justify-center items-center text-center relative">
                <p className="text-sm text-text-secondary max-w-[80%] opacity-60 group-hover:opacity-100 transition-opacity">
                  {card.visual.desc}
                </p>
              </div>
              <div className="p-5 flex-1 flex flex-col gap-4">
                <div>
                  <h3 className="text-lg font-bold text-text-primary mb-1 leading-tight">{card.title}</h3>
                  <div className="text-xs font-mono text-accent-primary opacity-80">
                    {card.origin}
                  </div>
                </div>
                
                <p className="text-sm text-text-tertiary">
                  {card.fields[0]?.value}
                </p>

                <div className="mt-auto space-y-3 pt-4 border-t border-border-subtle/50">
                  <textarea 
                    value={data.comment}
                    onChange={(e) => setCardData(prev => ({...prev, [card.id]: { ...data, comment: e.target.value }}))}
                    placeholder="Добавить комментарий..."
                    className="w-full bg-bg-tertiary/20 text-sm text-text-primary border border-border-subtle rounded-md px-3 py-2 resize-none focus:border-accent-primary focus:outline-none transition-colors"
                    rows={2}
                  />
                  
                  <div className="flex items-center justify-between">
                    <label className="cursor-pointer flex items-center gap-2 text-sm text-accent-primary hover:text-text-primary transition-colors font-medium">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                      </svg>
                      {hasFile ? 'Изменить файл' : 'Прикрепить файл'}
                      <input 
                        type="file" 
                        className="hidden" 
                        onChange={(e) => {
                          if (e.target.files?.[0]) {
                            setCardData(prev => ({...prev, [card.id]: { ...data, file: e.target.files![0] }}));
                          }
                        }} 
                      />
                    </label>
                    {hasFile && data.file && (
                      <span className="text-xs text-text-primary bg-bg-tertiary px-2 py-1 rounded truncate max-w-[120px]" title={data.file.name}>
                        {data.file.name}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

