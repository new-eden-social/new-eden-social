import { Controller } from '@nestjs/common';
import { IAuthenticateGrpcService, IVerifyDecodeRequest, IVerifyDecodeResponse, IAuthenticateRequest, IAuthenticateResponse } from './authenticate.grpc.interface';
import { from, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthenticateService } from '../authenticate.service';
import { JWTPayload } from '../authenticate.interface';

@Controller()
export class AuthenticateGrpcController implements IAuthenticateGrpcService {

  constructor(
    private readonly authenticateService: AuthenticateService,
    ) {
  }

  verify(data: IVerifyDecodeRequest): Observable<IVerifyDecodeResponse> {
    return from(this.authenticateService.verify(data.token)).pipe<IVerifyDecodeResponse>(
      map<JWTPayload, IVerifyDecodeResponse>(({ssoToken, ssoRefreshToken, characterId}) => ({ ssoToken, ssoRefreshToken, characterId }))
    );
  }

  decode(data: IVerifyDecodeRequest): Observable<IVerifyDecodeResponse> {
    const jwtPayload = this.authenticateService.decode(data.token);
    return of<IVerifyDecodeResponse>({
      ssoToken: jwtPayload.ssoToken,
      ssoRefreshToken: jwtPayload.ssoRefreshToken,
      characterId: jwtPayload.characterId,
    });
  }

  authenticate(data: IAuthenticateRequest): Observable<IAuthenticateResponse> {
    return from(this.authenticateService.authenticate(data.ssoToken, data.ssoRefreshToken, data.ssoExpiresIn, data.characterId)).pipe<IAuthenticateResponse>(
      map<string, IAuthenticateResponse>(token => ({  token }))
    );
  }
}
