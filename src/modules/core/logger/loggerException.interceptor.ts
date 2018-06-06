import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  HttpException,
} from '@nestjs/common';
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
    call$: Observable<any>,
  ): Observable<any> {
    const request = context.switchToHttp().getRequest();

    // first param would be for events, second is for errors
    return call$.do(null, (exception) => {
      if (exception instanceof HttpException) {
        // If 500, log as error
        if (500 <= exception.getStatus()) {
          this.loggerService.error(
            'HttpException ' + exception.getStatus(),
            request.path,
            exception.getResponse(),
          );
        } else {
          // Else log as debug (we don't want 4xx errors in production)
          this.loggerService.error(
            'HttpException ' + exception.getStatus(),
            request.path,
            exception.getResponse(),
          );
        }
      } else {
        this.loggerService.error('Unexpected error', request.path, exception);
      }
    });
  }
}
