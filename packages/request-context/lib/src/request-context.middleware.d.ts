import { NestMiddleware } from '@nestjs/common';
import 'zone.js';
import 'zone.js/dist/zone-node.js';
import 'zone.js/dist/long-stack-trace-zone.js';
export declare class RequestContextMiddleware implements NestMiddleware {
    use(req: any, res: any, next: any): void;
}
