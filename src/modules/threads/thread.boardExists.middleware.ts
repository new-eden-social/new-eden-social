import { Middleware, NestMiddleware, HttpStatus } from '@nestjs/common';
import { HttpException } from '@nestjs/core';
import { BoardsService } from '../boards/boards.service';

@Middleware()
export class ThreadBoardExistsMiddleware implements NestMiddleware {

  constructor(private boardsService: BoardsService) {
  }

  resolve(): (req, res, next) => void {
    return async (req, res, next) => {
      // if this middleware is misapplied to a route without ID, params.id would be null
      if (!req.params.boardId) {
        throw new HttpException(
          { error: 'Oops, something went wrong.' },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      const board = await this.boardsService.get(req.params.boardId);
      if (!board) {
        throw new HttpException('Board not found.', HttpStatus.NOT_FOUND);
      }
      req.board = board;
      next();
    };
  }
}
