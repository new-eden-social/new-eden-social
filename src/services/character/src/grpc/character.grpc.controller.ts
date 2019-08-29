import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { ICharacterGrpcService, ICharacterEntity, IGetRefreshResponse, IGetNotUpdatedResponse, IExistsResponse, IExistsGetRefreshRequest } from './character.grpc.interface';
import { CharacterService } from '../character.service';
import { Character } from '../character.entity';

@Controller()
export class CharacterGrpcController implements ICharacterGrpcService {

  constructor(
    private readonly characterService: CharacterService,
    ) {
  }

  @GrpcMethod('CharacterService')
  exists(data: IExistsGetRefreshRequest): Observable<IExistsResponse> {
    return from(this.characterService.exists(data.characterId)).pipe<IExistsResponse>(
      map<boolean, IExistsResponse>(exists => ({ exists })),
    );
  }

  @GrpcMethod('CharacterService')
  get(data: IExistsGetRefreshRequest): Observable<IGetRefreshResponse> {
    return from(this.characterService.get(data.characterId)).pipe<IGetRefreshResponse>(
      map<Character, IGetRefreshResponse>(character => ({ character: this.characterTransform(character)}))
    );
  }

  @GrpcMethod('CharacterService')
  getNotUpdated(interval: string, limit: number): Observable<IGetNotUpdatedResponse> {
    return from(this.characterService.getNotUpdated(interval, limit)).pipe<IGetNotUpdatedResponse>(
      map<Character[], IGetNotUpdatedResponse>(characters => ({ characters: characters.map(this.characterTransform)}))
    );
  }

  @GrpcMethod('CharacterService')
  refresh(data: IExistsGetRefreshRequest): Observable<IGetRefreshResponse> {
    return from(this.characterService.get(data.characterId)).pipe<IGetRefreshResponse>(
      map<Character, IGetRefreshResponse>(character => ({ character: this.characterTransform(character)}))
    );
  }

  private characterTransform(character: Character): ICharacterEntity {
    return {
      id: character.id,
      handle: character.handle,
      name: character.name,
    };
  }
}
