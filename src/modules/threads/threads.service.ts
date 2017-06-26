import { Component, HttpStatus } from '@nestjs/common';
import { HttpException } from '@nestjs/core';
import { DatabaseService } from '../database/database.service';
import { Repository } from 'typeorm';
import { IService } from '../../interfaces/service.interface';
import { Thread } from './thread.entety';
import { Board } from '../boards/board.entety';

@Component()
export class ThreadsService implements IService<Thread> {

  constructor(private databaseService: DatabaseService) {
  }

  private get repository(): Promise<Repository<Thread>> {
    return this.databaseService.getRepository(Thread);
  }

  async getAllForBoard(boardId: number) {
    return (await this.repository).find({ board: boardId });
  }

  async get(id: number) {
    const thread = await (await this.repository).findOneById(id);
    if (!thread) {
      throw new HttpException('Thread not found', HttpStatus.NOT_FOUND);
    }
    return thread;
  }

  async create(thread: Thread) {
    return (await this.repository).persist(thread);
  }
}
