import { Injectable } from '@nestjs/common';
import { Killmail } from './killmail.entity';
import { KillmailParticipantService } from './participant/participant.service';
import { LoggerService } from '@new-eden-social/logger';
import { KillmailRepository } from './killmail.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { IKillmail, ZKillboardService } from '@new-eden-social/zkillboard';

@Injectable()
export class KillmailService {

  constructor(
    private readonly killmailParticipantService: KillmailParticipantService,
    private readonly zkillboardService: ZKillboardService,
    private readonly loggerService: LoggerService,
    @InjectRepository(KillmailRepository)
    private readonly killmailRepository: KillmailRepository,
  ) {
  }

  /**
   * Create killmail from zkillboard killmail
   * @param {IKillmail} zkillmail
   * @return {Promise<void>}
   */
  public async createFromStream(zkillmail: IKillmail) {
    this.loggerService.debug(`Killmail create ${zkillmail.id}`);

    if (!zkillmail.victim.id) {
      this.loggerService.debug('skipping killmail - victim has no character id');
      return;
    }

    const killmail = await this.create(zkillmail);

    const finalBlow = killmail.participants.find(participant => participant.finalBlow);

    if (!finalBlow.characterId) {
      this.loggerService.debug('skipping killmail - finalBlow has no character');
      return;
    }

    // await this.postService.createKillmailPost(killmail, finalBlow.character);
  }

  /**
   * Try to get killmail from db else get from zkill and store to db
   * @param id number
   * @return Promise<Killmail>
   */
  public async getById(id: number): Promise<Killmail> {
    const found = await this.killmailRepository.findOne(id);

    if (found) {
      return found;
    }

    const zkillmail = await this.zkillboardService.getKillmail(id);
    return this.create(zkillmail);
  }

  /**
   * Create killmail and store it database from zkillmail object
   * @param zkillmail IKillmail
   */
  public async create(zkillmail: IKillmail): Promise<Killmail> {
    const killmail = new Killmail();
    killmail.id = zkillmail.id;
    killmail.createdAt = zkillmail.date;
    killmail.locationId = zkillmail.locationId;
    killmail.npc = zkillmail.npc;
    killmail.totalValue = zkillmail.totalValue;
    killmail.participants = [];

    // Create attackers
    for (const attackerId in zkillmail.attackers) {
      // If NPC, ignore
      if (zkillmail.attackers[attackerId].id)  {
        killmail.participants.push(await this.killmailParticipantService.create(
          zkillmail.attackers[attackerId],
          'attacker'));
      }
    }

    // Create Victim
    killmail.participants.push(await this.killmailParticipantService.create(
      zkillmail.victim,
      'victim'));

    return this.killmailRepository.save(killmail);
  }

}
