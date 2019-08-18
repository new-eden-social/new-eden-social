import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { POST_TYPES } from './post.constants';
import { AggregateRoot } from '@nestjs/cqrs';
import {
  CharacterPostedEvent,
  CharacterPostedOnAllianceWallEvent, CharacterPostedOnCharacterWallEvent,
  CharacterPostedOnCorporationWallEvent,
} from './events/create.character.event';
import {
  AlliancePostedEvent,
  AlliancePostedOnAllianceWallEvent, AlliancePostedOnCharacterWallEvent,
  AlliancePostedOnCorporationWallEvent,
} from './events/create.alliance.event';
import {
  CorporationPostedEvent,
  CorporationPostedOnAllianceWallEvent,
  CorporationPostedOnCharacterWallEvent,
  CorporationPostedOnCorporationWallEvent,
} from './events/create.corporation.event';
import { IURLMetadata } from '@new-eden-social/api-metascraper';

@Entity()
export class Post extends AggregateRoot {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { nullable: true })
  content: string;

  @Column('varchar')
  type: POST_TYPES;

  @Column()
  killmailId: number;

  @Column('jsonb', { nullable: true })
  url: IURLMetadata;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  locationId: number;

  @Column()
  characterId?: number;

  @Column()
  corporationId?: number;

  @Column()
  allianceId?: number;

  @Column()
  characterWallId?: number;

  @Column()
  corporationWallId?: number;

  @Column()
  allianceWallId?: number;

  @Column()
  hashtags: string[];

  /**
   * Sends proper events on post creation
   * @return {Promise<Post>}
   */
  public async create(): Promise<Post> {
    if (this.characterId) {
      if (this.characterWallId) {
        await this.apply(new CharacterPostedOnCharacterWallEvent(this));
      } else if (this.corporationWallId) {
        await this.apply(new CharacterPostedOnCorporationWallEvent(this));
      } else if (this.allianceWallId) {
        await this.apply(new CharacterPostedOnAllianceWallEvent(this));
      } else {
        await this.apply(new CharacterPostedEvent(this));
      }
    }
    if (this.corporationId) {
      if (this.characterWallId) {
        await this.apply(new CorporationPostedOnCharacterWallEvent(this));
      } else if (this.corporationWallId) {
        await this.apply(new CorporationPostedOnCorporationWallEvent(this));
      } else if (this.allianceWallId) {
        await this.apply(new CorporationPostedOnAllianceWallEvent(this));
      } else {
        await this.apply(new CorporationPostedEvent(this));
      }
    }
    if (this.allianceId) {
      if (this.characterWallId) {
        await this.apply(new AlliancePostedOnCharacterWallEvent(this));
      } else if (this.corporationWallId) {
        await this.apply(new AlliancePostedOnCorporationWallEvent(this));
      } else if (this.allianceWallId) {
        await this.apply(new AlliancePostedOnAllianceWallEvent(this));
      } else {
        await this.apply(new AlliancePostedEvent(this));
      }
    }
    return this;
  }
}
