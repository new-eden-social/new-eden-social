import { BoardsService } from './modules/boards/boards.service';
import { DatabaseService } from './modules/database/database.service';
import { DatabaseConfig } from './modules/database/database.config';
import { ThreadsService } from './modules/threads/threads.service';
import { config } from 'dotenv';
import { Board } from './modules/boards/board.entety';
import { Thread } from './modules/threads/thread.entety';

export class Seed {
  private boardsService: BoardsService;
  private threadsService: ThreadsService;

  private productionBoards = [
    new Board('programming'),
    new Board('random'),
    new Board('video games'),
  ];

  constructor() {
    config();

    const databaseService = new DatabaseService(new DatabaseConfig());

    this.boardsService = new BoardsService(databaseService);
    this.threadsService = new ThreadsService(databaseService);
  }

  public async board(board: Board) {
    return this.boardsService.create(board);
  }

  public async thread(thread: Thread) {
    return this.threadsService.create(thread);
  }

  public async production() {
    return await this.productionBoards.map(board => this.board(board));
  }

}

