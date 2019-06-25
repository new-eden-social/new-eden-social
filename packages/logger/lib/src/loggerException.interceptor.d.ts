import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { LoggerService } from './logger.service';
import { Observable } from 'rxjs';
export declare class HttpLoggerExceptionInterceptor implements NestInterceptor {
    private loggerService;
    constructor(loggerService: LoggerService);
    intercept(context: ExecutionContext, next: CallHandler): Observable<any>;
}
export declare class WsLoggerExceptionInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any>;
}
