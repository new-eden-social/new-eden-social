import { Observable } from "rxjs";

// Should reflect the .proto file!
export interface IAuthenticateGrpcService {
  verify(data: IVerifyRequest): Observable<IVerifyResponse>;
}

export interface IVerifyRequest {
  token: string;
}

export interface IVerifyResponse {
  characterId: number;
}