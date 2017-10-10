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
      // TODO: Should create an interface that would document all errors returned, Probably do
      // TODO: something like throw new APIValidationException(errors)
      throw new ApiValidationException(errors.map(error => ({
        property: error.property,
        constraints: error.constraints,
      })));
    }
    return value;
  }

  private toValidate(metatype = null): boolean {
    const types = [String, Boolean, Number, Array, Object];
    return !types.find(type => metatype === type);
  }
}
