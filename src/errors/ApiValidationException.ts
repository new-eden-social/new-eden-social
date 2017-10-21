import ApiException from './ApiException';
import { ApiExceptionResponse } from './ApiException.interface';
import { ApiValidationError } from './ApiValidationException.interface';

export const REASON = 'VALIDATION_ERROR';

export default class ApiValidationException extends ApiException {

  constructor(errors: ApiValidationError[]) {

    const response = <ApiExceptionResponse>{
      errors,
      reason: REASON,
    };

    super(response, 400);
  }

}
