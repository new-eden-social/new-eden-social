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
const hashtag_entity_1 = require("./hashtag.entity");
const hashtag_repository_1 = require("./hashtag.repository");
const typeorm_1 = require("@nestjs/typeorm");
let HashtagService = class HashtagService {
    constructor(hashtagRepository) {
        this.hashtagRepository = hashtagRepository;
    }
    /**
     * Parse text and create (if not exists) hashtags
     * @param {string} text
     * @returns {Promise<Hashtag[]>}
     */
    parse(text) {
        return __awaiter(this, void 0, void 0, function* () {
            const hashtags = text.match(/(#\w+)/g) || [];
            const unique = hashtags.reduce((_unique, name) => {
                const trimName = name.replace('#', '');
                if (_unique.indexOf(trimName) !== -1) {
                    return _unique;
                }
                return [..._unique, trimName];
            }, []);
            const hashtagEntities = unique.map(name => new hashtag_entity_1.Hashtag(name));
            return this.hashtagRepository.save(hashtagEntities);
        });
    }
};
HashtagService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(hashtag_repository_1.HashtagRepository)),
    __metadata("design:paramtypes", [hashtag_repository_1.HashtagRepository])
], HashtagService);
exports.HashtagService = HashtagService;
//# sourceMappingURL=hashtag.service.js.map