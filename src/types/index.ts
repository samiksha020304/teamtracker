export type UserRole = 'admin' | 'team_lead' | 'member';

export type ProjectStatus = 'not_started' | 'in_progress' | 'completed' | 'on_hold';
export type TaskStatus = 'todo' | 'in_progress' | 'review' | 'done';
export type Priority = 'low' | 'medium' | 'high';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: UserRole;
  teamId?: string;
}

export interface Team {
  id: string;
  name: string;
  description?: string;
  leadId: string;
  members: User[];
  createdAt: Date;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  teamId: string;
  status: ProjectStatus;
  priority: Priority;
  startDate: Date;
  endDate: Date;
  progress: number;
  createdAt: Date;
}

export interface Task {
  id: string;
  projectId: string;
  title: string;
  description?: string;
  assigneeId?: string;
  status: TaskStatus;
  priority: Priority;
  dueDate: Date;
  subtasks?: SubTask[];
  createdAt: Date;
}

export interface SubTask {
  id: string;
  title: string;
  completed: boolean;
}

export interface Comment {
  id: string;
  taskId: string;
  userId: string;
  content: string;
  createdAt: Date;
}

export interface ActivityLog {
  id: string;
  userId: string;
  action: string;
  targetType: 'project' | 'task' | 'team';
  targetId: string;
  createdAt: Date;
}
