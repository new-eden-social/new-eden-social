import { Controller } from '@nestjs/common';
import { IAuthenticateGrpcService, IVerifyRequest, IVerifyResponse } from './authenticate.grpc.interface';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthenticateService } from '../authenticate.service';

@Controller()
export class AuthenticateGrpcController implements IAuthenticateGrpcService {

  constructor(
    private readonly authenticateService: AuthenticateService,
    ) {
  }

  verify(data: IVerifyRequest): Observable<IVerifyResponse> {
    return from(this.authenticateService.verify(data.token)).pipe<IVerifyResponse>(
      map<number, IVerifyResponse>(characterId => ({ characterId }))
    );
  }

}
