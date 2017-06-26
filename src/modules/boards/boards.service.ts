import { Component, HttpStatus } from '@nestjs/common';
import { HttpException } from '@nestjs/core';
import { IService } from '../../interfaces/service.interface';
import { DatabaseService } from '../database/database.service';
import { Repository } from 'typeorm';
import { Board } from './board.entety';

@Component()
export class BoardsService implements IService<Board> {

  constructor(private databaseService: DatabaseService) {
  }

  private get repository(): Promise<Repository<Board>> {
    return this.databaseService.getRepository(Board);
  }

  async getAll() {
    return (await this.repository).find();
  }

  async get(id: number) {
    const board = await (await this.repository).findOneById(id);
    if (!board) {
      throw new HttpException('Board not found', HttpStatus.NOT_FOUND);
    }
    return board;
  }

  async create(board: Board) {
    return (await this.repository).persist(board);
  }
}
