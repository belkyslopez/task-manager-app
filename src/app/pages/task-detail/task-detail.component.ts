import { Component, Input, OnInit } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { TaskItem } from 'src/app/core/models/task.model';
import { TaskService } from 'src/app/core/services/task.service';


@Component({
  selector: 'app-task-detail',
  standalone: true,
  imports: [IonicModule, CommonModule],
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss'],
})
export class TaskDetailComponent  implements OnInit {

  @Input() taskId!: number;
  task?: TaskItem;

  constructor(
       private modalCtrl: ModalController,
    private taskService: TaskService
  ) { }

  ngOnInit() {}

   ionViewWillEnter(): void {
    this.task = this.taskService.getTaskById(this.taskId);
  }

  toggleStatus(): void {
    if (!this.task) return;

    this.taskService.toggleTaskStatus(this.task.id);
    this.task = this.taskService.getTaskById(this.task.id);
  }

  close(): void {
    this.modalCtrl.dismiss();
  }

}
