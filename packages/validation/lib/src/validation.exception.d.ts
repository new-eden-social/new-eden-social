import { HttpException } from '@nestjs/common';
export declare class ValidationException extends HttpException {
    constructor(errors: string | object | any);
}
