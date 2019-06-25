"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const pagination_validation_1 = require("./pagination.validation");
const validation_1 = require("@new-eden-social/validation");
// tslint:disable-next-line:variable-name
exports.Pagination = common_1.createParamDecorator((data, req) => {
    return validation_1.lynxValidateSync(pagination_validation_1.VPagination, req.query);
});
//# sourceMappingURL=pagination.decorator.js.map