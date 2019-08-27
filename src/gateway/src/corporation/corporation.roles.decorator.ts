import { SetMetadata } from '@nestjs/common';

// tslint:disable-next-line:variable-name
export const CorporationRoles = (...roles: string[]) => SetMetadata('corporationRoles', roles);
