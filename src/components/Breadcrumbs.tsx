import { useLocation, Link } from 'react-router-dom';

const routeNames: Record<string, string> = {
  'brand-identity': 'Brand Identity',
  'visual-system': 'Visual System',
  'logobook': 'Логотип & Logobook',
  'marketing': 'Marketing Assets',
  'corporate': 'Деловая документация',
  'digital': 'Digital Presence',
  'physical': 'Физические носители',
  'resources': 'Ресурсы & Загрузки',
};

export const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  if (pathnames.length === 0) {
    return (
      <div className="text-sm font-mono text-text-tertiary uppercase tracking-widest flex items-center gap-2">
        <span className="text-text-secondary">Dashboard</span>
      </div>
    );
  }

  return (
    <div className="text-sm font-mono text-text-tertiary uppercase tracking-widest flex items-center gap-2">
      <Link to="/" className="hover:text-text-primary transition-colors">Dashboard</Link>
      {pathnames.map((value, index) => {
        const to = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;
        const name = routeNames[value] || value;

        return (
          <span key={to} className="flex items-center gap-2">
            <span>/</span>
            {isLast ? (
              <span className="text-text-secondary font-bold">{name}</span>
            ) : (
              <Link to={to} className="hover:text-text-primary transition-colors">
                {name}
              </Link>
            )}
          </span>
        );
      })}
    </div>
  );
};

