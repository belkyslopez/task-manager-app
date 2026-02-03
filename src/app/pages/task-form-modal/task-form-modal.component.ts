import { TaskService } from 'src/app/core/services/task.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonIcon,
  IonContent, IonItem, IonLabel, IonInput, IonTextarea, IonNote, IonModal, IonDatetime, IonSpinner,
  ModalController, ToastController
} from '@ionic/angular/standalone';
@Component({
  selector: 'app-task-form-modal',
    standalone: true,
    imports: [ CommonModule, ReactiveFormsModule, IonHeader, IonToolbar, IonTitle,
    IonButtons, IonButton, IonIcon, IonContent, IonItem, IonLabel, IonInput, IonTextarea,
    IonNote, IonModal, IonDatetime, IonSpinner,],
    templateUrl: './task-form-modal.component.html',
    styleUrls: ['./task-form-modal.component.scss'],
})
export class TaskFormModalComponent {
 isSubmitting = false;
  form = this.fb.nonNullable.group({
    title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(60)]],
    description: ['', [Validators.maxLength(200)]],
    date: [''],
  });

  constructor(
     private readonly fb: FormBuilder,
    private readonly modalCtrl: ModalController,
    private readonly toastCtrl: ToastController,
    private readonly taskService: TaskService,
  ) {  }

  isInvalid(controlName: 'title' | 'description'): boolean {
    const control = this.form.get(controlName);
    return !!control && control.invalid && (control.dirty || control.touched);
  }

    close(): void {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  onDateChange(value: string | string[] | null | undefined): void {
    const v = Array.isArray(value) ? value[0] : value;
    if (!v) {
      this.form.patchValue({ date: '' });
      return;
    }
    const yyyyMmDd = String(v).slice(0, 10);
    this.form.patchValue({ date: yyyyMmDd });
  }

  submit(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid) return;

    this.isSubmitting = true;

    const { title, description, date } = this.form.getRawValue();

    const created = this.taskService.createTask({
      title: title.trim(),
      description: description?.trim() ? description : null,
      date: date?.trim() ? date : null,
    });

    this.isSubmitting = false;
    this.modalCtrl.dismiss({ task: created }, 'created');
  }

  get titleCtrl() {
    return this.form.controls.title;
  }



}
