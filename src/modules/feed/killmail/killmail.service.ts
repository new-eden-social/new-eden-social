import { Component } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import { Repository } from 'typeorm';
import { Killmail } from './killmail.entity';
import { KillmailsStreamService } from '../../external/killmailsStream/killmailsStream.service';
import { IKillmailStream } from '../../external/killmailsStream/killmailsStream.interface';
import { KillmailParticipantService } from './participant/participant.service';

@Component()
export class KillmailService {

  constructor(private databaseService: DatabaseService,
              private killmailsStreamService: KillmailsStreamService,
              private killmailParticipantService: KillmailParticipantService) {
    this.killmailsStreamService.subscribe(this.create.bind(this));
  }

  private get repository(): Promise<Repository<Killmail>> {
    return this.databaseService.getRepository(Killmail);
  }

  /**
   * Create killmail from killmail stream
   * TODO: This should later be moved to separate microservice, that would get jobs from redis.
   * TODO: So that we can run multiple instances of main API
   * @param {KillmailsStream.IKillmailStream} killmailStream
   * @return {Promise<void>}
   */
  private async create(killmailStream: IKillmailStream) {
    console.info('creating killmail');
    const killmail = new Killmail();
    killmail.id = killmailStream.id;
    killmail.createdAt = killmailStream.date;
    killmail.locationId = killmailStream.locationId;
    killmail.npc = killmailStream.npc;
    killmail.totalValue = killmailStream.totalValue;
    killmail.fittedValue = killmailStream.fittedValue;

    // Create attackers
    await Promise.all(killmailStream.attackers.map(attacker => {
      return this.killmailParticipantService.create(attacker, 'attacker')
      .then(participant => killmail.participants.push(participant));
    }));

    // Create Victims
    await this.killmailParticipantService.create(killmailStream.victim, 'victim')
    .then(participant => killmail.participants.push(participant));

    (await this.repository).persist(killmail);
  }

  /**
   * Get single Killmail
   * @param id
   * @return {Promise<Killmail>}
   */
  public async get(id: number): Promise<Killmail> {
    return (await this.repository).findOneById(id);
  }

}
