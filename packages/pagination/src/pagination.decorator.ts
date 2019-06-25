import { createParamDecorator } from '@nestjs/common';
import { Request } from 'express';
import { VPagination } from './pagination.validation';
import { lynxValidateSync } from '@new-eden-social/validation';

// tslint:disable-next-line:variable-name
export const Pagination = createParamDecorator(
  (data: any, req: Request): VPagination => {
    return lynxValidateSync(VPagination, req.query);
  },
);
