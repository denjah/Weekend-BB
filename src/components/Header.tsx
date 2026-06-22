import { useAppStore } from '../store/useAppStore';
import { Breadcrumbs } from './Breadcrumbs';
import { ThemeSwitcher } from './ThemeSwitcher';

export const Header = () => {
  const { searchQuery, setSearchQuery } = useAppStore();

  return (
    <header className="sticky top-0 z-40 bg-bg-primary/80 backdrop-blur-md border-b border-border-subtle h-16 px-8 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Breadcrumbs />
      </div>
      
      <div className="flex items-center gap-6">
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

