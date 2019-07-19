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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
const search_service_1 = require("./search.service");
const search_dto_1 = require("./search.dto");
const swagger_1 = require("@nestjs/swagger");
let SearchController = class SearchController {
    constructor(searchService) {
        this.searchService = searchService;
    }
    search(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.searchService.search(query);
            return new search_dto_1.DSearch(data);
        });
    }
};
__decorate([
    swagger_1.ApiResponse({
        status: common_1.HttpStatus.OK,
        type: search_dto_1.DSearch,
        description: 'Search for characters/corporations/alliances',
    }),
    common_1.Get(),
    __param(0, common_1.Query('query')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SearchController.prototype, "search", null);
SearchController = __decorate([
    swagger_1.ApiUseTags('search'),
    common_1.Controller('search'),
    __metadata("design:paramtypes", [search_service_1.SearchService])
], SearchController);
exports.SearchController = SearchController;
//# sourceMappingURL=search.controller.js.map