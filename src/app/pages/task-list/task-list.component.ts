import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/core/services/task.service';
import { TaskItem } from 'src/app/core/models/task.model';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { IonToolbar, IonHeader, IonTitle, IonContent, IonSpinner, IonButtons } from '@ionic/angular/standalone';
import { TaskItemComponent } from 'src/app/shared/components/task-item/task-item.component';
import { IonIcon } from '@ionic/angular/standalone';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, IonIcon, IonButtons, IonToolbar, IonHeader, IonTitle, IonContent, TaskItemComponent, IonSpinner],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent  implements OnInit {

   tasks$!: Observable<TaskItem[]>;

  constructor(
    private taskService: TaskService
    ) { }

  ngOnInit() {
     this.tasks$ = this.taskService.tasks$;
    this.taskService.fetchTasks().subscribe(tasks =>{
      console.log('Tasks fetched in component:', tasks);
    });
  }

   onToggleStatus(taskId: number): void {
    this.taskService.toggleTaskStatus(taskId);
  }

}
