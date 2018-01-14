import { Component, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Killmail } from './killmail.entity';
import { KillmailsStreamService } from '../common/external/killmailsStream/killmailsStream.service';
import { IKillmailStream } from '../common/external/killmailsStream/killmailsStream.interface';
import { KillmailParticipantService } from './participant/participant.service';
import { PostService } from '../post/post.service';
import { KILLMAIL_REPOSITORY_TOKEN } from './killmail.constants';
import Log from '../../utils/Log';

@Component()
export class KillmailService {

  constructor(
    @Inject(KILLMAIL_REPOSITORY_TOKEN) private killmailRepository: Repository<Killmail>,
    private killmailsStreamService: KillmailsStreamService,
    private killmailParticipantService: KillmailParticipantService,
    private postService: PostService,
  ) {
    this.killmailsStreamService.subscribe(this.create.bind(this));
  }

  /**
   * Create killmail from killmail stream
   * @param {KillmailsStream.IKillmailStream} killmailStream
   * @return {Promise<void>}
   */
  private async create(killmailStream: IKillmailStream) {
    Log.debug(`Killmail create ${killmailStream.id}`);

    if (!killmailStream.victim.id) {
      Log.debug('skipping killmail - victim has no character id');
      return;
    }

    const killmail = new Killmail();
    killmail.id = killmailStream.id;
    killmail.createdAt = killmailStream.date;
    killmail.locationId = killmailStream.locationId;
    killmail.npc = killmailStream.npc;
    killmail.totalValue = killmailStream.totalValue;

    // Create attackers
    await Promise.all(killmailStream.attackers.map((attacker) => {
      if (!attacker.id) return null; // If NPC, ignore
      return this.killmailParticipantService.create(attacker, 'attacker')
      .then(participant => killmail.participants.push(participant));
    }));

    // Create Victims
    await this.killmailParticipantService.create(killmailStream.victim, 'victim')
    .then(participant => killmail.participants.push(participant));

    await this.killmailRepository.save(killmail);

    // FIXME: Can it happen that finalBlow is NPC or Structure?
    const finalBlow = killmail.participants.find(participant => participant.finalBlow);

    await this.postService.createKillmailPost(killmail, finalBlow.character);
  }

}
