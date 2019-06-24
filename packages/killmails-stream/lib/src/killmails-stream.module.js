"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const killmails_stream_service_1 = require("./killmails-stream.service");
const zkillboard_1 = require("@new-eden-social/zkillboard");
let KillmailsStreamModule = class KillmailsStreamModule {
};
KillmailsStreamModule = __decorate([
    common_1.Module({
        imports: [
            zkillboard_1.ZKillboardModule,
        ],
        providers: [
            killmails_stream_service_1.KillmailsStreamService,
        ],
        exports: [
            killmails_stream_service_1.KillmailsStreamService,
        ],
    })
], KillmailsStreamModule);
exports.KillmailsStreamModule = KillmailsStreamModule;
//# sourceMappingURL=killmails-stream.module.js.map