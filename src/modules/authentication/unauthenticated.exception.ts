import { HttpException, HttpStatus } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import { createExceptionBody } from '../../exceptions/exceptionBody.util';

export const ERROR_CODE = 'CHARACTER_NOT_AUTHENTICATED';
export const ERROR_MESSAGE = 'You aren\'t authenticated!';

export class HttpUnauthenticatedException extends HttpException {
  constructor() {
    super(
      createExceptionBody(ERROR_MESSAGE, ERROR_CODE, HttpStatus.UNAUTHORIZED),
      HttpStatus.UNAUTHORIZED,
    );
  }
}

export class WsUnauthenticatedException extends WsException {
  constructor() {
    super(
      createExceptionBody(ERROR_MESSAGE, ERROR_CODE, HttpStatus.UNAUTHORIZED),
    );
  }
}
