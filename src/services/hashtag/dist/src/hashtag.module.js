"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const hashtag_service_1 = require("./hashtag.service");
const esi_1 = require("@new-eden-social/esi");
const typeorm_1 = require("@nestjs/typeorm");
const hashtag_repository_1 = require("./hashtag.repository");
const logger_1 = require("@new-eden-social/logger");
const utils_1 = require("@new-eden-social/utils");
let HashtagModule = class HashtagModule {
};
HashtagModule = __decorate([
    common_1.Module({
        imports: [
            logger_1.LoggerModule,
            utils_1.UtilsModule,
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: process.env.DB_HOST,
                port: parseInt(process.env.DB_PORT, 10),
                username: process.env.DB_USERNAME,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_NAME,
                logging: process.env.DB_LOG,
                entities: [`${__dirname}/../**/*.entity{.ts,.js}`],
                synchronize: process.env.DB_SYNC === 'true',
            }),
            typeorm_1.TypeOrmModule.forFeature([hashtag_repository_1.HashtagRepository]),
            esi_1.ESIModule,
        ],
        providers: [
            hashtag_service_1.HashtagService,
        ],
        exports: [
            hashtag_service_1.HashtagService,
        ],
    })
], HashtagModule);
exports.HashtagModule = HashtagModule;
//# sourceMappingURL=hashtag.module.js.map