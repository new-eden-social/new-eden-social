import { Controller } from '@nestjs/common';
import { IKillmailGrpcService } from './killmail.grpc.interface';
import { KillmailService } from '../killmail.service';

@Controller()
export class KillmailGrpcController implements IKillmailGrpcService {

  constructor(
    private readonly killmailService: KillmailService
  ){}
}
