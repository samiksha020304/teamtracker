import { cn } from '@/lib/utils';
import { ProjectStatus, TaskStatus, Priority } from '@/types';

interface StatusBadgeProps {
  status: ProjectStatus | TaskStatus;
  className?: string;
}

const statusConfig: Record<ProjectStatus | TaskStatus, { label: string; className: string }> = {
  not_started: { label: 'Not Started', className: 'bg-status-not-started/10 text-status-not-started border-status-not-started/20' },
  in_progress: { label: 'In Progress', className: 'bg-status-in-progress/10 text-status-in-progress border-status-in-progress/20' },
  completed: { label: 'Completed', className: 'bg-status-completed/10 text-status-completed border-status-completed/20' },
  on_hold: { label: 'On Hold', className: 'bg-status-on-hold/10 text-status-on-hold border-status-on-hold/20' },
  todo: { label: 'To Do', className: 'bg-status-not-started/10 text-status-not-started border-status-not-started/20' },
  review: { label: 'In Review', className: 'bg-accent/10 text-accent border-accent/20' },
  done: { label: 'Done', className: 'bg-status-completed/10 text-status-completed border-status-completed/20' },
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status];
  
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border',
        config.className,
        className
      )}
    >
      {config.label}
    </span>
  );
}

interface PriorityBadgeProps {
  priority: Priority;
  className?: string;
}

const priorityConfig: Record<Priority, { label: string; className: string }> = {
  high: { label: 'High', className: 'bg-priority-high/10 text-priority-high border-priority-high/20' },
  medium: { label: 'Medium', className: 'bg-priority-medium/10 text-priority-medium border-priority-medium/20' },
  low: { label: 'Low', className: 'bg-priority-low/10 text-priority-low border-priority-low/20' },
};

export function PriorityBadge({ priority, className }: PriorityBadgeProps) {
  const config = priorityConfig[priority];
  
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border',
        config.className,
        className
      )}
    >
      {config.label}
    </span>
  );
}
