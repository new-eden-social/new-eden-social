import { HttpException } from '@nestjs/core';

export default class ApiException extends HttpException {

  constructor(response: ApiExceptionResponse, status: number) {
    super(response, status);
  }

}
