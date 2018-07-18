import { Global, Module } from '@nestjs/common';
import { LoggerService } from './logger.service';
import { loggerProviders } from './logger.providers';
import {
  HttpLoggerExceptionInterceptor,
  WsLoggerExceptionInterceptor,
} from './loggerException.interceptor';

@Global()
@Module({
  providers: [
    ...loggerProviders,
    LoggerService,
    HttpLoggerExceptionInterceptor,
    WsLoggerExceptionInterceptor,
  ],
  exports: [
    LoggerService,
    HttpLoggerExceptionInterceptor,
    WsLoggerExceptionInterceptor,
  ],
})
export class LoggerModule {
}
