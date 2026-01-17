import { motion } from 'framer-motion';
import { Calendar, Users } from 'lucide-react';
import { format } from 'date-fns';
import { Project, Team } from '@/types';
import { StatusBadge, PriorityBadge } from '@/components/ui/status-badge';
import { ProgressBar } from '@/components/ui/progress-bar';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface ProjectCardProps {
  project: Project;
  team?: Team;
  delay?: number;
}

export function ProjectCard({ project, team, delay = 0 }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="bg-card rounded-xl p-6 shadow-sm border border-border hover:shadow-lg hover:border-primary/20 transition-all cursor-pointer group"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-lg truncate group-hover:text-primary transition-colors">
            {project.name}
          </h3>
          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
            {project.description}
          </p>
        </div>
        <div className="flex flex-col gap-2 ml-4">
          <StatusBadge status={project.status} />
          <PriorityBadge priority={project.priority} />
        </div>
      </div>

      <ProgressBar value={project.progress} showLabel size="md" className="mb-4" />

      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Calendar size={14} />
          <span>{format(project.endDate, 'MMM d, yyyy')}</span>
        </div>

        {team && (
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {team.members.slice(0, 3).map((member) => (
                <Avatar key={member.id} className="h-6 w-6 border-2 border-card">
                  <AvatarFallback className="text-[10px] bg-primary/10 text-primary">
                    {member.avatar}
                  </AvatarFallback>
                </Avatar>
              ))}
              {team.members.length > 3 && (
                <div className="h-6 w-6 rounded-full bg-secondary flex items-center justify-center text-[10px] font-medium border-2 border-card">
                  +{team.members.length - 3}
                </div>
              )}
            </div>
            <span className="text-muted-foreground">{team.name}</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}
