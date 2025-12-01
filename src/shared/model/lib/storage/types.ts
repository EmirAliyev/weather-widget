
export interface IStorageAdapter {

  get(key: string): string | null | undefined
  set(key: string, value: string): boolean
  remove(key: string): boolean
  clear(): boolean
}