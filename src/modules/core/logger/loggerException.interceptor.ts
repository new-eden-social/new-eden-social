import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  HttpException,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import { LoggerService } from './logger.service';

@Injectable()
export class HttpLoggerExceptionInterceptor implements NestInterceptor {

  constructor(private loggerService: LoggerService) {
  }

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<any> {
    const request = context.switchToHttp().getRequest();

    // first param would be for events, second is for errors
    return next.handle().do(null, (exception) => {
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

@Injectable()
export class WsLoggerExceptionInterceptor implements NestInterceptor {


  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<any> {
    const client = context.switchToWs().getClient();

    // first param would be for events, second is for errors
    return next.handle().do(null, (exception) => {
      console.log(exception.message);
      console.error(JSON.parse(JSON.stringify(exception)));
    });
  }
}
