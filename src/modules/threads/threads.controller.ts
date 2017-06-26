import { Response, Param, Controller, Get, Post, Body, Request, HttpStatus } from '@nestjs/common';
import { ThreadsService } from './threads.service';
import { Thread } from './thread.entety';

@Controller('boards/:boardId/threads')
export class ThreadsController {
  constructor(private threadsService: ThreadsService) {
  }

  @Get()
  public async getAllThreads(@Response() res, @Request() req) {
    const threads = await this.threadsService.getAllForBoard(req.board.id);

    res.status(HttpStatus.OK).json(threads);
  }

  @Get('/:id')
  public async getThread(@Response() res, @Param('id') id) {
    const thread = await this.threadsService.get(id);
    res.status(HttpStatus.OK).json(thread);
  }

  @Post()
  public async createThread(@Response() res, @Body('thread') thread: Thread, @Request() req) {
    // Set board id
    thread.board = req.board;

    const response = await this.threadsService.create(thread);
    res.status(HttpStatus.CREATED).json(response);
  }
}
