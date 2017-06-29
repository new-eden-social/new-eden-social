import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { Length } from 'class-validator';
import { ICharacterStatistics } from '../external/zkillboard/zkillboard.interface';
import { IGetCharacter, IGetCharacterPortrait } from '../external/esi/esi.interface';

@Entity()
export class Character {

  @PrimaryColumn('int')
  id: number;


  /**
   * Provided by ESI
   */
  name: string;
  description: string;
  gender: string;
  raceId: number;
  bloodlineId: number;
  ancestryId: number;
  securityStatus: number;

  public populateESI(char: IGetCharacter) {
    this.name = char.name;
    this.description = char.description;
    this.gender = char.gender;
    this.raceId = char.race_id;
    this.bloodlineId = char.bloodline_id;
    this.ancestryId = char.ancestry_id;
    this.securityStatus = char.security_status;
  }

  portrait: {
    px64x64: string;
    px128x128: string;
    px256x256: string;
    px512x512: string;
  };

  public populateESIPortrait(portrait: IGetCharacterPortrait) {
    this.portrait = {
      px64x64: portrait.px64x64,
      px128x128: portrait.px128x128,
      px256x256: portrait.px256x256,
      px512x512: portrait.px512x512,
    };
  }

  /**
   * Provided by zKillboard
   */
  iskDestroyed: number;
  iskLost: number;

  pointsDestroyed: number;
  pointsLost: number;

  shipsDestroyed: number;
  shipsLost: number;

  soloKills: number;
  soloLosses: number;

  public populateZKillboard(char: ICharacterStatistics) {
    this.iskDestroyed = char.iskDestroyed;
    this.iskLost = char.iskLost;
    this.pointsDestroyed = char.pointsDestroyed;
    this.pointsLost = char.pointsLost;
    this.shipsDestroyed = char.shipsDestroyed;
    this.shipsLost = char.shipsLost;
    this.soloKills = char.soloKills;
    this.soloLosses = char.soloLosses;
  }

}
