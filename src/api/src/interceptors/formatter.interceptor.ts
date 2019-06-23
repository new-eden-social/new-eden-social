import { ExecutionContext, Injectable, NestInterceptor, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/internal/operators';

@Injectable()
export class FormatterInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<any> {
    return next
    .handle()
    .pipe(map(data => data));
  }
}
