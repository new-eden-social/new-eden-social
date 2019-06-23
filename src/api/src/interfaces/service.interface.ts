export interface IService<T> {
  getAll?(): Promise<T[]>;

  get?(id: number): Promise<T>;

  create?(entity: T): Promise<T>;

  update?(entity: T): Promise<T>;

  remove?(entity: T): Promise<T>;

  /**
   * Check if entity exists
   * @param {number} id
   * @return {Promise<Boolean>}
   */
  exists(id: number): Promise<Boolean>;
}
