import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/core/services/task.service';
import { TaskItem } from 'src/app/core/models/task.model';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { IonToolbar, IonHeader, IonTitle, IonContent, IonSpinner, IonButtons, ModalController } from '@ionic/angular/standalone';
import { TaskItemComponent } from 'src/app/shared/components/task-item/task-item.component';
import { IonIcon } from '@ionic/angular/standalone';
import { TaskDetailComponent } from '../task-detail/task-detail.component';

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
    private taskService: TaskService,
    private modalCtrl: ModalController,
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

  async openTaskDetail(taskId: number): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: TaskDetailComponent,
      componentProps: { taskId }
    });
    await modal.present();
  }

}
