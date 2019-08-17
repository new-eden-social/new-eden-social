import {
  Column,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IGetCorporation } from '@new-eden-social/esi';
import { ICorporationIcon } from './corporation.interface';

@Entity()
export class Corporation {

  @PrimaryColumn('int')
  id: number;

  @Column({ unique: true })
  handle: string;

  @Column()
  name: string;

  @Column()
  ticker: string;

  @Column('text')
  description: string;

  @Column()
  ceoId?: number;

  @Column()
  creatorId?: number;

  @Column()
  allianceId?: number;

  @Column()
  executingAllianceId?: number;

  @Column({ nullable: true })
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column('real')
  taxRate: number;

  get icon(): ICorporationIcon {
    return {
      px64x64: `http://image.eveonline.com/Corporation/${this.id}_64.png`,
      px128x128: `http://image.eveonline.com/Corporation/${this.id}_128.png`,
      px256x256: `http://image.eveonline.com/Corporation/${this.id}_256.png`,
    };
  }

  public populateESI(corporation: IGetCorporation) {
    this.name = corporation.name;
    this.ticker = corporation.ticker;
    this.description = corporation.description;
    this.createdAt = corporation.creation_date;
    this.taxRate = corporation.tax_rate;

    if (corporation.alliance_id && corporation.alliance_id !== 1) {
      this.allianceId = corporation.alliance_id;
    }

    if (corporation.ceo_id && corporation.ceo_id !== 1) {
      this.ceoId = corporation.ceo_id;
    }

    if (corporation.creator_id && corporation.creator_id !== 1) {
      this.creatorId = corporation.creator_id;
    }
  }
}
