import {
  Column,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IGetAlliance } from '@new-eden-social/esi';
import { IAllianceIcon } from '@new-eden-social/services-alliance/alliance.interface';

@Entity()
export class Alliance {

  @PrimaryColumn('int')
  id: number;

  @Column({ unique: true })
  handle: string;

  @Column()
  name: string;

  @Column()
  ticker: string;

  @Column()
  dateFounded: Date;

  @Column()
  executorCorporationId: number;

  @UpdateDateColumn()
  updatedAt: Date;

  get icon(): IAllianceIcon {
    return {
      px64x64: `http://image.eveonline.com/Alliance/${this.id}_64.png`,
      px128x128: `http://image.eveonline.com/Alliance/${this.id}_128.png`,
    };
  }

  public populateESI(alliance: IGetAlliance) {
    this.name = alliance.name;
    this.ticker = alliance.ticker;
    this.dateFounded = alliance.date_founded;

    if (alliance.executor_corporation_id && alliance.executor_corporation_id !== 1) {
      this.executorCorporationId = alliance.executor_corporation_id;
    }
  }
}
