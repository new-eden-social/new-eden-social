import { HttpException } from '@nestjs/core';
import { ApiExceptionResponse } from './ApiException.interface';

export default class ApiException extends HttpException {

  constructor(response: ApiExceptionResponse, status: number) {
    super(response, status);
  }

}
