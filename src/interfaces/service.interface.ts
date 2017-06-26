export interface IService<T> {
  getAll?(): Promise<T[]>;
  get?(id: number): Promise<T>;
  create?(entity: T): Promise<T>;
  update?(entity: T): Promise<T>;
  remove?(entity: T): Promise<T>;
}
