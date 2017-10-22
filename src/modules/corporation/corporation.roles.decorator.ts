import { ReflectMetadata } from '@nestjs/common';

// tslint:disable-next-line:variable-name
export const CorporationRoles = (...roles: string[]) => ReflectMetadata('corporationRoles', roles);
