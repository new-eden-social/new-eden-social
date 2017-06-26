import { Component } from '@nestjs/common';
import { createConnection, Connection, EntityManager, Repository, ObjectType } from 'typeorm';
import { DatabaseConfig } from './database.config';

function delay(milliseconds: number, count: number): Promise<number> {
  return new Promise<number>((resolve) => {
    setTimeout(
      () => {
        resolve(count);
      },
      milliseconds);
  });
}

@Component()
export class DatabaseService {

  /**
   * A Connection reference which is reused by all consumers of the database service
   */
  private connection: Connection;

  private pending: boolean;

  /**
   * Abstract injection so it is possible to use several databases
   * @param databaseConfig
   */
  constructor(private readonly databaseConfig: DatabaseConfig) {
  }

  /**
   * An async getter for the Connection which creates the connection if needed.
   * @returns {Promise<Connection>}
   */
  private async getConnection(): Promise<Connection> {

    if (this.pending) {
      // Need to wait untill previous call is resolved, otherwise will throw transaction error
      for (let i = 0; i < 500; i += 1) {
        if (!this.pending) {
          break;
        }
        // await is converting Promise<number> into number
        await delay(50, i);
      }
    }

    // return the connection if it's been created already
    if (this.connection) return Promise.resolve(this.connection);
    this.pending = true;
    // otherwise create it
    this.connection = await createConnection(this.databaseConfig.getConfiguration());
    this.pending = false;

    return this.connection;
  }

  /**
   * An async getter for the entity manager.
   *
   * Connects to the database if needed and returns a reference to the EntityManager
   * @returns {Promise<EntityManager>}
   */
  public async getEntityManager(): Promise<EntityManager> {
    return (await this.getConnection()).manager;
  }

  /**
   * An async getter for repositories.
   *
   * Connects to the database if needed and returns a reference to a Repository
   *  for the specified Entity
   * @param entityClassOrName
   * @returns {Promise<Repository<T>>}
   */
  public async getRepository<T>(entityClassOrName: ObjectType<T>
                                  | string): Promise<Repository<T>> {
    return (await this.getConnection()).getRepository<T>(entityClassOrName);
  }
}
