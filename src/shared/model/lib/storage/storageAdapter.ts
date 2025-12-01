import type { IStorageAdapter } from '@/shared/model/lib/storage/types';

class StorageAdapter implements IStorageAdapter {
  private storage: Storage;

  constructor(storage = window.localStorage) {
    this.storage = storage;
  }

  get(key: string): string | null | undefined {
    try {
      return this.storage.getItem(key);
    } catch (error) {
      void error;
      return null;
    }
  }

  set(key: string, value: string): boolean {
    try {
      this.storage.setItem(key, value);
      return true;
    } catch (error) {
      void error;
      return false;
    }
  }

  remove(key: string): boolean {
    try {
      this.storage.removeItem(key);
      return true;
    } catch (error) {
      void error;
      return false;
    }
  }

  clear(): boolean {
    try {
      this.storage.clear();
      return true;
    } catch (error) {
      void error;
      return false;
    }
  }
}

export const storageAdapter = new StorageAdapter(window.localStorage);

export { StorageAdapter };

