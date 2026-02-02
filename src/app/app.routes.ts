import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'task-list',
    loadComponent:
     () => import('./pages/task-list/task-list.component').then((m) => m.TaskListComponent),
  },
  {
    path: '**',
    redirectTo: 'task-list',
    pathMatch: 'full',
  },
];
