import { HttpException, HttpStatus } from '@nestjs/common';
import { createHttpExceptionBody } from '@nestjs/common/utils/http-exception-body.util';

export class ValidationException extends HttpException {
  constructor(errors: string | object | any) {
    super(
      createHttpExceptionBody(errors, 'VALIDATION_EXCEPTION', HttpStatus.BAD_REQUEST),
      HttpStatus.BAD_REQUEST,
    );
  }
}
