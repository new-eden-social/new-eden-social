import { ExecutionContext, Injectable, NestInterceptor, CallHandler } from '@nestjs/common';
import { map } from 'rxjs/internal/operators';
import { Observable } from 'rxjs';

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
