"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const evesso_service_1 = require("./evesso.service");
let EVESSOModule = class EVESSOModule {
};
EVESSOModule = __decorate([
    common_1.Module({
        providers: [
            evesso_service_1.EVESSOService,
        ],
        exports: [
            evesso_service_1.EVESSOService,
        ],
    })
], EVESSOModule);
exports.EVESSOModule = EVESSOModule;
//# sourceMappingURL=evesso.module.js.map