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
var ESIService_1;
const common_1 = require("@nestjs/common");
const axios_1 = require("axios");
const esi_interface_1 = require("./esi.interface");
const esi_exceptions_1 = require("./esi.exceptions");
const request_context_1 = require("@new-eden-social/request-context");
const logger_1 = require("@new-eden-social/logger");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
let ESIService = ESIService_1 = class ESIService {
    constructor(loggerService) {
        this.loggerService = loggerService;
        this.client = axios_1.default.create({
            baseURL: `${ESIService_1.baseUrl}/${ESIService_1.version}`,
            headers: {
                'User-Agent': ESIService_1.userAgent,
                Accept: 'application/json',
            },
        });
    }
    /**
     * Get ESI Status
     * @param query
     * @return {Promise<ISearch>}
     * @url https://esi.evetech.net/ui/#/Status
     */
    status() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request({
                url: 'status/',
                method: 'GET',
            });
        });
    }
    /**
     * Search for alliances, characters, corporations
     * @param query
     * @return {Promise<ISearch>}
     * @url https://esi.tech.ccp.is/ui/#/operations/Search/get_search
     */
    search(query) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request({
                url: 'search/',
                method: 'GET',
                params: {
                    categories: [esi_interface_1.Categories.alliance, esi_interface_1.Categories.character, esi_interface_1.Categories.corporation].join(','),
                    search: query,
                },
            });
        });
    }
    /**
     * Get universe names for ids
     * @param {number[]} ids
     * @returns {Promise<IUniverseNames>}
     * @url https://esi.tech.ccp.is/ui/#/operations/Universe/post_universe_names
     */
    universeNames(ids) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request({
                url: 'universe/names/',
                method: 'POST',
                data: ids,
            });
        });
    }
    /**
     * Get universe event by id
     * @param {number} id
     * @returns {Promise<IUniverseType>}
     */
    universeType(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request({
                url: `universe/types/${id}`,
                method: 'GET',
            });
        });
    }
    /**
     * Get universe group by id
     * @param {number} id
     * @returns {Promise<IUniverseGroup>}
     */
    universeGroup(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request({
                url: `universe/groups/${id}`,
                method: 'GET',
            });
        });
    }
    /**
     * Get universe category by id
     * @param {number} id
     * @returns {Promise<IUniverseCategory>}
     */
    universeCategory(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request({
                url: `universe/categories/${id}`,
                method: 'GET',
            });
        });
    }
    /**
     * Get character by id
     * @param id
     * @return {Promise<IGetCharacter>}
     * @url https://esi.tech.ccp.is/ui/#/operations/Character/get_characters_character_id
     */
    getCharacter(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request({
                url: `characters/${id}/`,
                method: 'GET',
            });
        });
    }
    /**
     * Get character portrait
     * @param id
     * @return {Promise<IGetCharacterPortrait>}
     * @url https://esi.tech.ccp.is/ui/#/operations/Character/get_characters_character_id_portrait
     */
    getCharacterPortrait(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request({
                url: `characters/${id}/portrait/`,
                method: 'GET',
            });
        });
    }
    /**
     * Get character roles
     * @param {number} id
     * @return {Promise<IGetCorporation>}
     * @authenticated
     * @url https://esi.tech.ccp.is/ui/#/operations/Character/get_characters_character_id_roles
     */
    getCharacterRoles(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request({
                url: `characters/${id}/roles/`,
                method: 'GET',
            });
        });
    }
    /**
     * Get corporation by id
     * @param id
     * @return {Promise<IGetCorporation>}
     * @url https://esi.tech.ccp.is/ui/#/operations/Corporation/get_corporations_corporation_id
     */
    getCorporation(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request({
                url: `corporations/${id}/`,
                method: 'GET',
            });
        });
    }
    /**
     * Get alliance by id
     * @param {number} id
     * @returns {Promise<IGetAlliance>}
     * @url https://esi.tech.ccp.is/ui/#/operations/Alliance/get_alliances_alliance_id
     */
    getAlliance(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request({
                url: `alliances/${id}`,
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
        return __awaiter(this, void 0, void 0, function* () {
            const token = request_context_1.RequestContext.currentToken();
            if (!config.headers)
                config.headers = {};
            // If token is provided, send request with token.
            if (token)
                config.headers = Object.assign(config.headers, { Authorization: `Bearer ${token}` });
            this.loggerService.silly('ESI Request', config);
            try {
                const response = yield rxjs_1.from(this.client.request(config))
                    .pipe(operators_1.retry(3)).toPromise();
                this.loggerService.silly('ESI Response', response.data);
                return response.data;
            }
            catch (err) {
                this.loggerService.warning('ESI Error', err);
                /**
                 * Transform underlying request exceptions to ESI Exceptions
                 */
                if (err.response && err.response.status === common_1.HttpStatus.NOT_FOUND) {
                    throw new esi_exceptions_1.ESIEntetyNotFoundException();
                }
                else
                    throw err;
            }
        });
    }
};
ESIService.baseUrl = process.env.ESI_ENDPOINT;
ESIService.version = 'latest';
ESIService.userAgent = `@new-eden-social/esi:${process.env.npm_package_version}`
    + ' https://github.com/new-eden-social/new-eden-social';
ESIService = ESIService_1 = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [logger_1.LoggerService])
], ESIService);
exports.ESIService = ESIService;
//# sourceMappingURL=esi.service.js.map