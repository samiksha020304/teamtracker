import { cn } from '@/lib/utils';

interface ProgressBarProps {
  value: number;
  className?: string;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function ProgressBar({ value, className, showLabel = false, size = 'md' }: ProgressBarProps) {
  const sizeClasses = {
    sm: 'h-1.5',
    md: 'h-2',
    lg: 'h-3',
  };

  const getColor = (val: number) => {
    if (val >= 100) return 'bg-status-completed';
    if (val >= 60) return 'bg-status-in-progress';
    if (val >= 30) return 'bg-status-on-hold';
    return 'bg-status-not-started';
  };

  return (
    <div className={cn('w-full', className)}>
      {showLabel && (
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs text-muted-foreground">Progress</span>
          <span className="text-xs font-medium">{value}%</span>
        </div>
      )}
      <div className={cn('w-full bg-secondary rounded-full overflow-hidden', sizeClasses[size])}>
        <div
          className={cn('h-full rounded-full transition-all duration-500 ease-out', getColor(value))}
          style={{ width: `${Math.min(value, 100)}%` }}
        />
      </div>
    </div>
  );
}
