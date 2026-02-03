import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonCard, IonCheckbox, IonChip } from '@ionic/angular/standalone';
import { TaskItem } from 'src/app/core/models/task.model';
import { CapitalizePipe } from "../../pipe/capitalize-pipe";

interface Task {
  id: number;
}


@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [CommonModule, IonCard, IonCheckbox, IonChip, CapitalizePipe],
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
})
export class TaskItemComponent  implements OnInit {

  @Input() task!: TaskItem;
  @Output() toggle = new EventEmitter<number>();

  constructor() { }

   onToggle(): void {
   this.toggle.emit(this.task.id);
  }

  ngOnInit() {}

}
