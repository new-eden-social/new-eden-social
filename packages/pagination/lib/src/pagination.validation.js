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
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class VPagination {
    constructor() {
        this.page = 0;
        this.limit = 10;
    }
}
__decorate([
    class_validator_1.IsNumber(), class_validator_1.Min(0), class_transformer_1.Type(() => Number),
    __metadata("design:type", Number)
], VPagination.prototype, "page", void 0);
__decorate([
    class_validator_1.IsNumber(), class_validator_1.Min(1), class_transformer_1.Type(() => Number),
    __metadata("design:type", Number)
], VPagination.prototype, "limit", void 0);
exports.VPagination = VPagination;
//# sourceMappingURL=pagination.validation.js.map