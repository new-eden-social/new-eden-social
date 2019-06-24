"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const WebSocket = require("ws");
const zkillboard_1 = require("@new-eden-social/zkillboard");
let KillmailsStreamService = class KillmailsStreamService {
    constructor(zkillboardService) {
        this.zkillboardService = zkillboardService;
        this.baseUrl = 'wss://api.pizza.moe/stream/killmails/';
        this.userAgent = `@new-eden-social/killmails-stream:${process.env.npm_package_version} https://github.com/new-eden-social/new-eden-social`;
        this.client = new WebSocket(this.baseUrl, null, {
            headers: {
                'User-Agent': this.userAgent,
            },
        });
    }
    /**
     * Emmit formatted/standardised killmail
     * @param callback
     */
    subscribe(callback) {
        this.client.on('message', (data) => {
            const rawKillmail = JSON.parse(data.toString());
            callback(this.zkillboardService.formatKillmail(rawKillmail.killmail, rawKillmail.zkb));
        });
    }
    /**
     * Emmit raw killmail data
     * @param callback
     */
    subscribeRaw(callback) {
        this.client.on('message', (data) => {
            const rawKillmail = JSON.parse(data.toString());
            callback(rawKillmail);
        });
    }
};
KillmailsStreamService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [zkillboard_1.ZKillboardService])
], KillmailsStreamService);
exports.KillmailsStreamService = KillmailsStreamService;
//# sourceMappingURL=killmails-stream.service.js.map