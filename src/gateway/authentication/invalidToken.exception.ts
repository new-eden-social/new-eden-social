import { HttpException, HttpStatus } from '@nestjs/common';
import { createExceptionBody } from '@new-eden-social/utils';

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
