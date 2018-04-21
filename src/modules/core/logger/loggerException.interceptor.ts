import { Injectable, NestInterceptor, ExecutionContext, HttpException, Response } from '@nestjs/common';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import { LoggerService } from './logger.service';
import { Request } from 'express';

@Injectable()
export class LoggerExceptionInterceptor implements NestInterceptor {

  constructor(private loggerService: LoggerService) {
  }

  intercept(
    context: ExecutionContext,
    call$: Observable<T>,
  ): Observable<Response<T>>{
    // first param would be for events, second is for errors
    return stream$.do(null, (exception) => {
      if (exception instanceof HttpException) {
        // If 500, log as error
        if (500 <= exception.getStatus())
          this.loggerService.error(
            'HttpException ' + exception.getStatus(),
            request.path,
            exception.getResponse(),
          );

        // Else log as debug (we don't want 4xx errors in production)
        else
          this.loggerService.error(
            'HttpException ' + exception.getStatus(),
            request.path,
            exception.getResponse(),
          );
      } else {
        this.loggerService.error('Unexpected error', request.path, exception);
      }
    });
  }
}
