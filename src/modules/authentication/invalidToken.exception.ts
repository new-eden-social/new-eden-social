import { HttpException, HttpStatus } from '@nestjs/common';
import { createHttpExceptionBody } from '@nestjs/common/utils/http-exception-body.util';

export class InvalidTokenException extends HttpException {
  constructor() {
    super(
      createHttpExceptionBody('Invalid token', 'INVALID_TOKEN_EXCEPTION', HttpStatus.UNAUTHORIZED),
      HttpStatus.UNAUTHORIZED,
    );
  }
}
