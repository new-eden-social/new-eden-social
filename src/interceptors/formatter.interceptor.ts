import { ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class FormatterInterceptor implements NestInterceptor {
  intercept(
    dataOrRequest: Request | any,
    context: ExecutionContext,
    stream$: Observable<any>,
  ): Observable<any> {
    return stream$.map(data => data);
  }
}
