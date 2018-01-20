import { ArgumentMetadata, Pipe, PipeTransform } from '@nestjs/common';
import { validate } from 'class-validator';
import ApiValidationException from '../errors/ApiValidationException';
import { plainToClass } from 'class-transformer';

/**
 * Example from: http://www.docs.nestjs.com/pipes
 */
@Pipe()
export class ValidatorPipe implements PipeTransform<any> {
  public async transform(value, metadata: ArgumentMetadata) {
    const { metatype } = metadata;
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToClass(metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) {
      const apiValidationErrors = errors.map(error => ({
        property   : error.property,
        constraints: error.constraints,
      }));
      throw new ApiValidationException(apiValidationErrors);
    }
    return object;
  }

  private toValidate(metatype = null): boolean {
    const types = [String, Boolean, Number, Array, Object];
    return !types.find(type => metatype === type);
  }
}
