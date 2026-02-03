import { Injectable} from '@angular/core';

const STORAGE_KEY = 'theme_dark';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private isDark: boolean = false;

 constructor() {
    this.isDark = this.readFromStorage();
    this.apply(this.isDark);
  }

  setDarkMode(enable: boolean): void {
    this.isDark = enable;
    this.apply(enable);
    this.saveToStorage(enable);
  }

  getDarkModeStatus(): boolean {
    return this.isDark;
  }

  toggle(): boolean {
    const next = !this.isDark;
    this.setDarkMode(next);
    return next;
  }


  private apply(enable: boolean): void {
    document.documentElement.classList.toggle('dark', enable);
  }

  private readFromStorage(): boolean {
    const value = localStorage.getItem(STORAGE_KEY);
    return value === 'true';
  }

  private saveToStorage(enable: boolean): void {
    localStorage.setItem(STORAGE_KEY, String(enable));
  }
}
