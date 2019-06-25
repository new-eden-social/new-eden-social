import { ArgumentMetadata, PipeTransform } from '@nestjs/common';
export declare class ValidatorPipe implements PipeTransform<any> {
    transform(value: any, metadata: ArgumentMetadata): Promise<any>;
    private toValidate;
}
