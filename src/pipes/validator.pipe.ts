import { Pipe, PipeTransform, ArgumentMetadata, HttpStatus } from '@nestjs/common';
import { HttpException } from '@nestjs/core';
import { validate } from 'class-validator';

/**
 * Example from: https://docs.nestjs.com/quick-start/pipes.html
 */
@Pipe()
export class ValidatorPipe implements PipeTransform {

  /**
   * Validates provided data against Class
   * @param value
   * @param metadata
   * @return {Promise<any>}
   */
  public async transform(value, metadata: ArgumentMetadata) {
    const { metatype } = metadata;
    if (!this.toValidate(metatype)) {
      return value;
    }
    const object = Object.assign(new metatype(), value);
    const errors = await validate(object);
    if (errors.length > 0) {
      // TODO: Should create an interface that would document all errors returned, Probably do something like
      // TODO: throw new APIValidationException(erorrs)
      throw new HttpException({
        reason: 'validationFailed',
        errors: errors.map(error => ({
          property: error.property,
          constraints: error.constraints,
        })),
      }, HttpStatus.BAD_REQUEST);
    }
    return value;
  }

  private toValidate(metatype = null): boolean {
    const types = [String, Boolean, Number, Array, Object];
    return !types.find(type => metatype === type);
  }
}
