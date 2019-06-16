import { ApiModelProperty } from '@nestjs/swagger';
import { IStatus, IESIStatus } from './status.interface';

export class DStatus {
  @ApiModelProperty()
  state: 'OK' | 'NOK';

  @ApiModelProperty()
  version: string;

  @ApiModelProperty()
  esi: IESIStatus;

  constructor(status: IStatus) {
    this.state = status.state;
    this.version = status.version;
    this.esi = status.esi;
  }
}
