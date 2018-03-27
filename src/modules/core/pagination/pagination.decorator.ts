import { createRouteParamDecorator } from '@nestjs/common';
import { Request } from 'express';
import { VPagination } from './pagination.validation';
import { lynxValidateSync } from '../validation/validation.util';

// tslint:disable-next-line:variable-name
export const Pagination = createRouteParamDecorator(
  (data: any, req: Request): VPagination => {
    return lynxValidateSync(VPagination, req.query);
  },
);
