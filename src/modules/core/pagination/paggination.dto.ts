import { ApiModelProperty } from '@nestjs/swagger';

export class DPagination<T> {
  @ApiModelProperty()
  data: T[];
  @ApiModelProperty()
  page: number;
  @ApiModelProperty()
  pages: number;
  @ApiModelProperty()
  perPage: number;
  @ApiModelProperty()
  count: number;

  constructor(data: T[], page: number, perPage: number, count: number) {
    this.data = data;
    this.page = page;
    this.perPage = perPage;
    this.count = count;
    this.pages = Math.ceil(count / perPage);
  }
}
