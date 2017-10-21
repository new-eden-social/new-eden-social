import { ArgumentMetadata, Pipe, PipeTransform } from '@nestjs/common';
import { validate } from 'class-validator';
import ApiValidationException from '../errors/ApiValidationException';

/**
 * Example from: http://www.docs.nestjs.com/pipes
 */
@Pipe()
export class ValidatorPipe implements PipeTransform<any> {
  public async transform(value, metadata: ArgumentMetadata) {
    const { metatype } = metadata;
    if (!this.toValidate(metatype)) {
      return value;
    }
    const object = Object.assign(new metatype(), value);
    const errors = await validate(object);
    if (errors.length > 0) {
      const apiValidationErrors = errors.map(error => ({
        property   : error.property,
        constraints: error.constraints,
      }));
      throw new ApiValidationException(apiValidationErrors);
    }
    return value;
  }

  private toValidate(metatype = null): boolean {
    const types = [String, Boolean, Number, Array, Object];
    return !types.find(type => metatype === type);
  }
}
