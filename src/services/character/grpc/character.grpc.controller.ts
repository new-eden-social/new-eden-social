import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { ICharacterGrpcService, ICharacterResponse, IGetNotUpdatedResponse,
  IExistsResponse, IExistsGetRefreshRequest, IGetNotUpdatedRequest,
  ICharacterPortraitResponse, ICharacterRolesResponse } from '@new-eden-social/services-character/grpc/character.grpc.interface';
import { CharacterService } from '@new-eden-social/services-character/character.service';
import { Character } from '@new-eden-social/services-character/character.entity';
import { ICharacterPortrait } from '@new-eden-social/services-character/character.interface';
import { IGetCharacterRoles } from '@new-eden-social/esi';

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
  get(data: IExistsGetRefreshRequest): Observable<ICharacterResponse> {
    return from(this.characterService.get(data.characterId)).pipe<ICharacterResponse>(
      map<Character, ICharacterResponse>(this.characterTransform),
    );
  }

  @GrpcMethod('CharacterService')
  getNotUpdated(data: IGetNotUpdatedRequest): Observable<IGetNotUpdatedResponse> {
    return from(this.characterService.getNotUpdated(data.interval, data.limit)).pipe<IGetNotUpdatedResponse>(
      map<Character[], IGetNotUpdatedResponse>(characters => ({ characters: characters.map(this.characterTransform)}))
    );
  }

  @GrpcMethod('CharacterService')
  refresh(data: IExistsGetRefreshRequest): Observable<ICharacterResponse> {
    return from(this.characterService.get(data.characterId)).pipe<ICharacterResponse>(
      map<Character, ICharacterResponse>(this.characterTransform),
    );
  }

  @GrpcMethod('CharacterService')
  roles(data: IExistsGetRefreshRequest): Observable<ICharacterRolesResponse> {
    return from(this.characterService.getRoles(data.characterId)).pipe<ICharacterRolesResponse>(
      map<IGetCharacterRoles, ICharacterRolesResponse>(roles => roles),
    );
  }

  private characterTransform(character: Character): ICharacterResponse {
    return {
      id: character.id,
      handle: character.handle,
      corporationId: character.corporationId,
      name: character.name,
      description: character.description,
      gender: character.gender,
      raceId: character.raceId,
      bloodlineId: character.bloodlineId,
      ancestryId: character.ancestryId,
      securityStatus: character.securityStatus,
      portrait: this.portraitTransform(character.portrait),
    };
  }

  private portraitTransform(portrait: ICharacterPortrait): ICharacterPortraitResponse {
    return {
      px64x64: portrait.px64x64,
      px128x128: portrait.px128x128,
      px256x256: portrait.px256x256,
      px512x512: portrait.px512x512,
    };
  }
}
