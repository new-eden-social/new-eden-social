import { HttpException, HttpStatus } from '@nestjs/common';
import { createExceptionBody } from '../../exceptions/exceptionBody.util';

export const ERROR_CODE = 'NOTIFICATION_ALREADY_SEEN';
export const ERROR_MESSAGE = 'Notification was already seen!';

export class HttpNotificationAlreadySeenException extends HttpException {
  constructor() {
    super(
      createExceptionBody(ERROR_MESSAGE, ERROR_CODE, HttpStatus.BAD_REQUEST),
      HttpStatus.BAD_REQUEST,
    );
  }
}
