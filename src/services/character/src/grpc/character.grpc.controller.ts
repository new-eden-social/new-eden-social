import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { ICharacterGrpcService, ICharacterEntity } from './character.grpc.interface';
import { CharacterService } from '../character.service';
import { Character } from '../character.entity';

@Controller()
export class CharacterGrpcController implements ICharacterGrpcService {

  constructor(
    private readonly characterService: CharacterService,
    ) {
  }

  @GrpcMethod('AllianceService')
  exists(id: number): Observable<{ exists: boolean; }> {
    return from(this.characterService.exists(id)).pipe<{ exists: boolean }>(
      map<boolean, {exists: boolean}>(exists => ({ exists })),
    );
  }

  @GrpcMethod('AllianceService')
  get(id: number): Observable<ICharacterEntity> {
    return from(this.characterService.get(id)).pipe<ICharacterEntity>(
      map<Character, ICharacterEntity>(character => ({
        id: character.id,
        handle: character.handle,
        name: character.name,
      }))
    );
  }
}
