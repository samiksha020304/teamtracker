import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Filter, LayoutGrid, List } from 'lucide-react';
import { MainLayout } from '@/components/layout/MainLayout';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { ProjectCard } from '@/components/dashboard/ProjectCard';
import { RecentActivity } from '@/components/dashboard/RecentActivity';
import { TeamPerformance } from '@/components/dashboard/TeamPerformance';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { mockProjects, mockTeams, mockTasks, currentUser } from '@/data/mockData';
import { FolderKanban, CheckCircle2, Clock, Users, TrendingUp } from 'lucide-react';

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const stats = useMemo(() => {
    const totalProjects = mockProjects.length;
    const completedProjects = mockProjects.filter((p) => p.status === 'completed').length;
    const inProgressProjects = mockProjects.filter((p) => p.status === 'in_progress').length;
    const totalTasks = mockTasks.length;
    const completedTasks = mockTasks.filter((t) => t.status === 'done').length;
    const overallProgress = Math.round(
      mockProjects.reduce((sum, p) => sum + p.progress, 0) / totalProjects
    );

    return {
      totalProjects,
      completedProjects,
      inProgressProjects,
      totalTasks,
      completedTasks,
      overallProgress,
      teams: mockTeams.length,
    };
  }, []);

  const filteredProjects = useMemo(() => {
    return mockProjects.filter((project) => {
      const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [searchQuery, statusFilter]);

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
            <h1 className="text-3xl font-bold tracking-tight">
              Welcome back, <span className="text-gradient">{currentUser.name.split(' ')[0]}</span>
            </h1>
            <p className="text-muted-foreground mt-1">
              Here's what's happening with your projects today.
            </p>
          </div>
          <Button className="gradient-primary text-primary-foreground shadow-glow">
            <Plus size={18} className="mr-2" />
            New Project
          </Button>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Total Projects"
          value={stats.totalProjects}
          change={`${stats.completedProjects} completed`}
          changeType="positive"
          icon={FolderKanban}
          delay={0}
        />
        <StatsCard
          title="Active Tasks"
          value={stats.totalTasks - stats.completedTasks}
          change={`${stats.completedTasks} completed`}
          changeType="positive"
          icon={CheckCircle2}
          iconColor="text-status-completed"
          delay={0.1}
        />
        <StatsCard
          title="In Progress"
          value={stats.inProgressProjects}
          change="Currently active"
          changeType="neutral"
          icon={Clock}
          iconColor="text-status-in-progress"
          delay={0.2}
        />
        <StatsCard
          title="Overall Progress"
          value={`${stats.overallProgress}%`}
          change="+5% from last week"
          changeType="positive"
          icon={TrendingUp}
          iconColor="text-accent"
          delay={0.3}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Projects Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between"
          >
            <div className="flex items-center gap-3 flex-1 w-full sm:w-auto">
              <div className="relative flex-1 max-w-xs">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <Input
                  placeholder="Search projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[140px]">
                  <Filter size={16} className="mr-2" />
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

          {/* Projects Grid */}
          <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 gap-4' : 'space-y-4'}>
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                team={mockTeams.find((t) => t.id === project.teamId)}
                delay={0.3 + index * 0.1}
              />
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-muted-foreground">No projects found matching your criteria.</p>
            </motion.div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <TeamPerformance />
          <RecentActivity />
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
