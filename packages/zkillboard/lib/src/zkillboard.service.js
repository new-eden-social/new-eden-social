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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const axios_1 = require("axios");
const internal_compatibility_1 = require("rxjs/internal-compatibility");
const operators_1 = require("rxjs/internal/operators");
let ZKillboardService = class ZKillboardService {
    constructor() {
        this.baseUrl = `${process.env.ZKILLBOARD_ENDPOINT}/api/`;
        this.userAgent = `@new-eden-social/zkillboard:${process.env.npm_package_version} https://github.com/new-eden-social/new-eden-social`;
        this.client = axios_1.default.create({
            baseURL: this.baseUrl,
            headers: { 'User-Agent': this.userAgent, 'Accept-Encoding': 'gzip' },
        });
    }
    /**
     * Create Kill URL
     * @param {number} killId
     * @return {string}
     */
    static createKillUrl(killId) {
        return `https://zkillboard.com/kill/${killId}`;
    }
    formatKillmail(raw, zkb) {
        return {
            id: raw.killmail_id,
            date: new Date(raw.killmail_time),
            warId: raw.war ? raw.war.id : null,
            locationId: zkb.locationID,
            totalValue: zkb.totalValue,
            points: zkb.points,
            npc: !!zkb.npc,
            attackers: raw.attackers.map(attackerRaw => ({
                id: attackerRaw.character_id,
                shipId: attackerRaw.ship_type_id,
                weaponId: attackerRaw.weapon_type_id,
                damageDone: attackerRaw.damage_done,
                finalBlow: !!attackerRaw.final_blow,
            })),
            victim: {
                id: raw.victim.character_id,
                shipId: raw.victim.ship_type_id,
                // damageTaken: raw.victim.damageTaken,
                position: raw.victim.position,
            },
        };
    }
    getKillmail(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const killmails = yield this.request({
                url: `killID/${id}/`,
                method: 'GET',
            });
            const killmail = killmails[0];
            return this.formatKillmail(killmail, killmail.zkb);
        });
    }
    /**
     * Get alliance statistics from zKillboard
     *
     * @param id
     * @return {Promise<ICorporationStatistics>}
     */
    allianceStatistics(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request({
                url: `stats/allianceID/${id}/`,
                method: 'GET',
            });
        });
    }
    /**
     * Get corporation statistics from zKillboard
     *
     * @param id
     * @return {Promise<ICorporationStatistics>}
     */
    corporationStatistics(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request({
                url: `stats/corporationID/${id}/`,
                method: 'GET',
            });
        });
    }
    /**
     * Get character statistics from zKillboard
     *
     * @param id
     * @return {Promise<ICharacterStatistics>}
     */
    characterStatistics(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request({
                url: `stats/characterID/${id}/`,
                method: 'GET',
            });
        });
    }
    /**
     * Request wrapper
     * @param config
     * @return {Promise<T>}
     */
    request(config) {
        return internal_compatibility_1.fromPromise(this.client.request(config))
            .pipe(operators_1.retry(3), operators_1.map(response => response.data)).toPromise();
    }
};
ZKillboardService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [])
], ZKillboardService);
exports.ZKillboardService = ZKillboardService;
//# sourceMappingURL=zkillboard.service.js.map