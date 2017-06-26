import { Pipe, PipeTransform, ArgumentMetadata, HttpStatus } from '@nestjs/common';
import { HttpException } from '@nestjs/core';
import { validate } from 'class-validator';

/**
 * Example from: https://docs.nestjs.com/quick-start/pipes.html
 */
@Pipe()
export class ValidatorPipe implements PipeTransform {
  public async transform(value, metadata: ArgumentMetadata) {
    const { metatype } = metadata;
    if (!this.toValidate(metatype)) {
      return value;
    }
    const object = Object.assign(new metatype(), value);
    const errors = await validate(object);
    if (errors.length > 0) {
      throw new HttpException('Validation failed', HttpStatus.BAD_REQUEST);
    }
    return value;
  }

  private toValidate(metatype = null): boolean {
    const types = [String, Boolean, Number, Array, Object];
    return !types.find(type => metatype === type);
  }
}
