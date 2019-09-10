import { ApiModelProperty } from '@nestjs/swagger';

export class DAuthenticated {
  @ApiModelProperty()
  token: string;

  constructor(token: string) {
    this.token = token;
  }
}
