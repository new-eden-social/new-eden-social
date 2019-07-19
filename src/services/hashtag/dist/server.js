"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const validation_1 = require("@new-eden-social/validation");
// Used for TypeORM
require("reflect-metadata");
// Request context
require("zone.js");
require("zone.js/dist/zone-node.js");
require("zone.js/dist/long-stack-trace-zone.js");
const hashtag_module_1 = require("./src/hashtag.module");
function bootstrap() {
    return __awaiter(this, void 0, void 0, function* () {
        const nestApp = yield core_1.NestFactory.create(hashtag_module_1.HashtagModule);
        nestApp.enableCors();
        nestApp.useGlobalPipes(new validation_1.ValidatorPipe());
        yield nestApp.listen(parseInt(process.env.PORT, 10));
    });
}
bootstrap();
//# sourceMappingURL=server.js.map