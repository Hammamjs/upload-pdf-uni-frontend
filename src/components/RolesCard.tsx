import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

const RolesCard = ({
  count,
  Icon,
  className,
  IconClassName,
  textClassName,
  text,
}: {
  count: number;
  Icon: LucideIcon;
  className?: string;
  IconClassName?: string;
  textClassName?: string;
  text: string;
}) => {
  return (
    <div
      className={cn(
        'bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 backdrop-blur-md rounded-2xl p-6 border border-yellow-400/20',
        className
      )}
    >
      <div className="flex items-center justify-between">
        <div>
          <p
            className={cn('text-yellow-300 text-sm font-medium', textClassName)}
          >
            {text}
          </p>
          <p className="text-2xl font-bold text-white">{count}</p>
        </div>
        <Icon className={cn('h-8 w-8 text-yellow-400', IconClassName)} />
      </div>
    </div>
  );
};

export default RolesCard;
