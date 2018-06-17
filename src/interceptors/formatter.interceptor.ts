import { ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/internal/operators';

@Injectable()
export class FormatterInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    stream$: Observable<any>,
  ): Observable<any> {
    return stream$.pipe(
      map(data => data),
    );
  }
}
