import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { TaskItem , TaskStatus} from 'src/app/core/models/task.model';
import { HttpClient } from '@angular/common/http';
import { map, tap, catchError  } from 'rxjs/operators';

export interface CreateTaskPayload {
  title: string;
  description?: string | null;
  date?: string | null; // 'YYYY-MM-DD'
}
@Injectable({
  providedIn: 'root',
})
export class TaskService {

    private readonly API_URL = 'https://jsonplaceholder.typicode.com/todos';
  private readonly STORAGE_KEY = 'tasks';

  private readonly tasksSubject = new BehaviorSubject<TaskItem[]>([]);
  tasks$: Observable<TaskItem[]> = this.tasksSubject.asObservable();

  private get currentTasks(): TaskItem[] {
    const value = this.tasksSubject.value;
    return Array.isArray(value) ? value : [];
  }
  private normalizeTask(t: Partial<TaskItem> & Pick<TaskItem, 'id' | 'title'>): TaskItem {
  const completed = !!t.completed;
    const status: TaskStatus = completed ? 'completed' : 'pending';
  const now = new Date().toISOString();
   return {
    id: t.id,
    userId: t.userId,
    title: t.title,
    description: t.description,
    date: t.date,
    completed,
    status,
    createdAt: t.createdAt ?? now,
    updatedAt: t.updatedAt ?? now,
  };
}

  constructor( readonly http: HttpClient) {
    this.loadFromStorage();
  }

  fetchTasks(): Observable<TaskItem[]> {
     return this.http.get<any[]>(this.API_URL).pipe(
      map(tasks =>
        tasks.map((t) => this.mapApiTaskToTaskItem(t))
      ),
      tap((tasks) => {
        console.log('[SERVICE] Total tasks from API:', tasks.length);
        this.tasksSubject.next(tasks);
        this.saveToStorage(tasks);
      }),
      catchError(() => {
        return of(this.currentTasks);
      })
    );
  }
  toggleTaskStatus(taskId: number): void {
    const updatedTasks: TaskItem[] = this.currentTasks.map(t =>
  t.id === taskId
    ? this.normalizeTask({
        ...t,
        completed: !t.completed,
        updatedAt: new Date().toISOString(),
      })
    : t
);

    this.tasksSubject.next(updatedTasks);
    this.saveToStorage(updatedTasks);
  }
   getTaskById(id: number): TaskItem | undefined {
    return this.currentTasks.find(task => task.id === id);
  }

  setTasks(tasks: TaskItem[]): void {
    const safe = Array.isArray(tasks) ? tasks : [];
    this.tasksSubject.next(safe);
    this.saveToStorage(safe);
  }

    createTask(payload: CreateTaskPayload): TaskItem {
    const now = new Date().toISOString();
    const current = this.currentTasks;

    const newTask: TaskItem = {
      id: this.nextId(current),
      userId: 1,
      title: payload.title.trim(),
      description: payload.description?.trim() || undefined,
      date: payload.date || undefined,
      status: 'pending',
      createdAt: now,
      updatedAt: now,
      completed: false,
    };

    const updated = [newTask, ...current];
    this.tasksSubject.next(updated);
    this.saveToStorage(updated);
    //save task in the API (not implemented in this mock API)
    return newTask;
  }

   private mapApiTaskToTaskItem(t: any): TaskItem {
    const now = new Date().toISOString();

    return {
      id: Number(t?.id ?? 0),
      userId: Number(t?.userId ?? 1),
      title: String(t?.title ?? '').trim(),
      completed: Boolean(t?.completed),
      status: Boolean(t?.completed) ? 'completed' : 'pending',
      createdAt: now,
      updatedAt: now,
      description: undefined,
      date: undefined,
    };
  }

   private nextId(tasks: TaskItem[]): number {
    const safe = Array.isArray(tasks) ? tasks : [];
    const maxId = safe.reduce((acc, t) => Math.max(acc, t?.id ?? 0), 0);
    return maxId + 1;
  }


   private saveToStorage(tasks: TaskItem[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(tasks));
  }

  private loadFromStorage(): void {
  try {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (!stored) return;

    const parsed = JSON.parse(stored);
    if (Array.isArray(parsed)) {
      const normalized = parsed.map((t: any) => this.normalizeTask({
        ...t,
        id: Number(t?.id ?? 0),
        title: String(t?.title ?? ''),
      }));
      this.tasksSubject.next(normalized);
    } else {
      this.tasksSubject.next([]);
    }
  } catch {
    this.tasksSubject.next([]);
  }
}

}
