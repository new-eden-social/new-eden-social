import { IsInt, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class VPagination {

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  limit: number = 10;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  page: number = 0;
}
