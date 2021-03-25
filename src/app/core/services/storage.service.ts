import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  storage = window.localStorage;
  constructor() {}

  setItem(key: string, value: any): void {
    try {
      this.storage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error('Error saving to localStorage', e);
    }
  }

  getItem<T>(key: string): T | null {
    try {
      const data = this.storage.getItem(key);
      return data !== null ? JSON.parse(data) : null;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  removeItem(key: string): void {
    try {
      this.storage.removeItem(key);
    } catch (error) {
      console.error(error);
    }
  }

  clear(): void {
    try {
      this.storage.clear();
    } catch (error) {
      console.error(error);
    }
  }
}
