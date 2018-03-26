import { Global, Module } from '@nestjs/common';
import { LoggerService } from './logger.service';
import { loggerProviders } from './logger.providers';
import { LoggerExceptionInterceptor } from './loggerException.interceptor';

@Global()
@Module({
  components: [
    ...loggerProviders,
    LoggerService,
    LoggerExceptionInterceptor,
  ],
  exports: [
    LoggerService,
    LoggerExceptionInterceptor,
  ],
})
export class LoggerModule {
}
