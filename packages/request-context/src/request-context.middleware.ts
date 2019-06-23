import { Injectable, NestMiddleware } from '@nestjs/common';
import { RequestContext } from './request-context';
// Request context
import 'zone.js';
import 'zone.js/dist/zone-node.js';
import 'zone.js/dist/long-stack-trace-zone.js';

@Injectable()
export class RequestContextMiddleware implements NestMiddleware {
  use(req, res, next) {
    const requestContext = new RequestContext(req, res);
    Zone.current
    .fork({
      name: RequestContext.name,
      properties: {
        [RequestContext.name]: requestContext,
      },
    })
    .fork(Zone['longStackTraceZoneSpec'])
    .run(async () => await next());
  }
}
