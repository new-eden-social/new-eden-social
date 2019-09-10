import { Observable } from 'rxjs';

// Should reflect the .proto file!
export interface IAuthenticateGrpcService {
  verify(data: IVerifyDecodeRequest): Observable<IVerifyDecodeResponse>;
  decode(data: IVerifyDecodeRequest): Observable<IVerifyDecodeResponse>;
  authenticate(data: IAuthenticateRequest): Observable<IAuthenticateResponse>;
}

export interface IVerifyDecodeRequest {
  token: string;
}

export interface IVerifyDecodeResponse {
  ssoToken: string;
  ssoRefreshToken: string;
  characterId: number;
}

export interface IAuthenticateRequest {
  ssoToken: string;
  ssoRefreshToken: string;
  ssoExpiresIn: string;
  characterId: number;
}

export interface IAuthenticateResponse {
  token: string;
}