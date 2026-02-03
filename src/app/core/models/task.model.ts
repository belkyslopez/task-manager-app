export type TaskStatus = 'pending' | 'completed';

export interface TaskItem {
  id: number;
  userId?: number;
  title: string;
  completed: boolean;
  description?: string;
  date?: string;
  status?: TaskStatus;
  createdAt?: string;
  updatedAt?: string;
}

