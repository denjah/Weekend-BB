import { useRef } from 'react';
import type { ReactNode, MouseEvent } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  strength?: number;
  onClick?: () => void;
}

export const MagneticButton = ({ children, className = '', strength = 30, onClick }: MagneticButtonProps) => {
  const magnetic = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!magnetic.current) return;

    const xTo = gsap.quickTo(magnetic.current, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
    const yTo = gsap.quickTo(magnetic.current, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
      const { clientX, clientY } = e;
      const { height, width, left, top } = magnetic.current!.getBoundingClientRect();
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);
      xTo(x * (strength / 100));
      yTo(y * (strength / 100));
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    magnetic.current.addEventListener('mousemove', handleMouseMove as any);
    magnetic.current.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      magnetic.current?.removeEventListener('mousemove', handleMouseMove as any);
      magnetic.current?.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, { scope: magnetic });

  return (
    <div ref={magnetic} className={className} onClick={onClick} style={{ cursor: 'pointer' }}>
      {children}
    </div>
  );
};

