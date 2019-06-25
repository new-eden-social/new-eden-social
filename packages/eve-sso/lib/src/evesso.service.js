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
const evesso_exceptions_1 = require("./evesso.exceptions");
let EVESSOService = class EVESSOService {
    constructor() {
        this.baseUrl = 'https://login.eveonline.com/oauth/';
        this.userAgent = `@new-eden-social/eve-sso:${process.env.npm_package_version} https://github.com/new-eden-social/new-eden-social`;
        this.authenticationRedirect = process.env.ESI_REDIRECT;
        this.clientId = process.env.ESI_CLIENT;
        this.secretKey = process.env.ESI_SECRET;
        this.scope = process.env.ESI_SCOPE;
        this.client = axios_1.default.create({
            baseURL: this.baseUrl,
            headers: {
                'User-Agent': this.userAgent,
                Accept: 'application/json',
            },
        });
    }
    /**
     * Get authentication url
     * @return {string}
     */
    get authenticationUrl() {
        let url = `${this.baseUrl}authorize`;
        url = `${url}?response_type=code`;
        url = `${url}&redirect_uri=${this.authenticationRedirect}`;
        url = `${url}&client_id=${this.clientId}`;
        url = `${url}&scope=${this.scope}`;
        // TODO + `&state=someRandomThingThatWeCanVerify
        return url;
    }
    /**
     * Get authorization header for verifying authentication
     * @return {string}
     */
    get authorizationHeader() {
        const token = new Buffer(`${this.clientId}:${this.secretKey}`).toString('base64');
        return `Basic ${token}`;
    }
    /**
     * Get authentication access token
     * @param state
     * @param code
     * @return {Promise<IAuthenticationResponse>}
     */
    getAuthenticationToken(state, code) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.client.request({
                url: 'token/',
                method: 'POST',
                params: {
                    code,
                    grant_type: 'authorization_code',
                },
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    Authorization: this.authorizationHeader,
                },
            });
            return response.data;
        });
    }
    /**
     * Use refresh token to obtain new access token
     * @param refreshToken
     * @return {Promise<IAuthenticationResponse>}
     */
    refreshToken(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.client.request({
                url: 'token/',
                method: 'POST',
                params: {
                    refresh_token: refreshToken,
                    grant_type: 'refresh_token',
                },
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    Authorization: this.authorizationHeader,
                },
            });
            return response.data;
        });
    }
    /**
     * Use to check if token is valid
     * @param token
     * @return {Promise<IAuthenticationVerify>}
     */
    verifyAuthentication(token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.client.request({
                    url: 'verify/',
                    method: 'GET',
                    headers: { Authorization: `Bearer ${token}` },
                });
                return response.data;
            }
            catch (err) {
                // Check if we caught axios 400 error
                if (err.response && err.response.status === 400) {
                    // TODO: Should we rather throw TokenInvalidException() ?
                    throw new evesso_exceptions_1.TokenExpiredException();
                }
                else
                    throw err;
            }
        });
    }
};
EVESSOService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [])
], EVESSOService);
exports.EVESSOService = EVESSOService;
//# sourceMappingURL=evesso.service.js.map