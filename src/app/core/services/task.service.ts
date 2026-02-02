import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { TaskItem } from 'src/app/core/models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {

    private readonly API_URL = 'https://jsonplaceholder.typicode.com/todos';
  private readonly STORAGE_KEY = 'tasks';

  private tasksSubject = new BehaviorSubject<TaskItem[]>([]);
  tasks$: Observable<TaskItem[]> = this.tasksSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadFromStorage();
  }

  fetchTasks(): Observable<TaskItem[]> {
    return this.http.get<TaskItem[]>(this.API_URL).pipe(
      map(tasks =>
        tasks.slice(0, 20).map(task => ({
          id: task.id,
          title: task.title,
          completed: task.completed
        }))

      ),
      tap(tasks => {
        this.tasksSubject.next(tasks);
        this.saveToStorage(tasks);
          console.log('fetchTasks called', this.tasksSubject.value);
      })
    );

  }

   toggleTaskStatus(taskId: number): void {
    const updatedTasks = this.tasksSubject.value.map(task =>
      task.id === taskId
        ? { ...task, completed: !task.completed }
        : task
    );

    this.tasksSubject.next(updatedTasks);
    this.saveToStorage(updatedTasks);
  }

   getTaskById(id: number): TaskItem | undefined {
    return this.tasksSubject.value.find(task => task.id === id);
  }

   private saveToStorage(tasks: TaskItem[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(tasks));
  }

  private loadFromStorage(): void {
    const storedTasks = localStorage.getItem(this.STORAGE_KEY);
    if (storedTasks) {
      this.tasksSubject.next(JSON.parse(storedTasks));
    }
  }



}
