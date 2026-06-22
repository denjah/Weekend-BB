import { useAppStore } from '../store/useAppStore';
import { MagneticButton } from './effects/MagneticButton';

const themes = [
  { id: 'ethereal-glass', name: 'Ethereal Glass', color: '#050505' },
  { id: 'editorial-luxury', name: 'Editorial Luxury', color: '#FDFBF7' },
  { id: 'soft-structuralism', name: 'Soft Structuralism', color: '#F5F5F7' }
] as const;

export const ThemeSwitcher = () => {
  const { designTheme, setDesignTheme } = useAppStore();

  return (
    <div className="flex flex-col gap-3 p-4 bg-bg-secondary border border-border-subtle rounded-xl shadow-spring">
      <div className="text-xs font-mono text-text-tertiary uppercase tracking-widest">
        Design Theme
      </div>
      <div className="flex gap-2">
        {themes.map((theme) => (
          <MagneticButton key={theme.id} strength={50}>
            <button
              onClick={() => setDesignTheme(theme.id)}
              className={`w-8 h-8 rounded-full border-2 transition-all hover:scale-110 ${
                designTheme === theme.id ? 'border-accent-primary scale-110' : 'border-border-subtle'
              }`}
              style={{ backgroundColor: theme.color }}
              title={theme.name}
              aria-label={`Switch to ${theme.name} theme`}
            />
          </MagneticButton>
        ))}
      </div>
      <div className="text-sm font-medium text-text-secondary mt-1">
        {themes.find(t => t.id === designTheme)?.name}
      </div>
    </div>
  );
};

