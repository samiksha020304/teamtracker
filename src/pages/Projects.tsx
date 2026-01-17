import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Filter, LayoutGrid, List, Calendar, MoreHorizontal } from 'lucide-react';
import { MainLayout } from '@/components/layout/MainLayout';
import { ProjectCard } from '@/components/dashboard/ProjectCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { mockProjects, mockTeams } from '@/data/mockData';
import { StatusBadge, PriorityBadge } from '@/components/ui/status-badge';
import { ProgressBar } from '@/components/ui/progress-bar';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { format } from 'date-fns';

const Projects = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [teamFilter, setTeamFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredProjects = useMemo(() => {
    return mockProjects.filter((project) => {
      const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
      const matchesTeam = teamFilter === 'all' || project.teamId === teamFilter;
      return matchesSearch && matchesStatus && matchesTeam;
    });
  }, [searchQuery, statusFilter, teamFilter]);

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
            <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
            <p className="text-muted-foreground mt-1">
              Manage and track all your organization's projects.
            </p>
          </div>
          <Button className="gradient-primary text-primary-foreground shadow-glow">
            <Plus size={18} className="mr-2" />
            Create Project
          </Button>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-6"
      >
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
            <Input
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-[250px]"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="not_started">Not Started</SelectItem>
              <SelectItem value="in_progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="on_hold">On Hold</SelectItem>
            </SelectContent>
          </Select>
          <Select value={teamFilter} onValueChange={setTeamFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Team" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Teams</SelectItem>
              {mockTeams.map((team) => (
                <SelectItem key={team.id} value={team.id}>
                  {team.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
            size="icon"
            onClick={() => setViewMode('grid')}
          >
            <LayoutGrid size={18} />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'secondary' : 'ghost'}
            size="icon"
            onClick={() => setViewMode('list')}
          >
            <List size={18} />
          </Button>
        </div>
      </motion.div>

      {/* Projects */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              team={mockTeams.find((t) => t.id === project.teamId)}
              delay={0.2 + index * 0.05}
            />
          ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-card rounded-xl border border-border overflow-hidden"
        >
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Project</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Team</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Status</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Priority</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Progress</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Due Date</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground"></th>
              </tr>
            </thead>
            <tbody>
              {filteredProjects.map((project, index) => {
                const team = mockTeams.find((t) => t.id === project.teamId);
                return (
                  <motion.tr
                    key={project.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + index * 0.05 }}
                    className="border-t border-border hover:bg-muted/30 transition-colors"
                  >
                    <td className="p-4">
                      <div>
                        <p className="font-medium">{project.name}</p>
                        <p className="text-sm text-muted-foreground truncate max-w-[200px]">
                          {project.description}
                        </p>
                      </div>
                    </td>
                    <td className="p-4">
                      {team && (
                        <div className="flex items-center gap-2">
                          <div className="flex -space-x-1">
                            {team.members.slice(0, 2).map((member) => (
                              <Avatar key={member.id} className="h-6 w-6 border-2 border-card">
                                <AvatarFallback className="text-[10px] bg-primary/10 text-primary">
                                  {member.avatar}
                                </AvatarFallback>
                              </Avatar>
                            ))}
                          </div>
                          <span className="text-sm">{team.name}</span>
                        </div>
                      )}
                    </td>
                    <td className="p-4">
                      <StatusBadge status={project.status} />
                    </td>
                    <td className="p-4">
                      <PriorityBadge priority={project.priority} />
                    </td>
                    <td className="p-4 min-w-[120px]">
                      <ProgressBar value={project.progress} size="sm" />
                      <span className="text-xs text-muted-foreground mt-1">{project.progress}%</span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Calendar size={14} />
                        {format(project.endDate, 'MMM d, yyyy')}
                      </div>
                    </td>
                    <td className="p-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal size={16} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Edit Project</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </motion.div>
      )}

      {filteredProjects.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12 bg-card rounded-xl border border-border"
        >
          <p className="text-muted-foreground">No projects found matching your criteria.</p>
        </motion.div>
      )}
    </MainLayout>
  );
};

export default Projects;
