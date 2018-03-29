import { HttpException, HttpStatus } from '@nestjs/common';
import { createHttpExceptionBody } from '@nestjs/common/utils/http-exception-body.util';

export class UnauthenticatedException extends HttpException {
  constructor() {
    super(
      createHttpExceptionBody(
        'You aren\'t authenticated!',
        'CHARACTER_NOT_AUTHENTICATED',
        HttpStatus.UNAUTHORIZED),
      HttpStatus.UNAUTHORIZED,
    );
  }
}
