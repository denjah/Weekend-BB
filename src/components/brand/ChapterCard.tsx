import { useNavigate } from "react-router-dom";
import { Card, CardBody } from "../ui/Card";
import { Badge } from "../ui/Badge";

interface ChapterCardProps {
  id: string;
  num: string;
  icon: string;
  title: string;
  desc: string;
  count: string;
  color: string;
}

export const ChapterCard = ({ id, num, icon, title, desc, count, color }: ChapterCardProps) => {
  const navigate = useNavigate();

  return (
    <Card 
      onClick={() => navigate(`/${id}`)}
      className="group flex flex-col h-[280px] relative overflow-hidden"
    >
      <div 
        className="absolute top-0 left-0 w-1 h-full opacity-50 group-hover:opacity-100 transition-opacity" 
        style={{ backgroundColor: color }} 
      />
      
      <CardBody className="flex flex-col h-full">
        <div className="flex justify-between items-start mb-auto">
          <span className="text-xs font-mono text-text-tertiary uppercase tracking-wider">
            Раздел {num}
          </span>
          <span className="text-2xl" style={{ color }}>{icon}</span>
        </div>
        
        <div>
          <h3 className="text-xl font-bold text-text-primary mb-3 group-hover:text-accent-primary transition-colors">
            {title}
          </h3>
          <p className="text-sm text-text-secondary line-clamp-3 mb-4">
            {desc}
          </p>
          <Badge>{count}</Badge>
        </div>
      </CardBody>
    </Card>
  );
};

