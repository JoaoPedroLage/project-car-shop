export interface Model<T> {
  create(obj:T): Promise<T>;
  read(): Promise<T[]>;
  readOne(name: string): Promise<T | null>;
  update(name: string, obj: T): Promise<T | null>;
  delete(name: string): Promise<T | null>;
}