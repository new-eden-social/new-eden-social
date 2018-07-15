import { ApiModelProperty } from '@nestjs/swagger';
import { IStatus } from './status.interface';
import { IGetStatus } from '../external/esi/esi.interface';

export class DStatus {
  @ApiModelProperty()
  state: 'OK' | 'NOK';

  @ApiModelProperty()
  version: string;

  @ApiModelProperty()
  esi: IGetStatus;

  constructor(status: IStatus) {
    this.state = status.state;
    this.version = status.version;
    this.esi = status.esi;
  }
}
