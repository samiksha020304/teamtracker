import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Plus, Users, FolderKanban, MoreHorizontal } from 'lucide-react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { mockTeams, mockProjects, mockUsers } from '@/data/mockData';
import { ProgressBar } from '@/components/ui/progress-bar';

const Teams = () => {
  const teamsWithStats = useMemo(() => {
    return mockTeams.map((team) => {
      const teamProjects = mockProjects.filter((p) => p.teamId === team.id);
      const avgProgress = teamProjects.length > 0
        ? Math.round(teamProjects.reduce((sum, p) => sum + p.progress, 0) / teamProjects.length)
        : 0;
      const lead = mockUsers.find((u) => u.id === team.leadId);

      return {
        ...team,
        projectCount: teamProjects.length,
        avgProgress,
        lead,
      };
    });
  }, []);

  return (
    <MainLayout>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Teams</h1>
            <p className="text-muted-foreground mt-1">
              Manage your organization's teams and members.
            </p>
          </div>
          <Button className="gradient-primary text-primary-foreground shadow-glow">
            <Plus size={18} className="mr-2" />
            Create Team
          </Button>
        </div>
      </motion.div>

      {/* Teams Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teamsWithStats.map((team, index) => (
          <motion.div
            key={team.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="bg-card rounded-xl p-6 shadow-sm border border-border hover:shadow-lg hover:border-primary/20 transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-semibold text-lg">{team.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">{team.description}</p>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal size={16} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>View Details</DropdownMenuItem>
                  <DropdownMenuItem>Edit Team</DropdownMenuItem>
                  <DropdownMenuItem>Add Members</DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Team Lead */}
            {team.lead && (
              <div className="flex items-center gap-3 mb-4 p-3 bg-muted/50 rounded-lg">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                    {team.lead.avatar}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{team.lead.name}</p>
                  <p className="text-xs text-muted-foreground">Team Lead</p>
                </div>
              </div>
            )}

            {/* Team Members */}
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <Users size={14} className="text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{team.members.length} members</span>
              </div>
              <div className="flex -space-x-2">
                {team.members.slice(0, 5).map((member) => (
                  <Avatar key={member.id} className="h-8 w-8 border-2 border-card">
                    <AvatarFallback className="text-xs bg-primary/10 text-primary">
                      {member.avatar}
                    </AvatarFallback>
                  </Avatar>
                ))}
                {team.members.length > 5 && (
                  <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center text-xs font-medium border-2 border-card">
                    +{team.members.length - 5}
                  </div>
                )}
              </div>
            </div>

            {/* Stats */}
            <div className="pt-4 border-t border-border">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <FolderKanban size={14} />
                  <span>{team.projectCount} projects</span>
                </div>
                <span className="text-sm font-medium">{team.avgProgress}%</span>
              </div>
              <ProgressBar value={team.avgProgress} size="sm" />
            </div>
          </motion.div>
        ))}
      </div>
    </MainLayout>
  );
};

export default Teams;
