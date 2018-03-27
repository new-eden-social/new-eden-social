import { HttpException, HttpStatus } from '@nestjs/common';
import { createHttpExceptionBody } from '@nestjs/common/utils/http-exception-body.util';

export class EntityNotFoundException extends HttpException {
  constructor(entityName?: string) {
    super(
      createHttpExceptionBody(
        entityName ? `Entity "${entityName}" was not found` : 'Entity was not found',
        'ENTITY_NOT_FOUND_EXCEPTION',
        HttpStatus.NOT_FOUND),
      HttpStatus.NOT_FOUND,
    );
  }
}
