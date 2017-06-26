import { Response, Param, Controller, Get, Post, Body, HttpStatus } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { Board } from './board.entety';

@Controller('boards')
export class BoardsController {
  constructor(private boardsService: BoardsService) {
  }

  @Get()
  public async getAllBoards(@Response() res) {
    const boards = await this.boardsService.getAll();

    res.status(HttpStatus.OK).json(boards);
  }

  @Get('/:id')
  public async getBoard(@Response() res, @Param('id') id) {
    const board = await this.boardsService.get(id);
    res.status(HttpStatus.OK).json(board);
  }
}
