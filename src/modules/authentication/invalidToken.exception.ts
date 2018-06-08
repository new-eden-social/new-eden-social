import { HttpException, HttpStatus } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import { createExceptionBody } from '../../utils/exception-body.util';

export const ERROR_CODE = 'INVALID_TOKEN_EXCEPTION';
export const ERROR_MESSAGE = 'Invalid token';

export class HttpInvalidTokenException extends HttpException {
  constructor() {
    super(
      createExceptionBody(ERROR_MESSAGE, ERROR_CODE, HttpStatus.UNAUTHORIZED),
      HttpStatus.UNAUTHORIZED,
    );
  }
}

export class WsInvalidTokenException extends WsException {
  constructor() {
    super(
      createExceptionBody(ERROR_MESSAGE, ERROR_CODE, HttpStatus.UNAUTHORIZED),
    );
  }
}
