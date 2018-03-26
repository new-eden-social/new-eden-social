import { Middleware, NestMiddleware } from '@nestjs/common';
import { RequestContext } from './requestContext';
// Request context
import 'zone.js';
import 'zone.js/dist/zone-node.js';
import 'zone.js/dist/long-stack-trace-zone.js';

@Middleware()
export class RequestContextMiddleware implements NestMiddleware {
  resolve() {
    return (req, res, next) => {
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
    };
  }
}
