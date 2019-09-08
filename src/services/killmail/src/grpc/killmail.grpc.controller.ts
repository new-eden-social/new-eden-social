import { Controller } from '@nestjs/common';
import { IKillmailGrpcService, IGetRequest, IKillmailResponse, IParticipantResponse } from './killmail.grpc.interface';
import { KillmailService } from '../killmail.service';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { Killmail } from '../killmail.entity';
import { KillmailParticipant } from '../participant/participant.entity';

@Controller()
export class KillmailGrpcController implements IKillmailGrpcService {

  constructor(
    private readonly killmailService: KillmailService
  ){}

  get(data: IGetRequest): Observable<IKillmailResponse> {
    return from(this.killmailService.get(data.killmailId))
    .pipe<IKillmailResponse>(
      map<Killmail, IKillmailResponse>(this.killmailTransform)
    );
  }

  private killmailTransform(killmail: Killmail): IKillmailResponse {
    return {
      id: killmail.id,
      locationId: killmail.locationId,
      warId: killmail.warId,
      totalValue: killmail.totalValue,
      npc: killmail.npc,
      createdAt: killmail.createdAt.toISOString(),
      participants: killmail.participants.map(this.participantTransform),
    };
  }

  private participantTransform(killmailParticipant: KillmailParticipant): IParticipantResponse {
    return {
      characterId: killmailParticipant.characterId,
      type: killmailParticipant.type,
      shipId: killmailParticipant.shipId,
      damageDone: killmailParticipant.damageDone,
      finalBlow: killmailParticipant.finalBlow,
      weaponId: killmailParticipant.weaponId,
      damageTaken: killmailParticipant.damageTaken,
    };
  }

}
