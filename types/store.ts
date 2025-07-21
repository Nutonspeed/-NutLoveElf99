export interface StoreModule<T> {
  getAll(): T[]
  add?(item: any): any
  update?(id: string, data: Partial<T>): any
  reset?(): void
  regenerate?(): void
}
