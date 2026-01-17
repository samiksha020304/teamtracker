import { motion } from 'framer-motion';
import { mockTeams, mockProjects, mockTasks } from '@/data/mockData';
import { ProgressBar } from '@/components/ui/progress-bar';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

export function TeamPerformance() {
  const teamsWithStats = mockTeams.map((team) => {
    const teamProjects = mockProjects.filter((p) => p.teamId === team.id);
    const teamTasks = mockTasks.filter((t) =>
      teamProjects.some((p) => p.id === t.projectId)
    );
    const completedTasks = teamTasks.filter((t) => t.status === 'done').length;
    const completionRate = teamTasks.length > 0 
      ? Math.round((completedTasks / teamTasks.length) * 100)
      : 0;

    return {
      ...team,
      projectCount: teamProjects.length,
      taskCount: teamTasks.length,
      completedTasks,
      completionRate,
    };
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.4 }}
      className="bg-card rounded-xl p-6 shadow-sm border border-border"
    >
      <h3 className="font-semibold text-lg mb-4">Team Performance</h3>
      <div className="space-y-5">
        {teamsWithStats.map((team, index) => (
          <motion.div
            key={team.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
            className="space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {team.members.slice(0, 3).map((member) => (
                    <Avatar key={member.id} className="h-7 w-7 border-2 border-card">
                      <AvatarFallback className="text-[10px] bg-primary/10 text-primary">
                        {member.avatar}
                      </AvatarFallback>
                    </Avatar>
                  ))}
                </div>
                <div>
                  <p className="font-medium text-sm">{team.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {team.projectCount} projects • {team.members.length} members
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold">{team.completionRate}%</p>
                <p className="text-xs text-muted-foreground">
                  {team.completedTasks}/{team.taskCount} tasks
                </p>
              </div>
            </div>
            <ProgressBar value={team.completionRate} size="sm" />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
