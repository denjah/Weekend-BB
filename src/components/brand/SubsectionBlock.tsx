import type { ReactNode } from "react";
import { Badge } from "../ui/Badge";

interface SubsectionBlockProps {
  title: string;
  description?: string;
  status?: 'done' | 'pending' | 'in-progress';
  children: ReactNode;
}

export const SubsectionBlock = ({ title, description, status, children }: SubsectionBlockProps) => {
  const getBadgeVariant = (s?: string) => {
    if (s === 'done') return 'success';
    if (s === 'in-progress') return 'warning';
    return 'pending';
  };

  return (
    <div className="mb-16">
      <div className="flex items-center gap-4 mb-4">
        <h2 className="text-2xl font-bold text-text-primary">{title}</h2>
        {status && <Badge variant={getBadgeVariant(status)}>{status}</Badge>}
      </div>
      
      {description && (
        <p className="text-text-secondary text-lg mb-8 max-w-3xl">
          {description}
        </p>
      )}
      
      <div className="mt-8">
        {children}
      </div>
    </div>
  );
};

