import { Injectable, Inject } from '@nestjs/common';
import { Killmail } from './killmail.entity';
import { KillmailsStreamService } from '../core/external/killmailsStream/killmailsStream.service';
import { IKillmailStream } from '../core/external/killmailsStream/killmailsStream.interface';
import { KillmailParticipantService } from './participant/participant.service';
import { PostService } from '../post/post.service';
import { KILLMAIL_REPOSITORY_TOKEN } from './killmail.constants';
import { LoggerService } from '../core/logger/logger.service';
import { KillmailRepository } from './killmail.repository';

@Injectable()
export class KillmailService {

  constructor(
    private killmailsStreamService: KillmailsStreamService,
    private killmailParticipantService: KillmailParticipantService,
    private postService: PostService,
    private loggerService: LoggerService,
    @Inject(KILLMAIL_REPOSITORY_TOKEN)
    private killmailRepository: KillmailRepository,
  ) {
    this.killmailsStreamService.subscribe(this.create.bind(this));
  }

  /**
   * Create killmail from killmail stream
   * @param {IKillmailStream} killmailStream
   * @return {Promise<void>}
   */
  private async create(killmailStream: IKillmailStream) {
    this.loggerService.debug(`Killmail create ${killmailStream.id}`);

    if (!killmailStream.victim.id) {
      this.loggerService.debug('skipping killmail - victim has no character id');
      return;
    }

    const killmail = new Killmail();
    killmail.id = killmailStream.id;
    killmail.createdAt = killmailStream.date;
    killmail.locationId = killmailStream.locationId;
    killmail.npc = killmailStream.npc;
    killmail.totalValue = killmailStream.totalValue;
    killmail.participants = [];

    // Create attackers
    for (const attackerId in killmailStream.attackers) {
      const attacker = killmailStream.attackers[attackerId];

      if (attacker.id) // If NPC, ignore
        killmail.participants.push(await this.killmailParticipantService.create(
          attacker,
          'attacker'));
    }


    // Create Victim
    killmail.participants.push(await this.killmailParticipantService.create(
      killmailStream.victim,
      'victim'));

    await this.killmailRepository.save(killmail);

    const finalBlow = killmail.participants.find(participant => participant.finalBlow);

    if (!finalBlow.character) {
      this.loggerService.debug('skipping killmail - finalBlow has no character');
      return;
    }

    await this.postService.createKillmailPost(killmail, finalBlow.character);
  }

}
