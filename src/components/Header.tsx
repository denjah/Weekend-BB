import { useAppStore } from '../store/useAppStore';
import { useBrandStore } from '../store/useBrandStore';
import { Breadcrumbs } from './Breadcrumbs';
import { ThemeSwitcher } from './ThemeSwitcher';

export const Header = () => {
  const { searchQuery, setSearchQuery } = useAppStore();
  const { stats } = useBrandStore();

  // Моковые данные для обновлений, если API еще не возвращает секции (в будущем из стора)
  const updates = {
    progress: 15,
    files: stats?.totalFiles || 0,
    comments: stats?.totalComments || 0,
    newFiles: true, // Индикатор наличия новых файлов
    newComments: true, // Индикатор наличия новых комментариев
    newFilesSection: "Logobook", // В какой секции новые файлы
    newCommentsSection: "Brand Identity" // В какой секции новые комментарии
  };

  return (
    <header className="sticky top-0 z-40 bg-bg-primary/80 backdrop-blur-md border-b border-border-subtle h-16 px-8 flex items-center justify-between">
      <div className="flex-1 flex items-center gap-4">
        <Breadcrumbs />
      </div>

      {/* Central Stats Container */}
      <div className="flex-1 flex justify-center items-center gap-8">
        {/* Progress Rate */}
        <div className="flex items-center gap-2 group relative cursor-help" title="Общая готовность">
          <svg className="w-5 h-5 text-[var(--color-ch3)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <span className="text-sm font-bold text-text-primary">{updates.progress}%</span>
        </div>

        {/* Files Status */}
        <div className="flex items-center gap-2 group relative cursor-help">
          <div className="relative">
            <svg className="w-5 h-5 text-[var(--color-ch2)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            {updates.newFiles && (
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-bg-primary shadow-[0_0_8px_rgba(239,68,68,0.6)] animate-pulse" />
            )}
          </div>
          <span className="text-sm font-bold text-text-primary">{updates.files}</span>
          
          {/* Tooltip */}
          {updates.newFiles && (
            <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none bg-bg-tertiary border border-border-subtle text-text-primary text-xs py-1.5 px-3 rounded-md whitespace-nowrap shadow-xl z-50">
              Новые материалы в: <span className="font-bold text-accent-primary">{updates.newFilesSection}</span>
            </div>
          )}
        </div>

        {/* Comments Status */}
        <div className="flex items-center gap-2 group relative cursor-help">
          <div className="relative">
            <svg className="w-5 h-5 text-[var(--color-ch4)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            {updates.newComments && (
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-bg-primary shadow-[0_0_8px_rgba(239,68,68,0.6)] animate-pulse" />
            )}
          </div>
          <span className="text-sm font-bold text-text-primary">{updates.comments}</span>
          
          {/* Tooltip */}
          {updates.newComments && (
            <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none bg-bg-tertiary border border-border-subtle text-text-primary text-xs py-1.5 px-3 rounded-md whitespace-nowrap shadow-xl z-50">
              Новые комментарии в: <span className="font-bold text-accent-primary">{updates.newCommentsSection}</span>
            </div>
          )}
        </div>
      </div>
      
      <div className="flex-1 flex items-center justify-end gap-6">
        <div className="relative">
          <input 
            type="text" 
            placeholder="Поиск по гайдлайнам..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-bg-secondary border border-border-subtle rounded-full py-1.5 px-4 pl-10 text-sm w-64 focus:outline-none focus:border-accent-primary transition-colors text-text-primary placeholder:text-text-tertiary"
          />
          <svg className="w-4 h-4 text-text-tertiary absolute left-4 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        
        <div className="flex items-center gap-2 border-l border-border-subtle pl-6">
          <ThemeSwitcher />
        </div>
      </div>
    </header>
  );
};

