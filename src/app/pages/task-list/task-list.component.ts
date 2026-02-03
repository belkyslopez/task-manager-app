import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/core/services/task.service';
import { TaskItem } from 'src/app/core/models/task.model';
import { Observable, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { IonToolbar, IonHeader, IonIcon, IonTitle, IonContent, IonSpinner, ModalController, IonButton, IonButtons, IonFab, IonFabButton, IonInfiniteScroll, IonInfiniteScrollContent } from '@ionic/angular/standalone';
import { TaskItemComponent } from 'src/app/shared/components/task-item/task-item.component';
import { TaskDetailComponent } from '../task-detail/task-detail.component';
import { TaskFormModalComponent } from '../task-form-modal/task-form-modal.component';
import { ThemeService } from '../../core/services/theme.service';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, IonToolbar, IonHeader, IonTitle, IonContent, TaskItemComponent, IonSpinner, IonIcon, IonButton, IonButtons, IonFab, IonFabButton, IonInfiniteScroll, IonInfiniteScrollContent],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent  implements OnInit {

   tasks$!: Observable<TaskItem[]>;
   isDark: boolean = false;
   private readonly THEME_KEY = 'theme';
   allTasks: TaskItem[] = [];
   visibleTasks: TaskItem[] = [];
   cursor = 0;
   allLoaded: boolean = false;
   sub?: Subscription;
   pageSize: number = 20;

  constructor(
    private readonly modalCtrl: ModalController,
    private readonly themeService: ThemeService,
    private readonly taskService: TaskService,
    ) { this.initTheme(); }

  ngOnInit() {
     this.tasks$ = this.taskService.tasks$;
    this.sub = this.tasks$.subscribe((tasks) => {
      this.allTasks = tasks ?? [];
      this.resetInfiniteList();
    });
    this.taskService.fetchTasks().subscribe();
  }

   ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  private resetInfiniteList(): void {
    this.cursor = 0;
    this.allLoaded = false;
    this.visibleTasks = [];
    this.appendNextPage();
  }

  private appendNextPage(): void {
    const next = this.allTasks.slice(this.cursor, this.cursor + this.pageSize);
    this.visibleTasks = [...this.visibleTasks, ...next];
    this.cursor += next.length;
    if (this.cursor >= this.allTasks.length) {
      this.allLoaded = true;
    }
  }

   loadMore(ev: CustomEvent): void {
    this.appendNextPage();
    (ev.target as HTMLIonInfiniteScrollElement).complete();
    if (this.allLoaded) {
      (ev.target as HTMLIonInfiniteScrollElement).disabled = true;
    }
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

  async openCreateTask(): Promise<void> {
  const modal = await this.modalCtrl.create({
    component: TaskFormModalComponent,
    breakpoints: [0, 0.6, 0.95],
    initialBreakpoint: 0.6,
    handle: true,
  });
  await modal.present();
  await modal.onWillDismiss();
}

  toggleTheme(): void {
    this.isDark = !this.isDark;
    this.applyTheme(this.isDark);
    localStorage.setItem(this.THEME_KEY, this.isDark ? 'dark' : 'light');
  }

  private initTheme(): void {
    const saved = localStorage.getItem(this.THEME_KEY);

    if (saved === 'dark' || saved === 'light') {
      this.isDark = saved === 'dark';
      this.applyTheme(this.isDark);
      return;
    }
    this.isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    this.applyTheme(this.isDark);
  }

  private applyTheme(dark: boolean): void {
    document.body.classList.toggle('dark', dark);
  }
}
